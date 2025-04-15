import { Suspense } from "react";
import MovieListByGenre from "./MovieListByGenre";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement des films...</div>}>
      <MovieListByGenre />
    </Suspense>
  );
}
