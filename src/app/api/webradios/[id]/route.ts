import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await prisma.webRadio.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
