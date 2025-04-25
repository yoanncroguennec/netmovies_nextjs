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
    // req.url contient l'URL de la requête, Exemple : http://localhost:3000/api/users?type=allUsers
    // new URL(req.url).searchParamspermet d'extraire les paramètres de requête (type=allUsers).
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // searchParams.get("type")récupérer la valeur du paramètre type.

    ////////////////////////////
    // http://localhost:3000/api/users?type=allUsers
    if (type === "allUsers") {
      const origin = req.headers.get("origin");

      const allUsers = await prisma.user.findMany();

      const response = {
        allUsers,
      };

      return NextResponse.json(response, {
        status: 200,
        headers: getCorsHeaders(origin),
      });

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

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");

  return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
}
