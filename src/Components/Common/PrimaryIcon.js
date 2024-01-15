import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
}));

export default function PrimaryIcon(props) {
  const {
    icon,
    color = "secondary",
    width,
    height,
    small,
    className,
    changeOnHover,
    ...other
  } = props;
  const theme = useTheme();

  const classes = useStyle();

  let size = {
    small: {
      width: 20,
      height: 20,
    },
  };

  let colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    white: theme.palette.white.main,
    error: theme.palette.error.main,
  };
  Object.keys(theme?.palette?.grey || {}).map((key) => {
    colors["grey" + key] = theme?.palette?.grey[key];
  });

  return (
    <>
      {React.createElement(icon, {
        ...(small && { width: size.small.width, height: size.small.height }),
        ...(width && { width }),
        ...(height && { height }),
        fill: colors[color],
        className: clsx(className, changeOnHover && classes.yhPrimaryIcon),
        loading: "lazy",
        ...other,
      })}
    </>
  );
}
