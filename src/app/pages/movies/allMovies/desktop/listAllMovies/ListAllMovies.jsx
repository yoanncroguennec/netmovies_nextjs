"use client";

import { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
// ICONS
import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineFavorite,
} from "react-icons/md";
import { FaUniversalAccess } from "react-icons/fa";

export default function ListAllMovies({ movie, id }) {
  const [flippedIndex, setFlippedIndex] = useState(null);

  //
  const [movieViewed, setMovieViewed] = useState(false);
  const [favouriteMovie, setFavouriteMovie] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;

  function toggleFavorite(_id) {
    setItems((prevMovies) =>
      prevMovies.map((movie) =>
        movie._id === _id ? { ...movie, favorite: !movie.favorite } : movie
      )
    );
  }

  return (
    <Box
      key={movie.id}
      style={{
        width: "800px",
        height: "400px",
        marginBottom: "45px",
        perspective: "1000px",
        padding: "15px",
        cursor: "pointer",
      }}
      // onMouseEnter={() => setFlippedIndex(index)}
      onMouseLeave={() => {
        setFlippedIndex(null), setIsExpanded(false);
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s",
          transform: flippedIndex === id ? "rotateY(180deg)" : "",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            background: "#f1f1f1",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
            <Image
              alt=''
              height={1000}
              src={movie.img}
              style={{
                border: "3px solid #F00",
                borderRadius: "50%",
                height: "150px",
                width: "150px",
              }}
              width={1000}
            />
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  position: "absolute",
                  right: "50px",
                }}
              >
                <Box>
                  {movieViewed ? (
                    <Tooltip title=''>
                      <LiaEye
                        color='#000'
                        onClick={() => setMovieViewed(!movieViewed)}
                        size={35}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Pas vu'>
                      <LiaEyeSlash
                        color='#000'
                        onClick={() => setMovieViewed(!movieViewed)}
                        size={35}
                      />
                    </Tooltip>
                  )}
                  {favouriteMovie ? (
                    <Tooltip title=''>
                      <MdFavorite
                        color='#F00'
                        onClick={() => toggleFavorite(movie._id)}
                        size={35}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title=''>
                      <MdFavoriteBorder
                        color='#F00'
                        onClick={() => toggleFavorite(movie._id)}
                        size={35}
                      />
                    </Tooltip>
                  )}
                </Box>
              </Box>
              <Typography
                sx={{ color: "#F00", fontWeight: "bold" }}
                variant='h5'
              >
                {movie.name}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                <Typography sx={{ fontWeight: "bold" }} variant='h6'>
                  Réalisateurs :&nbsp;
                </Typography>
                {movie.realisators && Array.isArray(movie.realisators) ? (
                  <Typography variant='h6'>
                    {movie.realisators.join(", ")}
                  </Typography>
                ) : null}
              </Box>

              <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                <Typography sx={{ fontWeight: "bold" }} variant='h6'>
                  Acteurs :&nbsp;
                </Typography>
                {movie.actors && Array.isArray(movie.actors) ? (
                  <Typography variant='h6'>
                    {movie.actors.join(", ")}
                  </Typography>
                ) : null}
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  width: "100%",
                }}
              >
                {movie.genre.map((item) => (
                  <Box
                    sx={{
                      border: "2px solid #000",
                      borderRadius: 15,
                      margin: "5px",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }} variant='h6'>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  width: "100%",
                }}
              >
                {movie.country.map((item) => (
                  <Box
                    sx={{
                      border: "2px solid #000",
                      borderRadius: 15,
                      margin: "5px",
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }} variant='h6'>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                onMouseEnter={() => setFlippedIndex(id)}
                sx={{
                  border: "3px solid #F00",
                  borderRadius: "20px",
                  bottom: "20px",
                  position: "absolute",
                  right: "40px",
                }}
              >
                <Typography
                  sx={{
                    color: "#F00",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    textAlign: "center",
                  }}
                  variant='h6'
                >
                  Plus d'infos
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            flexDirection: "column",
            padding: "10px 25px",
            background: "#f1f1f1",
            transform: "rotateY(180deg)",
          }}
        >
          <Typography sx={{}} variant='h6'>
            {isExpanded
              ? movie.desc
              : movie.desc.slice(0, maxLength) +
                (movie.desc.length > maxLength ? "..." : "")}
          </Typography>
          {movie.desc.length > maxLength && (
            <Box
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{
                border: "3px solid #F00",
                borderRadius: "25px",
              }}
            >
              <Typography
                sx={{
                  color: "#F00",
                  fontWeight: "bold",
                  padding: "1px 10px",
                  textAlign: "center",
                }}
              >
                {isExpanded ? "Voir Moins" : "Voir Plus"}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              bottom: "20px",
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-evenly",
              position: "absolute",
              width: "100%",
            }}
          >
            <Box
              sx={{
                border: "3px solid #F00",
                borderRadius: "25px",
              }}
            >
              <Typography
                sx={{
                  color: "#F00",
                  fontWeight: "bold",
                  padding: "1px 10px",
                  textAlign: "center",
                }}
                variant='h6'
              >
                Voir Bande-annonce
              </Typography>
            </Box>
            <Box
              sx={{
                border: "3px solid #F00",
                borderRadius: "25px",
              }}
            >
              <Typography
                sx={{
                  color: "#F00",
                  fontWeight: "bold",
                  padding: "1px 10px",
                  textAlign: "center",
                }}
                variant='h6'
              >
                Voir Film
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
