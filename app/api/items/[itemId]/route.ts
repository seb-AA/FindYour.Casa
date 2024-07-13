import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request, { params }: { params: { itemId: string } }) {
  const { itemId } = params;

  if (!itemId || typeof itemId !== "string") {
    return NextResponse.error();
  }

  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId) },
    });

    if (!item) {
      return NextResponse.error();
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(request: Request, { params }: { params: { itemId: string } }) {
  const { itemId } = params;

  if (!itemId || typeof itemId !== "string") {
    return NextResponse.error();
  }

  try {
    await prisma.item.delete({
      where: { id: parseInt(itemId) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error();
  }
}
