"use client";

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

interface NextAuthSessionProvider_PROPS {
  children: ReactNode;
}

export default function NextAuthSessionProvider({
  children,
}: NextAuthSessionProvider_PROPS) {
  return <SessionProvider>{children}</SessionProvider>;
}
