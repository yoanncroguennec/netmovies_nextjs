import { NextResponse } from "next/server";
import scrapeMetadata from "metadata-scraper";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL manquante" }, { status: 400 });
  }

  try {
    const metadata = await scrapeMetadata(url);
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible d'extraire les métadonnées" },
      { status: 500 }
    );
  }
}
