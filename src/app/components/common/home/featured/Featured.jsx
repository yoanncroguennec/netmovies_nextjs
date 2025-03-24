"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography, Box } from "@mui/material";
// LAYOUTS
import { GlobalModauxFeatured } from "@/app/components/layouts";
// UTILS ASSETS DATAS
import { valueCategoryDropdownFeatured } from "@/app/utils/constants/data/components/common/home/valueCategoryDropdownFeatured";
// ICONS
import {
  BsFillPlayFill,
  BsInfoCircle,
  SlArrowDown,
} from "@/app/utils/constants/icons/index";
// STYLES
import {
  BoxActiveDropdown,
  BoxFeatured,
  BoxIconBtn,
  BoxThreeBtns,
  Dropdown,
  DropdownBtn,
  DropdownItem,
  RootFeatured,
  StylesThreeBtns,
  TypoNameMovieRandom,
} from "./StylesFeatured";
import Link from "next/link";
import fetchApiRequest from "@/app/utils/requets/axios";
import appRequest from "@/app/utils/requets/appRequest";

const sizeIconDesktop = 35;
const sizeIconMobile = 20;

export default function Featured() {
  // DROPDOWN CATEGORIES
  const type = "movie";
  const [selected, setSelected] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [randomMovie, setRandomMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const url = `https://www.net-movie.fr/api/movies?type=randomMovie`;
        const res = await axios.get(url);
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
        setRandomMovie(res.data.movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  // useEffect(() => {

  //   async function fetchMovies() {
  //     try {
  //       const res = await fetchApiRequest(appRequest.fetchRandomAMovie);
  //       setRandomMovie(res.randomMovie);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   }

  //   if (appRequest.fetchRandomAMovie) {
  //     fetchMovies();
  //   }
  // }, [appRequest.fetchRandomAMovie]);

  const { img, name, desc } = randomMovie;

  function truncateDesc(str) {
    return str.length > 10 ? str.substring(0, 150) + "..." : str;
  }

  // OPEN MODAL PLAYER TRAILER
  const [openModalTrailer, setOpenModalTrailer] = useState(false);
  const [showPlayerTrailer, setShowPlayerTrailer] = useState(false);

  function OpenModalTrailer() {
    setOpenModalTrailer(true);
    setShowPlayerTrailer(true);
  }

  function CloseModalTrailer() {
    setOpenModalTrailer(false);
    setShowPlayerTrailer(false);
  }

  // OPEN MODAL INFOS MOVIE
  const [openModalInfosMovie, setOpenModalInfosMovie] = useState(false);

  function OpenModalInfosMovie() {
    setOpenModalInfosMovie(!openModalInfosMovie);
  }

  function CloseModalInfosMovie() {
    setOpenModalInfosMovie(!openModalInfosMovie);
  }

  // OPEN MODAL THE WHOLE MOVIE
  const [modalTheWholeMovie, setModalTheWholeMovie] = useState(false);

  function OpenModalTheWholeFilm() {
    setModalTheWholeMovie(!modalTheWholeMovie);
  }
  function CloseModalTheWholeMovie() {
    setModalTheWholeMovie(false);
  }

  // DATA THREE BTNS
  const dataThreeBtns = [
    {
      onClickAction: OpenModalTrailer,
      icon: <BsFillPlayFill size={sizeIconDesktop} />,
      title: "Bande-Annonce",
    },
    {
      onClickAction: OpenModalInfosMovie,
      icon: <BsInfoCircle size={sizeIconDesktop} />,
      title: "Infos",
    },
    {
      onClickAction: OpenModalTheWholeFilm,
      icon: <BsFillPlayFill size={sizeIconDesktop} />,
      title: "Voir le film",
    },
  ];

  // RETURN
  return (
    <RootFeatured img={img}>
      <BoxFeatured>
        {type && (
          <Dropdown>
            <DropdownBtn onClick={() => setIsActive(!isActive)}>
              <Typography>
                {selected || "GENRE"} ({type === "movie" ? "Films" : "Séries"})
              </Typography>
              <SlArrowDown size={25} />
            </DropdownBtn>
            {isActive && (
              <>
                <BoxActiveDropdown>
                  {valueCategoryDropdownFeatured.map(
                    ({ textCategory, urlCategory, index }) => (
                      <Link
                        key={index}
                        href={{
                          pathname: urlCategory,
                          query: { movieCategory: `${textCategory}` },
                        }}
                        onClick={(e) => setSelected(e.target.textContent)}
                      >
                        <DropdownItem>
                          <Typography>{textCategory}</Typography>
                        </DropdownItem>
                      </Link>
                    )
                  )}
                </BoxActiveDropdown>
              </>
            )}
          </Dropdown>
        )}
        <Box
          sx={{
            background: "rgba(0, 0, 0, 0.4)",
            borderRadius: "25px",
            marginLeft: "45px",
            padding: "50px",
            width: "700px",
          }}
        >
          <TypoNameMovieRandom variant='h4'>{name}</TypoNameMovieRandom>

          <Typography>{truncateDesc(`${randomMovie.desc}`)}</Typography>

          <BoxThreeBtns>
            {dataThreeBtns.map(({ onClickAction, icon, title }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={onClickAction}
                  style={StylesThreeBtns}
                >
                  <BoxIconBtn>{icon}</BoxIconBtn>
                  <Typography variant='body2'>{title}</Typography>
                </motion.div>
              </>
            ))}
          </BoxThreeBtns>
        </Box>
      </BoxFeatured>

      <GlobalModauxFeatured
        randomMovie={randomMovie}
        /// TRAILER
        openModalTrailer={openModalTrailer}
        showPlayerTrailer={showPlayerTrailer}
        CloseModalTrailer={CloseModalTrailer}
        /// INFOS
        openModalInfosMovie={openModalInfosMovie}
        setOpenModalInfosMovie={setOpenModalInfosMovie}
        CloseModalInfosMovie={CloseModalInfosMovie}
        /// THE WHOLE MOVIE
        modalTheWholeMovie={modalTheWholeMovie}
        CloseModalTheWholeMovie={CloseModalTheWholeMovie}
      />
    </RootFeatured>
  );
}
