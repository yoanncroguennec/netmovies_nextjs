"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

// STYLES
import {
  RootSlide_BG_Mobie,
  BoxSlideTrackImgs,
  SlideImgs,
} from "./StylesMovie_ID_Layout";

// Define the interface for a movie object
interface Movie {
  img: string;
}

interface Container_Movie_ID_ForDesktopProps {
  children: React.ReactNode;
}

export default function Container_Movie_ID_ForDesktop({
  children,
}: Container_Movie_ID_ForDesktopProps) {
  // State to hold all movies data
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  // Fetching all movies data
  useEffect(() => {
    async function getAllMovies() {
      try {
        const url = `https://www.net-movie.fr/api/movies?type=allMovies`;
        const { data } = await axios.get<{ allMovies: Movie[] }>(url); // Typing the API response
        setAllMovies(data.allMovies);
      } catch (err) {
        console.log(err);
      }
    }

    getAllMovies();
  }, []); // Empty dependency array to avoid infinite loop

  return (
    <div style={{ overflow: "hidden" }}>
      <RootSlide_BG_Mobie>
        <div>
          <BoxSlideTrackImgs>
            {allMovies.map(({ img }) => (
              <SlideImgs key={img}>
                <img
                  src={img}
                  alt='Movie'
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
            {allMovies.reverse().map(({ img }) => (
              <SlideImgs key={img}>
                <img
                  src={img}
                  alt='Movie'
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
            {allMovies.slice(9).map(({ img }) => (
              <SlideImgs key={img}>
                <img
                  src={img}
                  alt='Movie'
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

      <div style={{ overflow: "hidden", overflowY: "hidden", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};
