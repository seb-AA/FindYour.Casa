import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { User } from "@prisma/client";
import { Session } from "next-auth";

// Function to get the current session
export async function getSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions) as Session | null;
  return session;
}

// Function to get the current user
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
