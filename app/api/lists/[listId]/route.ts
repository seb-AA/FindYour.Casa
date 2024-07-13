import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request, { params }: { params: { listId: string } }) {
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
