/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  images: {
    domains: [
      "images.pexels.com",
      "res.cloudinary.com",
      // IMGS LIST MOVIES
      "occ-0-2996-56.1.nflxso.net",
      "photos.tf1.fr",
      "www.justwatch.com",
      "images-na.ssl-images-amazon.com",
      "fr.web.img6.acsta.net",
      "fr.web.img4.acsta.net",
      "media.ouest-france.fr",
      "media.ouest-france.fr",
      "www.cineplateforme.cc",
      "www.tinostream.com",
      // URL IMGS FOR TV PROGRAMMES
      "www.teleboy.ch",
      "focus.telerama.fr",
      "img.bouygtel.fr",
      "images.voomotion.be",
      "static-cdn.tv.sfr.net",
      "thumb.canalplus.pro",
      "resize.programme-television.ladmedia.fr",
    ],
  },
};

export default nextConfig;
