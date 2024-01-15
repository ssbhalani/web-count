import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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

function DocumentTable({ tableData }) {
  const classes = useStyle();

  return (
    <Grid container>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="Document">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableColumn}>
                  Return Period
                </TableCell>
                <TableCell className={classes.tableColumn} align="left">
                  Supplier Details
                </TableCell>
                <TableCell className={classes.tableColumn} align="left">
                  Invoice Details
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Taxable Value
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Total Tax
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Supplier GSTR-3B Filling
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  Reverse Charge
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  ITC Available
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  IGST
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  CGST
                </TableCell>
                <TableCell className={classes.tableColumn} align="right">
                  SGST
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(tableData).map((year) => {
                const yearData = tableData[year];
                return yearData.invoices.map((invoice, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {new Date(
                        invoice.date.toString().slice(0, 4),
                        invoice.date.toString().slice(4, 6) - 1,
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
                          {invoice?.supplierName?.length > 15
                            ? invoice?.supplierName?.substring(0, 15) + "..."
                            : invoice?.supplierName}
                        </span>
                        <span style={{ color: "#0288D1" }}>
                          {invoice?.gstin}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{invoice?.invoiceNumber}</span>
                        <span style={{ color: "#0288D1" }}>{"13-Jan-23"}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {Number(invoice?.taxableValue).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {Number(invoice?.total).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">
                      {invoice?.reverseCharge ? "Yes" : "No"}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: invoice?.itcAvailable ? "#1B5E20" : "#A37A00",
                      }}
                    >
                      {invoice?.itcAvailable ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell align="right">
                      {Number(invoice?.igst).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {Number(invoice?.cgst).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {Number(invoice?.sgst).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}

export default DocumentTable;
