"use client"

import React, { useState } from "react";

// Exemple de données (remplacez-les par une API si nécessaire)
const moviesData = [
  { title: "Movie 1", genre: "Action", year: 2020 },
  { title: "Movie 2", genre: "Drama", year: 2018 },
  { title: "Movie 3", genre: "Comedy", year: 2021 },
  { title: "Movie 4", genre: "Action", year: 2019 },
  { title: "Movie 5", genre: "Drama", year: 2022 },
  { title: "Movie 6", genre: "Comedy", year: 2017 },
  { title: "Movie 7", genre: "Action", year: 2015 },
  { title: "Movie 8", genre: "Drama", year: 2016 },
  { title: "Movie 9", genre: "Comedy", year: 2023 },
  { title: "Movie 10", genre: "Comedy", year: 2024 },
  { title: "Movie 11", genre: "Action", year: 2013 },
];

const genres = ["Action", "Drama", "Comedy"]; // Liste des genres pour le filtrage

const MovieList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' pour croissant, 'desc' pour décroissant

  const [visibleMovies, setVisibleMovies] = useState(5); // Nombre initial de films affichés
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  // Fonction pour filtrer et trier les films
  const filterAndSortMovies = () => {
    let filteredMovies = [...moviesData];

    // Filtrage par genre
    if (selectedGenre) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.genre === selectedGenre
      );
    }

    // Filtrage par année
    if (selectedYear) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.year === parseInt(selectedYear)
      );
    }

    // Filtrage par recherche (par titre)
    if (searchQuery) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tri des films
    return filteredMovies.sort((a, b) => {
      return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
    });
  };

  // Gestion du bouton "Voir plus"
  const handleShowMore = () => {
    setVisibleMovies((prev) => prev + 5);
  };

  // Gestion de la pagination
  const totalMovies = filterAndSortMovies().length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filterAndSortMovies().slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Recherche par titre */}
      <input
        type='text'
        placeholder='Rechercher par titre'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filtrage par genre */}
      <select
        onChange={(e) => setSelectedGenre(e.target.value)}
        value={selectedGenre}
      >
        <option value=''>Tous les genres</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Filtrage par année */}
      <input
        type='number'
        placeholder='Filtrer par année'
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      />

      {/* Tri par ordre */}
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value='asc'>Année croissante</option>
        <option value='desc'>Année décroissante</option>
      </select>

      {/* Affichage des films (Pagination active) */}
      <h3>Mode Pagination :</h3>
      <ul>
        {currentMovies.map((movie, index) => (
          <li key={index}>
            {movie.title} ({movie.year}) - {movie.genre}
          </li>
        ))}
      </ul>

      {/* Navigation par pagination */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Précédent
        </button>
        <span>
          {" "}
          Page {currentPage} / {totalPages}{" "}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Suivant
        </button>
      </div>

      {/* Affichage des films (Voir plus actif) */}
      <h3>Mode "Voir Plus" :</h3>
      <ul>
        {filterAndSortMovies()
          .slice(0, visibleMovies)
          .map((movie, index) => (
            <li key={index}>
              {movie.title} ({movie.year}) - {movie.genre}
            </li>
          ))}
      </ul>

      {/* Bouton "Voir plus" */}
      {visibleMovies < totalMovies && (
        <button onClick={handleShowMore}>Voir plus</button>
      )}
    </div>
  );
};

export default MovieList;
