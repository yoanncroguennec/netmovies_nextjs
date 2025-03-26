import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

const allowedOrigins = ["http://localhost:3000", "https://www.net-movie.fr/"];

export async function GET() {
  const radios = await prisma.webRadio.findMany();
  return NextResponse.json(radios, {
    headers: {
      "Access-Control-Allow-Origin": "*", // Change "*" to specific origins if needed
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  try {
    const { name, img, fluxUrl } = await req.json();
    const newRadio = await prisma.webRadio.create({
      data: { name, img, fluxUrl },
    });

    return NextResponse.json(newRadio, {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
