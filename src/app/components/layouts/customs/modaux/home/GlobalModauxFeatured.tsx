import React from "react";
// LAYOUTS
import {
  ModalPlayerTrailer,
  ModalInfosMovie,
  ModalTheWholeFilm,
} from "../../..";

// Typage du film
interface Movie {
  name: string;
  desc: string;
  trailer: string;
  movieLink: string;
  [key: string]: any; // pour d'autres propriétés si besoin
}

interface GlobalModauxFeaturedProps {
  randomMovie: Movie;

  // Trailer
  openModalTrailer: boolean;
  showPlayerTrailer: boolean;
  CloseModalTrailer: () => void;

  // Infos
  openModalInfosMovie: boolean;
  setOpenModalInfosMovie: React.Dispatch<React.SetStateAction<boolean>>;
  CloseModalInfosMovie: () => void;
  OpenModalTrailer: () => void;

  // Whole Movie
  modalTheWholeMovie: boolean;
  CloseModalTheWholeMovie: () => void;
}

export default function GlobalModauxFeatured({
  randomMovie,
  openModalTrailer,
  showPlayerTrailer,
  CloseModalTrailer,
  openModalInfosMovie,
  setOpenModalInfosMovie,
  CloseModalInfosMovie,
  OpenModalTrailer,
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
        setOpenModalInfosMovie={setOpenModalInfosMovie}
        CloseModalInfosMovie={CloseModalInfosMovie}
        OpenModalTrailer={OpenModalTrailer}
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
