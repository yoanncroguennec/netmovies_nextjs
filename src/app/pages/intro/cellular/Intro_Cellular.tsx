"use client";

import React, { useEffect } from "react";
// STYLES
import {
  BoxNetflix,
  RootHome,
  ThreeBoxNetflixSpan,
  TypoTitleHome,
} from "../StylesIntroPage";
import styles from "../stylesIntroPage.module.css";
import Container_Intro from "@/app/components/layouts/containers/container_Intro/Container_Intro";

export default function Intro_Cellular() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/pages/home";
    }, 5000); // 5000 = 5 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container_Intro>
      <></>
    </Container_Intro>
  );
}
