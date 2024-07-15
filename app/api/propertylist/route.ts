import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Create New Property List
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, listingIds } = body;

  const propertyList = await prisma.propertyList.create({
    data: {
      name,
      userId: currentUser.id,
      listings: {
        create: listingIds.map((id: number) => ({ listingId: id }))
      }
    },
  });

  return NextResponse.json(propertyList);
}

// Get All Property Lists for Current User
export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const propertyLists = await prisma.propertyList.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      listings: {
        include: {
          listing: true,
        }
      }
    },
  });

  return NextResponse.json(propertyLists);
}

// Update a Property List
export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const url = new URL(request.url);
  const listId = url.searchParams.get("listId");

  if (!listId || typeof listId !== "string") {
    throw new Error("Invalid ID");
  }

  const body = await request.json();
  const { name, listingIds } = body;

  const updatedPropertyList = await prisma.propertyList.update({
    where: {
      id: Number(listId),
      userId: currentUser.id,
    },
    data: {
      name,
      listings: {
        deleteMany: {},
        create: listingIds.map((id: number) => ({ listingId: id }))
      },
    },
  });

  return NextResponse.json(updatedPropertyList);
}

// Delete a Property List
export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const url = new URL(request.url);
  const listId = url.searchParams.get("listId");

  if (!listId || typeof listId !== "string") {
    throw new Error("Invalid ID");
  }

  const deletedPropertyList = await prisma.propertyList.delete({
    where: {
      id: Number(listId),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(deletedPropertyList);
}
