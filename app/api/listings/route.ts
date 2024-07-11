import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import fetch from "node-fetch";

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
    const response = await fetch(`https://r.jina.ai/${agentWebsite}`);
    const data = await response.json();
    extractedInfo = data.content;
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
      numberOfOtherBuildings,
      numberOfHabitableBuildings,
      landSize,
      arableLandSize,
      isPublic,
      extractedInfo,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
