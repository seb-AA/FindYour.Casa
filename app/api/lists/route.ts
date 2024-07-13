import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, userId } = body;

  try {
    const list = await prisma.list.create({
      data: {
        title,
        userId,
      },
    });
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    const lists = await prisma.list.findMany();
    return NextResponse.json(lists);
  } catch (error) {
    return NextResponse.error();
  }
}
