// http://localhost:3000/api/movies/id
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// const allowedOrigins = ["http://localhost:3000", "https://yourdomain.com"];

// function getCorsHeaders(origin: string | null) {
//   const isAllowed = origin && allowedOrigins.includes(origin);
//   return {
//     "Access-Control-Allow-Origin": isAllowed ? origin : "null", // Allow only listed origins
//     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
//     "Access-Control-Allow-Headers": "Content-Type",
//   };
// }

const prisma = new PrismaClient();

// GET BY ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Set CORS headers
  // const headers = new Headers({
  //   "Access-Control-Allow-Origin": "*", // Change "*" to your frontend domain for security
  //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //   "Access-Control-Allow-Headers": "Content-Type, Authorization",
  // });

  try {
    const { id } = params;

    const movieID = await prisma.movie.findUnique({ where: { id } });

    if (!movieID) {
      return NextResponse.json({ message: "Movie not found" }, { status: 400 });
    }

    // const response = {
    //   movieID,
    // };

    return NextResponse.json(movieID, { status: 200 });
    // return NextResponse.json(response, {
    //   status: 200,
    //   headers: getCorsHeaders(origin),
    // });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

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
