"use client";

import React, { useState, useEffect } from "react";
// STYLES
import {
  BoxNetflix,
  RootHome,
  ThreeBoxNetflixSpan,
  TypoTitleHome,
} from "../StylesIntroPage";
import styles from "../stylesIntroPage.module.css";

export default function Intro_Cellular() {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/pages/home";
    }, 5000); // 5000 = 5 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <style>
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
      </style> */}

      <RootHome>
        <BoxNetflix>
          <ThreeBoxNetflixSpan as='span' className={styles.spanLeft} />
          <ThreeBoxNetflixSpan as='span' className={styles.spanCenter} />
          <ThreeBoxNetflixSpan as='span' className={styles.spanRight} />
        </BoxNetflix>
        <TypoTitleHome variant='h2'>Net Movie</TypoTitleHome>
      </RootHome>
    </>
  );
}
