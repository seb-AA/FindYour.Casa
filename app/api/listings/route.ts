import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import fetch from "node-fetch";
import OpenAI from "openai";

const JINA_API_KEY = process.env.NEXT_PUBLIC_JINA_API_KEY;
const JINA_API_URL = "https://r.jina.ai/";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function summarizeContent(content: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Extract the key information from the following text and format it as structured data:" },
      { role: "user", content },
    ],
    max_tokens: 1024,
    temperature: 0.7,
  });

  return completion.choices[0].message?.content.trim() || "";
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    latitude,
    longitude,
    price,
    agentWebsite,
    notes,
    hasSwimmingPool,
    hasGarage,
    numberOfOtherBuildings,
    numberOfHabitableBuildings,
    landSize,
    arableLandSize,
    isPublic,
  } = body;

  let extractedInfo = null;

  if (agentWebsite) {
    try {
      const response = await fetch(`${JINA_API_URL}${agentWebsite}`, {
        method: "GET",
        headers: {
          "X-With-Generated-Alt": "true",
          Authorization: `Bearer ${JINA_API_KEY}`,
        },
      });

      if (response.ok) {
        const responseData = await response.text();
        extractedInfo = await summarizeContent(responseData);
      }
    } catch (error) {
      console.error("Error fetching data from Jina API:", error);
    }
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      latitude,
      longitude,
      price: parseInt(price, 10),
      agentWebsite,
      notes,
      extractedInfo, // Include summarized extracted info here
      hasSwimmingPool,
      hasGarage,
      numberOfOtherBuildings,
      numberOfHabitableBuildings,
      landSize,
      arableLandSize,
      isPublic,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
