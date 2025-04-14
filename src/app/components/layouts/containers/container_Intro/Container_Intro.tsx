"use client";

import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface Container_Intro_Props {
  children: ReactNode;
}

export default function Container_Intro({ children }: Container_Intro_Props) {
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // 🔊 Lecture du son
  useEffect(() => {
    const playSound = () => {
      const audio = new Audio("/audios/Netflix.mp3");
      audio.volume = 0.5;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Son joué avec succès"))
          .catch((err) => console.log("Lecture bloquée :", err));
      }
    };

    playSound();

    const enableSoundOnInteraction = () => {
      if (!hasInteracted) {
        playSound();
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", enableSoundOnInteraction);
    window.addEventListener("keydown", enableSoundOnInteraction);

    return () => {
      window.removeEventListener("click", enableSoundOnInteraction);
      window.removeEventListener("keydown", enableSoundOnInteraction);
    };
  }, [hasInteracted]);

  return <Box>{children}</Box>;
}
