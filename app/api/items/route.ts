import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, notes, extractedInfo, link } = body;

  try {
    const item = await prisma.item.create({
      data: {
        name,
        description,
        notes,
        extractedInfo,
        link,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.error();
  }
}
