import axios from "axios";
import * as cheerio from "cheerio";

export async function GET() {
  const RADIO_URL = "https://generations.fr/radio/webradio/22/generations-2000";

  try {
    // Récupération du HTML de la page de la radio
    const { data } = await axios.get(RADIO_URL);
    const $ = cheerio.load(data);

    let artist = "Inconnu";
    let title = "Inconnu";
    let image = "";

    // Rechercher la section contenant les titres en cours
    $('section:contains("En ce moment sur nos webradios") div').each(
      (index, element) => {
        const radioName = $(element).find("h2").text().trim();
        if (radioName === "Generations 2000") {
          const trackInfo = $(element).find("p").text().trim();
          [artist, title] = trackInfo.split(" - ");
          image = $(element).find("img").attr("src");
        }
      }
    );

    return Response.json({ artist, title, image });
  } catch (error) {
    console.error("Erreur lors de la récupération des métadonnées:", error);
    return Response.json(
      { error: "Impossible de récupérer les métadonnées" },
      { status: 500 }
    );
  }
}
