import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';
import { Context } from './context.js';

// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';

function App() {

  // ------- CONTEXT VARIABLES ---------
  const [belt, setBelt] = React.useState('');
  const [section, setSection] = React.useState('');

  const getters = {
    belt,
    section
  }

  const setters = {
    setBelt,
    setSection
  }
  // ------------------------------------
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Context.Provider value = {{ getters, setters }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/analytics" element={<Analytics />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
