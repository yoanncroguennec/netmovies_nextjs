import { Box } from "@mui/material";
import Navbar from "../../customs/navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/authOptions";


export default async function Container_GlobalApp({ children }) {
    const session = await getServerSession(authOptions);

  return (
    <Box>
      LOPPPP /// {session?.user?.email} ---- LOPPPP /// {session?.user?.email}{" "}
      ----
      <Navbar />
      {children}
    </Box>
  );
}
