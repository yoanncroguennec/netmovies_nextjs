"use client";

import React, { useState, useEffect } from "react";
import { WelcomePopupAnnouncingTheLatestfilmsAndSeries } from "../../../components/layouts";
// STYLES
import {
  BoxNetflix,
  RootHome,
  ThreeBoxNetflixSpan,
  TypoTitleHome,
} from "../StylesIntroPage";
import styles from "../stylesIntroPage.module.css";

export default function Intro_Desktop() {
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenModal(true);
    }, 5000); // 5000 => 5 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <RootHome>
      <BoxNetflix>
        <ThreeBoxNetflixSpan as='span' className={styles.spanLeft} />
        <ThreeBoxNetflixSpan as='span' className={styles.spanCenter} />
        <ThreeBoxNetflixSpan as='span' className={styles.spanRight} />
      </BoxNetflix>
      <TypoTitleHome variant='h2'>Net Movie</TypoTitleHome>

      {openModal ? <WelcomePopupAnnouncingTheLatestfilmsAndSeries /> : null}
    </RootHome>
  );
}
