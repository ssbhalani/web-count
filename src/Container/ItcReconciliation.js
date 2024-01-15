import React from "react";
import ContainerWrapper from "./ContainerWrapper";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import clsx from "clsx";
import { ReactComponent as DownloadIcon } from "../Assets/Icons/DownloadIcon.svg";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PrimaryIcon from "../Components/Common/PrimaryIcon";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  dateReturnPeriod: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "&>span":{
      marginRight:10,
    }
  },
  dateField:{
    "&>div":{
      "&>div":{
        height: 38
      }
    },
  },
  dateSpace:{
    marginRight: 10,
    marginLeft: 10,
    lineHeight: "38px"
  },
  gsrt2BData:{
    display: "flex",
    padding: 20,
    alignItems: "center",
    gap: "20px",
    alignSelf: "stretch",
    borderRadius: 10,
    border: "1px solid var(--gray-scale-outline, #E0E0E0)",
    marginTop: "30px !important",
  },
  gsrtIconText:{
    display: "flex",
    width: 56,
    height: 56,
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 5,
    background: "var(--success-light, #EBFFEC)",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20px"
  },
  gsrtTitle:{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&>h6":{
      color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
      fontSize: "16px !important",
      fontStyle: "normal",
      fontWeight: "500 !important",
      lineHeight: "24px !important",
    }
  },
  gsrtDescription:{
    color:"var(--text-secondary, #666)",
    fontSize: "14px !important",
    fontStyle: "normal",
    fontWeight: "400px !important",
    lineHeight: "20px !important"
  },
  tallyPurchaseRegisterItem:{
    maxWidth: "calc(50% - 37px) !important"
  },
  tallyPurchaseRegisterDivider:{
    color: "#000",
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "30px",
    display: "flex",
    alignItems: "center",
    margin: "0px 20px",
    marginTop: 30,
  },
  gstr2BDataSection:{
    width: "100%",
  },
  gstrDownloadIcon:{
    color: "var(--primary-b-4, #034FA0)",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20px"
  },
  gstrDownloadIcon:{
    minWidth: 18,
    display: "flex",
      alignItems: "center",
    "&>div":{
      minWidth: 18,
      marginRight: 5,
    },
    "&>span":{
      color: "var(--primary-b-4, #034FA0)",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "20px"
    }
  }
}))

const ItcReconciliation = ({ setCheckedChaseUp }) => {
  const classes = useStyle();
  const [value, setValue] = React.useState([
    dayjs('2022-04-07'),
    dayjs('2022-04-10'),
  ]);
  return (
    <ContainerWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container >
          <Grid item xs={12} className={classes.dateReturnPeriod}>
            <span>Return Period</span>
            <div className={classes.dateField}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    renderInput={(inputProps) => <TextField variant="outlined" key={'start'} />}
                    slotProps={{ textField: { variant: 'outlined' } }}
                />
              </LocalizationProvider>
              <span className={classes.dateSpace}>To</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    renderInput={(inputProps) => <TextField variant="outlined" key={'end'} />}
                    slotProps={{ textField: { variant: 'outlined' } }}
                />
              </LocalizationProvider>
            </div>
          </Grid>
        
          <Grid item xs={12} className={classes.gsrt2BData}>
            <span className={classes.gsrtIconText}>2B</span>
            <div className={classes.gstr2BDataSection}>
              <Grid className={classes.gsrtTitle}>
                <Typography variant="subtitle1" >GSTR-2B Data</Typography>
                <Link to={'/authentication-session'}>
                  <div className={classes.gstrDownloadIcon}>
                    <ListItemIcon>
                      <PrimaryIcon
                        icon={DownloadIcon}
                        width="18px"
                        height="18px"
                      />
                    </ListItemIcon>
                    <span>Download</span>
                  </div>
                </Link>
              </Grid>
              <Typography variant="body1" className={classes.gsrtDescription}>Download 2B Data from GSTN to start matching</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container  >
          <Grid item xs={6} className={clsx(classes.gsrt2BData, classes.tallyPurchaseRegisterItem)}>
            <span className={classes.gsrtIconText}>T</span>
            <div className={classes.gstr2BDataSection}>
              <Grid className={classes.gsrtTitle}>
                <Typography variant="subtitle1">Tally</Typography>
                <div className={classes.gstrDownloadIcon}>
                  <ListItemIcon>
                    <PrimaryIcon
                      icon={DownloadIcon}
                      width="18px"
                      height="18px"
                    />
                  </ListItemIcon>
                  <span>Download</span>
                </div>
              </Grid>
              <Typography variant="body1" className={classes.gsrtDescription}>Connect your Tally to automate reconciliation</Typography>
            </div>
          </Grid>
          <Grid className={classes.tallyPurchaseRegisterDivider}> OR </Grid>
          <Grid item xs={6} className={clsx(classes.gsrt2BData, classes.tallyPurchaseRegisterItem)}>
            <span className={classes.gsrtIconText}>PR</span>
            <div className={classes.gstr2BDataSection}>
              <Grid className={classes.gsrtTitle}>
                <Typography variant="subtitle1" className={classes.gsrtTitle}>GSTR-2B DataPurchase Register</Typography>
                <div className={classes.gstrDownloadIcon}>
                  <ListItemIcon>
                    <PrimaryIcon
                      icon={DownloadIcon}
                      width="18px"
                      height="18px"
                    />
                  </ListItemIcon>
                  <span>Download</span>
                </div>
              </Grid>
              <Typography variant="body1" className={classes.gsrtDescription}>You need to upload purchase data to start matching​ </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </ContainerWrapper>
  );
};

export default ItcReconciliation;
