"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Movie {
  id: string;
  name: string;
  img: string;
}

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
  const [clickedOnce, setClickedOnce] = useState<boolean>(false);

    const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (container && text) {
      const containerWidth = container.offsetWidth;
      const textWidth = text.scrollWidth;

      setShouldScroll(textWidth > containerWidth);
    }
  }, [movie.name])

  const handleClick = () => {
    router.push(`/pages/movies/movie/${movie.id}?`);
  };

//   function handleClick(e: MouseEvent<HTMLDivElement, MouseEvent>) {
//     e.preventDefault();

//     if (!clickedOnce) {
//       setClickedOnce(true);
//       // Réinitialisation si le 2e clic ne vient pas
//       setTimeout(() => setClickedOnce(false), 3000);
//     } else {
//       // Navigation manuelle si second clic
// window.location.href = `/pages/movies/movie/${movie.id}?id=123&name=John`;
//     }
//   }

  const { id } = movie;

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: "140px",
        width: "105px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes defilement {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      <Box style={{ position: "absolute", zIndex: 1 }}>
        <Image
          alt=''
          height={500}
          src={movie.img}
          style={{
            height: "140px",
            width: "105px",
          }}
          width={500}
        />
      </Box>
      <Box
        ref={containerRef}
        sx={{
          background: "rgba(0, 0, 0, 0.5)",
          height: "30px",
          width: "105px",
          overflow: "hidden",
          top: 0, // Keeps it at the top of its container
          position: "absolute", // Ensures the box is positioned absolutely within its relative parent
          display: "flex",
          justifyContent: "center", // Keeps text centered horizontally
          zIndex: 2,
        }}
      >
        <Typography
          ref={textRef}
          variant='body1'
          sx={{
            color: "#F00",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            display: "inline-block",
            width: "max-content",
            ...(shouldScroll
              ? {
                  position: "absolute",
                  animation: "defilement 10s linear infinite",
                  textAlign: "left",
                }
              : {
                  position: "relative",
                  textAlign: "center",
                }),
          }}
        >
          {movie.name}
        </Typography>
      </Box>
    </Box>
  );
}
