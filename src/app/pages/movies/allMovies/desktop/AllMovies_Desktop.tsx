"use client"; // Indique que ce composant doit être exécuté côté client et permet d'effectuer des opérations comme la gestion de l'état (useState), la récupération de données (useEffect), etc...

import { Dispatch, SetStateAction, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
//
import Filters from "./filters/Filters";
import ListAllMovies from "./listAllMovies/ListAllMovies";

interface Movie {
  id: string;
  name: string;
  desc: string;
  year: number;
  realisators: string[];
  actors: string[];
  country: string[];
  genre: string[];
  img: string;
}

interface AllMovies_Desktop_Page_Props {
  allMovies: Movie[];
  items: Movie[];
  setItems: Dispatch<SetStateAction<Movie[]>>;
  loading: boolean;
  error: string;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  actors: string[];
  selectedActors: string[];
  setSelectedActors: Dispatch<SetStateAction<string[]>>;
  country: string[];
  selectedCountry: string[];
  setSelectedCountry: Dispatch<SetStateAction<string[]>>;
  selectedYear?: number;
  setSelectedYear: Dispatch<SetStateAction<number | undefined>>;
  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: Dispatch<SetStateAction<string[]>>;
  hiddenDropdownGenres: boolean;
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
}

export default function AllMovies_Desktop_Page({
  allMovies,
  items,
  setItems,
  loading,
  error,
  //
  searchTerm,
  setSearchTerm,
  //
  actors,
  selectedActors,
  setSelectedActors,
  //
  country,
  selectedCountry,
  setSelectedCountry,
  //
  selectedYear,
  setSelectedYear,
  //
  genres,
  selectedGenres,
  setSelectedGenres,
  hiddenDropdownGenres,
  //
  sortOption,
  setSortOption,
}: AllMovies_Desktop_Page_Props) {
  // Filtrage et tri combinés
  useEffect(() => {
    let filteredMovies = [...allMovies];

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

  //
  function resetFilters() {
    setSearchTerm("");
    setSelectedYear(undefined);
    setSelectedActors([]);
    setSelectedCountry([]);
    setSelectedGenres([]);
    setSortOption("nameAsc");
  }

  return (
    <Container_GlobalApp>
      <Box sx={{ marginTop: "250px" }}>
        {loading ? (
          <h1>Chargement....</h1>
        ) : (
          <>
            <Typography
              sx={{ fontWeight: "bold", textAlign: "center" }}
              variant='h4'
            >
              {items.length} films
            </Typography>
            {error && (
              <Typography sx={{ color: "#F00" }} variant='h6'>
                {error}
              </Typography>
            )}

            <Filters
              allMovies={allMovies}
              //
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              //
              actors={actors}
              selectedActors={selectedActors}
              setSelectedActors={setSelectedActors}
              //
              country={country}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              //
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              //
              genres={genres}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              hiddenDropdownGenres={hiddenDropdownGenres}
              //
              sortOption={sortOption}
              setSortOption={setSortOption}
              //
              resetFilters={resetFilters}
            />
            {items.length === 0 && (
              <Typography
                variant='h6'
                sx={{ textAlign: "center", marginTop: 4 }}
              >
                Aucun film ne correspond à vos critères.
              </Typography>
            )}

            {/* Liste des films filtrés */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                placeItems: "center",
              }}
            >
              {items.map((movie) => (
                <ListAllMovies key={movie.id} movie={movie} />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Container_GlobalApp>
  );
}
