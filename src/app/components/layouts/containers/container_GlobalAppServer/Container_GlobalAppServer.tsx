// app/components/Container_GlobalAppServer.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/authOptions";
import Container_GlobalApp from "../container_GlobalApp/Container_GlobalApp";

export default async function Container_GlobalAppServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <Container_GlobalApp
    // session={session}
    >{children}</Container_GlobalApp>
  );
}
