import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';

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
        <Route exact path="/media-7z2c9kds9" element={<Dashboard rates={true} demographics={true} />} />
        <Route exact path="/media-100z2c9kds9" element={<Dashboard rates={true} demographics={false} />} />
        {/*<Route exact path="/media-2ntt" element={<Dashboard rates={true} demographics={false} tiktok={false}/>} />*/}
      </Routes>
    </>
  );
}

export default App;
