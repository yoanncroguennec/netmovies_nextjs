"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container_Admin from "@/app/components/layouts/containers/container_Admin/Container_Admin";
// API
import { fetchMovies } from "./api";
// ICONS
import { MdDelete } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

interface Movie {
  country: string[];
  genre: string[];
  // Add other properties if needed
}

const formControl = {
  backgroundColor: "#000",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#F00",
    },
    "&:hover fieldset": {
      borderColor: "#F00",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F00",
    },
    "& input": {
      color: "red",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#F00",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "red",
  },
  color: "white",
  margin: "0 10px",
};

export default function AddMoviePage() {
  const router = useRouter(); // Initialize useRouter

  const [loading, setLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  // console.log('====================================');
  // console.log(selectedCountry);
  // console.log('====================================');
  const [formData, setFormData] = useState({
    name: "",
    realisators: [""],
    actors: "",
    desc: "",
    trailer: "",
    country: "",
    productionCompany: "",
    movieLink: "",
    img: "",
    year: "",
    genre: [""],
  });

  const [error, setError] = useState({
    trailer: false,
    movieLink: false,
    img: false,
  });

  // Helper function for URL validation
  function validateURL(url: string) {
    const urlPattern = /^(https?:\/\/[^\s]+)$/;
    return urlPattern.test(url);
  }

  function handleAddFieldRealisators() {
    setFormData((prev) => ({
      ...prev,
      realisators: [...prev.realisators, ""],
    }));
    toast.info("Champ de réalisateur ajouté !");
  }

  function handleChangeRealisators(index: number, value: string) {
    setFormData((prev) => {
      const newRealisators = [...prev.realisators];
      newRealisators[index] = value;
      return { ...prev, realisators: newRealisators };
    });
  }

  function handleDeleteFieldRealisators(index: number) {
    setFormData((prev) => ({
      ...prev,
      realisators: prev.realisators.filter((_, i) => i !== index),
    }));
    toast.success("Champ de réalisateur supprimé !");
  }

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(); // Fetch movies from the external API

        // Extraire et trier les country
        // const uniqueCountry = [
        //   ...new Set(data.flatMap((movie) => movie.country)),
        // ].sort((a, b) => a.localeCompare(b));
        const uniqueCountry = Array.from(
          new Set(data.flatMap((movie: Movie) => movie.country))
        ).sort((a: string, b: string) => a.localeCompare(b));
        setCountry(uniqueCountry);

        // Extraire et trier les genres
        // const uniqueGenres = [
        //   ...new Set(data.flatMap((movie) => movie.genre)),
        // ].sort();
        const uniqueGenres = Array.from(
          new Set(data.flatMap((movie: Movie) => movie.genre))
        ).sort();
        setGenres(uniqueGenres); // Mise à jour de l'état genres
      } catch (err) {
        toast.error(
          "Impossible de récupérez la listes des pays et des genres de films de la BDD !"
        );
        console.error(err);
      }
    };

    getMovies();
  }, []);

  function handleGenreChange(e: React.ChangeEvent<{ value: unknown }>) {
    const { value } = e.target;
    setSelectedGenres(value as string[]);
  }

  function handleCountryChange(e: React.ChangeEvent<{ value: unknown }>) {
    const { value } = e.target;
    setSelectedCountry(value as string[]);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // // Validate fields
    // if (
    //   !formData.name ||
    //   !formData.realisators ||
    //   !formData.actors ||
    //   !formData.desc ||
    //   !formData.trailer ||
    //   !formData.country ||
    //   !formData.productionCompany ||
    //   !formData.movieLink ||
    //   !formData.img ||
    //   !formData.year ||
    //   !formData.genre
    // ) {
    //   toast.error("Veuillez remplir tous les champs obligatoires !");
    //   return;
    // }

    const trailerValid = validateURL(formData.trailer);
    const movieLinkValid = validateURL(formData.movieLink);
    const imgValid = validateURL(formData.img);

    if (!trailerValid || !movieLinkValid || !imgValid) {
      toast.error("Les liens doivent commencer par http:// ou https://");
      setError({
        trailer: !trailerValid,
        movieLink: !movieLinkValid,
        img: !imgValid,
      });
      return;
    }

    const data = {
      ...formData,
      actors: formData.actors.split(","), // Méthode .split(",") : divise un string en un array en fonction d'un séparateur spécifique, la c'est une virgule ","
      // country: formData.country.split(","),
      country: selectedCountry,
      genre: selectedGenres,
      year: parseInt(formData.year, 10), // Function parseInt: converti un string en un integer (INT)
    };

    try {
      await axios.post("https://www.net-movie.fr/api/movies", data);
      toast.success("Film ajouté avec succès !");
      //  router.push("/pages/admin/movies");
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'ajout du Film.");
      console.error("Erreur lors de l'ajout du film :", error);
    }
  };

  return (
    <Container_Admin>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "25px",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          padding: "50px",
        }}
      >
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar
        />

        <Typography
          sx={{ fontWeight: "bold", padding: "15px 0", textAlign: "center" }}
          variant='h4'
        >
          Nouveau Film
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "1000px",
            width: "500px",
          }}
        >
          <TextField
            label='Nom du film'
            name='name'
            onChange={handleChange}
            required
            type='text'
            value={formData.name}
            variant='outlined'
          />

          {formData.realisators.map((realisator, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <TextField
                label={`Réalisateur ${index + 1}`}
                name='realisators'
                onChange={(e) => handleChangeRealisators(index, e.target.value)}
                required
                type='text'
                value={realisator}
                fullWidth
              />
              <MdDelete
                color='#F00'
                onClick={() => handleDeleteFieldRealisators(index)}
                size={45}
                style={{ cursor: "pointer", padding: "0 5px" }}
              />
              <HiPlus
                color='#000'
                onClick={handleAddFieldRealisators}
                size={45}
                style={{ cursor: "pointer", padding: "0 5px" }}
              />
            </Box>
          ))}

          <TextField
            label='Acteurs (séparés par des virgules)'
            name='actors'
            onChange={handleChange}
            required
            type='text'
            value={formData.actors}
            variant='outlined'
          />

          <TextField
            label='Description du film'
            multiline
            name='desc'
            onChange={handleChange}
            required
            rows={5}
            type='text'
            value={formData.desc}
            variant='outlined'
          />

          <TextField
            error={error.trailer}
            helperText={
              error.trailer
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
            label='URL Bande-annonce du film'
            name='trailer'
            onChange={handleChange}
            required
            type='text'
            value={formData.trailer}
            variant='outlined'
          />

          <TextField
            label='Compagnie de production du film'
            name='productionCompany'
            onChange={handleChange}
            required
            type='text'
            value={formData.productionCompany}
            variant='outlined'
          />

          <TextField
            error={error.movieLink}
            helperText={
              error.movieLink
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
            label='URL STREAM du film'
            name='movieLink'
            onChange={handleChange}
            required
            type='text'
            value={formData.movieLink}
            variant='outlined'
          />

          <TextField
            error={error.img}
            helperText={
              error.img
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
            label='URL Photo du film'
            name='img'
            onChange={handleChange}
            required
            type='text'
            value={formData.img}
            variant='outlined'
          />

          <FormControl sx={[formControl, { width: "500px" }]}>
            <InputLabel>Filtrer par pays</InputLabel>
            <Select
              label='Filtrer par pays'
              multiple
              MenuProps={{
                PaperProps: {
                  style: {
                    color: "#000",
                    maxHeight: 300,
                  },
                },
              }}
              onChange={handleCountryChange}
              renderValue={(selected) => selected.join(", ")}
              sx={{
                color: "#F00",
                "& .MuiMenuItem-root": {
                  color: "purple",
                },
              }}
              value={selectedCountry}
            >
              {country.map((country_item) => (
                <MenuItem key={country_item} value={country_item}>
                  <Checkbox
                    checked={selectedCountry.indexOf(country_item) > -1}
                  />
                  <ListItemText primary={country_item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            InputProps={{
              inputProps: { min: 0 }, // Optionnel : Empêche les années négatives
              sx: {
                // Supprime les flèches dans Chrome, Edge et Safari.
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                // Supprime les flèches dans Firefox.
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            }}
            label='Date de sortie du film'
            name='year'
            onChange={handleChange}
            required
            type='number'
            value={formData.year}
            variant='outlined'
          />

          <FormControl sx={[formControl, { width: "500px" }]}>
            <InputLabel>Filtrer par genres</InputLabel>
            <Select
              label='Filtrer par genres'
              multiple
              MenuProps={{
                PaperProps: {
                  style: {
                    color: "#000",
                    maxHeight: 300,
                  },
                },
              }}
              onChange={handleGenreChange}
              renderValue={(selected) => selected.join(", ")}
              sx={{
                color: "#F00",
                "& .MuiMenuItem-root": {
                  color: "purple",
                },
              }}
              value={selectedGenres}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded'
          >
            Ajouter
          </button>
        </form>
      </Box>
    </Container_Admin>
  );
}
