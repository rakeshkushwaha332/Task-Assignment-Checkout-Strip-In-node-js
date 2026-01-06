import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Header />
      <br />
      
      <br/>
      <Outlet />
      <br />
    
    </div>
  );
};

export default Layout;
