import axios from "axios";

export async function fetchMovies({
  setAllMovies,
  setLoading,
}: {
  setAllMovies: Function;
  setLoading: Function;
}) {
  try {
    setLoading(true);
    const response = await axios.get("https://www.net-movie.fr/api/movies");
    setAllMovies(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  } finally {
    setLoading(false);
  }
}
