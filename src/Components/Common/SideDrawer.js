import React from "react";
import { List, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import MuiDrawer from "@mui/material/Drawer";
import SideBarMenuItem from "./SideBarCommanList";
import PrimaryIcon from "./PrimaryIcon";
import { ReactComponent as CountsLogo } from "../../Assets/Logo/CountsLogo.svg";
import { ReactComponent as CountsIcon } from "../../Assets/Logo/CountsIcon.svg";
import clsx from 'clsx';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "85px",
});

const useStyle = makeStyles((theme) => ({
  countDrawerRoot: {
    "&>div": {
      zIndex: "9999 !important",
      background: "#01579B",
      width: 280,
      maxWidth: 280,
    },
  },
  countDrawerWidth: {
    "&>div": {
      width: "76px !important",
    },
  },
  countDrawerListRoot: {
    padding: "0px 0px !important",
    "&>li": {
      "& .MuiListItemButton-root": {
        padding: "20px 24px",
        borderRadius: "4px",
      },
      "& .MuiListItemText-root": {
        marginTop: "0px",
        marginBottom: "0px",
      },
    }
  },
  countMenuLogo:{
    "& h2": {
      padding: "24px 30px",
      cursor: "pointer",
      lineHeight: "48px",
      borderBottom: "1px solid var(--info-main, #0288D1)"
    },
  },
  countMenuIcon:{
    "& h2": {
      padding: "20px 30px",
      cursor: "pointer",
      lineHeight: "48px"
    },
  }
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      boxShadow: "0px 0px 10px rgba(26, 102, 122, 0.1)",
      borderRight: "unset",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      boxShadow: "0px 0px 10px rgba(26, 102, 122, 0.1)",
      borderRight: "unset",
    },
  }),
}));

function SideDrawer({ open, setOpen, loginUserDetail }) {
  const classes = useStyle();

  return (
    <Drawer
      // onMouseEnter={() => setOpen(true)}
      // onMouseLeave={() => setOpen(false)}
      variant="permanent"
      open={open}
      className={clsx(classes.countDrawerRoot, !open && classes.countDrawerWidth)}
    >
      <List className={clsx(classes.countDrawerListRoot, !open ? classes.countMenuIcon : classes.countMenuLogo)}>
        <Typography
          variant="h2"
          color="primary"
        >
          {!open ? (
            <PrimaryIcon
              icon={CountsIcon}
              cursor="pointer"
              onClick={() => setOpen(true)}
            />
          ) : (
            <PrimaryIcon
              icon={CountsLogo}
              onClick={() => setOpen(false)}
              cursor="pointer"
            />
          )}
        </Typography>
        <SideBarMenuItem open={open} />
      </List>
    </Drawer>
  );
}

export default SideDrawer;
