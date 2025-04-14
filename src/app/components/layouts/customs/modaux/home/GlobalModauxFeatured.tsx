import React, { Dispatch, SetStateAction } from "react";
// LAYOUTS
import {
  ModalPlayerTrailer,
  ModalInfosMovie,
  ModalTheWholeFilm,
} from "../../..";

// Typing for the movie
interface Movie {
  name: string;
  desc: string;
  trailer: string;
  movieLink: string;
  [key: string]: any;
}

interface GlobalModauxFeaturedProps {
  randomMovie: Movie;
  // Modal state for trailer
  openModalTrailer: boolean;
  showPlayerTrailer: boolean;
  CloseModalTrailer: () => void; // Should be a function to close the trailer modal
  // Modal state for movie information
  openModalInfosMovie: boolean;
  setOpenModalInfosMovie: Dispatch<SetStateAction<boolean>>;
  CloseModalInfosMovie: () => void; // Function to close movie info modal
  // Modal state for full film
  modalTheWholeMovie: boolean;
  CloseModalTheWholeMovie: () => void; // Function to close full film modal
}

export default function GlobalModauxFeatured({
  randomMovie,
  openModalTrailer,
  showPlayerTrailer,
  CloseModalTrailer,
  openModalInfosMovie,
  setOpenModalInfosMovie,
  CloseModalInfosMovie,
  modalTheWholeMovie,
  CloseModalTheWholeMovie,
}: GlobalModauxFeaturedProps) {
  const { name, desc, trailer, movieLink } = randomMovie;

  return (
    <div>
      {/* MODAL PLAYER TRAILER */}
      <ModalPlayerTrailer
        openModalTrailer={openModalTrailer}
        trailer={trailer}
        showPlayerTrailer={showPlayerTrailer}
        CloseModalTrailer={CloseModalTrailer}
      />

      {/* MODAL INFOS MOVIES */}
      <ModalInfosMovie
        name={name}
        desc={desc}
        openModalInfosMovie={openModalInfosMovie}
        // setOpenModalInfosMovie={setOpenModalInfosMovie}
        CloseModalInfosMovie={CloseModalInfosMovie}
        openModalTrailer={openModalTrailer} // Updated to boolean type
      />

      {/* MODAL THE WHOLE FILM */}
      <ModalTheWholeFilm
        modalTheWholeMovie={modalTheWholeMovie}
        movieLink={movieLink}
        CloseModalTheWholeMovie={CloseModalTheWholeMovie}
      />
    </div>
  );
}
