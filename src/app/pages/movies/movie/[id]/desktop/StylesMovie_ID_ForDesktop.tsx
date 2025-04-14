import { Box, styled, Typography } from "@mui/material";

interface ToggleSearchFiltersProps {
  toggle_Search_Filters: boolean;
}

// export const Root =
//   styled(Box, {
//     shouldForwardProp: (props) => props !== "toggle_Search_Filters",
//   }) <
//   ToggleSearchFiltersProps >
//   (({ theme, toggle_Search_Filters }) => ({
//     alignItems: "center",
//     background: "#000",
//     display: "flex",
//     justifyContent: "space-evenly",
//     flexWrap: "wrap",
//     minHeight: "100vh",
//     paddingTop: toggle_Search_Filters ? "180px" : "80px",
//     width: "100vw",
//     [theme.breakpoints.down("sm")]: {},
//   }));

export const Root = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "center",
  position: "absolute",
  top: "0",
  width: "100vw",
  zIndex: 999,
  [theme.breakpoints.down("sm")]: {},
}));

export const BoxItem = styled(Box)(({}) => ({
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "40px",
  boxShadow:
    "rgba(255, 0, 0, 0.5) 0px 10px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  padding: "100px",
  width: "50vw",
}));

export const TypoTitle = styled(Typography)(({}) => ({
  color: "#F00",
  fontWeight: "bold",
  textAlign: "center",
}));

export const Typo = styled(Typography)(({}) => ({
  margin: "5px",
}));

export const BoxWrap = styled(Box)(({}) => ({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  margin: "5px",
}));

export const TypoItem = styled(Typography)(({}) => ({
  border: "2px solid #F00",
  borderRadius: "25px",
  color: "#F00",
  fontWeight: "bold",
  margin: "5px",
  padding: "10px",
  textAlign: "center",
  textDecoration: "none",
  width: "150px",
}));
