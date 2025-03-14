"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import Container_GlobalApp from "@/app/components/layouts/containers/container_GlobalApp/Container_GlobalApp"
// COMPONENTS UTILS
import {
  BooleanIfMovieViewed_Rating,
  LoaderSpinner,
  // ScrollIndicatorProgressBar,
  // BackToTop,
  Pagination,
} from "@/app/components/utils";
// STYLES
import {
  TypoTitlePage,
  BoxListMovies,
  styleLink,
  RootListMovies,
  TypoTitle,
  BoxNoDescription,
} from "./StylesListAllMovies";
import Link from "next/link";
// FUNCTIONS
// import { TruncateDesc } from "@/app/utils/functions";

export default function ListAllMovies() {
  // RESPONSIVE
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // STYLES
  const styleImg = {
    borderRadius: "50%",
    float: "left",
    height: `${matches ? "100px" : "200px"}`,
    margin: "0 20px 5px 0",
    objectFit: "cover",
    shapeOutside: "margin-box",
    width: `${matches ? "100px" : "200px"}`,
  };

  const [countAllMovies, setCountAllMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(10);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  function showMoreItems() {
    setVisible((prevValue) => prevValue + 10);
  }

  useEffect(() => {
    async function getAllMovies() {
      try {
        const url = `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies?page=${page}&limit=${limit}`;
        const { data } = await axios.get(url);
        setItems(data.movies);
        setCountAllMovies(data.total);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getAllMovies();
  }, [page, limit]);

  // RETURN
  return loading ? (
    <LoaderSpinner />
  ) : (
    <Container_GlobalApp>
      <TypoTitlePage variant='h4'>
        {countAllMovies} films disponibles {page}
      </TypoTitlePage>

      <Pagination
        page={page}
        countAllMovies={countAllMovies}
        setPage={setPage}
        limit={limit}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {items
          .slice(0, visible)
          .map(
            ({
              _id,
              name,
              desc,
              realisators,
              actors,
              favorite,
              watch,
              country,
              genre,
              img,
              year,
              rating,
              index,
            }) => (
              <Link key={index} href={`/pages/movies/${_id}`} style={styleLink}>
                <RootListMovies>
                  <img
                    alt='movie'
                    src={img}
                    height={750}
                    style={styleImg}
                    width={750}
                  />
                  <BooleanIfMovieViewed_Rating
                    rating={rating}
                    favorite={favorite}
                    watch={watch}
                  />
                  <TypoTitle variant={matches ? "h6" : "h5"}>
                    {name} ({year} - {country})
                  </TypoTitle>
                  <Typography variant='body1'>
                    <strong>Réalisateurs :</strong> {realisators}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Acteurs :</strong> {actors}
                  </Typography>
                  {/* <BoxMovieGenre genre={genre} /> */}
                  {desc === "" && (
                    <BoxNoDescription>
                      <Typography variant='h6'> Pas de description</Typography>
                    </BoxNoDescription>
                  )}
                  <div
                  // dangerouslySetInnerHTML={{
                  //   __html: `${TruncateDesc(desc)}`,
                  // }}
                  />
                </RootListMovies>
              </Link>
            )
          )}
      </Box>
      {visible == limit ? (
        <Pagination
          page={page}
          countAllMovies={countAllMovies}
          setPage={setPage}
          limit={limit}
        />
      ) : (
        <Button
          onClick={showMoreItems}
          sx={{
            border: "2px solid red",
            borderRadius: "25px",
            cursor: "pointer",
            color: "#000",
            padding: "10px 30px",
          }}
          variant='text'
        >
          <Typography sx={{}} variant='h6'>
            Voir plus
          </Typography>
        </Button>
      )}
    </Container_GlobalApp>
  );
}
