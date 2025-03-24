"use client";

import React, { forwardRef, useEffect, useState } from "react";
import {
  Typography,
  DialogContent,
  DialogTitle,
  Slide,
  ListItem,
  ListItemText,
  Tooltip,
  Box,
} from "@mui/material";
// API
import fetchApiRequest from "@/app/utils/requets/axios";
// STYLES
import {
  RootDialog,
  DialogActionsBtnCloseDialog,
  BtnCloseDialog,
  TypoBtnCloseDialog,
} from "./StylesWelcomePopupAnnouncingTheLatestfilmsAndSeries.jsx";
import appRequest from "@/app/utils/requets/appRequest";
import axios from "axios"

export default function WelcomePopupAnnouncingTheLatestfilmsAndSeries() {
  // Styles
  const styleImgMovie = {
    border: "4px solid #000",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    height: "130px",
    marginRight: "50px",
    width: "230px",
  };

  const [selected, setSelected] = useState(null);

  function toggle(i) {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  }

  // EFFECT TRANSITION DISPLAY DIALOG
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} timeout={1500} />;
  });

  // GET API Display Latest Movies In BDD
  const [newMovies, setNewMovies] = useState([]);

    useEffect(() => {
      const getAllMovies = async () => {
        try {
          const url = `https://www.net-movie.fr/api/movies?type=newAllMovies`;
          // const url = `https://project44-reactjs-crud-auth-netmovie-mongodb.vercel.app/api/movies`;
          // const url = `${process.env.REACT_APP_API_URL}/movies`;
          const data = await axios.get(url);
          console.log('====================================');
          console.log(data.data);
          console.log('====================================');
          setAllMovies(data.data);
        } catch (err) {
          console.log(err);
        }
      };

      getAllMovies();
    }, []);


  // useEffect(() => {
  //   async function fetchMovies() {
  //     try {
  //       const res = await fetchApiRequest(appRequest.fetch_New_Movies);
  //       console.log('====================================');
  //       console.log(res.data);
  //       console.log('====================================');
  //       setNewMovies(res.movies);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   }

  //   if (appRequest.fetch_New_Movies) {
  //     fetchMovies();
  //   }
  // }, [appRequest.fetch_New_Movies]);

  // const accordionData = [
  //   {
  //     index: "01",
  //     bgColorIndex: "#3C8CE7, #00EAFF",
  //     question: "Derniers Films",
  //     answer: newMovies
  //       // sortByAlphabeticalOrder
  //       // .sort((a, b) => a.name > b.name)
  //       .map(({ _id, name, img, actors }) => (
  //         <Tooltip title={`Accèdez au film "${name}"`}>
  //           <ListItem
  //             button
  //             // ATTENTION ! Laisser "component='a'", sinon le lien ne marche pas
  //             component='a'
  //             href={`/pages/movies/${_id}`}
  //             sx={{ background: "" }}
  //           >
  //             <img src={img} alt={name} style={styleImgMovie} />
  //             <ListItemText primary={name} secondary={actors} />
  //           </ListItem>
  //         </Tooltip>
  //       )),
  //   },
  //   {
  //     index: "02",
  //     bgColorIndex: "#70F570, #49C628",
  //     question: "Dernières Séries",
  //     answer: "Désolé, aucunes séries pour le moment. 😥",
  //   },
  // ];

//  getDisplayLatestMoviesInBDD: async (req, res, next) => {
//     try {
//       const limit = 10;
//       const movies = await MovieModel.find().sort({ _id: -1 }).limit(limit);
//       const total = await MovieModel.countDocuments({});

//       const response = {
//         total,
//         movies,
//       };

//       res.status(200).json(response);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },


  return (
    <RootDialog open={open}>
      {/* // <RootDialog open={open} TransitionComponent={Transition} keepMounted> */}
      <DialogContent
      // sx={{ overflowY: "hidden"}}
      >
        <DialogTitle
          align='center'
          sx={{ color: "red", fontFamily: "sacramento", fontWeight: "bold" }}
          variant='h3'
        >
          {"Derniers films & séries ajoutés :"}
        </DialogTitle>
        {/* {accordionData.map((item, i) => (
          <Box sx={{ padding: "8px 0" }}>
            <Box onClick={() => toggle(i)}>
              <Box
                style={{
                  alignItems: "center",
                  background: `linear-gradient(135deg, ${item.bgColorIndex})`,
                  borderRadius: "15px",
                  display: "flex",
                  flexWrap: "nowrap",
                  marginLeft: "115px",
                  marginRight: "25px",
                  padding: "10px",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{ fontWeight: "bold", padding: "0 20px" }}
                  variant='h4'
                >
                  {item.index}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }} variant='h5'>
                  {item.question}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    position: "absolute",
                    right: "50px",
                  }}
                  variant='h3'
                >
                  {selected === i ? "-" : "+"}
                </Typography>
              </Box>
            </Box>

            <Box className={selected === i ? "content show" : "content"}>
              {item.answer}
            </Box>
          </Box>
        ))} */}

        {/* {newMovies.map((item) => {
          console.log('====================================');
          console.log(item);
          console.log('====================================');
          return (<></>)
        })} */}

        <DialogActionsBtnCloseDialog align='center' sx={{}}>
          <BtnCloseDialog href={`/pages/home`} variant='contained'>
            <TypoBtnCloseDialog>Accèdez aux films</TypoBtnCloseDialog>
          </BtnCloseDialog>
        </DialogActionsBtnCloseDialog>
      </DialogContent>
    </RootDialog>
  );
}
