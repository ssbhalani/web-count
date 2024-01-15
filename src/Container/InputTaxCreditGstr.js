import React from "react";
import ContainerWrapper from "./ContainerWrapper";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ReactComponent as DownloadIcon } from "../Assets/Icons/DownloadIcon.svg";
import { ReactComponent as Fullscreen } from "../Assets/Icons/Fullscreen.svg";
import { ReactComponent as SearchIcon } from "../Assets/Icons/SearchIcon.svg";
import { ReactComponent as FilterIcon } from "../Assets/Icons/FilterIcon.svg";
import PrimaryIcon from "../Components/Common/PrimaryIcon";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { tempInvoicesSiteData } from "../utils/data";
import SupplierTable from "../Components/InputTextCredit/SupplierTable";
import DocumentTable from "../Components/InputTextCredit/DocumentTable";

const yearArray = ["2019-20", "2020-21", "2021-22", "2022-23"];

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
    justifyContent: "end",
    width: "100%",
    padding: "10px 0px",
    borderBottom: "1px solid var(--gray-scale-outline, #E0E0E0)",
    "&>div": {
      "&>h4": {
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
      justifyContent: "start",
      width: "100%",
      padding: "10px 0px",
      flexWrap: "wrap",
      "&>div": {
        width: "20%",
        "@media (max-width: 1199px)": {
          width: "33.3333%",
          marginBottom: 15,
        },
        "@media (max-width: 992px)": {
          width: "50%",
          marginBottom: 10,
        },
        "@media (max-width: 568px)": {
          width: "100%",
        },
        "&>h5": {
          display: "flex",
          padding: "0px 15px",
          alignItems: "flex-start",
          gap: "10px",
          alignSelf: "stretch",
          color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
          fontFamily: "Metropolis",
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "28px",
          margin: "0px",
        },
        "&>p": {
          display: "flex",
          padding: "0px 15px",
          alignItems: "flex-start",
          gap: "10px",
          alignSelf: "stretch",
          color: "var(--text-secondary, #666)",
          fontFamily: "Metropolis",
          fontSize: 14,
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "20px",
          margin: "0px",
        },
      },
    },
  },
  normalSupplies: {
    borderRadius: "5px",
    borderLeft: "5px solid var(--primary-b-3, #0078D4)",
  },
  reverseChargeSupplies: {
    borderRadius: "5px",
    borderLeft: "5px solid var(--primary-b-2, #249EE4)",
  },
  importSupplies: {
    borderRadius: "5px",
    borderLeft: "5px solid var(--secondary-yellow, #FFCA2C)",
  },
  creditNoteSupplies: {
    borderRadius: "5px",
    borderLeft: "5px solid var(--primary-b-1, #54DAFF)",
  },
  ineligibleITCSupplies: {
    borderRadius: "5px",
    borderLeft: "5px solid var(--secondary-green, #29A22E)",
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
    gap: "15px",
    alignSelf: "stretch",
    background: "var(--gray-scale-white, #FFF)",
    justifyContent: "space-between",
    width: "100%",
    borderBottom: "1px solid var(--gray-scale-outline, #E0E0E0)",
    paddingBottom: 30,
    "&>div": {
      "&>svg": {
        margin: 10,
      },
    },
    "@media (max-width: 1199px)": {
      flexWrap: "wrap",
    },
  },
  tableIcons: {
    display: "flex",
    "@media (max-width: 992px)": {
      flexWrap: "wrap",
    },
  },
  tableFilter: {
    display: "flex",
    alignItems: "center",
    "&>span": {
      marginRight: 26,
      color: "var(--text-secondary, #666)",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px",
    },
    "@media (max-width: 992px)": {
      flex: "0 0 100%",
      marginBottom: 15,
    },
  },
  headerYearField: {
    "& .MuiInputBase-root": {
      height: 40,
    },
    marginRight: 20,
  },
  headerYearFieldItem: {
    display: "flex",
    alignItems: "center",
  },
  UpdateDataBtn: {
    paddingLeft: "20px !important",
    borderLeft: "1px solid #E0E0E0",
    "&>button": {
      borderRadius: "5px !important",
      display: "flex !important",
      padding: "12px 20px !important",
      justifyContent: "center !important",
      alignItems: "center !important",
      gap: "5px !important",
      color: "#FFF !important",
      fontSize: "14px !important",
      fontWeight: "600 !important",
      lineHeight: "20px !important",
    },
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 6.0, 24, 4.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 6.0, 24, 4.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 6.0, 24, 4.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 6.0, 24, 4.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 6.0, 24, 4.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 6.0, 24, 4.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 6.0, 24, 4.0),
];

