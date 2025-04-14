"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import Movie_ID_ForCellular from "./cellular/Movie_ID_ForCellular";
import Movie_ID_ForDesktop from "./desktop/Movie_ID_ForDesktop";
import { useEffect, useState } from "react";

type Movie = {
  name: string;
  realisators: string[];
  actors: string[];
  desc: string;
  trailer: string;
  country: string[];
  productionCompany: string;
  movieLink: string;
  img: string;
  year: string;
  genre: string[];
};

export default function Page() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const params = useParams() as { id: string }; // ✅ Ajout du typage

  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://www.net-movie.fr/api/movies/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(
            `Erreur lors du chargement du film (code ${res.status})`
          );
        }

        const data = await res.json();
        setMovie(data);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      }
    };

    fetchMovie();
  }, [id]);

    return matches ? (
      <Movie_ID_ForDesktop error={error} movie={movie} />
    ) : (
      <Movie_ID_ForCellular error={error} movie={movie} />
    );
}
