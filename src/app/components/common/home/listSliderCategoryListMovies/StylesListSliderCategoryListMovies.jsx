import { Typography, Container, styled, Box } from "@mui/material";

export const RootRow = styled(Container)(({ theme }) => ({
  marginBottom: "60px",
  [theme.breakpoints.down("sm")]: {},
}));

export const BoxRow = styled(Box)(({  }) => ({
  marginTop: "10px",
  width: "100%",
}));

export const TypoTitleListSliderCategoryListMovies = styled(Typography)(
  ({ }) => ({
    color: "red",
    margin: "30px",
  })
);

export const BoxRowIndividually = styled(Box)(({ }) => ({
  position: "relative",
}));

export const styleBiChevronLeft = {
  bottom: 0,
  backgroundColor: "rgb(22, 22, 22, 0.5)",
  color: "white",
  cursor: "pointer",
  height: "100%",
  left: 0,
  margin: "auto",
  position: "absolute",
  top: 0,
  width: "50px",
  zIndex: 150,
};

export const BoxListMovies = styled(Box)(({ }) => ({
  alignItems: "center",
  display: "flex",
  height: "100%",
  overflow: "hidden",
}));

export const styleBiChevronRight = {
  // bottom: 0,
  // backgroundColor: "rgb(22, 22, 22, 0.5)",
  // color: "white",
  // cursor: "pointer",
  // height: "100%",
  // margin: "auto",
  // position: "absolute",
  // right: 0,
  // top: 0,
  // width: "50px",
  // zIndex: 150,
};

export const RootItemListSliderCategoryListMovies = styled(Box)(
  ({  }) => ({
    gridColumnEnd: 2,
    gridColumnStart: 1,
    gridRowEnd: 2,
    gridRowStart: 1,
    position: "relative",
    textAlgin: "center",
  })
);

export const NameMovieItem = styled(Typography)(({ theme }) => ({
  // background: "rgba(0, 0, 0, 0.3)",
  fontWeight: "bold",
  position: "absolute",
  top: "0px",
  color: "#FFF",
  height: "30px",
  textAlign: "center",
  width: "100%",
}));

