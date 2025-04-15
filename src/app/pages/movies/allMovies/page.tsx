"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import AllMovies_Desktop_Page from "./desktop/AllMovies_Desktop";
import AllMovies_Cellular_Page from "./cellular/AllMovies_Cellular";
import React, { useEffect, useState } from "react";
import axios from "axios";

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

interface AllMoviesResponse {
  allMovies: Movie[];
}

export default function Page() {
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
