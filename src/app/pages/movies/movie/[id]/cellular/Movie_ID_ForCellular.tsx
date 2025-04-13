"use client";

import { useEffect, useState } from "react";

type Movie_ID_ForCellular_Props = {
  params: { id: string };
};

type Movie = {
  name: string;
  // Ajoute ici les autres propriétés de ton film selon ton API
};

export default function Movie_ID_ForCellular({
  params,
}: Movie_ID_ForCellular_Props) {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://www.net-movie.fr/api/movies/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(
            `Erreur lors du chargement du film (code ${res.status})`
          );
        }

        const data = await res.json();
        setMovie(data);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      }
    };

    fetchMovie();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Chargement du film...</div>;
  }

  return (
    <div style={{ padding: "1rem", fontSize: "1.1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Détails du Film (Mobile)
      </h1>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Nom:</strong> {movie.name || "Non disponible"}
      </p>
      {/* Ajoute ici d'autres champs si disponibles */}
    </div>
  );
}
