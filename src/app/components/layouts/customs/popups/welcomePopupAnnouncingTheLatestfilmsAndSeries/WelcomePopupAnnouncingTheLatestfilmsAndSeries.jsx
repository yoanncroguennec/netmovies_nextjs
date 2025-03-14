import React, { forwardRef, useEffect, useState } from "react";
import {
  Typography,
  DialogContent,
  DialogTitle,
  Slide,
  ListItem,
  ListItemText,
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
    border: "4px solid #000",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
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
      index: "01",
      bgColorIndex: "#3C8CE7, #00EAFF",
      question: "Derniers Films",
      answer: displayLatestMoviesInBDD
        // sortByAlphabeticalOrder
        .sort((a, b) => a.name > b.name)
        .map(({ _id, name, img, actors }) => (
          <Tooltip title={`Accèdez au film "${name}"`}>
            <ListItem
              button
              // ATTENTION ! Laisser "component='a'", sinon le lien ne marche pas
              component='a'
              href={`/pages/movies/${_id}`}
              sx={{ background: ""}}
            >
              <img src={img} alt={name} style={styleImgMovie} />
              <ListItemText primary={name} secondary={actors} />
            </ListItem>
          </Tooltip>
        ))
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
                           marginLeft: `${matches ? "" : "115px"}`,
                      marginRight: `${matches ? "10px" : "25px"}`,
                      padding: "10px",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", padding: "0 20px" }}
                      variant={matches ? "h6" : "h4"}
                    >
                     {item.index}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "bold" }}
                      variant={matches ? "h6" : "h5"}
                    >
                    {item.question}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "bold", position: "absolute", right: "50px" }}
                      variant={matches ? "h6" : "h3"}
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
          <BtnCloseDialog
            href={`/pages/home`}
            variant='contained'
          >
            <TypoBtnCloseDialog>Accèdez aux films</TypoBtnCloseDialog>
          </BtnCloseDialog>
        </DialogActionsBtnCloseDialog>
      </DialogContent>
    </RootDialog>
  );
}
