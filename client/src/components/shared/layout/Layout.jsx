import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import '../../../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="row g-0">
        <div className="col-md-3 col">
          <Sidebar />
        </div>
        <div className="col col-md-9 content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
