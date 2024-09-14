import React from 'react';
import { Navigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';


const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAuthenticated = Boolean(decoded);
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
