import React from 'react';
import './Layout.scss';
import {Outlet} from "react-router-dom";

function Layout(): JSX.Element {
  return (
    <div className="container">
      <Outlet/>
    </div>
  );
}

export default Layout;
