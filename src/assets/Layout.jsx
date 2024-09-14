// Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <>
      {showHeader && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
