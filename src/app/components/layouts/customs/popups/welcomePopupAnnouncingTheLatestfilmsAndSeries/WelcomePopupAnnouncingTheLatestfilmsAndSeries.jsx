import React, { forwardRef, useEffect, useState } from "react";
import {
  Typography,
  DialogContent,
  DialogTitle,
  Slide,
  AccordionDetails,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Box,
} from "@mui/material";
import axios from "axios";
// STYLES
import {
  RootDialog,
  DialogActionsBtnCloseDialog,
  BtnCloseDialog,
  TypoBtnCloseDialog,
} from "./StylesWelcomePopupAnnouncingTheLatestfilmsAndSeries.jsx";

export default function WelcomePopupAnnouncingTheLatestfilmsAndSeries() {
  // RESPONSIVE
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // Styles
  const styleImgMovie = {
    border: "5px solid #000",
    borderRadius: "50%",
    height: `${matches ? "100px" : "130px"}`,
    marginRight: `${matches ? "10px" : "50px"}`,
    width: `${matches ? "100px" : "230px"}`,
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
  const [displayLatestMoviesInBDD, setdisplayLatestMoviesInBDD] = useState([]);

  useEffect(() => {
    async function getAllDisplayLatestMoviesInBDD() {
      try {
        const url =
          "https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies/displayLatestMoviesInBDD";
        // const url = `${process.env.REACT_APP_API_URL}/movies/displayLatestMoviesInBDD`;
        const { data } = await axios.get(url);
        // console.log("displayLatestMoviesInBDD :", data.movies);
        setdisplayLatestMoviesInBDD(data.movies);
      } catch (err) {
        console.log(err);
      }
    }

    getAllDisplayLatestMoviesInBDD();
  }, [displayLatestMoviesInBDD]);

  const accordionData = [
    {
      question: "Derniers Films",
      answer: displayLatestMoviesInBDD
        // sortByAlphabeticalOrder
        .sort((a, b) => a.name > b.name)
        .map(({ _id, name, img, actors }) => (
          <>
            <Tooltip title={`Accèdez au film "${name}"`}>
              <ListItem
                button
                // ATTENTION ! Laisser "component='a'", sinon le lien ne marche pas
                component='a'
                href={`movies/${_id}`}
              >
                <img src={img} alt={name} style={styleImgMovie} />
                <ListItemText primary={name} secondary={actors} />
              </ListItem>
            </Tooltip>

            <Divider />
          </>
        )),
      // answer: data.map((item) => <div>{item.question}</div>),
    },
    {
      question: "Dernières Séries",
      answer: "Désolé, aucunes séries pour le moment. 😥",
    },
  ];

  return (
    <RootDialog open={open}>
      {/* // <RootDialog open={open} TransitionComponent={Transition} keepMounted> */}
      <DialogContent>
        <DialogTitle align='center' variant='h4'>
          {"Derniers films & séries ajoutés :"}
        </DialogTitle>
        <Box className='wrapper'>
          <Box className='accordion'>
            {accordionData.map((item, i) => (
              <Box className='item'>
                <Box className='title' onClick={() => toggle(i)}>
                  {item.question} <span>{selected === i ? "-" : "+"}</span>
                </Box>

                <Box className={selected === i ? "content show" : "content"}>
                  {item.answer}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <DialogActionsBtnCloseDialog align='center' sx={{}}>
          <BtnCloseDialog
            onClick={() => {
              setOpen(false);
            }}
            href={`featured_SliderCategoryListMovies`}
            variant='contained'
          >
            <TypoBtnCloseDialog>Accèdez aux films</TypoBtnCloseDialog>
          </BtnCloseDialog>
        </DialogActionsBtnCloseDialog>
      </DialogContent>
    </RootDialog>
  );
}
