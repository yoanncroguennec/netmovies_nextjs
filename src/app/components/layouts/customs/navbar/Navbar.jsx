import React, { useState } from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { UserLocationIP_AddressAndLocalTimeDate } from "../../../utils";
// import DropdownNavbar from "../dropdown/dropdownNavbar/DropdownNavbar";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  RootNavbar,
  Typo_FirstLetter_Logo,
  Typo_SecondLetter_Logo,
  Typo_ThirdLetter_Logo,
  Typo_FourthLetter_Logo,
  Typo_FifthLetter_Logo,
  Typo_SixthLetter_Logo,
  Typo_SeventhLetter_Logo,
  Typo_EighthLetter_Logo,
} from "./StylesNavbar";
import Link from "next/link";
// import { GlobalBtns } from "..";

export default function Navbar() {
  // RESPONSIVE
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [isScrolled, setIsScrolled] = useState(false);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  return (
    <RootNavbar isScrolled={isScrolled} matches={matches}>
      <Link
        href='featured_SliderCategoryListMovies'
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <Typo_FirstLetter_Logo matches={matches}>N</Typo_FirstLetter_Logo>
        <Typo_SecondLetter_Logo matches={matches}>E</Typo_SecondLetter_Logo>
        <Typo_ThirdLetter_Logo matches={matches}>T</Typo_ThirdLetter_Logo>
        <Typo_FourthLetter_Logo matches={matches}>M</Typo_FourthLetter_Logo>
        <Typo_FifthLetter_Logo matches={matches}>O</Typo_FifthLetter_Logo>
        <Typo_SixthLetter_Logo matches={matches}>V</Typo_SixthLetter_Logo>
        <Typo_SeventhLetter_Logo matches={matches}>I</Typo_SeventhLetter_Logo>
        <Typo_EighthLetter_Logo matches={matches}>E</Typo_EighthLetter_Logo>
      </Link>
      <Button
        href='/pages/movies'
        sx={{
          border: "2px solid red",
          borderRadius: "25px",
          cursor: "pointer",
          color: "#FFF",
          padding: "10px 30px",
        }}
        variant='text'
      >
        <Typography variant='h6'>Tous les films</Typography>
      </Button>

      <Button
        href='/pages/televisionProgramme'
        sx={{
          border: "2px solid red",
          borderRadius: "25px",
          cursor: "pointer",
          color: "#FFF",
          padding: "10px 30px",
        }}
        variant='text'
      >
        <Typography variant='h6'>Programmes Télé</Typography>
      </Button>

      {/* <UserLocationIP_AddressAndLocalTimeDate
        id_Of_ConnectedUser={id_Of_ConnectedUser}
      /> */}
      {/* {!matches && (
        <>
          <GlobalBtns
            urlBtn='movies/listAllMovies'
            textBtn='Liste de tous les films'
          />
          <GlobalBtns
            urlBtn='movies/listFarorites_WithoutMongodb_WithLocalStorage'
            textBtn='Mes favoris'
          />
        </>
      )} */}

      {/* <GlobalBtns urlBtn='admin/dashboard' textBtn='Admin' /> */}

      <GiHamburgerMenu color='red' size={30} />
      {/* <DropdownNavbar
        id_Of_ConnectedUser={id_Of_ConnectedUser}
        token={token}
        handleTokenAndId={handleTokenAndId}
      /> */}
    </RootNavbar>
  );
}
