import { Box } from "@mui/material";
import { ReactNode } from "react";
//
import Navbar from "@/app/components/layouts/customs/navbar/Navbar";

interface Container_GlobalApp_Props {
  children: ReactNode;
}

export default function Container_GlobalApp({
  children,
  // session,
}: Container_GlobalApp_Props) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}
