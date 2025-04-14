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
import Container_Intro from "@/app/components/layouts/containers/container_Intro/Container_Intro";

export default function Intro_Desktop() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenModal(true);
    }, 5000); // 5000 => 5 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container_Intro>
      <RootHome>
        <BoxNetflix>
          <ThreeBoxNetflixSpan as='span' className={styles.spanLeft} />
          <ThreeBoxNetflixSpan as='span' className={styles.spanCenter} />
          <ThreeBoxNetflixSpan as='span' className={styles.spanRight} />
        </BoxNetflix>
        <TypoTitleHome variant='h2'>Net Movie</TypoTitleHome>

        {openModal ? <WelcomePopupAnnouncingTheLatestfilmsAndSeries /> : null}
      </RootHome>
    </Container_Intro>
  );
}
