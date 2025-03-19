import { Box, Typography } from "@mui/material";
import { GlobalBtns } from "@/app/components/layouts";
import {
  BiSolidChevronsLeft,
  FaChevronRight,
  FaChevronLeft,
  BiSolidChevronsRight,
} from "@/app/utils/constants/icons";

export default function Pagination({ page, limit, setPage, countAllMovies, setVisible }) {

  const lastPageNumber = Math.ceil(countAllMovies / limit); // "Math.ceil" : Arrondi toujours à la supérieur

  function handleClick(action) {
    setVisible(10);
    if (action === "minus") setPage(page - 1);
    else if (action === "plus") setPage(page + 1);
    else if (action === "reset") setPage(1);
    else if (action === "lastPage") setPage(lastPageNumber);
  }

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: page == 1 ? "none" : "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
        }}
      >
        <GlobalBtns
          titleTooltipBtn='Première page'
          onClickAction={() => {
            // setPage(0);
            handleClick("reset");
          }}
          colorIconBtn='#F00'
          iconBtn={<BiSolidChevronsLeft size={45} />}
        />
        <GlobalBtns
          titleTooltipBtn='Page précédente'
          onClickAction={() => {
            // setPage(page - 1);
            handleClick("minus");
          }}
          colorIconBtn='#F00'
          iconBtn={<FaChevronLeft size={35} />}
        />
      </div>
      <Box>
        {page !== 1 && (
          <Typography sx={{ fontWeight: "bold" }} variant='h5'>
            Page : {page}
          </Typography>
        )}
      </Box>
      {page < lastPageNumber && (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
          }}
        >
          <GlobalBtns
            titleTooltipBtn='Page suivante'
            onClickAction={() => {
              handleClick("plus");
            }}
            colorIconBtn='#F00'
            iconBtn={<FaChevronRight size={35} />}
          />
          <GlobalBtns
            titleTooltipBtn='Dernière page'
            onClickAction={() => {
              // setPage(0);
              handleClick("lastPage");
            }}
            colorIconBtn='#F00'
            iconBtn={<BiSolidChevronsRight size={45} />}
          />
        </div>
      )}
    </Box>
  );
}
