// 1. Autocomplete
// 🔹 Définition : Un champ de saisie avec des suggestions automatiques basées sur une liste de valeurs.
// 🔹 Utilisation : Permet aux utilisateurs de rechercher et sélectionner un élément dans une liste.
// 🔹 Exemple : Un champ de recherche avec une liste déroulante filtrable.
// 🔹 Dépendance : Utilise souvent un TextField comme champ d'entrée.

// 2. TextField
// 🔹 Définition : Un champ de saisie standard pour entrer du texte.
// 🔹 Utilisation : Sert de base aux champs de formulaire, peut être utilisé seul ou dans un FormControl.
// 🔹 Exemple : Un champ de saisie pour un nom ou un email.
// 🔹 Dépendance : Peut être utilisé dans un FormControl pour une meilleure gestion des états.

// 3. FormControl
// 🔹 Définition : Un conteneur qui facilite la gestion des états des champs de formulaire.
// 🔹 Utilisation : Encapsule TextField, Select, RadioGroup, etc., pour gérer les erreurs et les labels.
// 🔹 Exemple : Utilisé pour organiser un Select avec un label clair.

// 4. MenuItem
// 🔹 Définition : Un élément d'une liste déroulante (Select ou Menu).
// 🔹 Utilisation : Définit les options d'un Select ou d'un menu contextuel.
// 🔹 Dépendance : Nécessite un Select ou un Menu.

// Résumé
// Autocomplete : Champ de saisie avec suggestions automatiques.
// TextField : Champ de texte de base.
// FormControl : Conteneur pour gérer les entrées et leurs états.
// MenuItem : Élément d’une liste déroulante (Select ou Menu).

import {
  Autocomplete,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  IconButton,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
// ICONS
import { MdExpandMore } from "react-icons/md";
// STYLES
import { formControl } from "./StylesFilters";
// ICONS
import { MdOutlineReplay } from "react-icons/md";

// Style commun pour les Selects avec thème rouge
const redSelectStyles = {
  color: "red",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#F00" },
    "&:hover fieldset": { borderColor: "#F00" },
    "&.Mui-focused fieldset": { borderColor: "#F00" },
    "& input": { color: "red" },
  },
  "& .MuiInputLabel-root": { color: "#F00" },
  "& .MuiInputLabel-root.Mui-focused": { color: "red" },
  "& .MuiInputBase-input": {
    color: "red",
  },
};

interface Filters_Props {
  allMovies: { year: number }[]; // tableau de films, ici on utilise seulement year
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  actors: string[];
  selectedActors: string[];
  setSelectedActors: (actors: string[]) => void;

  country: string[];
  selectedCountry: string[];
  setSelectedCountry: (countries: string[]) => void;

  selectedYear: number | undefined;
  setSelectedYear: (year: number) => void;

  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;

  sortOption: string;
  setSortOption: (option: string) => void;

  resetFilters: () => void;
}

