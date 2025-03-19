import { Box, Typography, styled } from "@mui/material";

export const TypoTitlePage = styled(Typography)(({ theme }) => ({
  marginTop: "150px",
  textAlign: "center",
}));

export const BoxListMovies = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  margin: "85px 0",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  },
}));

export const styleLink = {
  color: "#000",
  cursor: "pointer",
  textDecoration: "none",
};

export const RootListMovies = styled(Box)(({ theme }) => ({
  background: "#f1f1f1",
  borderRadius: "10px",
  boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
  margin: "0 auto",
  marginBottom: "45px",
  maxWidth: "600px",
  padding: "30px",
  width: "100%",
  "&::after": {
    content: "''",
    clear: "both",
    display: "block",
  },
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));

export const TypoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
}));

export const Dropdown = styled(Box)(({ theme }) => ({
  background: "#000",
  border: "1px solid #FFF",
  height: "30px",
  margin: "100px auto",
  position: "relative",
  userSelect: "none",
  width: "200px",
  zIndex: "999",
}));

export const BoxNoDescription = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "25px",
}));

export const DropdownBtn = styled(Box)(({ theme }) => ({
  alignItems: "center",
  background: "#000",
  boxShadow: "3px 3px 10px 6px rgba(0, 0, 0, 0.06)",
  color: "#FFF",
  display: "flex",
  fontWeight: "bold",
  height: "15px",
  justifyContent: "space-between",
  padding: "15px 20px",
}));

export const BoxActiveDropdown = styled(Box)(({ theme }) => ({
  border: "1px dotted black",
  height: "350px",
  overflowY: "scroll",
  zIndex: 999,
}));

export const DropdownItem = styled(Box)(({ theme }) => ({
  background: "#000",
  cursor: "pointer",
  padding: "10px",
  transition: "all 0.2s",
  "&:hover": {
    background: "#333",
  },
}));