"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
// ICONS
import { IoClose } from "react-icons/io5";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const register = async () => {
    const { email, password } = form;

    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/auth/register", {
        email,
        password,
      });

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      toast.success("Enregistrement réussi");
      router.push("/");
    } catch (error: any) {
      console.error("Erreur : ", error);
      toast.error(error?.response?.data || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Email", key: "email" },
    { label: "Mot de passe", key: "password", type: "password" },
  ];

  return (
    <Box
      sx={{
        alignItems: "center",
        // https://mycolor.space/gradient
        background:
          "linear-gradient(to left top, #cf1bd8, #b80add, #9d02e1, #7b06e6, #4a12eb)",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.9)",
          border: "8px solid #000",
          borderRadius: "20px",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          display: "flex",
          flexDirection: "column",
          padding: "70px",
          width: "350px",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Link href='/pages/home'>
            <Tooltip title={<Typography variant='h6'>Annulez</Typography>}>
              <IconButton>
                <IoClose color='#F00' size={45} />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Typography
          align='center'
          gutterBottom
          sx={{ color: "#000", fontWeight: "bold" }}
          variant='h4'
        >
          Connexion
        </Typography>

        {fields.map((field) => (
          <TextField
            disabled={loading}
            key={field.key}
            fullWidth
            label={field.label}
            onChange={(e) => handleChange(field.key, e.target.value)}
            style={{ padding: "10px 0" }}
            type={field.type || "text"}
            value={form[field.key as keyof typeof form]}
            variant='outlined'
          />
        ))}

        <Button
          onClick={register}
          disabled={loading}
          sx={{
            border: "2px solid red",
            borderRadius: "25px",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            mt: 2,
            width: "250px",
          }}
          variant='text'
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            <Typography sx={{ color: "#000", fontWeight: "bold" }} variant='h5'>
              Se connectez
            </Typography>
          )}
        </Button>
      </Box>
    </Box>
  );
}
