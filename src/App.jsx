import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import './components/charts/ChartjsConfig';

// Import pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Diagnosis from './pages/Diagnosis';
import Preskriptif from './pages/Preskriptif';
import Deskriptif from './pages/Deskriptif';
import Prediktif from './pages/Prediktif';

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
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/deskriptif" element={<Deskriptif />} />
        <Route exact path="/prediktif" element={<Prediktif />} />
        <Route exact path="/preskriptif" element={<Preskriptif />} />
        <Route exact path="/diagnosis" element={<Diagnosis />} />
      </Routes>
    </>
  );
}

export default App;
