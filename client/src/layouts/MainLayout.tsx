import React, { JSX } from "react";
import Header from "../comnponents/ui/Header";
//
import { Outlet } from "react-router-dom";

function MainLayout(): JSX.Element {
  //
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
