"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import AllMovies_Desktop_Page from "./allMovies/desktop/AllMovies_Desktop_Page";
import AllMovies_Cellular_Page from "./allMovies/cellular/AllMovies_Cellular_Page";
import React from "react";

export default function Page() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return matches ? <AllMovies_Desktop_Page /> : <AllMovies_Cellular_Page />;
}
