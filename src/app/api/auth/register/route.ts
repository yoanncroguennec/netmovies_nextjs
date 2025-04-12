import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      postalAddress,
      postCode,
      city,
      password,
    } = await req.json();

    if (!email || !password) {
      return new NextResponse("Données manquantes", { status: 500 });
    }

    //
    const userAlreadyExist = await prisma.user.findFirst({
      where: { email },
    });
    if (userAlreadyExist?.id) {
      return new NextResponse("Utilisateur déjà existant", { status: 400 });
    }

    //
    const userPhoneNumberAlreadyExist = await prisma.user.findFirst({
      where: { phoneNumber },
    });
    if (userPhoneNumberAlreadyExist?.id) {
      return new NextResponse("User Phone Number already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        postalAddress: postalAddress,
        postCode: postCode,
        city: city,
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    console.log("REGISTER ERROR :" + error);
    return new NextResponse(error, { status: 500 });
  }
}
