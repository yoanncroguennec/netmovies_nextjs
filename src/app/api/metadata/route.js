import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const RADIO_URL = "https://generations.fr/radio/webradio/22/generations-2000";

  try {
    // Récupération du contenu HTML de la page
    const { data } = await axios.get(RADIO_URL);

    // Chargement du HTML avec cheerio
    const $ = cheerio.load(data);

    // Sélection de la section contenant les informations des webradios
    const webradiosSection = $(
      'section:contains("En ce moment sur nos webradios")'
    );

    // Parcours des éléments pour trouver Générations 2000
    let artist = "Inconnu";
    let title = "Inconnu";
    let image = "";

    webradiosSection.find("div").each((index, element) => {
      const radioName = $(element).find("h2").text().trim();
      if (radioName === "Generations 2000") {
        const trackInfo = $(element).find("p").text().trim();
        [artist, title] = trackInfo.split(" - ");
        image = $(element).find("img").attr("src");
      }
    });

    res.status(200).json({ artist, title, image });
  } catch (error) {
    console.error("Erreur lors de la récupération des métadonnées:", error);
    res.status(500).json({ error: "Impossible de récupérer les métadonnées" });
  }
}
