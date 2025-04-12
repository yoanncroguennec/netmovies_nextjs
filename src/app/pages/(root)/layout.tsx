"use client";

import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
//import { authOptions } from "../api/auth/[...nextauth]";
import { redirect } from "next/navigation";

interface ProtectedRootLayout_PROPS {
  children: ReactNode;
}

export default async function ProtectedRootLayout({children} : ProtectedRootLayout_PROPS) {

    //const session = await getServerSession(authOptions)

    // if (!session ?.user?.email) {
    //     redirect("/pages/auth/login")
    // }
  return <main>{children}</main>
}
