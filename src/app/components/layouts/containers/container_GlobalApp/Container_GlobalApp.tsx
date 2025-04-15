// app/components/Container_GlobalApp.tsx
"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Session } from "next-auth";
//
import Navbar from "@/app/components/layouts/customs/navbar/Navbar"

interface Container_GlobalApp_Props {
  children: ReactNode;
  // session: Session | null;
}

export default function Container_GlobalApp({
  children,
  // session,
}: Container_GlobalApp_Props) {
  return (
    <Box>
      <Navbar />
      {/* Exemple d'utilisation de la session */}
      {/* {session?.user?.email && (
        <div>Connecté en tant que : {session.user.email}</div>
      )} */}
      {children}
    </Box>
  );
}
