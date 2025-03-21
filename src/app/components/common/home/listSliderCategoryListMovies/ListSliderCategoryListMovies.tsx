"use client";

import React, { useEffect, useRef, useState } from "react";
// API
import fetchApiRequest from "@/app/utils/requets/axios";
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
import Link from "next/link";
import { Box } from "@mui/material";
import { Custom_Loading } from "@/app/components/layouts";

export default function ListSliderCategoryListMovies({
  titleSection,
  endPointUrl,
}: {
  titleSection: String;
  endPointUrl?: any;
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

  //  const { title, content } = list;

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchMovies() {
      try {
        const res = await fetchApiRequest(endPointUrl);
        setMovies(res.movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    if (endPointUrl) {
      fetchMovies();
    }
  }, [endPointUrl]);

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
            {movies
              // .slice(
              //   0,
              //   5
              // )
              .map((item, index) => (
                <Link key={item._id} href={`/pages/movies/${item._id}`}>
                  <RootItemListSliderCategoryListMovies>
                    <Box
                      sx={{ background: "rgba(0, 0, 0, 0.3)", width: "100%" }}
                    >
                      <NameMovieItem variant='h5'>{item.name}</NameMovieItem>
                    </Box>
                    <img
                      alt={item.name}
                      src={item.img}
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
