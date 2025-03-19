import { Box, styled } from "@mui/material";

export const BlackBarStyles = styled(Box)(({ completion }) => ({
  transform: `translateX(${completion - 100}%)`,
  position: "fixed",
  background: "red",
  height: "10px",
  borderRadius: "25px",
  marginTop: "-30px",
  width: "100vw",
  zIndex: 9,
}));

export const RedBarStyles = styled(Box)(({ completion }) => ({
  transform: `translateX(${completion - 100}%)`,
  position: "fixed",
  background: "#000",
  height: "3.5px",
  marginTop: "-27px",
  borderRadius: "25px",
  width: "100vw",
  zIndex: 999,
}));
