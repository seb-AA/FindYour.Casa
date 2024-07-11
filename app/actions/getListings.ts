import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  latitude?: number;
  longitude?: number;
  category?: string;
  isPublic?: boolean;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      latitude,
      longitude,
      category,
      isPublic,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = parseInt(userId, 10);
    }

    if (category) {
      query.category = category;
    }

    if (latitude && longitude) {
      query.latitude = latitude;
      query.longitude = longitude;
    }

    if (guestCount) {
      query.guestCount = { gte: guestCount };
    }

    if (roomCount) {
      query.roomCount = { gte: roomCount };
    }

    if (bathroomCount) {
      query.bathroomCount = { gte: bathroomCount };
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    if (typeof isPublic === 'boolean') {
      query.isPublic = isPublic;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
