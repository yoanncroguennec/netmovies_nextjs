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
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies, { headers: getCorsHeaders(origin) });
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const {
    name,
    realisators,
    actors,
    desc,
    trailer,
    favorite,
    watch,
    country,
    productionCompany,
    movieLink,
    img,
    year,
    genre,
    rating,
  } = await req.json();
  const newMovie = await prisma.movie.create({
    data: {
      name,
      realisators,
      actors,
      desc,
      trailer,
      favorite,
      watch,
      country,
      productionCompany,
      movieLink,
      img,
      year,
      genre,
      rating,
    },
  });

  return NextResponse.json(newMovie, {
    status: 201,
    headers: getCorsHeaders(origin),
  });
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
}
