import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { User } from "@/app/types";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    // Ensure favoriteIds is an array of numbers
    if (!Array.isArray(currentUser.favoriteIds)) {
      throw new Error("favoriteIds is not an array");
    }

    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    return favoriteListings;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
