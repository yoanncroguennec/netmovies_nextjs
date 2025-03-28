import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const BoxModalPlayerTrailer = styled(Box)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.8)",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: 24,
  color: "#FFF",
  left: "50%",
  height: 500,
  p: 4,
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  [theme.breakpoints.down("sm")]: {
    width: 350,
  },
}));

export const TypoMovie = styled(Typography)(({ theme }) => ({
  color: "#FFF",
  fontWeight: "bold",
  textAlign: "center",
  textShadow: "1px 1px 1px #000, 3px 3px 5px blue",
}));

export const BoxNoDescription = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "25px",
}));

export const StylesTypoDesc = {
  color: "#FFF",
  margin: "35px",
  textAlign: "justify",
};
