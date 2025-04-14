"use client";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import Featured_Dektop from "./desktop/Featured_Dektop";
import Featured_Cellular from "./cellular/Featured_Cellular";

export default function Featured() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return matches ? <Featured_Dektop /> : <Featured_Cellular />;
}
