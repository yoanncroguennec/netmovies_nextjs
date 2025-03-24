"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
// STYLES
import {
  RootRow,
  BoxRow,
  TypoTitleListSliderCategoryListMovies,
  BoxRowIndividually,
  BoxListMovies,
  styleBiChevronRight,
  RootItemListSliderCategoryListMovies,
  NameMovieItem,
} from "./StylesListSliderCategoryListMovies";
// ICONS
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Box } from "@mui/material";
import { Custom_Loading } from "@/app/components/layouts";

export default function ListSliderCategoryListMovies({
  titleSection,
}: {
  titleSection: String;
}) {
  const [isMoved, setIsMoved] = useState(false);

  // const rowRef = useRef(null);
  const rowRef = useRef<HTMLDivElement | null>(null); // ✅ Explicitly type the ref

  const handleClick_Btns_Slider_CategoryListMovies = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [allMoviesbyGenre, setAllMoviesbyGenre] = useState([])

    useEffect(() => {
      async function fetchMovies() {
        try {
          const url = `https://www.net-movie.fr/api/movies?type=allMoviesByGenre&genre=${titleSection}`;
          const res = await axios.get(url);
          setAllMoviesbyGenre(res.data.allMoviesbyGenre);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }

      fetchMovies();
    }, []);

  const display = !isMoved ? "none" : undefined; // or any other value you want when isMoved is true

  return loading ? (
    <Custom_Loading loading={loading} />
  ) : (
    <RootRow maxWidth='xl'>
      <BoxRow>
        <TypoTitleListSliderCategoryListMovies variant='h5'>
          {titleSection}
        </TypoTitleListSliderCategoryListMovies>
        <BoxRowIndividually>
          <BiChevronLeft
            size={22}
            style={
              //styleBiChevronLeft,
              {
                bottom: 0,
                backgroundColor: "rgb(22, 22, 22, 0.5)",
                color: "white",
                cursor: "pointer",
                // display: !isMoved && "none",
                display: display,
                height: "100%",
                left: 0,
                margin: "auto",
                position: "absolute",
                top: 0,
                width: "50px",
                zIndex: 150,
              }
            }
            onClick={() => handleClick_Btns_Slider_CategoryListMovies("left")}
          />
          <BoxListMovies ref={rowRef}>
            {allMoviesbyGenre
              // .slice(
              //   0,
              //   5
              // )
              .map(({_id, name, img}) => (
                <Link key={_id} href={`/pages/movies/${_id}`}>
                  <RootItemListSliderCategoryListMovies>
                    <Box
                      sx={{ background: "rgba(0, 0, 0, 0.3)", width: "100%" }}
                    >
                      <NameMovieItem variant='h5'>{name}</NameMovieItem>
                    </Box>
                    <img
                      alt={name}
                      src={img}
                      style={{
                        height: "200px",
                        width: "350px",
                      }}
                    />
                  </RootItemListSliderCategoryListMovies>
                </Link>
              ))}
          </BoxListMovies>
          <BiChevronRight
            style={{
              bottom: 0,
              backgroundColor: "rgb(22, 22, 22, 0.5)",
              color: "white",
              cursor: "pointer",
              height: "100%",
              margin: "auto",
              position: "absolute",
              right: 0,
              top: 0,
              width: "50px",
              zIndex: 150,
            }}
            onClick={() => handleClick_Btns_Slider_CategoryListMovies("right")}
          />
        </BoxRowIndividually>
      </BoxRow>
    </RootRow>
  );
}
