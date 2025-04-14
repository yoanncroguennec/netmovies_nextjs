"use client";

import Link from "next/link";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

type Movie_ID_ForCellular_Props = {
  error?: string;
  movie?: {
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
};

export default function Movie_ID_ForCellular({
  error,
  movie,
}: Movie_ID_ForCellular_Props) {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Chargement du film...</div>;
  }

  const {
    name,
    realisators,
    actors,
    desc,
    trailer,
    country,
    productionCompany,
    movieLink,
    img,
    year,
    genre,
  } = movie;

  const maxLength = 100;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const displayText = () => {
    if (!desc) return "Non disponible";
    if (desc.length <= maxLength) return desc;
    return expanded ? desc : desc.slice(0, maxLength) + "...";
  };

  return (
    <div style={{ backgroundImage: `url("${img}")`, backgroundSize: "cover" }}>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          color: "#FFF",
          height: "100vh",
          padding: "90px 20px 20px 20px",
          width: "100vw",
        }}
      >
        <Typography
          sx={{ color: "#F00", fontWeight: "bold", textAlign: "center" }}
          variant='h5'
        >
          {name || "Non disponible"}
        </Typography>
        <Typography variant='body1'>
          <strong>Réalisateurs :</strong>{" "}
          {realisators.filter(Boolean).join(", ") || "Non disponible"}
        </Typography>
        <Typography variant='body1'>
          <strong>Acteurs :</strong>{" "}
          {actors.filter(Boolean).join(", ") || "Non disponible"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {country.map((item) => (
            <Typography
              sx={{
                border: "2px solid #F00",
                borderRadius: "25px",
                color: "#F00",
                fontWeight: "bold",
                margin: "5px",
                padding: "10px",
                textAlign: "center",
                width: "150px",
              }}
              variant='body1'
            >
              {item}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {genre.map((item) => (
            <Typography
              sx={{
                border: "2px solid #F00",
                borderRadius: "25px",
                color: "#F00",
                fontWeight: "bold",
                margin: "5px",
                padding: "10px",
                textAlign: "center",
                width: "100px",
              }}
              variant='body1'
            >
              {item}
            </Typography>
          ))}
        </Box>

        <Typography variant='body1'>{displayText()}</Typography>
        {desc && desc.length > maxLength && (
          <Box
            onClick={toggleExpand}
            style={{
              border: "2px solid #F00",
              borderRadius: "25px",
              margin: "5px",
              padding: "10px",
              width: "150px",
            }}
          >
            <Typography
              sx={{ color: "#F00", fontWeight: "bold", textAlign: "center" }}
              variant='body1'
            >
              {expanded ? "Voir moins" : "Voir plus"}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
            }}
            href=''
          >
            <Typography
              style={{
                border: "2px solid #F00",
                borderRadius: "25px",
                color: "#FFF",
                margin: "5px",
                padding: "10px",
                textAlign: "center",
                textDecoration: "none",
                width: "150px",
              }}
              variant='body1'
            >
              Bande-annonce
            </Typography>
          </Link>
          <Link
            style={{
              textDecoration: "none",
            }}
            href={{
              pathname: `/pages/player/${id}`,
              // query: { id: "123", name: "John" },
            }}
          >
            <Typography
              style={{
                border: "2px solid #F00",
                borderRadius: "25px",
                color: "#FFF",
                margin: "5px",
                padding: "10px",
                textAlign: "center",
                textDecoration: "none",
                width: "150px",
              }}
              variant='body1'
            >
              Voir Film
            </Typography>
          </Link>
        </Box>
      </div>
    </div>
  );
}
