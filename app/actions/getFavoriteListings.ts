import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    // Convert favoriteIds to numbers
    const favoriteIds = currentUser.favoriteIds.map((id: string) => Number(id));

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: favoriteIds,
        },
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
