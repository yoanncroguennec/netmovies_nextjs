import { Box, styled } from "@mui/material";

interface ToggleSearchFiltersProps {
  toggle_Search_Filters: boolean;
}

export const Root = styled(Box, {
  shouldForwardProp: (props) => props !== "toggle_Search_Filters",
})<ToggleSearchFiltersProps>(({ theme, toggle_Search_Filters }) => ({
  alignItems: "center",
  background: "#000",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  minHeight: "100vh",
  paddingTop: toggle_Search_Filters ? "180px" : "80px",
  width: "100vw",
  [theme.breakpoints.down("sm")]: {},
}));
