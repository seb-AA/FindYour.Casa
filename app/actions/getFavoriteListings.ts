import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { User } from "@/app/types/types";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    // Ensure favoriteIds is an array of strings
    if (!Array.isArray(currentUser.favoriteIds)) {
      throw new Error("favoriteIds is not an array");
    }

    // Convert favoriteIds to numbers
    const favoriteIds = currentUser.favoriteIds.map(id => {
      const numId = Number(id);
      if (isNaN(numId)) {
        throw new Error(`Invalid id: ${id}`);
      }
      return numId;
    });

    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: favoriteIds,
        },
      },
    });

    return favoriteListings;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
