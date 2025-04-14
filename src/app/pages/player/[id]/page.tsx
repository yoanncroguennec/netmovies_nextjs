"use client";

import { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "next/navigation";
import Iframe from "react-iframe";

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
export default function Player({}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  //
  const params = useParams() as { id: string };
  const { id } = params;

  //
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

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

  if (!movie) {
    if (error) return <div>{error}</div>;
    return <div>Chargement...</div>;
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Iframe
        url={movie.movieLink}
        width='100%'
        height='100%'
        display='block'
        position='relative'
        styles={{
          margin: "0 auto",
          transform: matches ? 0 : "rotate(90deg)",
          transformOrigin: matches ? "" : "center center",
        }}
      />
    </Box>
  );
}
