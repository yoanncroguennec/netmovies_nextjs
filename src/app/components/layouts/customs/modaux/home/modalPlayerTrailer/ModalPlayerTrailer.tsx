import { Box, Modal, Typography } from "@mui/material";
import ReactPlayer from "react-player";
// STYLES
import { BoxModalPlayerTrailer } from "./StylesModalPlayerTrailer";
// ICONS
import { AiOutlineClose } from "@/app/utils/constants/icons/index";

const CloseIconWrapper = {
  cursor: "pointer",
  transition: "color 0.2s",
  ":hover": {
    color: "blue",
  },
};

type ModalPlayerTrailerProps = {
  openModalTrailer: boolean;
  showPlayerTrailer: boolean;
  trailer: string;
  CloseModalTrailer: () => void;
};

export default function ModalPlayerTrailer({
  // Props
  openModalTrailer,
  showPlayerTrailer,
  trailer,
  // Functions
  CloseModalTrailer,
}: ModalPlayerTrailerProps) {
  return (
    <Modal open={openModalTrailer} onClose={CloseModalTrailer}>
      <BoxModalPlayerTrailer>
        <Typography align='center' variant='h4'>
          Bande-Annonce
        </Typography>
        <Box sx={CloseIconWrapper}>
          <AiOutlineClose
            onClick={CloseModalTrailer}
            color='#FF0000'
            size={35}
          />
        </Box>
        <div style={{ height: "85%" }}>
          <ReactPlayer
            url={trailer}
            width='100%'
            height='100%'
            controls={true}
            playing={showPlayerTrailer}
          />
        </div>
      </BoxModalPlayerTrailer>
    </Modal>
  );
}
