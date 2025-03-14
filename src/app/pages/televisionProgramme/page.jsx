"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Test from "./Test";
import { LoaderSpinner } from "@/app/components/utils";

export default function TV_ProgrammePage() {
  const [selectChaine, setSelectChaine] = useState("");
  const [TV_Programme, setTV_Programme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLists() {
      try {
        const res = await axios.get(
          "https://daga123-tv-api.onrender.com/getPrograms"
        );
        // console.log("TV_ProgrammePage :", res.data.data);
        setTV_Programme(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getLists();
  }, []);

  return (
    <Box>
      <Typography
        sx={{ fontWeight: "bold", padding: "30px 0", textAlign: "center" }}
        variant='h3'
      >
        PROGRAMME TV
      </Typography>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <Box
            sx={{
              // alignItems: "center",
              display: "grid",
              gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
              // justifyContent: "center",
            }}
          >
            {TV_Programme.map((item) => (
              <Box
                sx={{ padding: "20px 0" }}
                onClick={() => setSelectChaine(item.name)}
              >
                <Image
                  alt='logo'
                  height={100}
                  src={item.icon}
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    height: "100px",
                    width: "100px",
                  }}
                  width={100}
                />
              </Box>
            ))}
          </Box>

          {selectChaine ? (
            TV_Programme.map((item) => (
              <Test item={item} selectChaine={selectChaine} />
            ))
          ) : (
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  paddingTop: "150px",
                  textAlign: "center",
                }}
                variant='h3'
              >
                Veuillez sélectionnez une chaîne
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
