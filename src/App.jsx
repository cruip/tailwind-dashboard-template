import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Podcasts from "./pages/Podcasts";
import Query from "./pages/Query";
import Advocacy from "./pages/Advocacy";

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
          path="/"
          element={<Dashboard rates={false} demographics={false} />}
        />
        <Route
          exact
          path="/media-100z2c9kds9"
          element={<Dashboard rates={true} demographics={true} type="media" />}
        />
        <Route
          exact
          path="/media-100z2c9kds9/news"
          element={<News type="news" />}
        />
        <Route
          exact
          path="/media-100z2c9kds9/podcasts"
          element={<Podcasts type="podcasts" />}
        />
        <Route
          exact
          path="/media-123120"
          element={
            <Dashboard rates={false} demographics={false} type="media" />
          }
        />
        <Route exact path="/podcasts" element={<Podcasts type="podcasts" />} />
        <Route exact path="/news" element={<News type="news" />} />
        <Route exact path="/query-123120/news" element={<News type="news" />} />
        <Route
          exact
          path="/query-123120/podcasts"
          element={<Podcasts type="podcasts" />}
        />
        <Route
          exact
          path="/query-123120"
          element={<Query rates={false} demographics={false} type="query" />}
        />
        <Route exact path="/advocacy" element={<Advocacy />} />
      </Routes>
    </>
  );
}

export default App;
