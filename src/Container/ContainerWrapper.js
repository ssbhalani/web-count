import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useLayoutEffect, useState } from "react";
import { showWebScreen } from "../utils/generalUtils";
import useViewport from "../Hooks/useViewport";
import Header from "../Components/Common/Header";
import SideDrawer from "../Components/Common/SideDrawer";
import clsx from 'clsx';
import { useLocation } from 'react-router-dom'
// import HeaderMob from "../Components/Common/HeaderWithSideBarMob";

const useStyle = makeStyles((theme) => ({
  countContainerWrapperRoot: {
    minHeight: "100vh",
  },
  countContainerWrapperBody: {
    flex: "0 0 calc(100% - 94px)",
    maxWidth: "calc(100% - 267px)",
    marginLeft: "280px",
    height: "calc(100vh - 101px)",
  },
  countSideMenu:{
    marginLeft: "auto !important",
    maxWidth: "calc(100% - 76px) !important",
  },
  mainContainerCls:{
    padding: 20,
    height: "calc(100vh - 97px)"
  }
}));

const ContainerWrapper = (props) => {
  const { width } = useViewport();
  const location = useLocation();
  const { children } = props;
  const classes = useStyle();
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");

  useLayoutEffect(() => {
    let tempRoute = location.pathname.split('/');
    setSelectedMenu(tempRoute[1])
  }, [])

  const sidebarMenuItemAcion = (status) => {
    setOpen(status)
  }

  return (
    <>
      {showWebScreen(width) ? (
        <Grid className={clsx(classes.countContainerWrapperRoot)}>
          <SideDrawer open={open} setOpen={sidebarMenuItemAcion} />
          <Grid className={clsx(classes.countContainerWrapperBody, !open && classes.countSideMenu)}>
            <Header activeRoute={selectedMenu} />
            <div className={classes.mainContainerCls}>
              {children}
            </div>
          </Grid>
        </Grid>
      ) : (
        <Grid className={classes.countContainerWrapperRoot}>
          {/* <HeaderMob /> */}
          <div className={classes.mainContainerCls}>
            {children}
          </div>
        </Grid>
      )}
    </>
  );
};

export default ContainerWrapper;
