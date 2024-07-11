import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import fetch from "node-fetch";

const JINA_API_URL = "https://r.jina.ai/";
const JINA_API_KEY = process.env.JINA_API_KEY; // Store your API key in .env.local

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

  // Fetch extracted information from Jina AI's reader API
  let extractedInfo = null;
  if (agentWebsite) {
    try {
      const response = await fetch(`${JINA_API_URL}${agentWebsite}`, {
        method: "GET",
        headers: {
          "x-api-key": JINA_API_KEY,
        },
      });
      const data = await response.json();
      extractedInfo = data.content; // Adjust this based on the actual structure of the response
    } catch (error) {
      console.error("Error fetching extracted info:", error);
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
      hasSwimmingPool,
      hasGarage,
      numberOfOtherBuildings: numberOfOtherBuildings ? Number(numberOfOtherBuildings) : null,
      numberOfHabitableBuildings: numberOfHabitableBuildings ? Number(numberOfHabitableBuildings) : null,
      landSize: landSize ? Number(landSize) : null,
      arableLandSize: arableLandSize ? Number(arableLandSize) : null,
      isPublic,
      userId: currentUser.id,
      extractedInfo, // Store the extracted info
    },
  });

  return NextResponse.json(listing);
}

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    id,
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

  // Fetch extracted information from Jina AI's reader API
  let extractedInfo = null;
  if (agentWebsite) {
    try {
      const response = await fetch(`${JINA_API_URL}${agentWebsite}`, {
        method: "GET",
        headers: {
          "x-api-key": JINA_API_KEY,
        },
      });
      const data = await response.json();
      extractedInfo = data.content; // Adjust this based on the actual structure of the response
    } catch (error) {
      console.error("Error fetching extracted info:", error);
    }
  }

  const listing = await prisma.listing.update({
    where: { id: parseInt(id, 10) },
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
      hasSwimmingPool,
      hasGarage,
      numberOfOtherBuildings: numberOfOtherBuildings ? Number(numberOfOtherBuildings) : null,
      numberOfHabitableBuildings: numberOfHabitableBuildings ? Number(numberOfHabitableBuildings) : null,
      landSize: landSize ? Number(landSize) : null,
      arableLandSize: arableLandSize ? Number(arableLandSize) : null,
      isPublic,
      userId: currentUser.id,
      extractedInfo, // Store the extracted info
    },
  });

  return NextResponse.json(listing);
}
