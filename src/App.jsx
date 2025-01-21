import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import './css/style.css';
import './charts/ChartjsConfig.jsx';

import { ContextProvider } from './context'; // Import ContextProvider

// Import pages
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import MapPage from './pages/MapPage.jsx';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
