import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
