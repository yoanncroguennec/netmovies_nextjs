"use client";

import React, { useState, useEffect } from "react";
import { WelcomePopupAnnouncingTheLatestfilmsAndSeries } from "../../../components/layouts";
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
      {openModal ? <WelcomePopupAnnouncingTheLatestfilmsAndSeries /> : null}
    </Container_Intro>
  );
}
