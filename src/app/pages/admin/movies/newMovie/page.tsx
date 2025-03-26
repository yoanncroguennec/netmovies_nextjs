"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Container_Admin from "@/app/components/layouts/containers/container_Admin/Container_Admin";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { HiPlus } from "react-icons/hi";

export default function NewWebRadioPage() {
  const router = useRouter(); // Initialize useRouter

  const [formData, setFormData] = useState({
    name: "",
    realisators: [""],
    actors: [""],
    desc: "",
    trailer: "",
    favorite: false,
    watch: false,
    country: ["String", "String", "String"],
    productionCompany: "",
    movieLink: "",
    img: "",
    year: 1998,
    genre: ["String", "String", "String"],
    rating: "",
  });

  const [error, setError] = useState({
    trailer: false,
    movieLink: false,
    img: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

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

  //
  function handleAddFieldActors() {
    setFormData((prev) => ({
      ...prev,
      actors: [...prev.actors, ""],
    }));
    toast.info("Champ d'acteur ajouté !");
  }

  function handleChangeActors(index: number, value: string) {
    setFormData((prev) => {
      const newActors = [...prev.actors];
      newActors[index] = value;
      return { ...prev, actors: newActors };
    });
  }

  function handleDeleteFieldActors(index: number) {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.filter((_, i) => i !== index),
    }));
    toast.success("Champ d'acteur supprimé !");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate fields
    if (
      !formData.name ||
      !formData.realisators ||
      !formData.actors ||
      !formData.desc ||
      !formData.trailer ||
      !formData.country ||
      !formData.productionCompany ||
      !formData.movieLink ||
      !formData.img ||
      !formData.year ||
      !formData.genre
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires !");
      return;
    }

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

    try {
      const res = await axios.post(
        "https://www.net-movie.fr/api/movies",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        toast.success("Film ajouté avec succès !");
        setFormData({
          name: "",
          realisators: [""],
          actors: [""],
          desc: "",
          trailer: "",
          favorite: false,
          watch: false,
          country: ["", "", ""],
          productionCompany: "",
          movieLink: "",
          img: "",
          year: 1998,
          genre: ["", ""],
          rating: 4,
        });

        // setTimeout(() => {
        //   router.push("/webradios");
        // }, 2000);
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'ajout du Film.");
    }
  }

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
          style={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <TextField
            label='Nom du film'
            name='name'
            onChange={handleChange}
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
                label={`Acteur ${index + 1}`}
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
            onChange={handleChange}
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
            label='Photo URL de la webRadio'
            name='trailer'
            onChange={handleChange}
            type='text'
            value={formData.trailer}
            variant='outlined'
          />

          <TextField
            label='Compagnie de production du film'
            name='productionCompany'
            onChange={handleChange}
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
            label='Stream URL'
            name='movieLink'
            onChange={handleChange}
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
            label='Stream URL'
            name='img'
            onChange={handleChange}
            type='text'
            value={formData.img}
            variant='outlined'
          />

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
            type='number'
            value={formData.year}
            variant='outlined'
          />

          <button type='submit'>Ajouter nouveau film</button>
        </form>
      </Box>
    </Container_Admin>
  );
}
