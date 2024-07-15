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
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!list) {
      return NextResponse.error();
    }

    const items = list.items.map((listItem) => listItem.item);

    return NextResponse.json({ ...list, items });
  } catch (error) {
    return NextResponse.error();
  }
}
