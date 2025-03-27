"use client";

import Container_Admin from "@/app/components/layouts/containers/container_Admin/Container_Admin";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface WebRadio {
  id: string;
  name: string;
  img: string;
  fluxUrl: string;
}

export default function WebRadioPage() {
  const [radios, setRadios] = useState<WebRadio[]>([]);

  useEffect(() => {
    axios
      .get("https://www.net-movie.fr/api/webradios")
      .then((res) => setRadios(res.data))
      .catch((err) => console.error("Error fetching radios:", err));
  }, []);

  async function handleDelete(id: string) {
    try {
      await axios.delete(`https://www.net-movie.fr/api/webradios/${id}`);
      setRadios(radios.filter((radio) => radio.id !== id)); // Mise à jour du state
    } catch (error) {
      console.error("Error deleting radio:", error);
    }
  }

  // useEffect(() => {
  //   fetch("https://www.net-movie.fr/api/webradios")
  //     .then((res) => res.json())
  //     .then(setRadios);
  // }, []);

  // async function handleDelete(id: string) {
  //   const res = await fetch(`https://www.net-movie.fr/api/webradios/${id}`, {
  //     method: "DELETE",
  //   });

  //   if (res.ok) {
  //     setRadios(radios.filter((radio) => radio.id !== id)); // Remove from state
  //   }
  // }

  return (
    <Container_Admin>
      <Box sx={{ background: "rgba(0, 0, 0, 0.6)", padding: "15px" }}>
        <Typography
          sx={{ fontWeight: "bold", padding: "15px 0", textAlign: "center" }}
          variant='h4'
        >
          WebRadios
        </Typography>

        <Box>
          {radios.map((radio) => (
            <Box key={radio.id}>
              <img src={radio.img} alt={radio.name} />
              <h2>{radio.name}</h2>
              <audio controls src={radio.fluxUrl}></audio>
              <button onClick={() => handleDelete(radio.id)}>Delete</button>
            </Box>
          ))}
        </Box>
      </Box>
    </Container_Admin>
  );
}
