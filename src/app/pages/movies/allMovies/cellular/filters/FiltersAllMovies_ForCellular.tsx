"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
// ICONS
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";

const formControl = {
  backgroundColor: "#000", // White background
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#F00", // White border
    },
    "&:hover fieldset": {
      borderColor: "#F00", // White border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F00", // White border when focused
    },
    "& input": {
      color: "red", // White text
    },
  },
  "& .MuiInputLabel-root": {
    color: "#F00", // Red when selectedYear exists
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "red",
  },
  color: "white",
  margin: "0 10px",
};

interface FiltersAllMovies_ForCellular_PROPS {
  toggle_Search_Filters: boolean;
  setToggle_Search_Filters: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
}

export default function FiltersAllMovies_ForCellular({
  toggle_Search_Filters,
  setToggle_Search_Filters,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
}: FiltersAllMovies_ForCellular_PROPS) {
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const [toggleFilters, setToggleFilters] = useState<boolean>(false);

  // Gérer la sélection du critère de tri
  function handleSortChange(e: SelectChangeEvent<string>) {
    setSortOption(e.target.value);
    // setToggleFilters(!toggleFilters);
    // setToggle_Search_Filters(!toggle_Search_Filters);
  }

  return (
    <Box>
      {toggle_Search_Filters ? (
        <Box
          sx={{
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.6)",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            flexWrap: "nowrap",
            padding: "10px",
            position: "fixed",
            top: "80px",
            zIndex: 999,
          }}
        >
          {toggleSearch || toggleFilters ? null : (
            <IoSearchSharp
              color='#F00'
              onClick={() => setToggleSearch(!toggleSearch)}
              size={25}
              style={{ margin: "5px" }}
            />
          )}
          {toggleSearch ? (
            <TextField
              label='Rechercher un film'
              sx={formControl}
              variant='outlined'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          ) : null}

          {toggleSearch || toggleFilters ? null : (
            <GiHamburgerMenu
              color='#F00'
              onClick={() => setToggleFilters(!toggleFilters)}
              size={25}
              style={{ margin: "5px" }}
            />
          )}
          {toggleFilters ? (
            <Box sx={{}}>
              <FormControl sx={formControl}>
                <InputLabel sx={{ color: "#F00" }}>Tri</InputLabel>
                <Select
                  label='Tri'
                  IconComponent={(props) => (
                    <IconButton {...props} sx={{ background: "" }}>
                      <MdExpandMore
                        size={40}
                        style={{
                          color: "red",
                          position: "absolute",
                          top: "-5px",
                        }}
                      />
                    </IconButton>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        color: "#000",
                        maxHeight: 300, // Set the max height of the dropdown
                      },
                    },
                  }}
                  onChange={handleSortChange}
                  sx={{
                    color: "#F00", // Change text color in the select dropdown
                    "& .MuiMenuItem-root": {
                      color: "purple", // Change text color in the menu items
                    },
                  }}
                  value={sortOption}
                >
                  <MenuItem value='nameAsc'>Nom (A-Z)</MenuItem>
                  <MenuItem value='nameDesc'>Nom (Z-A)</MenuItem>
                  <MenuItem value='yearAsc'>Année (Croissant)</MenuItem>
                  <MenuItem value='yearDesc'>Année (Décroissant)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : null}

          <IoClose
            color='#F00'
            onClick={() => {
              if (toggleSearch === true) {
                setToggleSearch(!toggleSearch);
              } else if (toggleFilters === true) {
                setToggleFilters(!toggleFilters);
              } else if (toggle_Search_Filters === true) {
                setToggle_Search_Filters(!toggle_Search_Filters);
              }
            }}
            size={30}
            style={{ margin: "5px" }}
          />
        </Box>
      ) : (
        <Box
          onClick={() => setToggle_Search_Filters(!toggle_Search_Filters)}
          sx={{
            background: "#FFF",
            border: "3px solid #000",
            borderRadius: "99% 1% 100% 0% / 55% 75% 25% 45% ",
            cursor: "pointer",
            padding: "10px",
            position: "fixed",
            right: "0",
            top: "80px",
            zIndex: 999,
          }}
        >
          <GiHamburgerMenu color='#F00' size={25} />
        </Box>
      )}
    </Box>
  );
}
