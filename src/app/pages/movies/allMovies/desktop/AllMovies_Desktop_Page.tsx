"use client"; // Indique que ce composant doit être exécuté côté client et permet d'effectuer des opérations comme la gestion de l'état (useState), la récupération de données (useEffect), etc...

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
//
import Filters from "./filters/Filters";
import ListAllMovies from "./listAllMovies/ListAllMovies";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import { fetchMovies } from "@/app/utils/api/fetchMovies";

interface Movie {
  _id: string;
  id: string;
  name: string;
  year: number;
  actors: string[];
  country: string[];
  genre: string[];
  img: string;
}

interface AllMoviesResponse {
  allMovies: Movie[];
}

export default function AllMovies_Desktop_Page() {
  // Films
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // Recherche & Filtres
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("nameAsc");
  // Acteurs
  const [actors, setActors] = useState<string[]>([]);
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  // Pays
  const [country, setCountry] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  // Genres
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  // Erreurs
  const [error, setError] = useState<string>("");

useEffect(() => {
  async function getAllMovies() {
    setLoading(true);
    try {
      const url = `https://www.net-movie.fr/api/movies?type=allMovies`;
      const { data }: { data: AllMoviesResponse } = await axios.get(url);

      setAllMovies(data.allMovies); // Stockage original
      setItems(data.allMovies); // Stockage filtré

      // Acteurs
      const uniqueActors: string[] = [
        ...new Set(data.allMovies.flatMap((movie) => movie.actors)),
      ].sort((a, b) => a.localeCompare(b));
      setActors(uniqueActors);

      // Pays
      const uniqueCountry: string[] = [
        ...new Set(data.allMovies.flatMap((movie) => movie.country)),
      ].sort((a, b) => a.localeCompare(b));
      setCountry(uniqueCountry);

      // Genres
      const uniqueGenres: string[] = [
        ...new Set(data.allMovies.flatMap((movie) => movie.genre)),
      ].sort();
      setGenres(uniqueGenres);
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
              //
              sortOption={sortOption}
              setSortOption={setSortOption}
            />

            {/* Liste des films filtrés */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                placeItems: "center",
              }}
            >
              {items.map((movie, index) => (
                <ListAllMovies movie={movie} id={movie._id} />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Container_GlobalApp>
  );
}
