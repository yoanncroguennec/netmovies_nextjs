"use server";

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function GET() {
//   console.log("API appelée !");
//   return new Response(JSON.stringify({ message: "Ça fonctionne !" }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });

//   const tasks = await prisma.task.findMany();
//   return NextResponse.json(tasks);

  const tasks = await prisma.movie.findMany();
  return NextResponse.json(tasks);
}

