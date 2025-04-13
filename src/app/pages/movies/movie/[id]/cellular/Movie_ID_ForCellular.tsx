"use client"

type MoviePageProps = {
  params: { id: string };
};

export default async function Movie_ID_ForCellular({ params }: MoviePageProps) {
  const { id } = params;

  // Appel à l'API pour récupérer le film
  const res = await fetch(`https://www.net-movie.fr/api/movies/${id}`, {
    cache: "no-store", // Empêche la mise en cache de la requête
  });

  if (!res.ok) {
    // Si la réponse est mauvaise, on affiche un message d'erreur
    return <div>Erreur lors du chargement du film (code {res.status})</div>;
  }

  const movie = await res.json(); // On récupère les données du film

  return (
    <div>
      <h1>Détails du Film</h1>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Nom:</strong> {movie.name}
      </p>
      {/* Ajouter d'autres champs selon la structure de ton API */}
    </div>
  );
}
