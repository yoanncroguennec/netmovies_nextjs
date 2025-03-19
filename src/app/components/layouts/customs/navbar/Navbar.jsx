"use client";

import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
// import { UserLocationIP_AddressAndLocalTimeDate } from "../../../utils";
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
import { GlobalBtns } from "../..";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  return (
    <RootNavbar isScrolled={isScrolled}>
      <Link
        href='/pages/home'
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <Typo_FirstLetter_Logo>N</Typo_FirstLetter_Logo>
        <Typo_SecondLetter_Logo>E</Typo_SecondLetter_Logo>
        <Typo_ThirdLetter_Logo>T</Typo_ThirdLetter_Logo>
        <Typo_FourthLetter_Logo>M</Typo_FourthLetter_Logo>
        <Typo_FifthLetter_Logo>O</Typo_FifthLetter_Logo>
        <Typo_SixthLetter_Logo>V</Typo_SixthLetter_Logo>
        <Typo_SeventhLetter_Logo>I</Typo_SeventhLetter_Logo>
        <Typo_EighthLetter_Logo>E</Typo_EighthLetter_Logo>
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
        <Typography variant='h6'>Programme Télé</Typography>
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
        <Typography variant='h6'>Mes Favoris</Typography>
      </Button>

      {/* <UserLocationIP_AddressAndLocalTimeDate
        id_Of_ConnectedUser={id_Of_ConnectedUser}
      /> */}

      <GlobalBtns urlBtn='admin/dashboard' textBtn='Admin' />

      <GiHamburgerMenu color='red' size={30} />
      {/* <DropdownNavbar
        id_Of_ConnectedUser={id_Of_ConnectedUser}
        token={token}
        handleTokenAndId={handleTokenAndId}
      /> */}
    </RootNavbar>
  );
}
