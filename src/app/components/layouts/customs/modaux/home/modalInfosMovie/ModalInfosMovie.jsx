import { Button, Modal, Typography } from "@mui/material";
import {
  AiOutlineClose,
  BsFillPlayFill,
} from "../../../../../../utils/constants/icons/index";
// STYLES
import {
  BoxModalPlayerTrailer,
  StylesTypoDesc,
  TypoMovie,
} from "./StylesModalInfosMovie";
const sizeIcon = 35;

export default function ModalInfosMovie({
  // Props
  openModalInfosMovie,
  OpenModalTrailer,
  name,
  desc,
  // Functions
  CloseModalInfosMovie,
}) {
  return (
    <Modal open={openModalInfosMovie} onClose={CloseModalInfosMovie}>
      <BoxModalPlayerTrailer>
        <Typography align='center' variant='h4'>
          Bande-Annonce
        </Typography>
        <AiOutlineClose
          color='#FF0000'
          onClick={CloseModalInfosMovie}
          size={35}
          style={{
            cursor: "pointer",
            "&:hover": {
              color: "blue",
            },
          }}
        />
        <TypoMovie variant='h2'>{name}</TypoMovie>
        <div
          dangerouslySetInnerHTML={{
            __html: `${desc}`,
          }}
          style={StylesTypoDesc}
        />
        <div>
          <div>
            <Button variant='contained' onClick={OpenModalTrailer}>
              <BsFillPlayFill size={sizeIcon} />
              <Typography>Lecture</Typography>
            </Button>
          </div>
        </div>
      </BoxModalPlayerTrailer>
    </Modal>
  );
}
