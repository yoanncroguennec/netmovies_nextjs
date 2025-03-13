"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import {
  Featured,
  ListSliderCategoryListMovies,
} from "@/app/components/common";

export default function HomePage() {
  const [categoryListMovie, setCategoryListMovie] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      try {
        const res = await axios.get(
          "https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/categoryListMovie"
          // `${process.env.REACT_APP_API_URL}/categoryListMovie`
        );
        console.log("categoryListMovie :", res.data.list);
        setCategoryListMovie(res.data.list);
      } catch (err) {
        console.log(err);
      }
    };
    getLists();
  }, []);

  return (
    <Box sx={{ background: "#000", overflow: "hidden" }}>
      <Featured />
      {categoryListMovie.map((list, index) => (
        <ListSliderCategoryListMovies key={index} list={list} />
      ))}
    </Box>
  );
}
