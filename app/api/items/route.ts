import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  try {
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, notes, extractedInfo, image, link, price } = await request.json();
    const newItem = await prisma.item.create({
      data: { name, description, notes, extractedInfo, image, link, price },
    });
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.error();
  }
}
