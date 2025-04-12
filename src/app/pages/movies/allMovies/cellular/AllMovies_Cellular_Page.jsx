"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Image from "next/image";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";

export default function AllMovies_Cellular_Page() {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    async function getAllMovies() {
      setLoading(true);
      try {
        const url = `https://www.net-movie.fr/api/movies?type=allMovies`;
        const { data } = await axios.get(url);
        setAllMovies(data.allMovies);
        setItems(data.allMovies);
        setLoading(false);
      } catch (err) {
        setError(
          "Impossible de récupérer les films. Veuillez réessayer plus tard."
        );
        console.error(err);
      }
    }

    getAllMovies();
  }, []);

  return (
    <Container_GlobalApp>
      {items.map((movie, index) => {
        return (
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            }}
          >
            <Image
              alt=''
              height={1000}
              src={movie.img}
              style={{
                border: "3px solid #000",
                height: "120px",
                width: "120px",
              }}
              width={1000}
            />
          </Box>
        );
      })}
    </Container_GlobalApp>
  );
}
