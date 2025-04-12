import React from 'react'

export default async function page({params}) {
  const {id} = await params
  console.log('====================================');
  console.log(id);
  console.log('====================================');

  const res = await fetch(
    `https://www.net-movie.fr/api/movies/${id}`
  );

  const movie = await res.json()
  console.log('====================================');
  console.log(movie);
  console.log('====================================');
  return (
    <div>page{id} // {movie.name}</div>
  )
}


// "use client"

// import { useSearchParams } from 'next/navigation'
// import React from 'react'

// export default function page() {
//   const searchParams = useSearchParams();
//   const yy = searchParams.get("yy"); // Use .get() to

//   // Parse yy if it's a serialized JSON object
//   let parsedYy;
//   try {
//     parsedYy = JSON.parse(yy);
//   } catch (error) {
//     parsedYy = null;
//     console.error("Error parsing 'yy':", error);
//   }

//   console.log("====================================");
//   console.log(parsedYy?.name); // Access name property if it's a valid object
//   console.log("====================================");
//   return <div>page</div>;
// }

// "use client";

// import { useRouter } from "next/navigation";

// const About = () => {
//   const router = useRouter();
//   console.log('====================================');
//   console.log(router.name);
//   console.log('====================================');
//   const { query } = router;
// console.log('====================================');
// console.log(query);
// console.log('====================================');
//   // Accédez à la valeur du query 'name'
//   // const name = query.name;

//   return (
//     <div>
//       <h1>About us</h1>
//       {name && <p>Welcome, {name}!</p>}
//     </div>
//   );
// };

// export default About;

// "use client";

// import { use } from "react";
// import { useParams } from "next/navigation";

// type Movie = { _id: string; name: string; desc: string };

// async function getMovie(id: string): Promise<Movie | null> {
//   try {
//     const res = await fetch(`https://www.net-movie.fr/api/movies/${id}`);
//     if (!res.ok) throw new Error("Failed to fetch");
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export default function MoviePage() {
//   const { id } = useParams(); // Now useParams works in a Client Component
//   const movie = use(getMovie(id));

//   if (!movie) return <div>Le film n’a pas pu être trouvé.</div>;

//   return (
//     <div>
//       <h1>{movie.name}</h1>
//       <p>{movie.desc}</p>
//     </div>
//   );
// }

// "use client";

// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function MoviePage() {
// const params = useParams();
// console.log("params =>", params);

// const id = params?.id as string;

//   const [loading, setLoading] = useState(true);
//   const [movie, setMovie] = useState<any>(null);

//   useEffect(() => {
//     if (!id) return;

// const fetchMovie = async () => {
//   try {
//     const res = await axios.get(`https://www.net-movie.fr/api/movies/${id}`);
//     console.log("Réponse API brute :", res);
//     console.log("Data de l'API :", res.data); // Vérifie que c'est bien un objet JSON
//     setMovie(res.data);
//   } catch (error) {
//     console.error("Erreur API :", error);
//   } finally {
//     setLoading(false);
//   }
// };
//     fetchMovie();
//   }, [id]);

//   if (loading) return <p>Chargement...</p>;

//   if (!movie) return <p>Aucun film trouvé.</p>;

//   return (
//     <div>
//       <h1>{movie.title}</h1>
//       <p>ID : {id}</p>
//       <p>Réalisateur : {movie.name}</p>
//       <p>Description : {movie.desc}</p>
//       {/* Ajoute d'autres infos selon les données disponibles */}
//     </div>
//   );
// }
