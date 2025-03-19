"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
// COMPONENTS UTILS
import {
  LoaderSpinner,
  ScrollIndicatorProgressBar,
  // BackToTop,
  Pagination,
} from "@/app/components/utils";
// STYLES
import {
  RootListAllMovies,
  TypoTitlePage,
  BoxListAllMovies,
  BoxBtn,
  Btn,
  TypoBtn,
} from "./StylesListAllMovies";
import ListAllMovies from "./listAllMovies/ListAllMovies";
import { dataListYears } from "@/app/utils/constants/data/components/dataListYears";
// FUNCTIONS
// import { TruncateDesc } from "@/app/utils/functions";

export default function ListAllMoviesPage() {
  //
  const [countAllMovies, setCountAllMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(10);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  //
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [order, setOrder] = useState("asc"); // asc || desc
  const [orderTitle, setOrderTitle] = useState("asc"); // asc || desc
  const [orderGenre, sortByGenre] = useState("asc"); // asc || desc

  const filteredAllMovies = items
    .filter((movie) =>
      search ? movie.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((movie) => (genre ? movie.genre === genre : true))
    .filter((movie) => (year ? movie.year.toString() === year : true))
    // .sort((a, b) => {
    //   if (sortByGenre) {
    //     return orderGenre === "asc"
    //       ? a.genre.localeCompare(b.genre)
    //       : b.genre.localeCompare(a.genre);
    //   } else {
    //     return orderGenre === "asc" ? a.year - b.year : b.year - a.year;
    //   }
    // })
    .sort((a, b) => (order === "asc" ? a.year - b.year : b.year - a.year))
    .sort((a, b) => (order === "asc" ? a.year - b.year : b.year - a.year))

  const filteredMovies = items
    .filter((movie) =>
      search ? movie.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((movie) => (genre ? movie.genre === genre : true))
    .filter((movie) => (year ? movie.year.toString() === year : true))
    .sort((a, b) => {
      if (setOrderTitle) {
        return orderTitle === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        // return orderGenre === "asc" ? a.year - b.year : b.year - a.year;
      }
    })
    // .sort((a, b) => {
    //   if (sortByGenre) {
    //     return orderGenre === "asc"
    //       ? a.genre.localeCompare(b.genre)
    //       : b.genre.localeCompare(a.genre);
    //   } else {
    //     return orderGenre === "asc" ? a.year - b.year : b.year - a.year;
    //   }
    // })
    // .sort((a, b) => (orderTitle === "asc" ? a.name - b.name : b.name - a.name))
    .sort((a, b) => (order === "asc" ? a.year - b.year : b.year - a.year));


  function showMoreItems() {
    setVisible((prevValue) => prevValue + 10);
  }

  useEffect(() => {
    async function getAllMovies() {
      try {
        const url = `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies`;
        const { data } = await axios.get(url);
        setItems(data.movies);
        setCountAllMovies(data.total);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    async function getAllMoviesByPage() {
      try {
        const url = `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies?page=${page}&limit=${limit}`;
        const { data } = await axios.get(url);
        setItemsByPages(data.movies);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getAllMovies();
    getAllMoviesByPage();
  }, [page, limit]);

  // RETURN
  return loading ? (
    <LoaderSpinner />
  ) : (
    <Container_GlobalApp>
      <RootListAllMovies>
        <ScrollIndicatorProgressBar />
        <TypoTitlePage variant='h4'>
          {countAllMovies} films disponibles
        </TypoTitlePage>

        {/* Search by title */}
        <input
          type='text'
          placeholder='Rechercher un film...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Selected by year */}
        <select onChange={(e) => setYear(e.target.value)}>
          <option value=''>Toutes les années</option>
          {dataListYears.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>

        <select
          onChange={(e) => setOrderTitle(e.target.value)}
        >
          <option value='asc'>Ordre croissant (Titre)</option>
          <option value='desc'>Ordre décroissant (Titre)</option>
        </select>

        {year == "" ? (
          <select
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value='asc'>Ordre croissant (années)</option>
            <option value='desc'>Ordre décroissant (années)</option>
          </select>
        ) : null}

        <Pagination
          page={page}
          countAllMovies={countAllMovies}
          setPage={setPage}
          limit={limit}
          setVisible={setVisible}
        />
        <BoxListAllMovies>
          <ListAllMovies filteredMovies={filteredMovies} visible={visible} />
        </BoxListAllMovies>
        {visible == limit ? (
          <Pagination
            page={page}
            countAllMovies={countAllMovies}
            setPage={setPage}
            limit={limit}
            setVisible={setVisible}
          />
        ) : (
          <BoxBtn>
            <Btn onClick={showMoreItems} variant='text'>
              <TypoBtn variant='h6'>Voir plus</TypoBtn>
            </Btn>
          </BoxBtn>
        )}
      </RootListAllMovies>
      <ScrollToTop smooth />
    </Container_GlobalApp>
  );
}
