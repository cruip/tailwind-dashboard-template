import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import D_Cycle from './pages/Diagnosis_Cycle';
import D_Season from './pages/Diagnosis_Seasonal';
import D_Trend from './pages/Diagnosis_Trend';
import Prescriptive from './pages/Diagnosis_Trend';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/analytics" element={<Analytics />} />
        <Route exact path="/d-trend" element={<D_Trend />} />
        <Route exact path="/d-seasonal" element={<D_Season />} />
        <Route exact path="/d-cycle" element={<D_Cycle />} />
        <Route exact path="/prescriptive" element={<Prescriptive />} />
      </Routes>
    </>
  );
}

export default App;
