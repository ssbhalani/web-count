import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { setLocalStorage, toggleInArray } from "../../utils/generalUtils";
import { useNavigate } from "react-router-dom";
import { sidebarMenuItems } from "../../utils/data";
import clsx from "clsx";
import PrimaryIcon from "./PrimaryIcon";

const useStyle = makeStyles((theme) => ({
  countMenuItem: {
    padding: "0px !important",
    fontSize: "16px",
    "& .MuiListItemIcon-root": {
      minWidth: "auto",
      height: "24px",
    },
    "& .MuiListItemText-root": {
      "&>p>span": {
        background: `${theme.palette.secondary.main}10`,
        border: `0.5px solid${theme.palette.secondary.main}50`,
        borderRadius: "2px",
        padding: "1px 8px",
        marginLeft: "10px",
      },
    },
  },
  countActiveMenuItem: {
    background: `#016FB6 !important`,
    "&>div>span>span":{
      color: '#54DAFF !important'
    }
  },
  selectedMenuIcon: {
    "&>path": {
      fill: `#55D9FC`,
    },
    "&>rect": {
      fill: `#55D9FC`,
    },
    "&>g": {
      "&>path": {
        fill: `#55D9FC`,
      },
    },
  },
  menuItem:{
    color: 'var(--gray-scale-white, #FFF)',
    fontFamily: 'Metropolis',
    fontSize: '14.4px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '16.571px'
  },
  iconAndTextSpace:{
    marginRight: 20,
  }
}));

function SideBarMenuItem({ loginUserDetail, open }) {
  const classes = useStyle();
  const navigate = useNavigate();
  const [openDrawerItems, setOpenDrawerItems] = useState([]);
  const currentPath = window.location.pathname;
  const [selectedIndex, setSelectedIndex] = useState(currentPath);

  /** Handle Click Sidebar Menu Change */
  const handleSideBarMenuClick = (e, item) => {
    if (item?.sub?.length > 0) {
      setOpenDrawerItems([...toggleInArray(openDrawerItems, item?.key)]);
    } else {
      navigate(item?.url);
      setSelectedIndex(item?.key);
    }
  };

  /** Set Current Path  In Local Storage */
  useEffect(() => {
    if (currentPath != "/order") {
      setLocalStorage("searchString", "");
      setLocalStorage("todayOrder", false);
      setLocalStorage("surgeryList", {});
      setLocalStorage("groupList", {});
    }
    if (currentPath != "/rx-collection") {
      setLocalStorage("chaseUp", false);
    }
  }, [currentPath]);

  /** SideBar set based on path useffect */
  useEffect(() => {
    const selectedMenu = sidebarMenuItems.filter((item) => {
      if (item.hasOwnProperty("sub")) {
        let selectedSubMenu = item.sub.filter((subItem) => {
          return subItem.url === currentPath;
        });
        if (selectedSubMenu.length > 0) {
          return selectedSubMenu;
        }
      } else {
        return item.url === currentPath;
      }
    });
    if (selectedMenu.length > 0) {
      setSelectedIndex(selectedMenu[0]?.key);
    }
  }, []);

  /** Render SideBar Menu List */
  const renderMenuItem = (menuItem) => {
   
   
   
   
    return (
        <>
          <ListItem
            sx={{ display: "block" }}
            to={menuItem?.url}
            onClick={(e) => handleSideBarMenuClick(e, menuItem)}
            className={classes.countMenuItem}
            key={menuItem?.url}
          >
              <ListItemButton
                className={clsx(
                  selectedIndex == menuItem?.key && classes.countActiveMenuItem
                )}
              >
                {menuItem?.icon && (
                  <ListItemIcon>
                    <PrimaryIcon
                      className={clsx(
                        selectedIndex == menuItem?.key &&
                        classes.selectedMenuIcon, open && classes.iconAndTextSpace, selectedIndex == menuItem?.key &&
                        'selectIconMenu',  `${menuItem?.key}`)
                      }
                      icon={menuItem?.icon}
                      width="22px"
                      height="22px"
                    />
                  </ListItemIcon>
                )}
                {open && (
                  <ListItemText>
                    <span className={classes.menuItem}>
                      {menuItem?.value}
                    </span>
                  </ListItemText>
                )}
              </ListItemButton>
          </ListItem>
        </>
      );
  };

  return (
    <>
      {sidebarMenuItems.map((item, index) => {
        return renderMenuItem(item);
      })}
    </>
  );
}

export default SideBarMenuItem;
