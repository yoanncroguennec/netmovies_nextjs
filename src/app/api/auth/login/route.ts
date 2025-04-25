import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newHash = SHA256(password + existingUser.salt).toString(encBase64);

    if (newHash !== existingUser.hash) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        dateBirthday: existingUser.dateBirthday,
        token: existingUser.token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur POST /api/login :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
