// http://localhost:3000/api/movies/id
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET BY ID
// export async function GET(request, { params }) {
//   try {
//     const { id } = params;

//     const movieID = await prisma.movie.findUnique({ where: { id } });

//     if (!movieID) {
//       return NextResponse.json({ message: "Movie not found" }, { status: 400 });
//     }

//     return NextResponse.json(movieID, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

// // UPDATE
// export async function PATCH(request, {params}) {
//   try {
//     const {
//       name,
//       realisators,
//       actors,
//       desc,
//       trailer,
//       favorite,
//       watch,
//       country,
//       productionCompany,
//       movieLink,
//       img,
//       year,
//       genre,
//       rating,
//     } = await req.json();

//     const { id } = params;

//     const updatePost = await prisma.movie.update({
//       where: {
//         id,
//       },
//       data: {
//         name,
//         realisators,
//         actors,
//         desc,
//         trailer,
//         favorite,
//         watch,
//         country,
//         productionCompany,
//         movieLink,
//         img,
//         year,
//         genre,
//         rating,
//       },
//     });

//     if (!updatePost) {
//       return NextResponse.json({ message: "Movie not found" }, { status: 400 });
//     }
//     return NextResponse.json(updatePost);
//   } catch (error) {
//         return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.movie.delete({ where: { id } });

    return NextResponse.json(
      { message: "Deleted successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete WebRadio" },
      { status: 500 }
    );
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