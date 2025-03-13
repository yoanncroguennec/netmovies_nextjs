import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  RootSlide_BG_Mobie,
  BoxListMovies,
  TypoTitle,
  BoxNoDescription,
  StylesTrailer,
  BoxTrailer_MovieLink,
  BoxSlideTrackImgs,
  SlideImgs,
} from "./StylesContainer_movieID";

export default function Container_movieID({ children }) {
  // RESPONSIVE
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // GET API All MOVIES
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url = `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies`;
        // const url = `${process.env.REACT_APP_API_URL}/movies`;
        const { data } = await axios.get(url);
        setAllMovies(data.movies);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMovies();
  }, [allMovies]);

  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <RootSlide_BG_Mobie>
        <div>
          <BoxSlideTrackImgs>
            {allMovies
              // slice = limit
              // .slice(4, 9)
              .map(({ img }) => (
                <SlideImgs matches={matches}>
                  <img
                    src={img}
                    style={{
                      height: "100%",
                      width: "100%",
                      // transition: "transform 1s",
                    }}
                  />
                </SlideImgs>
              ))}
          </BoxSlideTrackImgs>
          <BoxSlideTrackImgs>
            {allMovies
              .reverse()
              // slice = limit
              // .slice(4, 9)
              .map(({ img }) => (
                <SlideImgs matches={matches}>
                  <img
                    src={img}
                    style={{
                      height: "100%",
                      width: "100%",
                      // transition: "transform 1s",
                    }}
                  />
                </SlideImgs>
              ))}
          </BoxSlideTrackImgs>
          <BoxSlideTrackImgs>
            {allMovies
              // slice = limit
              .slice(9)
              .map(({ img }) => (
                <SlideImgs matches={matches}>
                  <img
                    src={img}
                    style={{
                      height: "100%",
                      width: "100%",
                      // transition: "transform 1s",
                    }}
                  />
                </SlideImgs>
              ))}
          </BoxSlideTrackImgs>
        </div>
      </RootSlide_BG_Mobie>
      <div
        style={{
          background: "red",
          overflow: "hidden",
          overflowY: "hidden",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
