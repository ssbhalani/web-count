import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryIcon from "../Common/PrimaryIcon";
import { formatNumberWithCommasAndDecimal, getMonthYear, divisionTwoNumber } from "../../utils/generalUtils";
import { ReactComponent as DownloadIcon } from "../../Assets/Icons/DownloadIcon.svg";
import { ReactComponent as Fullscreen } from "../../Assets/Icons/Fullscreen.svg";
import { ListItemIcon } from "@mui/material";
import Box from '@mui/material/Box';
import clsx from "clsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Collapse,
} from "@mui/material";


const useStyle = makeStyles((theme) => ({
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
  },
  tableHeaderColumn:{
    width:216,
    maxWidth:216,
    color: "var(--Text-Primary, rgba(0, 0, 0, 0.87)) !important",
    fontFamily: "Metropolis !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    lineHeight: "20px !important",
  },
  tableSubTitleColumn:{
    width:216,
    maxWidth:216,
  },
  tableBodyColumn:{
    width:216,
    maxWidth:216,
    textAlign: "right !important"
  }
}));

function InputTextCreditTable({underclaimedITCCount, gstr2B, gstr3B, MonthWiseDetailTable, handleUserClickOnMonthRow, MonthWiseDetailTableRowData}) {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyle();

  return (
    <Grid container>
      <div className={classes.tabChartBox}>
        <div className={classes.tabChartTitle}>
          <h5>GSTR-2B vs 3B</h5>
          <div>
            <h4>₹{formatNumberWithCommasAndDecimal(underclaimedITCCount)}</h4>
            <p>Total Short/Excess Claimed</p>
          </div>
        </div>
        <div className={classes.tabChartTitleBox}>
          <div>
            <span>
              <h4>₹{formatNumberWithCommasAndDecimal(gstr2B)}</h4>
              <p>GSTR-2B</p>
            </span>
            <span>
              <h4>₹{formatNumberWithCommasAndDecimal(gstr3B)}</h4>
              <p>GSTR-3B</p>
            </span>
          </div>
        </div>
      </div>
      <div className={classes.tabTableBox}>
        <div className={classes.tabTableDownloadBox}>
          <ListItemIcon>
            <PrimaryIcon
              icon={DownloadIcon}
              width="24px"
              height="24px"
            />
            <PrimaryIcon
              icon={Fullscreen}
              width="24px"
              height="24px"
            />
          </ListItemIcon>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderColumn}>Period</TableCell>
                <TableCell className={classes.tableHeaderColumn} align="right">Available in 2B</TableCell>
                <TableCell className={classes.tableHeaderColumn} align="right">Claimed in 3B</TableCell>
                <TableCell className={classes.tableHeaderColumn} align="right">Short / (Excess) Claimed</TableCell>
                <TableCell className={classes.tableHeaderColumn} align="right">Cumulative Short / (Excess) Claimed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MonthWiseDetailTable.map((item) => {

                return (
                  <>
                    <TableRow
                      key={item.month}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => handleUserClickOnMonthRow(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell component="th" scope="row">
                        {getMonthYear(item.month)}
                      </TableCell>
                      <TableCell align="right">{parseFloat(item.igstValue2B.total).toFixed(2)}</TableCell>
                      <TableCell align="right">{parseFloat(item.igstValue3B.total).toFixed(2)}</TableCell>
                      <TableCell align="right">{divisionTwoNumber(item.igstValue2B.total, item.igstValue3B.total)}</TableCell>
                      <TableCell align="right">{item.totalClaimed}</TableCell>
                    </TableRow>

                    {/* collapse row content */}
                    <TableRow>
                      <TableCell style={{ padding: 0, background: "var(--Gray-Scale-Fill, #F2F2F2)" }} colSpan={6}>
                        <Collapse in={MonthWiseDetailTableRowData.includes(item.month)} timeout="auto" unmountOnExit>

                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.tableSubTitleColumn}>IGST</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue2B.igst.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue3B.igst.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{divisionTwoNumber(item.igstValue2B.igst.toFixed(2), item.igstValue3B.igst.toFixed(2))}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstSum}</TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>

                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.tableSubTitleColumn}>CGST</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue2B.cgst.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue3B.cgst.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{divisionTwoNumber(item.igstValue2B.cgst.toFixed(2), item.igstValue3B.cgst.toFixed(2))}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.cgstSum}</TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>

                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.tableSubTitleColumn}>SGST</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue2B.sgst.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue3B.sgst.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{divisionTwoNumber(item.igstValue2B.sgst.toFixed(2), item.igstValue3B.sgst.toFixed(2))}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.sgstSum}</TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>

                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell className={classes.tableSubTitleColumn}>CESS</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue2B.cess.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.igstValue3B.cess.toFixed(2)}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{divisionTwoNumber(item.igstValue2B.cess.toFixed(2), item.igstValue3B.cess.toFixed(2))}</TableCell>
                                <TableCell className={classes.tableBodyColumn}>{item.cessSum}</TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>

                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </Grid>
  );
}

export default InputTextCreditTable;
