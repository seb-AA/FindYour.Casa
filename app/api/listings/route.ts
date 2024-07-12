import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import fetch from "node-fetch";

const JINA_API_KEY = process.env.NEXT_PUBLIC_JINA_API_KEY;
const JINA_API_URL = "https://r.jina.ai/";

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
        extractedInfo = responseData; // Store the text response as extractedInfo
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
      extractedInfo, // Include extracted info here
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
