"use client";

import { useState } from "react";
import { dataMovies } from "./dataMovies.js";

export default function Test() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [order, setOrder] = useState("asc"); // asc (croissant) ou desc (décroissant)
  const [orderGenre, sortByGenre] = useState("asc"); // asc (croissant) ou desc (décroissant)

  const filteredMovies = dataMovies
    .filter((movie) =>
      search ? movie.title.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((movie) => (genre ? movie.genre === genre : true))
    .filter((movie) => (year ? movie.year.toString() === year : true))
    .sort((a, b) => {
      if (sortByGenre) {
        return orderGenre === "asc"
          ? a.genre.localeCompare(b.genre)
          : b.genre.localeCompare(a.genre);
      } else {
        return orderGenre === "asc" ? a.year - b.year : b.year - a.year;
      }
    })
    .sort((a, b) => (order === "asc" ? a.year - b.year : b.year - a.year));

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h2 className='text-xl font-bold'>Filtrer les Films{orderGenre}</h2>

      {/* Barre de Recherche par Titre */}
      <input
        type='text'
        placeholder='Rechercher un film...'
        className='p-2 border rounded w-full mb-2'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* Sélection du Genre */}
      <select
        onChange={(e) => setGenre(e.target.value)}
        className='p-2 border m-2'
      >
        <option value=''>Tous les genres</option>
        <option value='Sci-Fi'>Sci-Fi</option>
        <option value='Romance'>Romance</option>
        <option value='Action'>Action</option>
      </select>

      {/* Sélection de l'Année */}
      <select
        onChange={(e) => setYear(e.target.value)}
        className='p-2 border m-2'
      >
        <option value=''>Toutes les années</option>
        <option value='1997'>1997</option>
        <option value='2008'>2008</option>
        <option value='2010'>2010</option>
        <option value='2014'>2014</option>
      </select>

      {genre == "" ? (
        <select
          onChange={(e) => sortByGenre(e.target.value)}
          className='p-2 border m-2'
        >
          <option value='asc'>Ordre croissant (genre)</option>
          <option value='desc'>Ordre décroissant (genre)</option>
        </select>
      ) : null}

      {year == "" ? (
        <select
          onChange={(e) => setOrder(e.target.value)}
          className='p-2 border m-2'
        >
          <option value='asc'>Ordre croissant (années)</option>
          <option value='desc'>Ordre décroissant (années)</option>
        </select>
      ) : null}

      {/* Liste des films filtrés */}
      <ul className='mt-4'>
        {filteredMovies.map((movie) => (
          <li key={movie.title} className='p-2 border-b'>
            {movie.title} - {movie.genre} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
