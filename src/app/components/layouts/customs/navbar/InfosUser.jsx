import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/authOptions";
import { Typography } from "@mui/material";

export default async function InfosUser() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Typography sx={{ color: "#FFF", fontWeight: "bold" }} variant='h6'>
        LOPPPP /// {session?.user?.email} ----
      </Typography>
    </div>
  );
}
