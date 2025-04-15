import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions"; 
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import { Box } from "@mui/material";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Container_GlobalApp>
      <Box sx={{ margin: "150px" }}>
        <h1>Bienvenue, {session.user?.name || session.user?.email} !</h1>
        <p>Voici ton espace personnel.</p>
        <LogoutButton />
      </Box>
    </Container_GlobalApp>
  );
}
