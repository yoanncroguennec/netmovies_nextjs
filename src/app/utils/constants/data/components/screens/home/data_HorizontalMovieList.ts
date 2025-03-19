import appRequest from "@/app/utils/requets/appRequest";

const data_HorizontalMovieList = [
  {
    titleSection: "Nouveautés (films)",
    endPointUrl: appRequest.fetch_New_Movies,
  },
  // {
  //   titleSection: "Bientôt disponible",
  //   endPointUrl: appRequest.fetchUpcoming,
  // },
  {
    titleSection: "Action",
    endPointUrl: appRequest.fetchActionMovies,
  },
  {
    titleSection: "Animation",
    endPointUrl: appRequest.fetchAnimatedMovies,
  },
  {
    titleSection: "Aventure",
    endPointUrl: appRequest.fetchAdventureMovies,
  },
  {
    titleSection: "Comédie",
    endPointUrl: appRequest.fetchComedyMovies,
  },
  {
    titleSection: "Crime",
    endPointUrl: appRequest.fetchCrimedMovies,
  },
  {
    titleSection: "Drame",
    endPointUrl: appRequest.fetchDramaMovies,
  },
  {
    titleSection: "En Famille",
    endPointUrl: appRequest.fetchFamilyMovies,
  },
  {
    titleSection: "Fantastique",
    endPointUrl: appRequest.fetchFantasyMovies,
  },
  {
    titleSection: "Gangster",
    endPointUrl: appRequest.fetchGangsterMovies,
  },
  {
    titleSection: "Horreur",
    endPointUrl: appRequest.fetchHorrorMovies,
  },
  {
    titleSection: "Musical",
    endPointUrl: appRequest.fetchMusicalMovies,
  },
  {
    titleSection: "Policier",
    endPointUrl: appRequest.fetchPolicierMovies,
  },
  {
    titleSection: "Romance",
    endPointUrl: appRequest.fetchRomanceMovies,
  },
  {
    titleSection: "Science-Fiction",
    endPointUrl: appRequest.fetchFictionMovies,
  },
  {
    titleSection: "Thriller",
    endPointUrl: appRequest.fetchThrillerMovies,
  },
];

export default data_HorizontalMovieList;