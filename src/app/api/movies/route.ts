import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000", "https://www.net-movie.fr/"];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "null", // Allow only listed origins
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

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
      const origin = req.headers.get("origin");

      const allMovies = await prisma.movie.findMany();

      const response = {
        allMovies,
      };

      return NextResponse.json(response, {
        status: 200,
        headers: getCorsHeaders(origin),
      });

      ////////////////////////////
      // http://localhost:3000/api/movies?type=allMoviesByGenre&genre=Action
    } else if (type === "allMoviesByGenre") {
        const origin = req.headers.get("origin");

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

      return NextResponse.json(response, {
        status: 200,
        headers: getCorsHeaders(origin),
      });

      ////////////////////////////
      // http://localhost:3000/api/movies?type=randomMovie
    } else if (type === "randomMovie") {
        const origin = req.headers.get("origin");

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
      return NextResponse.json(response, {
        status: 200,
        headers: getCorsHeaders(origin),
      });
      ////////////////////////////
      // http://localhost:3000/api/movies?type=newAllMovies
    } else if (type === "newAllMovies") {
      try {
          const origin = req.headers.get("origin");

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

        return NextResponse.json(response, {
          status: 200,
          headers: getCorsHeaders(origin),
        });
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

// export async function GET(req: Request) {
//   const origin = req.headers.get("origin");
//   const movies = await prisma.movie.findMany();
//   return NextResponse.json(movies, { headers: getCorsHeaders(origin) });
// }

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
