import { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery, useTheme } from "@mui/material";
// Styles
import {
  RootItemListSliderCategoryListMovies,
  NameMovieItem,
} from "./StylesItemListSliderCategoryListMovies.jsx";
import Link from "next/link.js";

export default function ItemListSliderCategoryListMovies({ item }) {
  // RESPONSIVE 
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const StylesImgItem = {
    height: `${matches ? "120px" : "200px"}`,
    width: `${matches ? "200px" : "350px"}`,
  };

  // GET OBTAIN INFOS ON EACH ITEM IN THE CATEGORY SLIDER
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies/` +
            item
          //   `${process.env.REACT_APP_API_URL}/movies/` + item
        );
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link key={movie._id} href={`/pages/movies/${movie._id}`}>
      <RootItemListSliderCategoryListMovies>
        <NameMovieItem variant={matches ? "string" : "h5"}>
          {movie.name}
        </NameMovieItem>
        <img alt={movie.name} src={movie.img} style={StylesImgItem} />
      </RootItemListSliderCategoryListMovies>
    </Link>
  );
}
