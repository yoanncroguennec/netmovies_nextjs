import { Box } from "@mui/material";
import Navbar from "../../customs/navbar/Navbar";


export default function Container_GlobalApp({ children }) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}
