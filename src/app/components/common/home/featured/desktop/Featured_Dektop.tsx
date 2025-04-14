"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
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

const sizeIconDesktop = 35;

interface Movie {
  _id?: string;
  name: string;
  desc: string;
  img: string;
  trailer: string;
  movieLink: string;
}

interface FeaturedDesktopProps {
  randomMovie: Movie;
  loading: boolean;
}

export default function Featured_Desktop({
  randomMovie,
  loading,
}: FeaturedDesktopProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // DROPDOWN CATEGORIES
  const type: "movie" | "series" = "movie";
  const [selected, setSelected] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const { img, name, desc } = randomMovie;

  function truncateDesc(str: string): string {
    return str.length > 150 ? str.substring(0, 150) + "..." : str;
  }

  // OPEN MODAL PLAYER TRAILER
  const [openModalTrailer, setOpenModalTrailer] = useState<boolean>(false);
  const [showPlayerTrailer, setShowPlayerTrailer] = useState<boolean>(false);

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
    <RootFeatured img={img || ""}>
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
                    ({ textCategory, urlCategory }, index) => (
                      <Link
                        key={index}
                        href={{
                          pathname: urlCategory,
                          query: { movieCategory: `${textCategory}` },
                        }}
                        onClick={(e) =>
                          setSelected(
                            (e.target as HTMLElement).textContent || ""
                          )
                        }
                        style={{ color: "#F00", textDecoration: "none" }}
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
            padding: matches ? "50px" : "20px",
            width: matches ? "700px" : "80vw",
          }}
        >
          <TypoNameMovieRandom variant={matches ? "h4" : "h6"}>
            {name}
          </TypoNameMovieRandom>

          <Typography>{truncateDesc(`${desc}`)}</Typography>

          <BoxThreeBtns>
            {dataThreeBtns.map(({ onClickAction, icon, title }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={onClickAction}
                  style={StylesThreeBtns}
                >
                  {matches ? <BoxIconBtn>{icon}</BoxIconBtn> : null}
                  <Typography sx={{ textAlign: "center" }} variant='body2'>{title}</Typography>
                </motion.div>
              </>
            ))}
          </BoxThreeBtns>
        </Box>
      </BoxFeatured>

      {randomMovie.name && randomMovie.desc ? (
        <GlobalModauxFeatured
          randomMovie={randomMovie}
          //
          openModalTrailer={openModalTrailer}
          showPlayerTrailer={showPlayerTrailer}
          CloseModalTrailer={CloseModalTrailer}
          //
          openModalInfosMovie={openModalInfosMovie}
          setOpenModalInfosMovie={setOpenModalInfosMovie}
          CloseModalInfosMovie={CloseModalInfosMovie}
          //
          modalTheWholeMovie={modalTheWholeMovie}
          CloseModalTheWholeMovie={CloseModalTheWholeMovie}
        />
      ) : (
        <Typography>Loading...</Typography> // Display a loading message if randomMovie is not available
      )}
    </RootFeatured>
  );
}
