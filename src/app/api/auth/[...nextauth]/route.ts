// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import authOptions from "./authOptions"; // Utilisation de l'import par défaut

const handler = NextAuth(authOptions);

export function GET(req: Request) {
  return handler(req);
}

export function POST(req: Request) {
  return handler(req);
}


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcryptjs";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/app/libs/prismadb";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Email et mot de passe",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Mot de passe", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         const isValid = await compare(credentials.password, user.password);
//         if (!isValid) return null;

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
