import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Collapse,

} from "@mui/material";


import React, { useLayoutEffect } from "react";
import ContainerWrapper from "./ContainerWrapper";
import dayjs from 'dayjs';
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import clsx from "clsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BarChart from "../Components/Chart/BarChart";
import { useState } from "react";
import { ReactComponent as DownloadIcon } from "../Assets/Icons/DownloadIcon.svg";
import { ReactComponent as Fullscreen } from "../Assets/Icons/Fullscreen.svg";
import PrimaryIcon from "../Components/Common/PrimaryIcon";
import { ListItemIcon } from "@mui/material";

import InputTextCreditTable from  '../Components/InputTextCredit/InputTextCreditTable';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { tempSiteData } from "../utils/data";
import { formatNumberWithCommasAndDecimal, getIGSTValuesByMonth, sumTwoNumber, getIGSTTableValuesByMonth, divisionTwoNumber } from "../utils/generalUtils"
import { useEffect } from "react";


const useStyle = makeStyles((theme) => ({
  inputTexCreditBox: {
    width: "100%",
    display: "flex",
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 20,
    "&>div": {
      width: "33%"
    }
  },
  texCreditSection: {
    padding: "0px 20px",
    "&>p": {
      margin: 0,
      color: "#666",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20px"
    },
    "&>h4": {
      margin: 0,
      fontSize: 22,
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "30px",
      marginTop: 5,
    }
  },
  gstrDownload2b: {
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
  },
  dividerBox: {
    borderLeft: "1px solid #E0E0E0",
  },
  chartTitle2b3b: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    "&>h5": {
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: 18,
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "26px"
    },
    "&>div": {
      display: "flex",
      "&>span": {
        color: "#666",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "20px",
        display: "flex",
        alignItems: "center",
        "&>svg": {
          marginRight: 10,
          marginLeft: 10,
        }
      }
    }
  },
  tabChartBox: {
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
    alignSelf: "stretch",
    borderRadius: "10px",
    border: "1px solid var(--gray-scale-outline, #E0E0E0)",
    background: "var(--gray-scale-white, #FFF)",
    width: "100%"
  },
  tabChartTitle: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px 0px",
    borderBottom: "1px solid var(--gray-scale-outline, #E0E0E0)",
    "&>h5": {
      color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 600,
      lineHeight: "26px",
      margin: 0,
      alignItems: "center",
      display: "flex"
    },
    "&>div": {
      "&>h4": {
        color: "var(--success-main, #2E7D32)",
        textAlign: "right",
        fontSize: 22,
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "30px",
        margin: 0,
      },
      "&>p": {
        color: "var(--text-secondary, #666)",
        textAlign: "right",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "20px",
        margin: 0,
      }
    }
  },
  tabChartTitleBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px 0px",
    "&>div": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "10px 0px",
    }
  },
  tabTableBox: {
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
    alignSelf: "stretch",
    borderRadius: "10px",
    border: "1px solid var(--gray-scale-outline, #E0E0E0)",
    background: "var(--gray-scale-white, #FFF)",
    width: "100%",
    marginTop: 20,
  },
  tabTableDownloadBox: {
    display: "flex",
    padding: "10px 0px",
    alignItems: "center",
    gap: "194px",
    alignSelf: "stretch",
    background: "var(--gray-scale-white, #FFF)",
    justifyContent: "end",
    width: "100%",
    borderBottom: "1px solid var(--gray-scale-outline, #E0E0E0)",
    "&>div": {
      "&>svg": {
        margin: 10,
      }
    }
  }
}))


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];


