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

interface IListingParams {
  listingId?: string;
}

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

  const choices = completion.choices;
  if (!choices || choices.length === 0 || !choices[0].message) {
    console.log("null");
    return "null";
  }

  return choices[0].message.content?.trim() ?? "null";
}

export async function PATCH(request: Request, { params }: { params: IListingParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  const data = await request.json();

  if (!listingId || typeof listingId !== "string") {
    console.error("Invalid ID:", listingId);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const numericListingId = Number(listingId);

  if (isNaN(numericListingId)) {
    console.error("Invalid listingId format:", listingId);
    return NextResponse.json({ error: "Invalid listingId format" }, { status: 400 });
  }

  try {
    const {
      guestCount,
      roomCount,
      bathroomCount,
      price,
      numberOfOtherBuildings,
      numberOfHabitableBuildings,
      landSize,
      arableLandSize,
      latitude,
      longitude,
      agentWebsite,
      ...otherData
    } = data;

    let extractedInfo = null;

    if (agentWebsite) {
      try {
        const response = await fetch(`${JINA_API_URL}${agentWebsite}`, {
          method: "GET",
          headers: {
            "X-With-Generated-Alt": "true",
            "X-Return-Format": "text",
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

    const updateData = {
      ...otherData,
      guestCount: guestCount ? Number(guestCount) : undefined,
      roomCount: roomCount ? Number(roomCount) : undefined,
      bathroomCount: bathroomCount ? Number(bathroomCount) : undefined,
      price: price ? Number(price) : undefined,
      numberOfOtherBuildings: numberOfOtherBuildings ? Number(numberOfOtherBuildings) : undefined,
      numberOfHabitableBuildings: numberOfHabitableBuildings ? Number(numberOfHabitableBuildings) : undefined,
      landSize: landSize ? Number(landSize) : undefined,
      arableLandSize: arableLandSize ? Number(arableLandSize) : undefined,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      extractedInfo, // Include summarized extracted info here
    };

    const listing = await prisma.listing.updateMany({
      where: {
        id: numericListingId,
        userId: currentUser.id,
      },
      data: updateData,
    });

    if (listing.count === 0) {
      console.error("No listings updated for ID:", numericListingId);
      return NextResponse.json({ error: "No listings updated" }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Failed to update listing:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
