// app/api/auth/[...nextauth]/authOptions.ts

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Utilisation de la stratégie JWT
  },
  providers: [
    CredentialsProvider({
      name: "Email et mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirection vers la page de connexion
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // On ajoute l'ID dans le token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string; // On ajoute l'ID dans la session
      }
      return session;
    },
  },
};
