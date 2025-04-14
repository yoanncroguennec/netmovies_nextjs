"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
// LAYOUTS
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp";
import Container_Movie_ID_ForDesktop from "@/app/components/layouts/containers/container_Movie_ID_ForDesktop/Container_Movie_ID_ForDesktop";
// STYLES
import {
  Root,
  BoxItem,
  TypoTitle,
  BoxWrap,
  Typo,
  TypoItem,
} from "./StylesMovie_ID_ForDesktop";
import BreadcrumbsMovie from "@/app/utils/functions/MovieID_Desktop/BreadcrumbsMovie";

type Movie_ID_ForCellular_Props = {
  error?: string;
  movie?: {
    name: string;
    realisators: string[];
    actors: string[];
    desc: string;
    trailer: string;
    country: string[];
    productionCompany: string;
    movieLink: string;
    img: string;
    year: string;
    genre: string[];
  };
};

export default function Movie_ID_ForDesktop({ error, movie }: Movie_ID_ForCellular_Props) {
  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Chargement du film...</div>;
  }

  const {
    name,
    realisators,
    actors,
    desc,
    trailer,
    country,
    productionCompany,
    movieLink,
    img,
    year,
    genre,
  } = movie;

  return (
    <Container_GlobalApp>
      <Container_Movie_ID_ForDesktop>
        <Root>
          <BoxItem>
            <BreadcrumbsMovie />
            <TypoTitle variant='h4'>{name}</TypoTitle>
            <img
              alt='movie'
              src={img}
              height={1550}
              style={{
                borderRadius: "50%",
                boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
                border: "8px solid #000",
                float: "left",
                height: "220px",
                margin: "0 20px 5px 0",
                shapeOutside: "margin-box",
                width: "220px",
              }}
              width={1550}
            />
            <Fade delay={1e3} cascade damping={1e-1}>
              <Typo variant='body1'>
                <strong>Réalisateurs :</strong>{" "}
                {realisators.filter(Boolean).join(", ") || "Non disponible"}
              </Typo>
              <Typo variant='body1'>
                <strong>Acteurs :</strong>{" "}
                {actors.filter(Boolean).join(", ") || "Non disponible"}
              </Typo>
              <Typo variant='body1'>{desc}</Typo>
            </Fade>

            <BoxWrap>
              <Slide>
                {country.map((item) => (
                  <TypoItem variant='body1'>{item}</TypoItem>
                ))}
                {genre.map((item) => (
                  <TypoItem variant='body1'>{item}</TypoItem>
                ))}
              </Slide>
            </BoxWrap>

            <BoxWrap>
              <Slide>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  href=''
                >
                  <TypoItem variant='body1'>Bande-annonce</TypoItem>
                </Link>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  href=''
                >
                  <TypoItem variant='body1'>Voir Film</TypoItem>
                </Link>
              </Slide>
            </BoxWrap>
          </BoxItem>
        </Root>
      </Container_Movie_ID_ForDesktop>
    </Container_GlobalApp>
  );
}
