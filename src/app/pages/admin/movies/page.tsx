"use client";

import React, { useCallback, useEffect, useState } from "react";
import Container_Admin from "../../../components/layouts/containers/container_Admin/Container_Admin";
import { Box, Paper, Rating, Typography } from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  GridRowClassNameParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
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
  const [movies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies({ setAllMovies, setLoading });
  }, []);

  const paginationModel = { page: 0, pageSize: 20 };

  const getRowClassName = (params: GridRowClassNameParams) =>
    params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row";

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`https://www.net-movie.fr/api/movies/${id}`);
        setAllMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== id)
        );
        toast.success("Le film a été supprimé avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        toast.error("Échec de la suppression.");
      }
    },
    [setAllMovies]
  );

  const renderListCell = useCallback(
    (params: GridRenderCellParams<any, string[] | string | undefined>) => (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100%",
          maxHeight: "100px",
          overflowY: "auto",
          whiteSpace: "normal",
          wordBreak: "break-word",
          p: 1,
          lineHeight: 1.6,
        }}
      >
        {Array.isArray(params.value) ? params.value.join(", ") : params.value}
      </Box>
    ),
    []
  );

  const renderImageCell = useCallback(
    (params: GridRenderCellParams<any, string | null | undefined>) => (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {params.value ? (
          <img
            src={params.value}
            alt='Film'
            style={{
              border: "2px solid #000",
              borderRadius: "8px",
              height: 80,
              width: 80,
              objectFit: "cover",
            }}
          />
        ) : (
          <Typography variant='caption'>Pas d'image</Typography>
        )}
      </Box>
    ),
    []
  );

  const renderDateCell = useCallback(
    (params: GridRenderCellParams<any, string | null | undefined>) =>
      params.value ? dayjs(params.value).format("DD/MM/YYYY HH:mm:ss") : "-",
    []
  );

  const renderRatingCell = useCallback(
    (params: GridRenderCellParams<any, number>) => (
      <Rating name='Note' value={params.value ?? 0} precision={0.5} readOnly />
    ),
    []
  );

  const renderActionsCell = useCallback(
    (params: GridRenderCellParams<any, string | null | undefined>) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <LuPenLine color='#00F' style={{ cursor: "pointer" }} size={30} />
        <RiDeleteBin2Line
          color='#F00'
          style={{ cursor: "pointer" }}
          size={30}
          onClick={() => {
            if (params.value) {
              handleDelete(params.value);
            } else {
              toast.error("Impossible de supprimer ce film, ID introuvable.");
            }
          }}
        />
      </Box>
    ),
    [handleDelete]
  );

  const columns = [
    {
      field: "img",
      headerName: "Image",
      renderCell: renderImageCell,
      width: 120,
    },
    { field: "name", headerName: "Nom du film", width: 160 },
    {
      field: "realisators",
      headerName: "Réalisateurs",
      renderCell: renderListCell,
      width: 200,
    },
    {
      field: "actors",
      headerName: "Acteurs",
      renderCell: renderListCell,
      width: 250,
    },
    { field: "desc", headerName: "Description", width: 400 },
    {
      field: "country",
      headerName: "Pays",
      renderCell: renderListCell,
      width: 150,
    },
    { field: "movieLink", headerName: "Lien", width: 150 },
    { field: "year", headerName: "Année", width: 120 },
    {
      field: "genre",
      headerName: "Genres",
      renderCell: renderListCell,
      width: 180,
    },
    {
      field: "rating",
      headerName: "Note",
      renderCell: renderRatingCell,
      width: 130,
    },
    {
      field: "createdAt",
      headerName: "Création",
      renderCell: renderDateCell,
      width: 180,
    },
    {
      field: "updateAt",
      headerName: "Mise à jour",
      renderCell: renderDateCell,
      width: 180,
    },
    {
      field: "id",
      headerName: "Actions",
      renderCell: renderActionsCell,
      width: 150,
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
          Liste des films
        </Typography>
        <Paper sx={{ height: "90vh", width: "95vw" }}>
          <DataGrid
            rows={movies.map((movie) => ({ ...movie, id: movie._id }))}
            rowHeight={100}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            getRowClassName={getRowClassName}
            checkboxSelection
          />
        </Paper>
      </Box>
    </Container_Admin>
  );
}
