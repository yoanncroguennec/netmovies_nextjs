import { Box, Modal, Typography, styled } from "@mui/material";
import Iframe from "react-iframe";
// ICONS
import { AiOutlineClose } from "../../../../../../utils/constants/icons/index";

const BoxModalPlayerTrailer = styled(Box)(() => ({
  background: "rgba(0, 0, 0, 0.8)",
  border: "2px solid #000",
  borderRadius: "25px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)", // <- fixé ici
  color: "#FFF",
  left: "50%",
  height: 500,
  padding: "32px",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
}));


type ModalTheWholeFilmProps = {
  modalTheWholeMovie: boolean;
  movieLink: string;
  CloseModalTheWholeMovie: () => void;
};

export default function ModalTheWholeFilm({
  modalTheWholeMovie,
  movieLink,
  CloseModalTheWholeMovie,
}: ModalTheWholeFilmProps) {
  return (
    <Modal
      open={modalTheWholeMovie}
      onClose={CloseModalTheWholeMovie}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <BoxModalPlayerTrailer>
        <Typography align='center' variant='h4'>
          FILM EN ENTIER
        </Typography>
        <AiOutlineClose
          color='#FF0000'
          onClick={CloseModalTheWholeMovie}
          size={35}
          style={{
            cursor: "pointer",
          }}
        />
        <div style={{ height: "85%" }}>
          <Iframe
            url={movieLink}
            width='90%'
            height='90%'
            display='block'
            position='relative'
            styles={{ margin: "0 auto" }}
          />
        </div>
      </BoxModalPlayerTrailer>
    </Modal>
  );
}
