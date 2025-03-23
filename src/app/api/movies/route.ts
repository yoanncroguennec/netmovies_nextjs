// http://localhost:3000/api/movies
import { NextResponse } from "next/server"; // API NextResponsepermet de renvoyer une réponse JSON dans une API route Next.js.
import prisma from "@/app/libs/prismadb"
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // req.url contient l'URL de la requête, Exemple : http://localhost:3000/api/movies?type=randomMovie.
    // new URL(req.url).searchParamspermet d'extraire les paramètres de requête ( type=randomMovie).
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // searchParams.get("type")récupérer la valeur du paramètre type.

    ////////////////////////////
    // http://localhost:3000/api/movies?type=allMovies
    if (type === "allMovies") {
      const movies = await prisma.movie.findMany();
      return NextResponse.json(movies, { status: 200 });

      ////////////////////////////
      // http://localhost:3000/api/movies?type=allMoviesByGenre&genre=Action
    } else if (type === "allMoviesByGenre") {
      // Lire le genre depuis la requête
      const { searchParams } = new URL(req.url);
      const genre = searchParams.get("genre");

      // Vérifier si un genre est fourni
      if (!genre) {
        return NextResponse.json(
          { error: "Genre is required" },
          { status: 400 }
        );
      }

      // Rechercher les films avec le genre donné
      const movies = await prisma.movie.findMany({
        where: {
          genre: {
            has: genre, // Vérifie si le tableau "genre" contient la valeur
          },
        },
      });

      return NextResponse.json(movies, { status: 200 });

      ////////////////////////////
      // http://localhost:3000/api/movies?type=randomMovie
    } else if (type === "randomMovie") {
      const count = await prisma.movie.count(); // Get total number of movies

      if (count === 0) {
        return NextResponse.json(
          { error: "No movies available" },
          { status: 404 }
        );
      }

      // Math.random() générer un nombre entre 0 et 1 (ex. 0.4578).
      // Math.floor()arrondit à l'entier inférieur (ex. 4.578 → 4)
      // Cet index nous permet de choisir un film au hasard dans la liste.
      // 📌 Exemple : Si count = 10, on obtient un randomIndexentre 0 et 9 .
      const randomIndex = Math.floor(Math.random() * count);

      // findFirst() retourne un seul film .
      const randomMovie = await prisma.movie.findFirst({
        // skip: randomIndex ignore les randomIndex premiers films et de sélectionner le suivant .
        skip: randomIndex,
        // orderBy: { id: "asc" } assure que les films sont toujours triés dans le même ordre (par ID).
        orderBy: { id: "asc" },
      });
      // Si randomIndex = 4, Prisma saute 4 films et retourne le 5ème .

      // NextResponse.json(randomMovie, { status: 200 }) retourne le film sous format JSON avec un code 200 OK .
      return NextResponse.json(randomMovie, { status: 200 });
      ////////////////////////////
      // http://localhost:3000/api/movies?type=newAllMovies
    } else if (type === "newAllMovies") {
      try {
        const limit = 10;

        const movies = await prisma.movie.findMany({
          take: limit,
          orderBy: {
            createdAt: "desc", // Sort movies by release date (newest first)
          },
        });

        const total = await prisma.movie.count(); // Get total number of movies

        return NextResponse.json({ total, movies }, { status: 200 });
      } catch (error) {
        return NextResponse.json(
          { message: "Ne trouve pas les derniers films ajoutés dans la BDD" },
          { status: 400 }
        );
      }
      ////////////////////////////
      ////////////////////////////
    } else {
      return NextResponse.json(
        { message: "Invalid type parameter" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// CREATE ON A MOVIE
export async function POST(req: Request) {
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
    genre,
    rating,
    year,
  } = await req.json();

  const newPost = await prisma.movie.create({
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
      genre,
      rating,
      year,
    },
  });

  return NextResponse.json(newPost);
}

// // CREATE MULTILPLE MOVIES
// export async function POST(req: Request) {
//   try {
//     const movies = await req.json();

//     if (!Array.isArray(movies)) {
//       return NextResponse.json(
//         { error: "Les données doivent être un tableau d'objets" },
//         { status: 400 }
//       );
//     }

//     const newPosts = await prisma.movie.createMany({
//       data: movies,
//     });

//     return NextResponse.json(
//       { message: `${newPosts.count} films ajoutés avec succès` },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Une erreur est survenue", details: (error as Error).message },
//       { status: 500 }
//     );

//   }
// }
