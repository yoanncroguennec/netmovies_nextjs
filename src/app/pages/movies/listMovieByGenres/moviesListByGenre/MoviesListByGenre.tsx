"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import AllMovies_Desktop_Page from "../../allMovies/desktop/AllMovies_Desktop";
import AllMovies_Cellular_Page from "../../allMovies/cellular/AllMovies_Cellular";

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

interface AllMoviesByGenreResponse {
  allMoviesbyGenre: Movie[];
}

export default function MoviesListByGenre() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // Films
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Recherche & Filtres
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>();
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

  const searchParams = useSearchParams();
  const movieCategory = searchParams.get("movieCategory");

  useEffect(() => {
    if (!movieCategory) return;

    async function getAllMovies() {
      setLoading(true);
      try {
        const url = `https://www.net-movie.fr/api/movies?type=allMoviesByGenre&genre=${movieCategory}`;
        const { data }: { data: AllMoviesByGenreResponse } = await axios.get(
          url
        );

        setAllMovies(data.allMoviesbyGenre);
        setItems(data.allMoviesbyGenre);

        const uniqueActors = [
          ...new Set(data.allMoviesbyGenre.flatMap((movie) => movie.actors)),
        ].sort();
        setActors(uniqueActors);

        const uniqueCountry = [
          ...new Set(data.allMoviesbyGenre.flatMap((movie) => movie.country)),
        ].sort();
        setCountry(uniqueCountry);

        const uniqueGenres = [
          ...new Set(data.allMoviesbyGenre.flatMap((movie) => movie.genre)),
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
  }, [movieCategory]);

  if (!movieCategory) return null;

  return matches ? (
    <AllMovies_Desktop_Page
      allMovies={allMovies}
      items={items}
      setItems={setItems}
      loading={loading}
      error={error}
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
      hiddenDropdownGenres={false}
      //
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  ) : (
    <AllMovies_Cellular_Page
      allMovies={allMovies}
      items={items}
      setItems={setItems}
      loading={loading}
      error={error}
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
      hiddenDropdownGenres={false}
      //
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
  );
}
