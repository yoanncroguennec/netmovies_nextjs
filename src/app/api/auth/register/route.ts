import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import uid2 from "uid2"
import SHA256 from "crypto-js/sha256"
import encBase64 from "crypto-js/enc-base64"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, dateBirthday } = body;

    if (!firstName || !lastName || !email || !password || !dateBirthday) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const parsedDate = new Date(dateBirthday);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Date de naissance invalide." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    console.log("token", token);
    console.log("salt", salt);

    await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        dateBirthday: parsedDate,
        token: token,
        salt: salt,
        hash: hash,
      },
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur POST /api/register :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

// import prisma from "@/app/libs/prismadb";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   try {
//     const { firstName, email, password } = await req.json();

//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "Cet email est déjà utilisé." },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await prisma.user.create({
//       data: {
//         firstName,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json(
//       { message: "Utilisateur créé avec succès" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
//   }
// }
