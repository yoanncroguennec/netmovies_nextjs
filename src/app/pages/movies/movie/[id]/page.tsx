"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import Movie_ID_ForCellular from "./cellular/Movie_ID_ForCellular";
import Movie_ID_ForDesktop from "./desktop/Movie_ID_ForDesktop";

export default function Page() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const params = useParams();

  return matches ? (
    <Movie_ID_ForDesktop params={params} />
  ) : (
    <Movie_ID_ForCellular params={params} />
  );
}
