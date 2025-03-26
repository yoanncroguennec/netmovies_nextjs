import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  const radios = await prisma.webRadio.findMany();
  return NextResponse.json(radios);
}

export async function POST(req: Request) {
  try {
    const { name, img, fluxUrl } = await req.json();
    const newRadio = await prisma.webRadio.create({
      data: { name, img, fluxUrl },
    });
    return NextResponse.json(newRadio, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
