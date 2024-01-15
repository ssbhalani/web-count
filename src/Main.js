import React, { Suspense, useState } from "react";
// import {
//   Route,
//   Routes,
//   Navigate,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
import { BrowserRouter, Route, Routes, useNavigate, useLocation, Link } from 'react-router-dom';
import PageLoading from "./Components/PageLoading";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  isLoggedIn,
  protectedRoute,
  getLocalStorage,
} from "./utils/generalUtils";
import Dashboard from "./Container/Dashboard";
import VendorRisk from "./Container/VendorRisk";
import ItcReconciliation from "./Container/ItcReconciliation";
import AuthenticationSession from "./Container/AuthenticationSession";
import InputTaxCredit from "./Container/InputTaxCredit";
import InputTaxCreditGstr from "./Container/InputTaxCreditGstr";
import OutputTaxLiability from "./Container/OutputTaxLiability";
import Reports from "./Container/Reports";

const Main = (props) => {
  const { } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const [showBackdrop, setShowBackdrop] = useState(false);

  return (
    <>
      <Backdrop open={showBackdrop} sx={{ zIndex: "1301" }}>
        <CircularProgress size={100} thickness={8} />
      </Backdrop>
      <Suspense >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendor-risk" element={<VendorRisk />} />
          <Route path="/itc-reconciliation" element={<ItcReconciliation />} />
          <Route path="/authentication-session" element={<AuthenticationSession />} />
          <Route path="/input-tax-credit" element={<InputTaxCredit />} />
          <Route path="/gstr-2a" element={<InputTaxCreditGstr />} />
          <Route path="/output-tax-liability" element={<OutputTaxLiability />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Main;
