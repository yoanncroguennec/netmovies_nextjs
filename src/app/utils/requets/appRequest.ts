export const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTk0M2MyYmRkMTUyZGQwMWY5Yzk3NDIxZDUxOTI4NCIsInN1YiI6IjY2NDkyNjAzYTBmNzE0NGU0NDkyNWM0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OyAVcUzFenbcJhK0kHwo4R0WyjLAKswIzPp9_CIU9WI";

const appRequest = {
  fetchPopular:
    "popular?api_key=0a943c2bdd152dd01f9c97421d519284&language=en-US&page=1",
  fetchTopRated:
    "top_rated?api_key=0a943c2bdd152dd01f9c97421d519284&language=en-US&page=1",

  nowPlaying:
    "now_playing?api_key=0a943c2bdd152dd01f9c97421d519284&language=en-US&page=1",
  ///////
  fetch_New_Movies: "/displayLatestMoviesInBDD",
  fetchUpcoming: "",
  fetchRandomAMovie: "/randomMovie",
  fetchAllMovies: "/",
  fetchMovieID: "/",
  //////////
  // FETCH LIST MOVIES BY CATEGORY
  fetchActionMovies: "/sortByMovieGenre?genre=Action",
  fetchAnimatedMovies: "/sortByMovieGenre?genre=Animation",
  fetchAdventureMovies: "/sortByMovieGenre?genre=Aventure",
  fetchComedyMovies: "/sortByMovieGenre?genre=Comédie",
  fetchCrimedMovies: "/sortByMovieGenre?genre=Crime",
  fetchDramaMovies: "/sortByMovieGenre?genre=Drame",
  fetchFamilyMovies: "/sortByMovieGenre?genre=En%20famille",
  fetchFantasyMovies: "/sortByMovieGenre?genre=Fantastique",
  fetchGangsterMovies: "/sortByMovieGenre?genre=Gangster",
  fetchHorrorMovies: "/sortByMovieGenre?genre=Horreur",
  fetchMusicalMovies: "/sortByMovieGenre?genre=Musical",
  fetchPolicierMovies: "/sortByMovieGenre?genre=Policier",
  fetchRomanceMovies: "/sortByMovieGenre?genre=Romance",
  fetchFictionMovies: "/sortByMovieGenre?genre=Science-fiction",
  fetchThrillerMovies: "/sortByMovieGenre?genre=Thriller",
};

export default appRequest;
