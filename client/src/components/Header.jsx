import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10">
      <div className="flex-1">
        <Link to='/'>
          <p className="flex text-xl px-4 items-baseline font-semibold">my<p className="text-green-500 p-0 m-0 font-bold text-2xl">C</p>ontacts</p>
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={openDrawer}>
          <BiMenu className="inline-block w-6 h-6 stroke-current" />
        </button>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          setDrawerOpen={setDrawerOpen}
        />
      </div>
    </div>
  );
}

export default Header;
