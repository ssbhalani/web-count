import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    width: "100%",
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
      display: "flex",
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
      },
    },
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
    },
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
      },
    },
  },
  tableHeaderColumn: {
    width: 216,
    maxWidth: 216,
    color: "var(--Text-Primary, rgba(0, 0, 0, 0.87)) !important",
    fontFamily: "Metropolis !important",
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
    lineHeight: "20px !important",
  },
  tableSubTitleColumn: {
    width: 216,
    maxWidth: 216,
  },
  tableBodyColumn: {
    width: 216,
    maxWidth: 216,
    textAlign: "right !important",
  },
  tableColumn: {
    "white-space": "nowrap",
  },
}));

function SupplierTable({ tableData }) {
  const classes = useStyle();
  return (
    <Grid container>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableColumn}>
                  Return Period
                </TableCell>
                <TableCell className={classes.tableColumn} align="left">
                  Supplier Details
                </TableCell>
                <TableCell className={classes.tableColumn} align="left">
                  GSTIN Status
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  No. of Records
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Taxable Value
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Integrated Tax
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Central Tax
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  State Tax
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Cess
                </TableCell>
              </TableRow>
            </TableHead>
            {Object.keys(tableData).map((year) => {
              const yearData = tableData[year];
              return Object.keys(yearData.suppliers).map((gstin) => {
                const supplier = yearData.suppliers[gstin];
                return (
                  <TableRow
                    key={gstin}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(
                        supplier?.lastRetPeriod.toString().slice(0, 4),
                        supplier?.lastRetPeriod.toString().slice(4, 6) - 1,
                        1
                      )
                        .toLocaleDateString("en-US", {
                          month: "short",
                          year: "2-digit",
                        })
                        .replace(/(\w+) (\d+)/, "$1-$2")}
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>
                          {supplier?.name?.length > 15
                            ? supplier?.name?.substring(0, 15) + "..."
                            : supplier?.name}
                        </span>
                        <span style={{ color: "#0288D1" }}>{gstin}</span>
                      </div>
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="right">{supplier?.numInvoices}</TableCell>
                    <TableCell align="right">
                      {Number(supplier?.taxableValue).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {Number(supplier?.igst).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {Number(supplier?.cgst).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {Number(supplier?.sgst).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {Number(supplier?.cess).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              });
            })}
            {/* <TableBody>
            <TableRow
              key={123456}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Apr-23
              </TableCell>
              <TableCell align="right">{"dsd"}</TableCell>
              <TableCell align="right">{"Dfdsf"}</TableCell>
              <TableCell align="right">{"dsfsdfdsf"}</TableCell>
              <TableCell align="right">{"dfsdfdsf"}</TableCell>
              <TableCell align="right">{"sdfd dfsd"}</TableCell>
              <TableCell align="right">{"dsf "}</TableCell>
              <TableCell align="right">{"row.protein"}</TableCell>
            </TableRow>
          </TableBody> */}
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}

export default SupplierTable;
