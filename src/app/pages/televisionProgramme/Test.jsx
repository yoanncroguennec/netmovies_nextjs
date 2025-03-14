import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Test({ item, selectChaine }) {
  if (item.name === selectChaine) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {item.programs.map((item) => {
          return (
            <Box
              sx={{
                alignItems: "center",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                display: "flex",
                flexWrap: "nowrap",
                margin: "50px",
                padding: "25px",
              }}
            >
              <Image
                alt='logo'
                height={500}
                src={item.icon}
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                  height: "150px",
                  marginRight: "30px",
                  width: "150px",
                }}
                width={500}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* <Typography variant='h6'>{item.name}</Typography> */}
                <Typography sx={{ fontWeight: "bold" }} variant='h5'>
                  {item.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                  }}
                >
                  <Typography sx={{}} variant='h6'>
                    {item.cat}
                  </Typography>
                  <Typography sx={{}} variant='h6'>
                    {item.rating}
                  </Typography>
                </Box>
                <Typography sx={{}} variant='h6'>
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  }
}
