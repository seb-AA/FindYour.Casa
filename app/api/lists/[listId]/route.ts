// app/api/lists/[listId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { listId } = params;

  if (!listId || typeof listId !== "string") {
    return NextResponse.error();
  }

  try {
    const list = await prisma.list.findUnique({
      where: { id: parseInt(listId) },
      include: { items: true },
    });

    if (!list) {
      return NextResponse.error();
    }

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const { listId } = params;

  if (!listId || typeof listId !== "string") {
    return NextResponse.error();
  }

  try {
    await prisma.list.delete({
      where: { id: parseInt(listId) },
    });

    return NextResponse.json({ message: "List deleted successfully" });
  } catch (error) {
    return NextResponse.error();
  }
}
