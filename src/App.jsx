import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";
import Authentication from "./Screens/Authentications";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import AddSurveyScreen from "./pages/AddSurvey";
import SurveysScreen from "./pages/Surveys";
import SurveyDetails from "./pages/SurveyDetailsPage";

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
          exact
          path="/dashboard/insert-new-survey"
          element={<AddSurveyScreen />}
        />
        <Route exact path="/" element={<Authentication />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/surveys" element={<SurveysScreen />} />
        <Route path="/surveys/:id" element={<SurveyDetails />} />
      </Routes>
    </>
  );
}

export default App;
