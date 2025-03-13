import { Box, Typography, styled } from "@mui/material";

export const RootSlide_BG_Mobie = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "0",
  top: "20px",
  height: "100vh",
  overflow: "hidden",
  width: "100vw",
  "&::before, &::after": {
    background:
      "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
    content: "''",
    position: "absolute",
    width: "15%",
  },
  "&::before": {
    left: "0",
    top: "0",
  },
  "&::after": {
    right: "0",
    top: "0",
    transform: "rotateZ(180deg)",
  },
}));

export const BoxSlideTrackImgs = styled(Box)(({ theme }) => ({
  ///// "linear" : Animation s'effectue à vitesse constante. /////
  animation: "scroll 150s linear infinite",
  display: "flex",
  flex: "50%",
  /***** Slide track width = total number of slides (Exemple : 30 imgs * 2 = 60) x individual slide width (700px) *****/

  /***** (15 imgs * 2 = 30) *****/

  /***** Largeur de la piste de diapositives = nombre total de diapositives (Exemple : 30 imgs * 2 = 30) x largeur de chaque diapositive (700px) *****/
  width: "calc(700px * 50)",
  "@keyframes scroll": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      /***** Moves the slide track leftwards (-250px) by half (Exemple : 30 imgs / 2 = 15) of its width *****/
      /***** Déplace la piste de la diapositive vers la gauche (-700px) de la moitié (Exemple : 30 imgs / 2 = 15) de sa largeur. *****/
      transform: "translateX(calc(-700px *9))",
    },
  },
}));

export const SlideImgs = styled(Box)(({ matches }) => ({
  // height: `${matches ? "120px" : "450px"}`,
  /***** To make the img move on the "Z axis" (depth), we need to add to its container (".slide") a perspective *****/
  /***** Pour que l'image se déplace sur l' axe Z (profondeur), nous devons ajouter à son conteneur (".slide") une perspective *****/
  perspective: "100px",
  // width: `${matches ? "120px" : "700px"}`,
}));

/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/

export const BoxListMovies = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    margin: "250px 0",
  },
}));

export const TypoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
}));

export const BoxNoDescription = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "25px",
}));

export const StylesTrailer = {
  border: "3px solid #FFF",
  margin: "0 auto",
};

export const BoxTrailer_MovieLink = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  marginTop: "55px",
  zIndex: "999",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
  },
}));
