import { Box } from "@mui/material";
import React from "react";
import { Navbar } from "../..";

export default function Container_GlobalApp({ children }) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}
