// https://www.net-movie.fr/api/test_route

export async function GET() {
  console.log("API appelée !");
  return new Response(JSON.stringify({ message: "Ça fonctionne !" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
