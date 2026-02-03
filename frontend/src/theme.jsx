// theme.js
import { createTheme } from "@mui/material/styles";

const pinkTheme = createTheme({
  palette: {
    primary: {
      main: "#eec8dc", // soft pink
      contrastText: "#fff",
    },
    secondary: {
      main: "#db5079", // stronger pink for buttons
      contrastText: "#fff",
    },
    background: {
      default: "#fff0f5", // light pink background
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#900C3F",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default pinkTheme;
