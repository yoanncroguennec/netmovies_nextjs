// https://www.net-movie.fr/api/posts

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  // console.log("API appelée !");
  // return new Response(JSON.stringify({ message: "Ça fonctionne !" }), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" },
  // });

  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
        return NextResponse.json({ message: "GET ERROR", error}, {status: 500});
  }
}
