import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // main: "#11C1B0",
      main: "#034FA0",
    },
    secondary: {
      main: "#FFF",
    },
    active: {
      main: "#E9514E",
    },
    background: {
      paper: "#ffffff",
      default: "#FFF",
      grey: "#F7F7F8",
      red: "#E9514E",
      black: "#000000",
    },
    white: {
      main: "#ffffff",
    },
    error: {
      main: "#e9514e",
    },
  },
  typography: {
    fontFamily: "Metropolis",
  },
  components: {
  
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
