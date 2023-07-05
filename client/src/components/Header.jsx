import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Drawer from "./Drawer";

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
        <a className="btn btn-ghost normal-case text-xl">myContacts</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={openDrawer}>
          <BiMenu className="inline-block w-6 h-6 stroke-current" />
        </button>
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} setDrawerOpen={setDrawerOpen} />
      </div>
    </div>
  );
}

export default Header;
