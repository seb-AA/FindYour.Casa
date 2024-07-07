// pages/api/listings/[listingId].ts
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
