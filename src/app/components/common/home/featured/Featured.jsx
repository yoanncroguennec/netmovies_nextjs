import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Typography, useTheme, useMediaQuery, Box } from "@mui/material";
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
  BoxBGTitleDescBtnsMovieRandom,
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

const sizeIconDesktop = 35;
const sizeIconMobile = 20;

export default function Featured() {
  //////////////////// DROPDOWN CATEGORIES ////////////////////
  const type = "movie";
  const [selected, setSelected] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [randomMovie, setRandomMovie] = useState([]);

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const url = `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies/randomMovie`;
        const { data } = await axios.get(url);
        console.log("randomMovie :", data.randomMovie);
        setRandomMovie(data.randomMovie);
      } catch (err) {
        console.log(err);
      }
    };

    getRandomMovie();
  }, []);

  const { img, name, desc } = randomMovie;

  function truncateDesc(str) {
    return str.length > 10 ? str.substring(0, 150) + "..." : str;
  }

  //////////////////// RESPONSIVE ////////////////////
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  //////////////////// OPEN MODAL PLAYER TRAILER////////////////////
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

  //////////////////// OPEN MODAL INFOS MOVIE ////////////////////
  const [openModalInfosMovie, setOpenModalInfosMovie] = useState(false);

  function CloseModalInfosMovie() {
    setOpenModalInfosMovie(!openModalInfosMovie);
  }

  //////////////////// OPEN MODAL THE WHOLE MOVIE ////////////////////
  const [modalTheWholeMovie, setModalTheWholeMovie] = useState(false);

  function OpenModalTheWholeFilm() {
    setModalTheWholeMovie(!modalTheWholeMovie);
  }
  function CloseModalTheWholeMovie() {
    setModalTheWholeMovie(false);
  }

  //////////////////// DATA THREE BTNS ////////////////////
  const dataThreeBtns = [
    {
      onClickAction: OpenModalTrailer,
      icon: (
        <BsFillPlayFill size={matches ? sizeIconMobile : sizeIconDesktop} />
      ),
      title: "Bande-Annonce",
    },
    {
      onClickAction: CloseModalInfosMovie,
      icon: <BsInfoCircle size={matches ? sizeIconMobile : sizeIconDesktop} />,
      title: "Infos",
    },
    {
      onClickAction: OpenModalTheWholeFilm,
      icon: (
        <BsFillPlayFill size={matches ? sizeIconMobile : sizeIconDesktop} />
      ),
      title: "Voir le film",
    },
  ];

  //////////////////// RETURN ////////////////////
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
                        href={urlCategory}
                        state={{
                          movieCategory: `${textCategory}`,
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
            marginLeft: `${matches ? "5px" : "45px"}`,
            padding: `${matches ? "25px" : "50px"}`,
            width: `${matches ? "350px" : "700px"}`,
          }}
        >
          <TypoNameMovieRandom variant={matches ? "h6" : "h4"}>
            {name}
          </TypoNameMovieRandom>

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
                  <BoxIconBtn matches={matches}>{icon}</BoxIconBtn>
                  <Typography variant={matches ? "caption" : "body2"}>
                    {title}
                  </Typography>
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
