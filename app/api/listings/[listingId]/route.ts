import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IListingParams {
  listingId?: string;
}

export async function DELETE(request: Request, { params }: { params: IListingParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const numericListingId = Number(listingId);

  if (isNaN(numericListingId)) {
    throw new Error("Invalid listingId format");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: numericListingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
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
      garageSpaces,
      locationValue,
      ...otherData
    } = data;

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
      garageSpaces: garageSpaces ? Number(garageSpaces) : undefined,
      locationValue: locationValue ? String(locationValue) : undefined,
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
