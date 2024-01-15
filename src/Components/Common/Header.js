import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Toolbar,
  Typography,
  Box,
  Avatar,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MuiAppBar from "@mui/material/AppBar";
import { useLocation, useNavigate } from "react-router-dom";
import {ActiveRouteTitle} from "../../utils/data";
import { ReactComponent as AppsIcon } from "../../Assets/Icons/AppsIcon.svg";
import { ReactComponent as CalendarIcon } from "../../Assets/Icons/CalendarIcon.svg";
import { ReactComponent as NotificationsIcon } from "../../Assets/Icons/NotificationsIcon.svg";
import { ReactComponent as ChevronDownIcon } from "../../Assets/Icons/ChevronDownIcon.svg";
import PrimaryIcon from "../Common/PrimaryIcon";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const useStyle = makeStyles((theme) => ({
  countToolBarRoot: {
    background: "unset !important ",
    boxShadow: "none !important",
    "&>div": {
      padding: "10px 20px !important",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      height: 96,
    },
  },
  countHeaderRightSide: {
    display: "flex",
    alignItems: "center",
    height:96,
    [theme.breakpoints.down("sm")]: {
      marginLeft: "15px",
    },
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
  countDivider: {
    background: `${theme.palette.background.grey} !important`,
    [theme.breakpoints.down("sm")]: {
      width: "358px",
    },
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.20), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
  },
  countMainTitle: {
    color: "var(--gray-scale-black, #1A1A1A)",
    fontFamily: 'Metropolis',
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "30px",
    margin: 0
  },
  countHeaderTitle:{
    display: "flex",
    flexDirection: 'column',
    "&>p":{
      color: "var(--text-disabled, #9E9E9E)",
      fontFamily: "Metropolis",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "16px",
      margin: 0,
      minHeight: 16,
    }
  },
  headerYearField:{
    "& .MuiInputBase-root":{
      height: 40
    }
  },
  headerYearFieldItem:{
    display: "flex",
    alignItems: "center",
  },
  headerNotification:{
    display: "flex",
    width: "48px",
    height: "48px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
    margin: "0px 20px"
  },
  profileMenu:{
    display: "flex",
    alignItems: "center",
  },
  appMenuIcon:{
    marginLeft:20,
    padding: 10
  }
}));


const yearArray = [
  '2022',
  '2023', 
];

function Header({activeRoute}) {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyle();
  const [headerTitle, setHeaderTitle] = useState({title: "", text: ""})
  const [currentYear, setCurrentYear] = React.useState('2022');
  useLayoutEffect(() => {
    if(window.localStorage.getItem("selected_year")){
      setCurrentYear(window.localStorage.getItem("selected_year"))
    }else{
      window.localStorage.setItem("selected_year", "2022");
      setCurrentYear('2022')
    }
    
  }, [])
  useEffect(() => {
    if(ActiveRouteTitle[activeRoute]){
      setHeaderTitle(ActiveRouteTitle[activeRoute])
    }else{
      setHeaderTitle({title: "", text: ""})
    }
  },[activeRoute]);

  

  const handleChange = (event) => {
    window.localStorage.setItem("selected_year", event.target.value)
    setCurrentYear(event.target.value);
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="relative" className={classes.countToolBarRoot}>
        <Toolbar>
          <div className={classes.countHeaderTitle}>
            <h3 className={classes.countMainTitle}>
              {headerTitle?.title}
            </h3>
            <p>{headerTitle?.text}</p>
          </div>
          <Grid className={classes.countHeaderRightSide}>
            <div className={classes.headerYearField}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentYear}
                  onChange={handleChange}
                >
                  {
                    yearArray.map((item, key) => (
                      <MenuItem key={key} value={item} className={classes.headerYearFieldItem}>
                        <PrimaryIcon
                          icon={CalendarIcon}
                          width="18px"
                          height="18px"
                        /> &nbsp;
                        {item}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <div className={classes.headerNotification}>
              <PrimaryIcon
                icon={NotificationsIcon}
                width="24px"
                height="24px"
              />
            </div>
            <div className={classes.profileMenu}>
              Metabook Technolo...
              <PrimaryIcon
                  icon={ChevronDownIcon}
                  width="24px"
                  height="24px"
                />
            </div>
            <div className={classes.appMenuIcon}>
              <PrimaryIcon
                icon={AppsIcon}
                width="24px"
                height="24px"
              />
            </div>
          </Grid>
        </Toolbar>
        <Divider className={classes.countDivider} />
      </AppBar>
    </Box>
  );
}

export default Header;
