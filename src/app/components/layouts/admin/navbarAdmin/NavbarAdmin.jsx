import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NavbarAdmin() {
  return (
    <Box sx={{ background: "#000" }}>
      <Link href='/pages/home'>
        <Typography variant='h6'>Accueil</Typography>
      </Link>
    </Box>
  );
}
