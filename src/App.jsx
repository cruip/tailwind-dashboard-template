import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";

import "./css/style.scss";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import CustomerBooking from "./pages/CustomerBooking";
import CustomerBookingDetail from "./pages/CustomerBookingDetail";
import Customers from "./pages/Customers";
import Customer from "./pages/CustomerDetails";
import TransportCompanies from "./pages/TransportCompanies";
import TransportCompany from "./pages/TransportCompanyDetails";
import AdminPricing from "./pages/AdminPricing";
import PendingBooking from "./pages/PendingBookings";
import SingleRoute from "./pages/Route";
import RoutesPage from "./pages/Routes";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

 
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <CustomerBooking />
            </ProtectedRoute>
          }
        />
         <Route
          path="/booking/pending"
          element={
            <ProtectedRoute>
              <PendingBooking />
            </ProtectedRoute>
          }
        />
         <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <CustomerBookingDetail />
            </ProtectedRoute>
          }
        />
         <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
         <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
         <Route
          path="/transport_companies"
          element={
            <ProtectedRoute>
              <TransportCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transport_companies/:id"
          element={
            <ProtectedRoute>
              <TransportCompany />
            </ProtectedRoute>
          }
        />
         <Route
          path="/routes"
          element={
            <ProtectedRoute>
              <RoutesPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin_pricing"
          element={
            <ProtectedRoute>
              <AdminPricing />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
