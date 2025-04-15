// app/components/Container_GlobalApp.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Session } from "next-auth";
//
import Navbar from "@/app/components/layouts/customs/navbar/Navbar";

interface Container_GlobalApp_Props {
  children: ReactNode;
  session: Session | null;
}

export default function Container_GlobalApp({
  children,
  session,
}: Container_GlobalApp_Props) {
  return (
    <Box>
      <Navbar session={session} />
      {children}
    </Box>
  );
}
