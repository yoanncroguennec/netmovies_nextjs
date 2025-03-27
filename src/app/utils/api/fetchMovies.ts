import axios from "axios";

// Define TypeScript types for the expected data structure
interface Movie {
  id: number;
  title: string;
  director: string;
  actors: string[];
  description: string;
  trailer: string;
  country: string;
  productionCompany: string;
  streamingLink: string;
  image: string;
  year: number;
  genre: string;
}

interface FetchMoviesProps {
  setAllMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  setItems: React.Dispatch<React.SetStateAction<Movie[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function fetchMovies({
  setAllMovies,
  setItems,
  setLoading,
}: FetchMoviesProps) {
  try {
    setLoading(true); // Start loading when fetching begins

    const url = `https://www.net-movie.fr/api/movies?type=allMovies`;
    const { data } = await axios.get(url);

    if (data?.allMovies) {
      setAllMovies(data.allMovies);
      setItems(data.allMovies);
    } else {
      console.error("No movies found in the response.");
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    setLoading(false); // Stop loading when the fetching is complete
  }
}