export default function Filters({
  allMovies,
  //
  searchTerm,
  setSearchTerm,
  //
  actors,
  selectedActors,
  setSelectedActors,
  //
  country,
  selectedCountry,
  setSelectedCountry,
  //
  selectedYear,
  setSelectedYear,
  //
  genres,
  selectedGenres,
  setSelectedGenres,
  //
  sortOption,
  setSortOption,
  //
  resetFilters,
}: Filters_Props) {
  // Extraire les années uniques et les trier par ordre décroissant
  const annees = [...new Set(allMovies.map((film) => film.year))].sort(
    (a, b) => b - a
  );

  /////
  // Gérer la sélection des acteurs
  function handleActorSelection(
    event: React.SyntheticEvent,
    newValue: string[]
  ) {
    setSelectedActors(newValue); // newValue contient déjà les valeurs sélectionnées
  }

  // Gérer la sélection de l'année
function handleYearChange(e: SelectChangeEvent<string | number>) {
  const value = e.target.value;

  // Ensure the value is a number (if it's a string, convert it to a number)
  setSelectedYear(typeof value === "string" ? parseInt(value, 10) : value);
}
  // Gérer la sélection des genres
  const handleGenreChange = (e: SelectChangeEvent<string[]>) => {
    const selected = e.target.value; // e.target.value devrait être un tableau de chaînes (string[])

    if (Array.isArray(selected)) {
      setSelectedGenres(selected); // met à jour l'état si selected est bien un tableau
    } else {
      console.error("Expected an array but received:", selected); // message d'erreur si ce n'est pas un tableau
    }
  };

  // Gérer la sélection du critère de tri
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        background: "#000",
        display: "flex",
        flexWrap: "nowrap",
        height: "100px",
        justifyContent: "center",
        position: "fixed",
        top: "70px",
        width: "100vw",
        zIndex: 999,
      }}
    >
      {/* Champ de recherche */}
      <TextField
        label='Rechercher un film'
        sx={formControl}
        variant='outlined'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Dropdown des acteurs */}
      <Autocomplete
        groupBy={(actor) => actor.charAt(0).toUpperCase()}
        multiple
        onChange={handleActorSelection}
        options={actors}
        renderInput={(params) => (
          <TextField
            sx={[formControl, { width: "500px" }]}
            {...params}
            label='Filtrer par acteurs'
            variant='outlined'
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              label={option}
              sx={{ backgroundColor: "#FFF", color: "red" }}
            />
          ))
        }
        value={selectedActors}
      />

      {/* Dropdown des country */}
      <FormControl sx={[formControl, { width: "200px" }]}>
        <InputLabel sx={{ color: "#F00" }}>Filtrer par Pays</InputLabel>{" "}
        <Select
          IconComponent={(props) => (
            <IconButton {...props} sx={{ background: "" }}>
              <MdExpandMore
                size={40}
                style={{ color: "red", position: "absolute", top: "-5px" }}
              />
            </IconButton>
          )}
          multiple
          onChange={(event) =>
            setSelectedCountry(event.target.value as string[])
          }
          renderValue={(selected) => selected.join(", ")}
          sx={redSelectStyles}
          value={selectedCountry}
        >
          {country.map((country_item, index) => (
            <MenuItem key={index} value={country_item}>
              {country_item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Sélecteur d'année */}
      <FormControl sx={[formControl, { width: "200px" }]}>
        <InputLabel sx={{ color: "#F00" }}>Filtrer par année</InputLabel>
        <Select
          label='Filtrer par année'
          IconComponent={(props) => (
            <IconButton {...props} sx={{ background: "" }}>
              <MdExpandMore
                size={40}
                style={{ color: "red", position: "absolute", top: "-5px" }}
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
          onChange={handleYearChange}
          sx={redSelectStyles}
          value={selectedYear}
        >
          <MenuItem value=''>Toutes les années</MenuItem>
          {annees.map((year) => (
            <MenuItem
              sx={{
                backgroundColor: selectedYear === year ? "#f0f0f0" : "white", // Highlight selected item
                color: selectedYear === year ? "red" : "black", // Change text color of selected item
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Hover effect
                },
              }}
              value={year}
            >
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Sélecteur de genres */}
      <FormControl sx={[formControl, { width: "200px" }]}>
        <InputLabel>Filtrer par genres</InputLabel>
        <Select
          label='Filtrer par genres'
          multiple
          IconComponent={(props) => (
            <IconButton {...props} sx={{ background: "" }}>
              <MdExpandMore
                size={40}
                style={{ color: "red", position: "absolute", top: "-5px" }}
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
          onChange={handleGenreChange}
          renderValue={(selected) => selected.join(", ")} // Affiche les genres sélectionnés
          sx={redSelectStyles}
          value={selectedGenres}
        >
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
              <ListItemText primary={genre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Sélecteur du critère de tri */}
      <FormControl sx={formControl}>
        <InputLabel sx={{ color: "#F00" }}>Tri</InputLabel>
        <Select
          label='Tri'
          IconComponent={(props) => (
            <IconButton {...props} sx={{ background: "" }}>
              <MdExpandMore
                size={40}
                style={{ color: "red", position: "absolute", top: "-5px" }}
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
          sx={redSelectStyles}
          value={sortOption}
        >
          <MenuItem value='nameAsc'>Nom (A-Z)</MenuItem>
          <MenuItem value='nameDesc'>Nom (Z-A)</MenuItem>
          <MenuItem value='yearAsc'>Année (Croissant)</MenuItem>
          <MenuItem value='yearDesc'>Année (Décroissant)</MenuItem>
        </Select>
      </FormControl>
      <MdOutlineReplay
        color='#F00'
        size={40}
        onClick={resetFilters}
        style={{ cursor: "pointer", margin: "10px" }}
      />
    </Box>
  );
}
