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

export default function page() {
 const theme = useTheme();
 const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const searchParams = useSearchParams();
 const movieCategory = searchParams.get("movieCategory");

 //
 const [movie, setMovie] = useState<Movie | undefined>(undefined);
 const [error, setError] = useState<string | undefined>(undefined);

 useEffect(() => {
   const fetchMovie = async () => {
     try {
       const res = await fetch(
         `https://www.net-movie.fr/api/movies?type=allMoviesByGenre&genre=${movieCategory}`,
         {
           cache: "no-store",
         }
       );

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
 }, [movieCategory]);



 return <div>page // {movieCategory} §//</div>;
}
