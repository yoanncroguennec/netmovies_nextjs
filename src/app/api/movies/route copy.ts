// http://localhost:3000/api/movies
import { NextResponse } from "next/server"; // API NextResponsepermet de renvoyer une réponse JSON dans une API route Next.js.
import prisma from "@/app/libs/prismadb";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   console.log("API appelée !");
//   return new Response(JSON.stringify({ message: "Ça fonctionne !" }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }

export async function GET(req: Request) {
  // Set CORS headers
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*", // Change "*" to your frontend domain for security
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  try {
    // req.url contient l'URL de la requête, Exemple : http://localhost:3000/api/movies?type=allMovies
    // new URL(req.url).searchParamspermet d'extraire les paramètres de requête (type=allMovies).
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // searchParams.get("type")récupérer la valeur du paramètre type.

    ////////////////////////////
    // http://localhost:3000/api/movies?type=allMovies
    if (type === "allMovies") {
      const allMovies = await prisma.movie.findMany();

      const response = {
        allMovies,
      };

      return NextResponse.json(response, { status: 200, headers });

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
      const allMoviesbyGenre = await prisma.movie.findMany({
        where: {
          genre: {
            has: genre, // Vérifie si le tableau "genre" contient la valeur
          },
        },
      });

      const response = { allMoviesbyGenre };

      return NextResponse.json(response, { status: 200, headers });

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

      const response = {
        randomMovie,
      };

      // NextResponse.json(randomMovie, { status: 200 }) retourne le film sous format JSON avec un code 200 OK .
      return NextResponse.json(response, { status: 200, headers });
      ////////////////////////////
      // http://localhost:3000/api/movies?type=newAllMovies
    } else if (type === "newAllMovies") {
      try {
        const limit = 10;
        // Fetch the latest 10 movies sorted by ID in descending order
        const movies = await prisma.movie.findMany({
          orderBy: {
            id: "desc",
          },
          take: limit,
        });

        // Count the total number of movies in the database
        const total = await prisma.movie.count();

        const response = {
          total,
          movies,
        };

        return NextResponse.json(response, { status: 200, headers });
      } catch (error) {
        return NextResponse.json({ message: "GET ERROR" }, { status: 500 });
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
      imgCover,
      imgPoster,
      genre,
      rating,
      year,
    } = await req.json();

    // Create a new movie entry in the database
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
        imgCover,
        imgPoster,
        genre,
        rating,
        year,
      },
    });

    // Create response with CORS headers manually
    return new NextResponse(JSON.stringify(newPost), {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*", // Change this in production
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating movie:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to create movie" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Handle preflight CORS requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
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
