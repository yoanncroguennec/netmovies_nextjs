"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
// API
import fetchApiRequest from "@/app/utils/requets/axios";
import appRequest from "@/app/utils/requets/appRequest";
// STYLES
import {
  TypoTitlePage,
  BoxActiveDropdown,
  BoxListMovies,
  styleLink,
  RootListMovies,
  TypoTitle,
  BoxNoDescription,

  //////////////
  Dropdown,
  DropdownBtn,
  DropdownItem,
} from "./StylesListAllMovies";
import Link from "next/link";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import { Custom_Loading } from "@/app/components/layouts";
import { SlArrowDown } from "react-icons/sl";
import styles from "./test.module.css";

// STYLES
const styleImg = {
  borderRadius: "50%",
  float: "left",
  height: "200px",
  margin: "0 20px 5px 0",
  objectFit: "cover",
  shapeOutside: "margin-box",
  width: "200px",
};


export default function AllMoviesPage() {
  //  const [movies, setMovies] = useState( [
  //   {
  //     _id: "650f63d0ac33391111e8fea5",
  //     name: "Taken 1",
  //     genre: ["Action", "Thriller"],
  //   },
  //   {
  //     _id: "650f63d0ac33391111e8fea6",
  //     name: "Le Medecin Imaginaire",
  //     genre: ["Comédie"],
  //   },
  // ])
      const [isActive, setIsActive] = useState(false);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState([]);
  const [order, setOrder] = useState("asc"); // asc (croissant) ou desc (décroissant)
  const [orderGenre, sortByGenre] = useState("asc"); // asc (croissant) ou desc (décroissant)

  useEffect(() => {
    setLoading(true);
    async function fetchMovies() {
      try {
        const res = await fetchApiRequest(appRequest.fetchAllMovies);
        console.log("====================================");
        console.log(res.movies);
        console.log("====================================");
        setMovies(res.movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    if (appRequest.fetchAllMovies) {
      fetchMovies();
    }
  }, [appRequest.fetchAllMovies]);

  const filteredMovies = movies
    .filter((movie) =>
      search ? movie.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((movie) => (genre ? movie.genre === genre : true))
    .filter((movie) => (year ? movie.year.toString() === year : true))
    .sort((a, b) => {
      if (sortByGenre) {
        return orderGenre === "asc";
        //   ? a.genre.localeCompare(b.genre)
        //   : b.genre.localeCompare(a.genre);
      } else {
        return orderGenre === "asc" ? a.year - b.year : b.year - a.year;
      }
    })
    .sort((a, b) => (order === "asc" ? a.year - b.year : b.year - a.year));

  // Extraire les années uniques, trier par ordre décroissant
  const annees = [...new Set(movies.map((film) => film.year))].sort(
    (a, b) => b - a
  );



  //   ///////////////////////////
  //   ////////////////////////////
  //   /////////////////////////
  // // État pour les genres
  // const [genres, setGenres] = useState([]);

  // useEffect(() => {
  //   // Extraire tous les genres des films
  //   const allGenres = movies.flatMap((movie) => movie.genre);

  //   console.log("Genres extraits (avant suppression des doublons):", allGenres);

  //   // Supprimer les doublons et trier les genres
  //   const uniqueGenres = [...new Set(allGenres)].sort();

  //   console.log("Genres uniques et triés:", uniqueGenres);

  //   // Mettre à jour l'état des genres
  //   setGenres(uniqueGenres);
  // }, []);

  // return loading ? (
  //   <Custom_Loading loading={loading} />
  // ) :
  
  return (
    <Container_GlobalApp>
      <div className={styles.container}>Hello Next.js</div>;
      <TypoTitlePage variant='h4'>
        {filteredMovies.length} films disponibles
      </TypoTitlePage>
      {/* <label htmlFor='genre-select'>Choisir un genre :</label>
      <select id='genre-select'>
        {genres.length > 0 ? (
          genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))
        ) : (
          <option>Chargement...</option>
        )}
      </select> */}
      {/*  <label htmlFor='genre-select'>Choisir un genre :</label>
      <select id='genre-select'>
        {genres.length > 0 ? (
          genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))
        ) : (
          <option>Chargement...</option>
        )}
      </select>
      <select id='genre-select'>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select> */}
      {/* Sélection du Genre */}
      <Box className="selectBox">
        <Box className="selectedOption">
          <input placeholder="favorite" type="text" />
        </Box>
      </Box>
      <select
        onChange={(e) => setGenre(e.target.value)}
        style={{ border: "none", outline: "none", borderRadius: 25 }}
      >
        <option value=''>Tous les genres</option>
        <option value='Sci-Fi'>Sci-Fi</option>
        <option value='Comédie'>Comédie</option>
        <option value='Actions'>Actions</option>
      </select>
      {/* <label htmlFor='genre-select'>Choisir un genre :</label>
      <select id='genre-select'>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select> */}
      {/* {genre == "" ? (
        <select
          onChange={(e) => sortByGenre(e.target.value)}
          className='p-2 border m-2'
        >
          <option value='asc'>Ordre croissant (genre)</option>
          <option value='desc'>Ordre décroissant (genre)</option>
        </select>
      ) : null} */}
      {/* Barre de Recherche par Titre */}
      <input
        type='text'
        placeholder='Rechercher un film...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        onChange={(e) => setYear(e.target.value)}
        value={year}
        label='Select Option'
      >
        {annees.map((year) => (
          <option key={year} value={year}>
            <MenuItem> {year}</MenuItem>
          </option>
        ))}
      </Select>
      <h2>Sélectionner une date de sortie</h2>
      <select onChange={(e) => setYear(e.target.value)} value={year}>
        <option value=''>Tohutes les années</option>
        {annees.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {year == "" ? (
        <select
          onChange={(e) => setOrder(e.target.value)}
          className='p-2 border m-2'
        >
          <option value='asc'>Ordre croissant (années)</option>
          <option value='desc'>Ordre décroissant (années)</option>
        </select>
      ) : null}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {filteredMovies.map(
          ({
            _id,
            name,
            desc,
            realisators,
            actors,
            favorite,
            watch,
            country,
            genre,
            img,
            year,
            rating,
            index,
          }) => (
            <Link key={index} href={`/pages/movies/${_id}`} style={styleLink}>
              <RootListMovies>
                <img
                  alt='movie'
                  src={img}
                  height={750}
                  style={styleImg}
                  width={750}
                />
                {/* <BooleanIfMovieViewed_Rating
                  rating={rating}
                  favorite={favorite}
                  watch={watch}
                /> */}
                <TypoTitle variant='h5'>
                  {name} ({year} - {country})
                </TypoTitle>
                <Typography variant='body1'>
                  <strong>Réalisateurs :</strong> {realisators}
                </Typography>
                <Typography variant='body1'>
                  <strong>Acteurs :</strong> {actors}
                </Typography>
                {/* <BoxMovieGenre genre={genre} /> */}
                {desc === "" && (
                  <BoxNoDescription>
                    <Typography variant='h6'> Pas de description</Typography>
                  </BoxNoDescription>
                )}
                <div
                // dangerouslySetInnerHTML={{
                //   __html: `${TruncateDesc(desc)}`,
                // }}
                />
              </RootListMovies>
            </Link>
          )
        )}
      </Box>
    </Container_GlobalApp>
  );
}
