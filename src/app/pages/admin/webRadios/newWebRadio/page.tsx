"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Container_Admin from "@/app/components/layouts/containers/container_Admin/Container_Admin";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function NewWebRadioPage() {
  const router = useRouter(); // Initialize useRouter

  const [formData, setFormData] = useState({ name: "", img: "", fluxUrl: "" });
  const [error, setError] = useState({
    img: false,
    fluxUrl: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper function for URL validation
  const validateURL = (url: string) => {
    const urlPattern = /^(https?:\/\/[^\s]+)$/;
    return urlPattern.test(url);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate fields
    if (!formData.name || !formData.img || !formData.fluxUrl) {
      toast.error("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const imgValid = validateURL(formData.img);
    const fluxUrlValid = validateURL(formData.fluxUrl);

    if (!imgValid || !fluxUrlValid) {
      toast.error("Les liens doivent commencer par http:// ou https://");
      setError({
        img: !imgValid,
        fluxUrl: !fluxUrlValid,
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://www.net-movie.fr/api/webradios",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        toast.success("WebRadio ajouté avec succès !");
        setFormData({ name: "", img: "", fluxUrl: "" });
        setTimeout(() => {
          router.push("/webradios");
        }, 2000);
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'ajout de la WebRadio.");
    }
  }

  return (
    <>
      <Box sx={{ background: "rgba(255, 255, 255, 0.9)", padding: "15px" }}>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar
        />

        <Typography
          sx={{ fontWeight: "bold", padding: "15px 0", textAlign: "center" }}
          variant='h4'
        >
          WebRadios
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label='Nom de la webRadio'
            name='name'
            onChange={handleChange}
            type='text'
            value={formData.name}
            variant='outlined'
          />

          <TextField
            error={error.img}
            helperText={
              error.img
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
            label='Photo URL de la webRadio'
            name='img'
            onChange={handleChange}
            type='text'
            value={formData.img}
            variant='outlined'
          />

          <TextField
            error={error.fluxUrl}
            helperText={
              error.fluxUrl
                ? "Lien invalide, doit commencer par http:// ou https://"
                : ""
            }
            label='Stream URL'
            name='fluxUrl'
            onChange={handleChange}
            type='text'
            value={formData.fluxUrl}
            variant='outlined'
          />

          <button
            type='submit'
          >
            Add WebRadio
          </button>
        </form>
      </Box>
    </>
  );
}
