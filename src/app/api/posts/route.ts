import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handler for GET, POST, PUT, DELETE requests
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    // Get all posts
    case "GET":
      try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
      }
      break;

    // Create a new post
    case "POST":
      try {
        const { title, content } = req.body;
        const post = await prisma.post.create({
          data: {
            title,
            content,
          },
        });
        res.status(201).json(post);
      } catch (error) {
        res.status(500).json({ error: "Failed to create post" });
      }
      break;

    // Update an existing post
    case "PUT":
      try {
        const { id, title, content } = req.body;
        const post = await prisma.post.update({
          where: { id },
          data: {
            title,
            content,
          },
        });
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ error: "Failed to update post" });
      }
      break;

    // Delete a post
    case "DELETE":
      try {
        const { id } = req.body;
        await prisma.post.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete post" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
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
