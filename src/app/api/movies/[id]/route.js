// http://localhost:3000/api/movies/id
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET BY ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const movieID = await prisma.movie.findUnique({ where: { id } });

    if (!movieID) {
      return NextResponse.json({ message: "Movie not found" }, { status: 400 });
    }

    return NextResponse.json(movieID, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// UPDATE
export async function PATCH(request, {params}) {
  try {
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

    const { id } = params;

    const updatePost = await prisma.movie.update({
      where: {
        id,
      },
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

    if (!updatePost) {
      return NextResponse.json({ message: "Movie not found" }, { status: 400 });
    }
    return NextResponse.json(updatePost);
  } catch (error) {
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE
export async function GET({ params }) {
  try {
    const { id } = params;

    await prisma.movie.delete({ where: { id } });

    return NextResponse.json("Movie has been deleted");
  } catch (error) {
    return NextResponse.json({ error: "DELETE serveur" }, { status: 500 });
  }
}
