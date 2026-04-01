import React from "react";
import Navbar1 from "../components/Navbar1";
import { Outlet } from "react-router-dom";

const MainLayout = () => {

  return (
    <>
      <Navbar1 />
      <Outlet />
    </>
  );

};

export default MainLayout;