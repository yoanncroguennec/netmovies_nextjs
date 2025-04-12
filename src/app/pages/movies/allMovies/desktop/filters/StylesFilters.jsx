export const formControl = {
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
