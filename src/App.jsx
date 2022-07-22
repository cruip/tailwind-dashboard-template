import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "./context/authContext";

import "./css/style.scss";

import "./charts/ChartjsConfig";
import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";

function App() {
  const location = useLocation();
  const context = useContext(AuthContext)
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const user = context.user;
  
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
     
          {user ? (
            
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                </Routes>
             
          ) : (
           <Routes>
            <Route path="/login" element={<Login />}/>
           </Routes>
          )}
    </>
  );
}

export default App;
