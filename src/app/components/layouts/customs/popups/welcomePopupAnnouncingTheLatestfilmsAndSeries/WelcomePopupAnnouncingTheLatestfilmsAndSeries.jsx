"use client";

import React, { forwardRef, useEffect, useState } from "react";
import {
  Typography,
  DialogContent,
  DialogTitle,
  Slide,
  ListItem,
  ListItemText,
  Tooltip,
  Box,
} from "@mui/material";
// API
// STYLES
import {
  RootDialog,
  DialogActionsBtnCloseDialog,
  BtnCloseDialog,
  TypoBtnCloseDialog,
} from "./StylesWelcomePopupAnnouncingTheLatestfilmsAndSeries.jsx";
import axios from "axios";
import Link from "next/link.js";

export default function WelcomePopupAnnouncingTheLatestfilmsAndSeries() {
  // Styles
  const styleImgMovie = {
    border: "4px solid #000",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    height: "180px",
    marginRight: "50px",
    width: "180px",
  };

  const [selected, setSelected] = useState(null);

  function toggle(i) {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  }

  // EFFECT TRANSITION DISPLAY DIALOG
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} timeout={1500} />;
  });

  // GET API Display Latest Movies In BDD
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const url = `https://www.net-movie.fr/api/movies?type=newAllMovies`;
        const res = await axios.get(url);
        setNewMovies(res.data.movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const accordionData = [
    {
      index: "01",
      bgColorIndex: "#3C8CE7, #00EAFF",
      question: "Derniers Films",
      answer: newMovies
        // sortByAlphabeticalOrder
        .sort((a, b) => a.name > b.name)
        .map(({ id, name, img, actors }) => (
          <Link
            key={id}
            href={{ pathname: `/pages/movies/movie/${id}`, query: { id: '123', name: 'John' }}} // as={`/pages/movies/movie/${_id}`}
          >
            <Tooltip title={`Accèdez au film "${name}"`}>
              <ListItem sx={{ background: "" }}>
                <img src={img} alt={name} style={styleImgMovie} />
                <h4>bb{id}</h4> 
                <ListItemText primary={id} secondary={actors} />
              </ListItem>
            </Tooltip>
          </Link>
        )),
    },
    {
      index: "02",
      bgColorIndex: "#70F570, #49C628",
      question: "Dernières Séries",
      answer: "Désolé, aucunes séries pour le moment. 😥",
    },
  ];

  return (
    <RootDialog open={open}>
      {/* // <RootDialog open={open} TransitionComponent={Transition} keepMounted> */}
      <DialogContent
      // sx={{ overflowY: "hidden"}}
      >
        <DialogTitle
          align='center'
          sx={{ color: "red", fontFamily: "sacramento", fontWeight: "bold" }}
          variant='h3'
        >
          {"Derniers films & séries ajoutés :"}
        </DialogTitle>
        {accordionData.map((item, i) => (

          <Box sx={{ padding: "8px 0" }}>
            <Box onClick={() => toggle(i)}>
              <Box
                style={{
                  alignItems: "center",
                  background: `linear-gradient(135deg, ${item.bgColorIndex})`,
                  borderRadius: "15px",
                  display: "flex",
                  flexWrap: "nowrap",
                  marginLeft: "115px",
                  marginRight: "25px",
                  padding: "10px",
                  position: "relative",
                }}
              >
          <Typography
            sx={{ fontWeight: "bold", padding: "0 20px" }}
            variant='h4'
          >
            {item.index}
          </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant='h5'>
                  {item.question}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    position: "absolute",
                    right: "50px",
                  }}
                  variant='h3'
                >
                  {selected === i ? "-" : "+"}
                </Typography>
              </Box>
            </Box>
            <Box className={selected === i ? "content show" : "content"}>
              {item.answer}
            </Box>
          </Box>
        ))}

        <DialogActionsBtnCloseDialog align='center' sx={{}}>
          <BtnCloseDialog href={`/pages/home`} variant='contained'>
            <TypoBtnCloseDialog>Accèdez aux films</TypoBtnCloseDialog>
          </BtnCloseDialog>
        </DialogActionsBtnCloseDialog>
      </DialogContent>
    </RootDialog>
  );
}
