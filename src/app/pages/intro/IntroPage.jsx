"use client";

import React, { useState, useEffect, useRef } from "react";
import { WelcomePopupAnnouncingTheLatestfilmsAndSeries } from "../../components/layouts";
import {
  BoxNetflix,
  RootHome,
  ThreeBoxNetflixSpan,
  TypoTitleHome,
} from "./StylesIntroPage";

export default function IntroPage({}) {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    //       Essai immédiat : Le son est tenté dès le chargement de la page.
    // Gestion des erreurs : Si la lecture est bloquée, on attend une interaction (clic ou touche du clavier).
    // Une seule interaction nécessaire : Dès qu'un clic ou une touche est détectée, le son est joué
    const playSound = () => {
      const audio = new Audio("/audio/Netflix.mp3");
      audio.volume = 0.5; // Ajuste le volume pour éviter que ce soit trop fort
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Son joué avec succès"))
          .catch((err) => console.log("Lecture bloquée :", err));
      }
    };

    // Tente de jouer le son immédiatement (si autorisé)
    playSound();

    // Active la lecture après interaction si nécessaire
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

  // const audioRef = useRef(null);

  // useEffect(() => {
  //   audioRef.current = new Audio("/audio/Netflix.mp3");
  //   audioRef.current
  //     .play()
  //     .catch((err) => console.log("Lecture bloquée :", err));
  // }, []);

  //
  const [openModal, setOpenModal] = useState(false);
  const delay = 5;

  useEffect(() => {
    let timer1 = setTimeout(() => setOpenModal(true), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      {/* ATTENTION !
          PUT THIS PART OF THE STYLES JSX WITH "@keyframes" BECAUSE IT DOESN'T WORK WITH "MUI"  */}
      <style>
        {`
              .stylesSpanLeft{
                  animation: anim 1s linear forwards;
                  animation-delay: 1s;
                  bottom: 0;
                  left: 0;
                  
              }

              .StylesSpanCenter{
                  animation: anim 1s linear forwards;
                  animation-delay: 2s;
                  box-shadow: 0 0 50px #000;
                  left: 0;
                  transform: skewX(26.5deg);
                  transform-origin: top left;
                  top: 0;                  
                  z-index: 2;
                }
                              
                .StylesSpanRight{
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
      {/* PART CODE JSX */}
      <RootHome>
        <BoxNetflix>
          <ThreeBoxNetflixSpan component='span' className='stylesSpanLeft' />
          <ThreeBoxNetflixSpan component='span' className='StylesSpanCenter' />
          <ThreeBoxNetflixSpan component='span' className='StylesSpanRight' />
        </BoxNetflix>
        <TypoTitleHome variant='h2'>Net Movie</TypoTitleHome> */
        {openModal ? <WelcomePopupAnnouncingTheLatestfilmsAndSeries /> : null}
      </RootHome>
    </>
  );
}
