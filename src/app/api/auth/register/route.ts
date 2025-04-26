// // 1) Ton token actuel suffit si tu fais du simple login/session à la main.
// // 2) Un JWT est plus robuste, surtout pour :
// //     - Auth avec expiration,
// //     - API sécurisées (header Authorization: Bearer ...),
// //     - Ne pas dépendre d'une requête à la base à chaque appel

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import SHA256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";
import ip from "ip";
import { v4 as uuidv4 } from "uuid";

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

    const userIp = ip.address();
    console.log("Adresse IP de l'utilisateur :", userIp);

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
    const token = crypto.randomBytes(64).toString("hex");
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = SHA256(password + salt).toString(encBase64);
    const deviceId = uuidv4(); // UUID généré pour l'appareil

    await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        dateBirthday: parsedDate,
        ipAddressUser: userIp,
        token,
        salt,
        hash,
        deviceId,
        role: "user", // rôle explicitement mis à "user"
      },
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur POST /api/register :", error);
    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}

// import prisma from "@/app/libs/prismadb";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import SHA256 from "crypto-js/sha256";
// import encBase64 from "crypto-js/enc-base64";
// import ip from "ip"

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, password, dateBirthday } = body;

//     if (!firstName || !lastName || !email || !password || !dateBirthday) {
//       return NextResponse.json(
//         { error: "Tous les champs sont requis." },
//         { status: 400 }
//       );
//     }

//       const userIp = ip.address();
//       console.log(userIp);

//     const parsedDate = new Date(dateBirthday);
//     if (isNaN(parsedDate.getTime())) {
//       return NextResponse.json(
//         { error: "Date de naissance invalide." },
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { email: email.trim().toLowerCase() },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { error: "Cet email est déjà utilisé." },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password.trim(), 10);

//     const token = crypto.randomBytes(64).toString("hex");
//     const salt = crypto.randomBytes(16).toString("hex");
//     const hash = SHA256(password + salt).toString(encBase64);

//     await prisma.user.create({
//       data: {
//         firstName: firstName.trim(),
//         lastName: lastName.trim(),
//         email: email.trim().toLowerCase(),
//         password: hashedPassword,
//         dateBirthday: parsedDate,
//                     ipAddressUser: userIp,
//         token,
//         salt,
//         hash,
//       },
//     });

//     return NextResponse.json(
//       { message: "Utilisateur créé avec succès" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Erreur POST /api/register :", error);
//     return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
//   }
// }
