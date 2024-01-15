import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
  },
}));

export default function PageLoading() {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress
        className={classes.progress}
        color="primary"
        disableShrink
      />
    </div>
  );
}
