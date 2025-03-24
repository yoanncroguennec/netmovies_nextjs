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
import axios from "axios";
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
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const url = `https://www.net-movie.fr/api/movies?type=allMovies}`;
        const res = await axios.get(url);
        setAllMoviesbyGenre(res.data.allMoviesbyGenre);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return <Container_GlobalApp></Container_GlobalApp>;
}
