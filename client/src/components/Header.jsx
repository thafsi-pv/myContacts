import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Drawer1 from "./Drawer1";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10 !items-center">
      <div className="flex-none">
        {/* <button className="btn btn-square btn-ghost" onClick={openDrawer}>
          <BiMenu className="inline-block w-6 h-6 stroke-current" />
        </button> */}
        <Drawer1
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          setDrawerOpen={setDrawerOpen}
        />
      </div>
      <div className="flex-1">
        <Link to="/">
          <p className="flex text-xl px-4 items-baseline font-semibold">
            my<p className="text-green-500 p-0 m-0 font-bold text-2xl">C</p>
            ontacts
          </p>
        </Link>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span className="text-xs">AA</span>
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <Link to="/login">
              <a className="text-md font-semibold flex items-center">
                <span>
                  <IoLogOutOutline className="mr-2 h-6 w-6" />
                </span>
                Logout
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
