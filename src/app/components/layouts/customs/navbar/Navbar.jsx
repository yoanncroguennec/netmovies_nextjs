"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { UserLocationIP_AddressAndLocalTimeDate } from "../../../utils";
// import DropdownNavbar from "../dropdown/dropdownNavbar/DropdownNavbar";
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
// ICONS
import { MdMovieCreation, MdFavorite } from "react-icons/md";
import { RiUserLine, RiAdminLine } from "react-icons/ri";
// import InfosUser from "./InfosUser";

const dataIcons = [
  {
    icon: MdMovieCreation,
    link: "/pages/movies",
    tooltip: "Tous les films",
    color: "#FFF",
  },
  {
    icon: MdFavorite,
    link: "/",
    tooltip: "Mes Favoris",
    color: "#F00",
  },
  {
    icon: RiUserLine,
    link: "/pages/auth/login",
    tooltip: "Se Connecter",
    color: "#F00",
  },
  {
    icon: RiAdminLine,
    link: "/pages/admin/dashboard",
    tooltip: "Administrateur",
    color: "#F00",
  },
];

export default function Navbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // const [isScrolled, setIsScrolled] = useState(false);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  const [hoverStates, setHoverStates] = useState([false, false]);
  const handleHover = (index, isHovering) => {
    const newStates = [...hoverStates];
    newStates[index] = isHovering;
    setHoverStates(newStates);
  };

  return (
    // <RootNavbar isScrolled={isScrolled}>
    <RootNavbar>
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

      {matches ? (
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
      ) : null}

      <Box
        sx={{
          alignItems: "center",
          border: "4px solid #F00",
          borderRadius: "25px",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-around",
          width: "250px",
        }}
      >
        {dataIcons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link key={index} href={item.link}>
              <Tooltip
                title={<Typography variant='h6'>{item.tooltip}</Typography>}
              >
                <IconButton>
                  <IconComponent
                    color={item.color}
                    onMouseEnter={() => handleHover(index, true)}
                    onMouseLeave={() => handleHover(index, false)}
                    size={30}
                    style={{
                      cursor: "pointer",
                      transform: hoverStates[index] ? "scale(1.5)" : "scale(1)",
                      transition: "transform 0.2s ease-in-out",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Link>
          );
        })}
      </Box>
      {/* <InfosUser /> */}

      {/* <UserLocationIP_AddressAndLocalTimeDate
        id_Of_ConnectedUser={id_Of_ConnectedUser}
      /> */}
    </RootNavbar>
  );
}
