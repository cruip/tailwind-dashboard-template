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
import Trips from "./pages/Trips";
import Terminals from "./pages/Terminals";
import { Payment } from "./pages/Payment";
import { getDashboardRoutes } from "./utils/enum";

function App() {
  const location = useLocation();
  const dashboardRoutes = getDashboardRoutes();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          path={dashboardRoutes.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.CUSTOMER_BOOKING}
          element={
            <ProtectedRoute>
              <CustomerBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.PENDING_CUSTOMER_BOOKING}
          element={
            <ProtectedRoute>
              <PendingBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.CUSTOMER_BOOKING_DETAILS}
          element={
            <ProtectedRoute>
              <CustomerBookingDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.CUSTOMER}
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.CUSTOMER_DETAILS}
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.TRANSPORT_COMPANY}
          element={
            <ProtectedRoute>
              <TransportCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.TRANSPORT_COMPANY_DETAILS}
          element={
            <ProtectedRoute>
              <TransportCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.TRANSPORT_COMPANY_DETAILS_TRIP}
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.ROUTES}
          element={
            <ProtectedRoute>
              <RoutesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.TERMINAL}
          element={
            <ProtectedRoute>
              <Terminals />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.ADMIN_PRICING}
          element={
            <ProtectedRoute>
              <AdminPricing />
            </ProtectedRoute>
          }
        />
        <Route
          path={dashboardRoutes.PAYMENT}
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route path={dashboardRoutes.LOGIN} element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
