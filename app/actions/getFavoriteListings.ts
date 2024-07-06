import prisma from "@/app/libs/prismadb";

export default async function getListingById(listingId: string | undefined) {
  if (!listingId) {
    throw new Error("listingId is required");
  }

  // Convert listingId to number
  const numericListingId = Number(listingId);

  if (isNaN(numericListingId)) {
    throw new Error("Invalid listingId format");
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: numericListingId,
      },
      include: {
        user: true,
      },
    });

    return listing;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
