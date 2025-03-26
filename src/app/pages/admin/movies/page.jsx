"use client";

import React, { useEffect, useState } from "react";
import Container_Admin from "../../../components/layouts/containers/container_Admin/Container_Admin";
import { Box, Paper, Rating, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs"; // "dayjs" pour formater les dates (ou moment.js)
import { RiDeleteBin2Line } from "react-icons/ri";
import { LuPenLine } from "react-icons/lu";
import {fetchMovies} from "@/app/utils/api/fetchMovies"

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "img",
    headerName: "Image",
    renderCell: (params) => (
      <Box sx={{ alignItems: "center", justifyContent: "center" }}>
        <img
          src={params.value}
          alt='image'
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "3px solid #000",
          }}
        />
      </Box>
    ),
    width: 200,
  },
  { field: "name", headerName: "Nom du film", width: 130 },
  {
    field: "realisators",
    headerName: "Réalisateurs",
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
      <Rating
        name='Note'
        defaultValue={params.value}
        precision={0.5}
        readOnly
      />
    ),
    width: 130,
  },
  {
    field: "createdAt",
    headerName: "Date de création",
    renderCell: (params) => {
      // Quand onrécupère les dates depuis MongoDB, souvent stockées sous forme de timestamps (ISODate ou Date)
      const formattedDate = dayjs(params.value).format("DD/MM/YYYY HH:mm:ss");
      return formattedDate;
    },
    width: 200,
  },
  {
    field: "updateAt",
    headerName: "Date de dernière mise à jour",
    renderCell: (params) => {
      // Quand onrécupère les dates depuis MongoDB, souvent stockées sous forme de timestamps (ISODate ou Date)
      const formattedDate = dayjs(params.value).format("DD/MM/YYYY HH:mm:ss");
      return formattedDate;
    },
    width: 200,
  },
  {
    field: "id",
    headerName: "Actions",
    renderCell: (params) => (
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
          onClick={() => {}}
          size={35}
          style={{ cursor: "pointer" }}
        />
      </Box>
    ),
    width: 150,
  },
];

export default function MoviePageAdmin() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies(setMovies, setLoading); // Call the fetchMovies function on component mount
  }, []);

  const paginationModel = { page: 0, pageSize: 20 };

  // Fonction pour appliquer un background color alterné
  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row";
  };

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
