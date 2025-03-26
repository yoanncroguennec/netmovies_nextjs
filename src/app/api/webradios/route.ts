import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000", "https://yourdomain.com"];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "null", // Allow only listed origins
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const radios = await prisma.webRadio.findMany();
  return NextResponse.json(radios, { headers: getCorsHeaders(origin) });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");

  const { name, img, fluxUrl } = await req.json();

  const newRadio = await prisma.webRadio.create({
    data: { name, img, fluxUrl },
  });

  return NextResponse.json(newRadio, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  
  return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
}
