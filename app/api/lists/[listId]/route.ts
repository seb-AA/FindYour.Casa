// app/api/lists/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  try {
    const lists = await prisma.list.findMany();
    return NextResponse.json(lists);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const { title, userId } = await request.json();
    const newList = await prisma.list.create({
      data: { title, userId },
    });
    return NextResponse.json(newList);
  } catch (error) {
    return NextResponse.error();
  }
}
