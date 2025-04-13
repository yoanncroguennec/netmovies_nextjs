"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "react-scroll-to-top";
// ICONS
import { GiHamburgerMenu } from "react-icons/gi";
import { MdExpandMore } from "react-icons/md";

export default function AllMovies_Cellular_Page() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleFilters, setToggleFilters] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  //
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  //
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // Nouvel état pour l'année sélectionnée
  const [sortOption, setSortOption] = useState("nameAsc"); // Nouvel état pour l'option de tri
  const [selectedGenres, setSelectedGenres] = useState([]); // Nouvel état pour les genres sélectionnés
  const [genres, setGenres] = useState([]); // Ajout de l'état genres

  const formControl = {
    backgroundColor: "#000", // White background
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#F00", // White border
      },
      "&:hover fieldset": {
        borderColor: "#F00", // White border on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#F00", // White border when focused
      },
      "& input": {
        color: "red", // White text
      },
    },
    "& .MuiInputLabel-root": {
      color: "#F00", // Red when selectedYear exists
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "red",
    },
    color: "white",
    margin: "0 10px",
  };

  useEffect(() => {
    async function getAllMovies() {
      setLoading(true);
      try {
        const url = `https://www.net-movie.fr/api/movies?type=allMovies`;
        const { data } = await axios.get(url);
        setAllMovies(data.allMovies); // Ajoute cette ligne pour stocker les films originaux
        setItems(data.allMovies);
        setLoading(false);

        // Extraire et trier les acteurs
        const uniqueActors = [
          ...new Set(data.allMovies.flatMap((movie) => movie.actors)),
        ].sort((a, b) => a.localeCompare(b));
        setActors(uniqueActors);

        // Extraire et trier les country
        const uniqueCountry = [
          ...new Set(data.allMovies.flatMap((movie) => movie.country)),
        ].sort((a, b) => a.localeCompare(b));
        setCountry(uniqueCountry);

        // Extraire et trier les genres
        const uniqueGenres = [
          ...new Set(data.allMovies.flatMap((movie) => movie.genre)),
        ].sort();
        setGenres(uniqueGenres); // Mise à jour de l'état genres
      } catch (err) {
        setError(
          "Impossible de récupérer les films. Veuillez réessayer plus tard."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getAllMovies();
  }, []);

  // Filtrage et tri combinés
  useEffect(() => {
    let filteredMovies = allMovies;

    // Filtrage par nom
    if (searchTerm) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par année
    if (selectedYear) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.year === selectedYear
      );
    }

    // Filtrage par acteurs
    if (selectedActors.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        selectedActors.some((actor) => movie.actors.includes(actor))
      );
    }

    // Filtrage par country
    if (selectedCountry.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        selectedCountry.some((country) => movie.country.includes(country))
      );
    }

    // Filtrage par genres
    if (selectedGenres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        selectedGenres.some((genre) => movie.genre.includes(genre))
      );
    }

    // Tri des films en fonction de l'option sélectionnée
    if (sortOption === "nameAsc") {
      filteredMovies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "nameDesc") {
      filteredMovies.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "yearAsc") {
      filteredMovies.sort((a, b) => a.year - b.year);
    } else if (sortOption === "yearDesc") {
      filteredMovies.sort((a, b) => b.year - a.year);
    }

    setItems(filteredMovies);
  }, [
    searchTerm,
    selectedYear,
    selectedActors,
    selectedCountry,
    selectedGenres,
    sortOption,
    allMovies,
  ]);

  // Gérer la sélection du critère de tri
  function handleSortChange(event) {
    setSortOption(event.target.value);
  }

  return (
    <Container_GlobalApp>
      <style>{`
        @keyframes defilement {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      <Box
        sx={{
          alignItems: "center",
          background: "#333",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          paddingTop: "80px",
          width: "100vw",
        }}
      >
        {toggleFilters ? (
          <Box
            sx={{
              background: "#000",
              border: "4px solid #000",
              borderRadius: "99% 1% 100% 0% / 55% 75% 25% 45% ",
              cursor: "pointer",
              padding: "10px",
              position: "fixed",
              right: "0",
              top: "80px",
              zIndex: 999,
            }}
          >
            {/* Champ de recherche */}
            <TextField
              label='Rechercher un film'
              sx={formControl}
              variant='outlined'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Sélecteur du critère de tri */}
            <FormControl sx={formControl}>
              <InputLabel sx={{ color: "#F00" }}>Tri</InputLabel>
              <Select
                label='Tri'
                IconComponent={(props) => (
                  <IconButton {...props} sx={{ background: "" }}>
                    <MdExpandMore
                      size={40}
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "-5px",
                      }}
                    />
                  </IconButton>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      color: "#000",
                      maxHeight: 300, // Set the max height of the dropdown
                    },
                  },
                }}
                onChange={handleSortChange}
                sx={{
                  color: "#F00", // Change text color in the select dropdown
                  "& .MuiMenuItem-root": {
                    color: "purple", // Change text color in the menu items
                  },
                }}
                value={sortOption}
              >
                <MenuItem value='nameAsc'>Nom (A-Z)</MenuItem>
                <MenuItem value='nameDesc'>Nom (Z-A)</MenuItem>
                <MenuItem value='yearAsc'>Année (Croissant)</MenuItem>
                <MenuItem value='yearDesc'>Année (Décroissant)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box
            onClick={() => setToggleFilters(true)}
            sx={{
              background: "#FFF",
              border: "4px solid #000",
              borderRadius: "99% 1% 100% 0% / 55% 75% 25% 45% ",
              cursor: "pointer",
              padding: "10px",
              position: "fixed",
              right: "0",
              top: "80px",
              zIndex: 999,
            }}
          >
            <GiHamburgerMenu color='#F00' size={35} />
          </Box>
        )}

        {items.map((movie, index) => (
          <MovieCard key={movie._id || index} movie={movie} />
        ))}
        <ScrollToTop smooth />
      </Box>
    </Container_GlobalApp>
  );
}

function MovieCard({ movie }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (container && text) {
      const containerWidth = container.offsetWidth;
      const textWidth = text.scrollWidth;

      setShouldScroll(textWidth > containerWidth);
    }
  }, [movie.name]);
  const { id } = movie;

  return (
    <Link
      key={id}
      href={{
        pathname: `/pages/movies/movie/${id}`,
        query: { id: "123", name: "John" },
      }}
    >
      <Box
        sx={{
          height: "130px",
          width: "130px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <Box style={{ position: "absolute", zIndex: 1 }}>
          <Image
            alt=''
            height={500}
            src={movie.img}
            style={{
              height: "110px",
              width: "110px",
            }}
            width={500}
          />
        </Box>
        <Box
          ref={containerRef}
          sx={{
            background: "rgba(0, 0, 0, 0.5)",
            height: "30px",
            width: "100%",
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
              position: "absolute",
              animation: shouldScroll
                ? "defilement 10s linear infinite"
                : "none",
              textAlign: shouldScroll ? "left" : "center", // Center text if no scroll
            }}
          >
            {movie.name}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
