// import { TOKEN } from "./appRequest";

async function fetchApiRequest(url: string) {
  try {
    const response = await fetch(
      "https://www.net-movie.fr/api/movies" +
        // "https://project44-crud-auth-net-movie-mongodb.vercel.app/api/movies" +
        url,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          // Authorization: "Bearer " + TOKEN,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}
export default fetchApiRequest;
