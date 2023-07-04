import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import  { Toaster } from 'react-hot-toast';

function MainPage() {
  return (
    <div>
      <Header />
      <Outlet/>
      <BottomNavigation/>
      <Toaster />
    </div>
  );
}

export default MainPage;
