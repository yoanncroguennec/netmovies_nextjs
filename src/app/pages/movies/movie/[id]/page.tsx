"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const params = useParams();
  console.log("params =>", params);

  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

const fetchMovie = async () => {
  try {
    const res = await axios.get(`https://www.net-movie.fr/api/movies/${id}`);
    console.log("Réponse API brute :", res);
    console.log("Data de l'API :", res.data); // Vérifie que c'est bien un objet JSON
    setMovie(res.data);
  } catch (error) {
    console.error("Erreur API :", error);
  } finally {
    setLoading(false);
  }
};
    fetchMovie();
  }, [id]);

  if (loading) return <p>Chargement...</p>;

  if (!movie) return <p>Aucun film trouvé.</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>ID : {id}</p>
      <p>Réalisateur : {movie.name}</p>
      <p>Description : {movie.desc}</p>
      {/* Ajoute d'autres infos selon les données disponibles */}
    </div>
  );
}
