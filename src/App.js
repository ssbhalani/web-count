import React from "react";
import Main from "./Main"
import theme from "./Theme/theme.js";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
