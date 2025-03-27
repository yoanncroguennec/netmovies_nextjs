"use client";

import React, { useCallback, useEffect, useState } from "react";
import Container_Admin from "../../../components/layouts/containers/container_Admin/Container_Admin";
import { Box, Button, Paper, Rating, Typography } from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  GridRowClassNameParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs"; // "dayjs" pour formater les dates (ou moment.js)
import { RiDeleteBin2Line } from "react-icons/ri";
import { LuPenLine } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchMovies } from "@/app/utils/api/fetchMovies";
import axios from "axios";

type Movie = {
  _id: string;
  name: string;
  img?: string;
  realisators: string[];
  actors: string[];
  desc: string;
  country: string[];
  movieLink?: string;
  year: number;
  genre: string[];
  rating?: number;
  createdAt: string;
  updateAt: string;
};

export default function MoviePageAdmin() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies(setMovies, setLoading); // Call the fetchMovies function on component mount
  }, []);

  const paginationModel = { page: 0, pageSize: 20 };

  // Fonction pour appliquer un background color alterné
  const getRowClassName = (params: GridRowClassNameParams) => {
    return params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row";
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "img",
      headerName: "Image",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => (
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
          {params.value ? (
            <img
              src={params.value}
              alt='image'
              style={{
                border: "3px solid #000",
                borderRadius: "50%",
                height: 120,
                width: 120,
              }}
            />
          ) : (
            <Box
              style={{
                border: "3px solid #000",
                borderRadius: "50%",
                height: "500px",
                width: "500px",
              }}
            >
              <Typography variant='h6'>Pas d'image</Typography>
            </Box>
          )}
        </Box>
      ),
      width: 200,
    },
    { field: "name", headerName: "Nom du film", width: 130 },
    {
      field: "realisators",
      headerName: "Réalisateurs",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            maxHeight: "100px", // Hauteur max avant scroll
            overflowY: "auto", // Active le scroll vertical
            whiteSpace: "normal",
            wordBreak: "break-word",
            padding: "4px",
            lineHeight: 1.6,
          }}
        >
          {Array.isArray(params.value) ? params.value.join(", ") : params.value}
        </div>
      ),
      width: 200,
    },
    {
      field: "actors",
      headerName: "Acteurs",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            maxHeight: "100px", // Hauteur max avant scroll
            overflowY: "auto", // Active le scroll vertical
            whiteSpace: "normal",
            wordBreak: "break-word",
            padding: "4px",
            lineHeight: 1.6,
          }}
        >
          {Array.isArray(params.value) ? params.value.join(", ") : params.value}
        </div>
      ),
      width: 250,
    },
    {
      field: "desc",
      headerName: "Description",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => (
        <div
          style={{
            maxHeight: "100px", // Hauteur max avant scroll
            overflowY: "auto", // Active le scroll vertical
            whiteSpace: "normal",
            wordBreak: "break-word",
            padding: "4px",
            lineHeight: 1.6,
          }}
        >
          {params.value}
        </div>
      ),
      width: 450,
    },
    {
      field: "country",
      headerName: "Pays",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            maxHeight: "100px", // Hauteur max avant scroll
            overflowY: "auto", // Active le scroll vertical
            whiteSpace: "normal",
            wordBreak: "break-word",
            padding: "4px",
            lineHeight: 1.6,
          }}
        >
          {Array.isArray(params.value) ? params.value.join(", ") : params.value}
        </div>
      ),
      width: 150,
    },
    // { field: "productionCompany", headerName: "Last name", width: 130 },
    { field: "movieLink", headerName: "Last name", width: 130 },

    { field: "year", headerName: "Années", width: 130 },
    {
      field: "genre",
      headerName: "Genres",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => (
        <Box
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            maxHeight: "100px", // Hauteur max avant scroll
            overflowY: "auto", // Active le scroll vertical
            whiteSpace: "normal",
            wordBreak: "break-word",
            padding: "4px",
            lineHeight: 1.6,
          }}
        >
          {Array.isArray(params.value) ? params.value.join(", ") : params.value}
        </Box>
      ),
      width: 150,
    },
    {
      field: "rating",
      headerName: "Note",
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Rating
          name='Note'
          defaultValue={params.value ?? 0} // Utilisation de `?? 0` pour éviter undefined/null
          precision={0.5}
          readOnly
        />
      ),
      width: 130,
    },
    {
      field: "createdAt",
      headerName: "Date de création",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => {
        // Quand onrécupère les dates depuis MongoDB, souvent stockées sous forme de timestamps (ISODate ou Date)
        const formattedDate = dayjs(params.value).format("DD/MM/YYYY HH:mm:ss");
        return formattedDate;
      },
      width: 200,
    },
    {
      field: "updateAt",
      headerName: "Date de dernière mise à jour",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => {
        // Quand onrécupère les dates depuis MongoDB, souvent stockées sous forme de timestamps (ISODate ou Date)
        const formattedDate = dayjs(params.value).format("DD/MM/YYYY HH:mm:ss");
        return formattedDate;
      },
      width: 200,
    },
    {
      field: "id",
      headerName: "Actions",
      renderCell: (
        params: GridRenderCellParams<any, string | null | undefined>
      ) => {
        const handleDelete = useCallback(async (id: string) => {
          try {
            await axios.delete(`https://www.net-movie.fr/api/movies/${id}`);
            setMovies((prevMovies) =>
              (prevMovies as Movie[]).filter((movie) => movie._id !== id)
            );

            // setMovies((prevMovies) =>
            //   prevMovies.filter((movie) => movie._id !== id)
            // );
            toast.success(`Le film a été supprimé avec succès.`);
          } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            toast.error("Échec de la suppression.");
          }
        }, []);

        return (
          <Box
            style={{
              alignItems: "center",
              display: "flex",
              height: "100%",
              justifyContent: "center",
              maxHeight: "100px", // Hauteur max avant scroll
              overflowY: "auto", // Active le scroll vertical
              whiteSpace: "normal",
              wordBreak: "break-word",
              padding: "4px",
              lineHeight: 1.6,
            }}
          >
            <LuPenLine
              color='#00F'
              onClick={() => {}}
              style={{ cursor: "pointer", paddingRight: "15px" }}
              size={45}
            />
            <RiDeleteBin2Line
              color='#F00'
              onClick={() => {
                if (params.value) {
                  handleDelete(params.value);
                } else {
                  console.error("ID manquant pour la suppression");
                  toast.error(
                    "Impossible de supprimer ce film, ID introuvable."
                  );
                }
              }}
              size={35}
              style={{ cursor: "pointer" }}
            />
          </Box>
        );
      },
      width: 450,
    },
  ];

  return (
    <Container_Admin>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
        }}
      >
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar
        />

        <Typography
          sx={{
            fontWeight: "bold",
            padding: "15px 0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
          variant='h4'
        >
          Listes des films
        </Typography>
        <Paper sx={{ height: "90vh", width: "95vw" }}>
          <DataGrid
            rows={movies}
            rowHeight={140}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            getRowClassName={getRowClassName}
            checkboxSelection
            sx={{
              // Ajouter un trait de séparation entre les colonnes
              "& .MuiDataGrid-columnSeparator": {
                backgroundColor: "#bdbdbd", // Couleur du trait de séparation
                width: "1px", // Taille du trait
              },
            }}
          />
        </Paper>
      </Box>
    </Container_Admin>
  );
}
