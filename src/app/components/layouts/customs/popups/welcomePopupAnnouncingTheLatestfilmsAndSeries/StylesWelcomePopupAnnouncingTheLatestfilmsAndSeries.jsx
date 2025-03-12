import {
  Typography,
  List,
  styled,
  Dialog,
  Button,
  Accordion,
  AccordionSummary,
  DialogActions,
} from "@mui/material";

export const RootDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      maxWidth: "900px",
      width: "100%",
    },
  },
  [theme.breakpoints.down("sm")]: {},
}));

export const BoxAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: "25px",
}));

export const BoxAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: "gray",
  border: "5px solid #F00",
  borderRadius: "25px 25px 0 0",
}));

export const TypoTitleAccordionSummary = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
  width: "100%",
}));

export const RootListMovies = styled(List)(({ theme }) => ({
  maxWidth: 1660,
  width: "100%",
}));

export const DialogActionsBtnCloseDialog = styled(DialogActions)(
  ({ theme }) => ({
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "15px",
  })
);

export const BtnCloseDialog = styled(Button)(({ theme }) => ({
  background: "#F00",
}));

export const TypoBtnCloseDialog = styled(Typography)(({ theme }) => ({}));
