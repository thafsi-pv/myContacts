import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

function MainPage() {
  return (
    <div className="max-h-screen">
      <Header />
      <Outlet />
      {/* <BottomNavigation/> */}
    </div>
  );
}

export default MainPage;
