import Link from "next/link";
import React from "react";
import {
  Typography,
} from "@mui/material";
// COMPONENTS UTILS
import { BooleanIfMovieViewed_Rating } from "@/app/components/utils";
// STYLES
import {
  styleLink,
  TypoTitle,
  BoxNoDescription,
} from "../StylesListAllMovies";

export default function ListAllMovies({ filteredMovies,itemsByPages, visible }) {
  // STYLES
  const styleImg = {
    borderRadius: "50%",
    float: "left",
    height: "200px",
    margin: "0 20px 5px 0",
    objectFit: "cover",
    shapeOutside: "margin-box",
    width: "200px",
  };

  return (
    filteredMovies ||
    itemsByPages
      // .slice(0, visible)
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
            <TypoTitle variant="h5">
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
          </Link>
        )
      )
  );
}
