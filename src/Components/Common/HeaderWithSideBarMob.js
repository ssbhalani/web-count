import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  FormControl,
  Select,
  Grid,
  List,
  IconButton,
  Divider,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import { profileMenuItem, sidebarMenuItems } from "./utils/data";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT_START } from "Actions/AuthAction";
import { START_GET_PHARMACY_CONFIG } from "Actions/UserAction";
import { SET_HEADER_FILTER_PHARMACIES } from "Actions/PharmacyAction";
import { getLocalStorage, capitalizeFirstLetter } from "utils/generalUtils";
import { ReactComponent as MenuIcon } from "Assets/Icons/MenuIcon.svg";
import { ReactComponent as BranchIcon } from "Assets/Icons/BranchIcon.svg";
import HtmlTooltipMain from "Components/Common/HtmlTooltipMain";
import SideBarMenuItem from "Components/Common/SideBarCommanList";
import PrimaryIcon from "Components/Common/PrimaryIcon";
import { ReactComponent as Logout } from "Assets/Icons/Logout.svg";
import { ReactComponent as RepeatSmart } from "Assets/Logo/RepeatSmart.svg";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const useStyle = makeStyles((theme) => ({
  rsToolBarRoot: {
    background: "#FFF !important ",
    boxShadow: "none !important",
    marginBottom: "20px",
    "&>div": {
      display: "flex",
    },
  },
  rsHeaderRightSide: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "20px",
    "& .MuiAvatar-root": {
      border: `2px solid ${theme.palette.white.main}`,
    },
    "&>button": {
      border: `1px solid${theme.palette.background.red} !important`,
      color: "#E6676B !important",
      background: theme.palette.white.main,
      "&:hover": {
        border: `none`,
        background: theme.palette.white.main,
      },
    },
  },
  rsFormControlRoot: {
    marginRight: "-1px !important",
    minWidth: "200px !important",
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
  },
  rsDivider: {
    background: `${theme.palette.background.grey} !important`,
    [theme.breakpoints.down("sm")]: {
      width: "87%",
      marginLeft: "55px !important",
    },
  },
  rsMainTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px !important",
    },
  },
  rsDrawerListRoot: {
    "&>li": {
      "& .MuiListItemButton-root": {
        padding: "14px 16px",
        borderRadius: "4px",
      },
    },
    "& h2": {
      marginBottom: "30px",
      cursor: "pointer",
    },
  },
  rsBranchIcon: {
    marginRight: "39px",
    width: "30px",
    height: "30px",
  },
}));

