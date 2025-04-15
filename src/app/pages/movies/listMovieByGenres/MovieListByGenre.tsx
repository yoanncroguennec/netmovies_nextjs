"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

type Movie = {
  id: string;
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

export default function MovieListByGenre() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const searchParams = useSearchParams();
  const movieCategory = searchParams.get("movieCategory");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://www.net-movie.fr/api/movies?type=allMoviesByGenre&genre=${movieCategory}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error(
            `Erreur lors du chargement des films (code ${res.status})`
          );
        }

        const data = await res.json();
        setMovies(data);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      }
    };

    if (movieCategory) {
      fetchMovies();
    }
  }, [movieCategory]);

  return (
    <div>
      <h1>Films du genre : {movieCategory}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies.length === 0 && !error && <p>Chargement en cours...</p>}
      <ul style={{ display: "grid", gap: "1rem" }}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <h2>{movie.name}</h2>
            <img src={movie.img} alt={movie.name} width='150' />
            <p>{movie.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
