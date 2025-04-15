"use client"; // Indique que ce composant doit être exécuté côté client et permet d'effectuer des opérations comme la gestion de l'état (useState), la récupération de données (useEffect), etc...

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import ScrollToTop from "react-scroll-to-top";
// STYLES
import { Root } from "./StylesAllMovies_Cellular_Page";
import { MovieCard } from "./movieCard/MovieCard";
import FiltersAllMovies_ForCellular from "./filters/FiltersAllMovies_ForCellular";
import Container_GlobalAppServer from "@/app/components/layouts/containers/container_GlobalAppServer/Container_GlobalAppServer";

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

interface AllMovies_Cellular_Page_Props {
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

export default function AllMovies_Cellular_Page({
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
}: AllMovies_Cellular_Page_Props) {
  const [toggle_Search_Filters, setToggle_Search_Filters] =
    useState<boolean>(false);

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

  return (
    <Container_GlobalAppServer>
      <Root toggle_Search_Filters={toggle_Search_Filters}>
        <FiltersAllMovies_ForCellular
          toggle_Search_Filters={toggle_Search_Filters}
          setToggle_Search_Filters={setToggle_Search_Filters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {items.map((movie, index) => (
          <MovieCard key={movie.id || index} movie={movie} />
        ))}
        <ScrollToTop smooth />
      </Root>
    </Container_GlobalAppServer>
  );
}
