"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Container_1GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import { display, height, width } from "@mui/system";
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
      <Box
        style={{
          alignItems: "center",
          background: "#333",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          width: "100vw",
        }}
      >
        {items.map((movie, index) => {
          return (
            <Box
              key={movie._id || index}
              sx={{
                backgroundImage: `url(${movie.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "4px solid #000",
                overflow: "hidden",
                height: "130px",
                whiteSpace: "nowrap",
                width: "130px",
              }}
            >
              <Box
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  height: "50px",
                  width: "100%",
                }}
              >
                <Typography
                  variant='body1'
                  sx={{
                    display: "inline-block",
                    animation: "defilement 10s linear infinite",
                  }}
                >
                  Voici un texte qui défile en continu de droite à gauche.
                </Typography>
              </Box>
              {/* Définition de l'animation */}
              <style>
                {`
          @keyframes defilement {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
              </style>
            </Box>
          );
        })}
      </Box>
    </Container_GlobalApp>
  );
}
