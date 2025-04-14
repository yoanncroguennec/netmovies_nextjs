"use client"

import { authOptions } from "@/app/libs/authOptions";
import { getServerSession } from "next-auth";

export default async function InfosUser() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return <div>Non connecté</div>;
//   }

  return (
    <div>
      {/* Connecté en tant que : <strong>{session.user?.email}</strong> */}
    </div>
  );
}