function HeaderMob({
  pharmacyConfigData,
  getPharmacyConfigAction,
  setHeaderFileterPharmaciesAction,
  loginUserDetail,
  logout,
}) {
  const classes = useStyle();
  const theme = useTheme();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [titleApp, setTitleApp] = useState("Dashboard");
  const [
    pharmacyFilterDropDownValueChange,
    setPharmacyFilterDropDownValueChange,
  ] = useState("all");
  const [openBranchInput, setOpenBranchInput] = useState(null);
  const openBranch = Boolean(openBranchInput);

  /** Handle Click Open Branch List */
  const handleClickOpenBranchList = (event) => {
    setOpenBranchInput(event.currentTarget);
  };

  /** Handle Close Branch List */
  const handleCloseBranchList = () => {
    setOpenBranchInput(null);
  };

  /** Handle Click Open Drawer */
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  /** Handle Click Close Drawer */
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  /** Handle Click Profile menu */
  const handleClickOpenProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /** Handle Click Menu Close */
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /** Handle Click Logout */
  const handleClickLogout = (e, item) => {
    if (item?.key === "logout") {
      logout();
    }
  };

  /** Handle Change Pharmacy Header */
  const handleChangePharmacy = (event, value) => {
    setHeaderFileterPharmaciesAction({
      name: value?.props.children,
      id: value?.props?.value,
    });
    setPharmacyFilterDropDownValueChange(event?.target?.value);
    setOpenBranchInput(null);
  };

  /** Set Header Title */
  const setHeaderTitle = () => {
    const activeModule = [...sidebarMenuItems].filter((item, index) => {
      return item.url === window.location.pathname;
    });
    setTitleApp(
      activeModule?.[0]?.hasOwnProperty("getTitle")
        ? activeModule?.[0].getTitle()
        : activeModule?.[0]?.value
    );
  };

  /** Pharmacy header set in locat storage  */
  useEffect(() => {
    const selectedPharmcies = getLocalStorage("Pharmacies", true);
    if (selectedPharmcies?.length > 0) {
      setPharmacyFilterDropDownValueChange(selectedPharmcies[0].id);
    }
  }, []);

  /** Pharmacy api useffect */
  useEffect(() => {
    if (
      !pharmacyConfigData?.loading &&
      !Object.keys(pharmacyConfigData?.data)?.length
    ) {
      getPharmacyConfigAction({ offset: 0 });
    }
  }, [pharmacyConfigData]);

  /** Set Header Location Useffect */
  useEffect(() => {
    setHeaderTitle();
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={openDrawer}
        className={classes.rsToolBarRoot}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(openDrawer && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {!openDrawer && (
            <Typography variant="h3" medium className={classes.rsMainTitle}>
              {titleApp}
            </Typography>
          )}
          <Grid className={classes.rsHeaderRightSide}>
            <HtmlTooltipMain title="Pharmacie Branch">
              <PrimaryIcon
                className={classes.rsBranchIcon}
                icon={BranchIcon}
                onClick={handleClickOpenBranchList}
              />
            </HtmlTooltipMain>
            <Avatar
              onClick={handleClickOpenProfileMenu}
              sx={{
                height: 38,
                width: 38,
              }}
            >
              {capitalizeFirstLetter(loginUserDetail?.data?.data?.name[0])}
            </Avatar>
          </Grid>
        </Toolbar>
        <Divider className={classes.rsDivider} />
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            borderRadius: "10px",
            width: "10%",
            width: "170px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar className={classes.rsProfileIcon}>
            {capitalizeFirstLetter(loginUserDetail?.data?.data?.name[0])}
          </Avatar>
          <Box display={"block"}>
            {loginUserDetail?.data?.data?.name.split(" ")[0]}
            {loginUserDetail?.data?.data?.role === "pharmacist_staff" && (
              <Typography variant="h6" medium className={classes.rsProfileRole}>
                {capitalizeFirstLetter("pharmacist Staff")}
              </Typography>
            )}
          </Box>
        </MenuItem>
        <Divider sx={{ background: "#F7F7F8 !important" }} />
        {profileMenuItem?.map((item) => {
          return (
            <MenuItem onClick={(e) => handleClickLogout(e, item)}>
              <Logout
                style={{
                  height: 20,
                  width: 20,
                  marginRight: "15px",
                }}
              />
              {item.value}
            </MenuItem>
          );
        })}
      </Menu>
      <Menu
        anchorEl={openBranchInput}
        open={openBranch}
        onClose={handleCloseBranchList}
      >
        <FormControl
          className={classes.rsFormControlRoot}
          InputLabelProps={{ shrink: true }}
        >
          <Select
            value={pharmacyFilterDropDownValueChange}
            onChange={(e, value) => handleChangePharmacy(e, value)}
            disabled={
              ["/surgery", "/staff", "/activity", "/pharmacies"].indexOf(
                window.location.pathname
              ) !== -1 || pharmacyConfigData?.loading
            }
            size="small"
          >
            <MenuItem value={"all"}>All Branches</MenuItem>
            {pharmacyConfigData?.data?.list?.map((item, index) => (
              <MenuItem key={index} value={item?.id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Menu>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          {openDrawer && (
            <Typography variant="h3" medium className={classes.rsMainTitle}>
              {titleApp}
            </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List className={classes.rsDrawerListRoot}>
          <Typography
            style={{
              textAlign: openDrawer ? "left" : "center",
              marginLeft: openDrawer ? "10px" : "0px",
            }}
            variant="h2"
            semiBold
            color="primary"
          >
            {!openDrawer ? (
              "R"
            ) : (
              <PrimaryIcon
                style={{
                  width: "200px",
                  height: "37px",
                  marginLeft: "10px",
                }}
                icon={RepeatSmart}
                cursor="pointer"
              />
            )}
          </Typography>
          <SideBarMenuItem
            loginUserDetail={loginUserDetail}
            open={openDrawer}
          />
        </List>
      </Drawer>
      <Main open={openDrawer} style={{ marginTop: "0px" }}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}


export default HeaderMob;
