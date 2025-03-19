// Source : "Youtube"
// URL : "https://www.youtube.com/watch?v=Ka3OQpwqxXA&t=4s"
// Teacher : "h3webdev"
// Title : "Load More Pagination React"

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
// COMPONENTS UTILS
import {
  LoaderSpinner,
  BooleanIfMovieViewed_Rating,
  ScrollIndicatorProgressBar,
  // BackToTop,
  Pagination,
} from "@/app/components/utils";
// STYLES
import {
  TypoTitlePage,
  BoxListAllMovies,
  RootListAllMovies,
  BoxBtn,
  Btn,
  TypoBtn,
} from "./StylesListAllMovies";
import ListAllMovies from "./listAllMovies/ListAllMovies";
import { dataListYears } from "@/app/utils/constants/data/components/dataListYears";
// FUNCTIONS
// import { TruncateDesc } from "@/app/utils/functions";
import Link from "next/link";

export default function ListAllMoviesPage() {

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

  const [loading, setLoading] = useState(true);
  const [itemsByPages, setItemsByPages] = useState([]);
  const [countAllMovies, setCountAllMovies] = useState();
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(10);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  function showMoreItems() {
    setVisible((prevValue) => prevValue + 10);
  }

  const filteredMovies = itemsByPages.filter((movie) =>
    search ? movie.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  useEffect(() => {

    
    async function getAllMoviesByPage() {
      try {
        const url = `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies?page=${page}&limit=${limit}`;
        const { data } = await axios.get(url);
        setItemsByPages(data.movies);
        setCountAllMovies(data.total);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getAllMoviesByPage();
  }, [page, limit]);

  // RETURN
  return loading ? (
    <LoaderSpinner />
  ) : (
    <Container_GlobalApp>
      <RootListAllMovies>
        <TypoTitlePage variant='h4'>
          {countAllMovies} films disponibles {page}
        </TypoTitlePage>

        {/* Search by title */}
        <input
          type='text'
          placeholder='Rechercher un film...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Pagination
          page={page}
          countAllMovies={countAllMovies}
          setPage={setPage}
          limit={limit}
          setVisible={setVisible}
        />
        <BoxListAllMovies>
          <ListAllMovies
            filteredMovies={filteredMovies}
            itemsByPages={itemsByPages}
            visible={visible}
          />
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
    </Container_GlobalApp>
  );
}
