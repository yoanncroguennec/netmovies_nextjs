import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST - Create a new post
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const post = await prisma.post.create({
      data: { title, content },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

// PUT - Update an existing post
export async function PUT(request: Request) {
  try {
    const { id, title, content } = await request.json();
    const post = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a post
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

// // https://www.net-movie.fr/api/posts

// import { NextResponse } from "next/server";
// import prisma from "@/app/libs/prismadb";

// export async function GET() {
//   // console.log("API appelée !");
//   // return new Response(JSON.stringify({ message: "Ça fonctionne !" }), {
//   //   status: 200,
//   //   headers: { "Content-Type": "application/json" },
//   // });

//   try {
//     const posts = await prisma.post.findMany();
//     return NextResponse.json(posts);
//   } catch (error) {
//         return NextResponse.json({ message: "GET ERROR", error}, {status: 500});
//   }
// }
