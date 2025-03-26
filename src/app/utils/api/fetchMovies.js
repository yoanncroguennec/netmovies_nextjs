import axios from "axios";

export async function fetchMovies(setAllMovies, setItems, setLoading) {
  try {
    const url = `https://www.net-movie.fr/api/movies?type=allMovies`;
    const { data } = await axios.get(url);
    // console.log("res data", data.allMovies);
    setAllMovies(data.allMovies);
    setItems(data.allMovies);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
