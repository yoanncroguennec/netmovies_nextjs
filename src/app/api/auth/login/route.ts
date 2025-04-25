// 1) Ton token actuel suffit si tu fais du simple login/session à la main.
// 2) Un JWT est plus robuste, surtout pour :
//     - Auth avec expiration,
//     - API sécurisées (header Authorization: Bearer ...),
//     - Ne pas dépendre d'une requête à la base à chaque appel


import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcryptjs";
import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    let isValid = false;

    // 🔐 Vérification via bcrypt
    if (user.password) {
      isValid = await bcrypt.compare(password.trim(), user.password);
    }

    // 🔐 Vérification via SHA256 + salt (compatibilité ancienne version)
    if (!isValid && user.salt && user.hash) {
      const newHash = SHA256(password + user.salt).toString(encBase64);
      isValid = newHash === user.hash;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Connexion réussie.",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          dateBirthday: user.dateBirthday,
          token: user.token,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur POST /api/login :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
