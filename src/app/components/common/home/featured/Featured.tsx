"use client";

import { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Featured_Desktop from "./desktop/Featured_Dektop";
import axios from "axios";

interface Movie {
  _id?: string;
  name: string;
  desc: string;
  img: string;
  trailer: string;
  movieLink: string;
}

export default function Featured() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [randomMovie, setRandomMovie] = useState<Movie>({
    name: "",
    desc: "",
    img: "",
    trailer: "",
    movieLink: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const url = `https://www.net-movie.fr/api/movies?type=randomMovie`;
        const res = await axios.get(url);
        if (res.data && typeof res.data.randomMovie === "object") {
          setRandomMovie(res.data.randomMovie);
        } else {
          console.error("No random movie data found");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);


  return <Featured_Desktop randomMovie={randomMovie} loading={loading} />;
}
