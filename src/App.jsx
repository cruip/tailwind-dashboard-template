import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { ProtectedRoute } from "./ProtectedRoutes";

import "./css/style.scss";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";

function App() {
  const location = useLocation();
  const context = useContext(AuthContext);
  const user = context.user;
  const [token, setToken] = React.useState("");

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    // console.log(localStorage.getItem('token'), 'tok');
  }, []);

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
        {/* <Route exact path="/" element={<ProtectedRoute Component={Dashboard} />} /> */}
        {/* <ProtectedRoute exact path="/" component={Dashboard} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
