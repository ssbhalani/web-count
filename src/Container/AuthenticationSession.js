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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyle = makeStyles((theme) => ({
  inactiveAPI: {
    display: "flex",
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderRadius: 10,
    background: "#FEEDED",
    width: "100%",
    "&>div":{
      display: "flex",
      justifyContent:"space-between",
      width: "100%",
      alignItems: "center",
      marginBottom: 10,
      "&>h5":{
        color: "#303030",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "24px",
        margin: 0,
      },
      "&>span":{
        padding: "8px 10px",
        color: "#D32F2F",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "20px"
      }
    },
    "&>p":{
      color: "#303030",
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "16px",
      margin: 0,
    }
  },
  gstrDownload2b:{
    display: "flex !important",
    padding: 20,
    flexDirection: "column !important",
    alignItems: "flex-start",
    gap: 20,
    alignSelf: "stretch",
    borderRadius: 10,
    border: "1px solid #E0E0E0",
    background: "#FFF",
    marginTop: 20,
  }
}))


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const AuthenticationSession = ({ setCheckedChaseUp }) => {
  const classes = useStyle();
  const [value, setValue] = React.useState([
    dayjs('2022-04-07'),
    dayjs('2022-04-10'),
  ]);
  return (
    <ContainerWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container >
          <div className={classes.inactiveAPI}>
            <div>
              <h5>Inactive API</h5>
              <span>Activate</span>
            </div>
            <p>Please active your API for updated GST Portal sync</p>
          </div>
        </Grid>
        <Grid className={classes.gstrDownload2b}>
            <div>
                <h5>Download GSTR-2B data from GSTIN</h5>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
      </Box>
    </ContainerWrapper>
  );
};

export default AuthenticationSession;
