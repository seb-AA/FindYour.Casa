import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

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
    photos,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
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

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      photos,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
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
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
