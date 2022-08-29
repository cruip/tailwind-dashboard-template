import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { getToken } from './utils/Utils';

export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const token = getToken();
    // const {authenticate} = JSON.parse(localStorage.getItem('userData'));
    // console.log(authenticate, 'kkik');
    const { user } = useContext(AuthContext);
   
    return token ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>;
  }