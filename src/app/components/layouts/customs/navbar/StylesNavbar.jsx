import { Box, styled, Typography } from "@mui/material";

export const RootNavbar = styled(Box)(({ isScrolled, matches }) => ({
  alignItems: "center",
  background: `${
    isScrolled ? "rgba(255,255,255, 0.2)" : "rgba(51, 51, 51, 0.6)"
  }`,
  color: "#FFF",
  display: "flex",
  height: `${matches ? "40px" : "70px"}`,
  justifyContent: "space-between",
  padding: "20px",
  position: "fixed",
  top: "0",
  width: "100vw",
  zIndex: "99",
}));

export const Typo_FirstLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontSize: "35px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "25px"
  },
}));

export const Typo_SecondLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontSize: "31px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "21px",
  },
}));

export const Typo_ThirdLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontSize: "27px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "17px",
  },
}));

export const Typo_FourthLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontSize: "23px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));

export const Typo_FifthLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontSize: "23px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));

export const Typo_SixthLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontWeight: "bold",
  fontSize: "27px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "17px",
  },
}));

export const Typo_SeventhLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontSize: "31px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "21px",
  },
}));

export const Typo_EighthLetter_Logo = styled(Typography)(({ theme }) => ({
  color: "#F00",
  fontSize: "35px",
  fontWeight: "bold",
  [theme.breakpoints.down("sm")]: {
    fontSize: "25px",
  },
}));
