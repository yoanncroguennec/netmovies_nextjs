//http://localhost:3000/api/movies/warning/reset

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ⛔⛔❌❌❌❌ ATTENTION❗ DANGER❗ SUPPRESSION DE TOUTE LA BASE DE DONNEES POUR INSERER UN NOUVEU FICHIER JSON  ❌❌❌❌❌⛔⛔
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// DERNIER DONNEES - FICHIER DATA JSON MOVIES
import dataMovies from "../../../utils/constants/data/dataMovies.json" assert { type: "json" };

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log(
      "\n⚠️ ATTENTION ! Vous allez supprimer toutes les données de la BDD"
    );
    console.log(
      "❓ Voulez-vous vraiment continuer ? (Tapez 'OUI' pour confirmer)"
    );

    // Attendre la saisie de l'utilisateur dans la console
    const userInput = await new Promise((resolve) => {
      process.stdin.once("data", (data) => resolve(data.toString().trim()));
    });

    if (userInput !== "OUI") {
      console.log("🚫 Annulation : les données n'ont pas été supprimées.");
      return NextResponse.json(
        { message: "Suppression annulée" },
        { status: 400 }
      );
    }

    console.log("🔴 Suppression de toutes les données...");

    // 1. Supprimer toutes les données existantes
    await prisma.movie.deleteMany();

    console.log("✅ Toutes les données ont été supprimées.");

    /////////
    if (!Array.isArray(dataMovies)) {
      return NextResponse.json(
        { error: "Les données doivent être un tableau d'objets" },
        { status: 400 }
      );
    }

    const newPosts = await prisma.movie.createMany({
      data: dataMovies,
    });

    return NextResponse.json(
      { message: `${newPosts.count} films ajoutés avec succès` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l’insertion:", error);
  }
}