const InputTaxCreditGstr = ({ setCheckedChaseUp }) => {
  const classes = useStyle();
  const [value, setValue] = React.useState([
    dayjs("2022-04-07"),
    dayjs("2022-04-10"),
  ]);
  const [mainTab, setMainTab] = React.useState("1");
  const [age, setAge] = React.useState("2021-22");
  const handleChange = (event, newValue) => {
    setMainTab(newValue);
  };
  const [documentTableViewData, setDocumentTableViewData] = React.useState([]);
  const [supplierTableViewData, setSupplierTableViewData] = React.useState([]);
  const [selectedTableView, setSelectedTableView] =
    React.useState("document-view");

  // useLayoutEffect(() => {
  //   setDocumentTableViewData(
  //     tempInvoicesSiteData[window.localStorage.getItem("selected_year")]
  //       .invoices
  //   );
  //   setSupplierTableViewData(
  //     tempInvoicesSiteData[window.localStorage.getItem("selected_year")]
  //       .suppliers
  //   );
  // }, []);

  return (
    <ContainerWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <div className={classes.tabChartBox}>
            <div className={classes.tabChartTitle}>
              <div>
                <h4>₹20,93,000</h4>
                <p>GSTR-2A Input Tax Credit</p>
              </div>
            </div>
            <div className={classes.tabChartTitleBox}>
              <div>
                <div>
                  <h5 className={classes.normalSupplies}>₹80,90,500</h5>
                  <p>Normal Supplies</p>
                </div>
                <div>
                  <h5 className={classes.reverseChargeSupplies}>
                    ₹79,89,45,345
                  </h5>
                  <p>Supplies under Reverse Charge</p>
                </div>
                <div>
                  <h5 className={classes.importSupplies}>₹58,97,000</h5>
                  <p>Import</p>
                </div>
                <div>
                  <h5 className={classes.creditNoteSupplies}>₹69,73,987</h5>
                  <p>Credit Note</p>
                </div>
                <div>
                  <h5 className={classes.ineligibleITCSupplies}>₹10,00,000</h5>
                  <p>Ineligible ITC</p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid container>
          <div className={classes.tabTableBox}>
            <div className={classes.tabTableDownloadBox}>
              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="gender"
                    value={selectedTableView}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="document-view"
                      control={<Radio />}
                      label="Document View"
                      onChange={() => setSelectedTableView("document-view")}
                    />
                    <FormControlLabel
                      value="supplier-view"
                      control={<Radio />}
                      label="Supplier View"
                      onChange={() => setSelectedTableView("supplier-view")}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={classes.tableIcons}>
                <div className={classes.tableFilter}>
                  <span>Document Type</span>
                  <div className={classes.headerYearField}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                      >
                        {yearArray.map((item, key) => (
                          <MenuItem
                            key={key}
                            value={item}
                            className={classes.headerYearFieldItem}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <PrimaryIcon icon={SearchIcon} width="24px" height="24px" />
                <PrimaryIcon icon={FilterIcon} width="24px" height="24px" />
                <PrimaryIcon icon={Fullscreen} width="24px" height="24px" />
                <PrimaryIcon icon={DownloadIcon} width="24px" height="24px" />
                <div className={classes.UpdateDataBtn}>
                  <Button variant="contained">Update Data</Button>
                </div>
              </div>
            </div>
            {selectedTableView === "supplier-view" ? (
              <SupplierTable tableData={tempInvoicesSiteData} />
            ) : (
              <DocumentTable tableData={tempInvoicesSiteData} />
            )}
          </div>
        </Grid>
      </Box>
    </ContainerWrapper>
  );
};

export default InputTaxCreditGstr;
