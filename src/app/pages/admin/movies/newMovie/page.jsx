"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchMovies } from "./api"; // Import the API function
import { MdDelete, MdMore } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import axios from "axios";

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

export default function Page() {
  const [loading, setLoading] = useState(false);
  //
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  //
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    realisators: [""],
    actors: [""],
    desc: "",
    trailer: "",
    selectedCountry: [""],
    productionCompany: "",
    movieLink: "",
    img: "",
    year: "",
    selectedGenres: [""],
  });

  function handleAddFieldRealisators() {
    setFormData((prev) => ({
      ...prev,
      realisators: [...prev.realisators, ""],
    }));
  }

  function handleChangeRealisators(index, value) {
    setFormData((prev) => {
      const newRealisators = [...prev.realisators];
      newRealisators[index] = value;
      return { ...prev, realisators: newRealisators };
    });
  }

  function handleDeleteFieldRealisators(index) {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.filter((_, i) => i !== index),
    }));
  }

  //
  function handleAddFieldActors() {
    setFormData((prev) => ({
      ...prev,
      actors: [...prev.actors, ""],
    }));
    toast.info("Champ d'acteur ajouté !");
  }

  function handleChangeActors(index, value) {
    setFormData((prev) => {
      const newActors = [...prev.actors];
      newActors[index] = value;
      return { ...prev, actors: newActors };
    });
  }

  function handleDeleteFieldActors(index) {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.filter((_, i) => i !== index),
    }));
    toast.success("Champ d'acteur supprimé !");
  }

  //
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(); // Fetch movies from the external API

        // Extraire et trier les country
        const uniqueCountry = [
          ...new Set(data.flatMap((movie) => movie.country)),
        ].sort((a, b) => a.localeCompare(b));
        setCountry(uniqueCountry);

        // Extraire et trier les genres
        const uniqueGenres = [
          ...new Set(data.flatMap((movie) => movie.genre)),
        ].sort();
        setGenres(uniqueGenres); // Mise à jour de l'état genres
      } catch (err) {
        setError(
          "Impossible de récupérer les films. Veuillez réessayer plus tard."
        );
        console.error(err);
      }
    };

    getMovies();
  }, []);

  function handleGenreChange(e) {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      selectedGenres: value,
    }));
  }

  function handleCountryChange(e) {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      selectedCountry: value,
    }));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    // Vérifier si c'est un champ qui doit contenir un lien
    if (
      (name === "trailer" || name === "movieLink" || name === "img") &&
      value
    ) {
      const urlPattern = /^(https?:\/\/[^\s]+)$/;
      if (!urlPattern.test(value)) {
        toast.error(
          `Le champ ${name} doit être un lien valide commençant par http:// ou https://`
        );
      } else {
        setError(""); // Supprimer l'erreur si le lien devient valide
      }
    }

    // Vérifier si c'est le champ "year" et autoriser uniquement les chiffres
    if (name === "year" && value && !/^\d*$/.test(value)) {
      toast.warning("L'année doit contenir uniquement des chiffres.");
      return; // Ne rien faire si la saisie contient autre chose que des chiffres
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.desc) {
      toast.error("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    try {
      const response = await axios.post("https://www.net-movie.fr/api/movies", formData);
      console.log("Form Data to send:", formData);
      toast.success("Film ajouté avec succès !");
      console.log("Movie added:", response.data);
      setFormData({
        name: name,
        realisators: realisators,
        actors: actors,
        desc: desc,
        trailer: trailer,
        selectedCountry: selectedCountry,
        productionCompany: productionCompany,
        movieLink: movieLink,
        img: img,
        year: year,
        selectedGenres: selectedGenres,
      }); // Reset form
    } catch (error) {
      toast.error("Erreur lors de l'ajout du film.");
      console.error("Error adding movie:", error.response || error); // Affiche les détails de l'erreur
    }
  }

  return (
    <Box
      sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}
    >
      <ToastContainer position='top-center' autoClose={3000} hideProgressBar />

      <Typography
        sx={{ fontWeight: "bold", padding: "25px 0", textAlign: "center" }}
        variant='h4'
      >
        Nouveau Film
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            border: "3px solid #F00",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            padding: "25px",
            width: "600px",
          }}
        >
          <TextField
            label='Nom du film'
            name='name' // Ajoute "name"
            onChange={handleInputChange}
            value={formData.name}
            variant='outlined'
          />
          {formData.realisators.map((realisator, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <TextField
                label={`Realisator ${index + 1}`}
                value={realisator}
                onChange={(e) => handleChangeRealisators(index, e.target.value)}
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

          {formData.actors.map((actor, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <TextField
                label={`Actor ${index + 1}`}
                value={actor}
                onChange={(e) => handleChangeActors(index, e.target.value)}
                fullWidth
              />
              <MdDelete
                color='#F00'
                onClick={() => handleDeleteFieldActors(index)}
                size={45}
                style={{ cursor: "pointer", padding: "0 5px" }}
              />
              <HiPlus
                color='#000'
                onClick={handleAddFieldActors}
                size={45}
                style={{ cursor: "pointer", padding: "0 5px" }}
              />
            </Box>
          ))}

          <TextField
            label='Description du film'
            name='desc'
            onChange={handleInputChange}
            type='text'
            value={formData.desc}
            variant='outlined'
          />

          <TextField
            error={
              error &&
              formData.trailer &&
              !/^(https?:\/\/[^\s]+)$/.test(formData.trailer)
            }
            helperText={
              error &&
              formData.trailer &&
              !/^(https?:\/\/[^\s]+)$/.test(formData.trailer)
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
            label='Bande-annonce du film'
            name='trailer'
            onChange={handleInputChange}
            type='text'
            value={formData.trailer}
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
              value={formData.selectedCountry}
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
            label='Nom de la production de compagnie du film'
            name='productionCompany'
            onChange={handleInputChange}
            type='text'
            value={formData.productionCompany}
            variant='outlined'
          />

          <TextField
            label='Lien du film'
            name='movieLink'
            onChange={handleInputChange}
            type='text'
            value={formData.movieLink}
            variant='outlined'
            error={
              error &&
              formData.movieLink &&
              !/^(https?:\/\/[^\s]+)$/.test(formData.movieLink)
            }
            helperText={
              error &&
              formData.movieLink &&
              !/^(https?:\/\/[^\s]+)$/.test(formData.movieLink)
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
          />

          <TextField
            label='Photo du film'
            name='img'
            onChange={handleInputChange}
            type='text'
            value={formData.img}
            variant='outlined'
            error={
              error &&
              formData.img &&
              !/^(https?:\/\/[^\s]+)$/.test(formData.img)
            }
            helperText={
              error &&
              formData.img &&
              !/^(https?:\/\/[^\s]+)$/.test(formData.img)
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
          />

          <TextField
            label='Année du film'
            name='year'
            onChange={handleInputChange}
            type='number'
            value={formData.year}
            variant='outlined'
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
              value={formData.selectedGenres}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type='submit'
            sx={{ border: "3px solid #F00", borderRadius: "25px" }}
            variant='text'
          >
            <Typography
              sx={{
                color: "#F00",
                fontWeight: "bold",
                padding: "10px 15px",
                textAlign: "center",
              }}
              variant='h6'
            >
              Ajoutez film
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
}
