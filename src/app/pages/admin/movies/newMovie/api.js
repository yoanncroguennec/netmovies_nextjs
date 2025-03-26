import axios from "axios";

const API_URL = "https://www.net-movie.fr/api/movies?type=allMovies";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.allMovies; // Return the movie data
  } catch (err) {
    throw new Error(
      "Impossible de récupérer les films. Veuillez réessayer plus tard."
    );
  }
};
