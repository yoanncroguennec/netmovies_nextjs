"use client";

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

interface NextAuthSessionProvider_Props {
  children: ReactNode;
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProvider_Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