const InputTaxCredit = ({ setCheckedChaseUp }) => {
  const classes = useStyle();
  const [value, setValue] = React.useState([
    dayjs('2022-04-07'),
    dayjs('2022-04-10'),
  ]);
  const [mainTab, setMainTab] = React.useState('2');
  const [underclaimedITCCount, setUnderclaimedITCCount] = React.useState(sumTwoNumber(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')].gst.total, tempSiteData.gstr3b[window.localStorage.getItem('selected_year')].gst.total));
  const [gstr2B, setGstr2B] = React.useState(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')].gst.total);
  const [gstr3B, setGstr3B] = React.useState(tempSiteData.gstr3b[window.localStorage.getItem('selected_year')].gst.total);
  const [ITCAvailableTable, setITCAvailableTable] = React.useState([]);
  const [MonthWiseDetailTable, setMonthWiseDetailTable] = React.useState([]);
  const [ITCIneligibleTable, setITCIneligibleTable] = React.useState([]);
  const [ReverseChargeTable, setReverseChargeTable] = React.useState([]);
  const [ImportedGoodsTable, setImportedGoodsTable] = React.useState([]);

  const [MonthWiseDetailTableRowData, setMonthWiseDetailTableRowData] = useState([]);
  const [ITCAvailableTableRowData, setITCAvailableTableRowData] = useState([]);
  const [ITCIneligibleTableRowData, setITCIneligibleTableRowData] = useState([]);
  const [ReverseChargeTableRowData, setReverseChargeTableRowData] = useState([]);
  const [ImportedGoodsTableRowData, setImportedGoodsTableRowData] = useState([]);


  const handleChange = (event, newValue) => {
    setMainTab(newValue);
  };

  useLayoutEffect(() => {
    let tempITCTable = getIGSTTableValuesByMonth(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')].children.itcavl, tempSiteData.gstr3b[window.localStorage.getItem('selected_year')].children.itcavl);

    let tempMonthWiseDetailTable = getIGSTTableValuesByMonth(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')], tempSiteData.gstr3b[window.localStorage.getItem('selected_year')]);

    let tempITCIneligibleTable = getIGSTTableValuesByMonth(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')].children.itcinelg, tempSiteData.gstr3b[window.localStorage.getItem('selected_year')].children.itcinelg);

    let tempReverseChargeTable = getIGSTTableValuesByMonth(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')].children.reverse, tempSiteData.gstr3b[window.localStorage.getItem('selected_year')].children.reverse);

    let tempImportedGoodsTable = getIGSTTableValuesByMonth(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')].children.imports, tempSiteData.gstr3b[window.localStorage.getItem('selected_year')].children.imports);
    setITCAvailableTable(tempITCTable)
    setMonthWiseDetailTable(tempMonthWiseDetailTable)
    setITCIneligibleTable(tempITCIneligibleTable)
    setReverseChargeTable(tempReverseChargeTable)
    setImportedGoodsTable(tempImportedGoodsTable)
  }, [])

  const [userData, setUserData] = useState({
    // labels:tempData.map((data) => data.year),
    labels: getIGSTValuesByMonth(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')]).map((value) => ""),
    datasets: [{
      label: "GSTR-2B",
      // data: tempData.map((data) => data.userGain),
      data: getIGSTValuesByMonth(tempSiteData.gstr2b[window.localStorage.getItem('selected_year')]).map((value) => value),
      backgroundColor: ["#0078D4"]
    }, {
      label: "GSTR-3B",
      // data: tempData.map((data) => data.userLost),
      data: getIGSTValuesByMonth(tempSiteData.gstr3b[window.localStorage.getItem('selected_year')]).map((value) => value),
      backgroundColor: ["#D2E3F9"]
    }]
  })


  const handleUserClickOnITCRow = (item) => {

    const isRowExpanded = ITCAvailableTableRowData.includes(item.month);

    setITCAvailableTableRowData((prevRows) =>
      isRowExpanded
        ? prevRows.filter((row) => row !== item.month)
        : [...prevRows, item.month]
    );
  }

  const handleUserClickOnMonthRow = (item) => {

    const isRowExpanded = MonthWiseDetailTableRowData.includes(item.month);

    setMonthWiseDetailTableRowData((prevRows) =>
      isRowExpanded
        ? prevRows.filter((row) => row !== item.month)
        : [...prevRows, item.month]
    );
  }

  const handleUserClickOnITCNeligibleRow = (item) => {

    const isRowExpanded = ITCIneligibleTableRowData.includes(item.month);

    setITCIneligibleTableRowData((prevRows) =>
      isRowExpanded
        ? prevRows.filter((row) => row !== item.month)
        : [...prevRows, item.month]
    );
  }

  const handleUserClickOnReverseRow = (item) => {

    const isRowExpanded = ReverseChargeTableRowData.includes(item.month);

    setReverseChargeTableRowData((prevRows) =>
      isRowExpanded
        ? prevRows.filter((row) => row !== item.month)
        : [...prevRows, item.month]
    );
  }

  const handleUserClickOnImportedGoodRow = (item) => {

    const isRowExpanded = ImportedGoodsTableRowData.includes(item.month);

    setImportedGoodsTableRowData((prevRows) =>
      isRowExpanded
        ? prevRows.filter((row) => row !== item.month)
        : [...prevRows, item.month]
    );
  }


  return (
    <ContainerWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container >
          <div className={classes.inputTexCreditBox}>
            <div className={classes.texCreditSection}>
              <p>Underclaimed ITC</p>
              <h4 style={{ color: "#2E7D32" }}>₹{formatNumberWithCommasAndDecimal(underclaimedITCCount)}</h4>
            </div>
            <div className={clsx(classes.texCreditSection, classes.dividerBox)}>
              <p>GSTR-2B</p>
              <h4>₹{formatNumberWithCommasAndDecimal(gstr2B)}</h4>
            </div>
            <div className={clsx(classes.texCreditSection, classes.dividerBox)}>
              <p>GSTR-3B</p>
              <h4>₹{formatNumberWithCommasAndDecimal(gstr3B)}</h4>
            </div>
          </div>
        </Grid>
        <Grid className={classes.gstrDownload2b}>
          <div className={classes.chartTitle2b3b}>
            <h5>GSTR 3B vs 2B</h5>
            <div>
              <span> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" fill="#0078D4" />
              </svg>
                GSTR-2B</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z" fill="#D2E3F9" />
                </svg>
                GSTR-3B</span>
            </div>
          </div>

          <BarChart chartData={userData} />

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={mainTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Month Wise Detail" value="1" />
                  <Tab label="ITC Available" value="2" />
                  <Tab label="ITC Ineligible" value="3" />
                  <Tab label="Reverse Charge" value="4" />
                  <Tab label="Imported Goods" value="5" />
                </TabList>
              </Box>

              <TabPanel value="1">
              <InputTextCreditTable underclaimedITCCount={underclaimedITCCount} gstr2B={gstr2B} gstr3B={gstr3B} MonthWiseDetailTable={MonthWiseDetailTable} handleUserClickOnMonthRow={handleUserClickOnMonthRow} MonthWiseDetailTableRowData={MonthWiseDetailTableRowData} />
                
              </TabPanel>

              <TabPanel value="2">
              <InputTextCreditTable underclaimedITCCount={underclaimedITCCount} gstr2B={gstr2B} gstr3B={gstr3B} MonthWiseDetailTable={ITCAvailableTable} handleUserClickOnMonthRow={handleUserClickOnMonthRow} MonthWiseDetailTableRowData={MonthWiseDetailTableRowData} />
                
              </TabPanel>

              {/* <TabPanel value="3">ITC Ineligible</TabPanel> */}
              <TabPanel value="3">
                <InputTextCreditTable underclaimedITCCount={underclaimedITCCount} gstr2B={gstr2B} gstr3B={gstr3B} MonthWiseDetailTable={ITCIneligibleTable} handleUserClickOnMonthRow={handleUserClickOnMonthRow} MonthWiseDetailTableRowData={MonthWiseDetailTableRowData} />
              </TabPanel>

              <TabPanel value="4">
                <InputTextCreditTable underclaimedITCCount={underclaimedITCCount} gstr2B={gstr2B} gstr3B={gstr3B} MonthWiseDetailTable={ReverseChargeTable} handleUserClickOnMonthRow={handleUserClickOnMonthRow} MonthWiseDetailTableRowData={MonthWiseDetailTableRowData} />
              </TabPanel>

              <TabPanel value="5">
                <InputTextCreditTable underclaimedITCCount={underclaimedITCCount} gstr2B={gstr2B} gstr3B={gstr3B} MonthWiseDetailTable={ImportedGoodsTable} handleUserClickOnMonthRow={handleUserClickOnMonthRow} MonthWiseDetailTableRowData={MonthWiseDetailTableRowData} />
              </TabPanel>

            </TabContext>
          </Box>


        </Grid>
      </Box>
    </ContainerWrapper>
  );
};

export default InputTaxCredit;
