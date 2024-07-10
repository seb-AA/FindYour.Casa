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

  // Convert listingId to number
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
    throw new Error("Invalid ID");
  }

  // Convert listingId to number
  const numericListingId = Number(listingId);

  if (isNaN(numericListingId)) {
    throw new Error("Invalid listingId format");
  }

  try {
    const listing = await prisma.listing.updateMany({
      where: {
        id: numericListingId,
        userId: currentUser.id,
      },
      data,
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.error({ status: 500, body: { error: error.message } });
  }
}
