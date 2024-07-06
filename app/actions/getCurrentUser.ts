import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { User } from "@/app/types";

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    // Return the user with the correct type
    return {
      ...currentUser,
      favoriteIds: currentUser.favoriteIds as number[],
    } as User;
  } catch (error: any) {
    return null;
  }
}
