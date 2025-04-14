"use client";

import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import ScrollToTop from "react-scroll-to-top";
// STYLES
import { Root } from "./StylesAllMovies_Cellular_Page";
import { MovieCard } from "./movieCard/MovieCard";
import FiltersAllMovies_ForCellular from "./filters/FiltersAllMovies_ForCellular";

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

export default function AllMovies_Cellular_Page() {
  const [toggle_Search_Filters, setToggle_Search_Filters] =
    useState<boolean>(false);

  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Movie[]>([]);
  // ACTORS
  const [actors, setActors] = useState<string[]>([]);
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  // COUNTRY
  const [country, setCountry] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  // GENRES
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  // ERRORS
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // Nouvel état pour l'année sélectionnée
  const [sortOption, setSortOption] = useState("nameAsc"); // Nouvel état pour l'option de tri

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

  return (
    <Container_GlobalApp>
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
          <MovieCard key={movie._id || index} movie={movie} />
        ))}
        <ScrollToTop smooth />
      </Root>
    </Container_GlobalApp>
  );
}
