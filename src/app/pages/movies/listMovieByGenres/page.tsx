import { Suspense } from "react";
import MoviesListByGenre from "./moviesListByGenre/MoviesListByGenre";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement des films...</div>}>
      <MoviesListByGenre />
    </Suspense>
  );
}
