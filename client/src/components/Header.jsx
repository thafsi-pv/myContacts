import React, { useContext, useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import Drawer1 from "./Drawer1";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { DrawerContext } from "../context/DrawerContext";
import { USER_API } from "../const/const";
import { addPermission, addUserDetails } from "../redux/userPermissionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getInitialLetters } from "../utils/utils";

function Header() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((store) => store.permission);
  const navigate = useNavigate();
  const { showDrawer, toggleDrawer } = useContext(DrawerContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    getUserPermission();
  }, []);

  const getUserPermission = async () => {
    const id = localStorage.getItem("myc_uid");
    const permission = await axios(USER_API + "/permission?id=" + id);

    const userDetails = {
      firstName: permission.data.firstName,
      lastName: permission.data.lastName,
      email: permission.data.email,
      role: permission.data.permission.role,
    };

    dispatch(addPermission(permission.data.permission.permmision));
    dispatch(addUserDetails(userDetails));
  };

  const handleLogOut = () => {
    localStorage.removeItem("myc_token");
    localStorage.removeItem("myc_uid");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 z-10 !items-center shadow-lg">
      <div className="flex-none">
        {/* <button className="btn btn-square btn-ghost" onClick={openDrawer}>
          <BiMenu className="inline-block w-6 h-6 stroke-current" />
        </button> */}
        <Drawer1
          isOpen={showDrawer}
          onClose={toggleDrawer}
          setDrawerOpen={toggleDrawer}
        />
      </div>
      <div className="flex-1">
        <Link to="/">
          <p className="flex text-xl px-4 items-baseline font-semibold hover:bg-base-200 rounded-md">
            my<p className="text-green-500 p-0 m-0 font-bold text-2xl">C</p>
            ontacts
          </p>
        </Link>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span className="text-xs uppercase">
                {getInitialLetters(
                  (
                    userDetails.firstName +
                    " " +
                    userDetails.lastName
                  ).toString()
                )}
              </span>
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <div className=" border-b border-gray-500 rounded-none flex flex-col items-start">
              <p>
                {userDetails?.firstName} {userDetails?.lastName}
              </p>
              <p>{userDetails?.email}</p>
            </div>
            {Object.keys(userDetails).length !== 0 ? (
              <a
                className="text-md font-semibold flex items-center"
                onClick={handleLogOut}>
                <span>
                  <IoLogOutOutline className="mr-2 h-6 w-6" />
                </span>
                Logout
              </a>
            ) : (
              <Link to="/login">
                <a className="text-md font-semibold flex items-center">
                  <span>
                    <IoLogInOutline className="mr-2 h-6 w-6" />
                  </span>
                  LogIn
                </a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
