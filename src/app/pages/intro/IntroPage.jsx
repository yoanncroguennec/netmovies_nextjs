"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation"; // ✅ Import correct
import { WelcomePopupAnnouncingTheLatestfilmsAndSeries } from "../../components/layouts";
import {
  BoxNetflix,
  RootHome,
  ThreeBoxNetflixSpan,
  TypoTitleHome,
} from "./StylesIntroPage";

export default function IntroPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();

  const [hasInteracted, setHasInteracted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  // ⏳ Affiche popup après 5s
  useEffect(() => {
    const timer = setTimeout(() => setOpenModal(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 📱 Redirige mobile après 5s
useEffect(() => {
  try {
    if (!matches) {
      const redirectTimer = setTimeout(() => {
        router.push("/pages/home");
      }, 5000);
      return () => clearTimeout(redirectTimer);
    }
  } catch (err) {
    console.error("Erreur lors de la redirection :", err);
  }
}, [matches, router]);

  return (
    <>
      <style>
        {`
          .stylesSpanLeft {
            animation: anim 1s linear forwards;
            animation-delay: 1s;
            bottom: 0;
            left: 0;
          }

          .StylesSpanCenter {
            animation: anim 1s linear forwards;
            animation-delay: 2s;
            box-shadow: 0 0 50px #000;
            left: 0;
            transform: skewX(26.5deg);
            transform-origin: top left;
            top: 0;
            z-index: 2;
          }

          .StylesSpanRight {
            animation: anim 1s linear forwards;
            animation-delay: 3s;
            bottom: 0;
            right: 0;
          }

          @keyframes anim {
            100% {
              height: 100%;
            }
          }
        `}
      </style>

      <RootHome>
        <BoxNetflix>
          <ThreeBoxNetflixSpan component='span' className='stylesSpanLeft' />
          <ThreeBoxNetflixSpan component='span' className='StylesSpanCenter' />
          <ThreeBoxNetflixSpan component='span' className='StylesSpanRight' />
        </BoxNetflix>
        <TypoTitleHome variant='h2'>Net Movie</TypoTitleHome>

        {matches && openModal ? (
          <WelcomePopupAnnouncingTheLatestfilmsAndSeries />
        ) : null}
      </RootHome>
    </>
  );
}
