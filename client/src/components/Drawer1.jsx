import React, { useContext, useEffect, useState } from "react";
import { BiMenu, BiHome } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { FaUserDoctor, FaRegBuilding } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { BsFiletypePdf } from "react-icons/bs";
import { Link } from "react-router-dom";
import PDFFile from "../components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoPersonAdd } from "react-icons/io5";
import { DrawerContext } from "../context/DrawerContext";
import { useSelector } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { USER_API } from "../const/const";
import { addPermission, addRole } from "../redux/userPermissionSlice";
import { useDispatch } from "react-redux";

const Drawer = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const { showDrawer, toggleDrawer } = useContext(DrawerContext);
  const { permissionList, role } = useSelector((store) => store.permission);

  useEffect(() => {
    getUserPermission();
  }, []);

  const getUserPermission = async () => {
    const id = localStorage.getItem("myc_uid");
    console.log("🚀 ~ file: ListContacts.jsx:33 ~ getUserPermission ~ id:", id);
    const permission = await axios(USER_API + "/permission?id=" + id);
    dispatch(addPermission(permission.data.permission.permmision));
    dispatch(addRole(permission.data.permission.role));
  };

  // const toggleDrawer = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className={`drawer ${showDrawer ? "open" : ""}`}>
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={showDrawer}
        onChange={toggleDrawer}
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label htmlFor="my-drawer-2" className="drawer-button">
          <BiMenu className="inline-block w-6 h-6 ml-5 stroke-current " />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu pl-8 pt-10 w-80 h-full bg-base-200 text-base-content space-y-5">
          {/* Logout Group */}
          <div className="group">
            <li onClick={toggleDrawer}>
              <Link to="/">
                <a className="text-md font-semibold flex items-center">
                  <span>
                    <BiHome className="mr-2 h-6 w-6" />
                  </span>
                  All Contacts
                </a>
              </Link>
            </li>
          </div>

          {/* Department Group */}
          <div className="group">
            <h2 className="group-heading border-b p-1 border-gray-700 font-semibold">
              Add/Update
            </h2>
            {(role == "admin" || permissionList.includes("AC")) && (
              <li className="pt-2" onClick={toggleDrawer}>
                <Link to="/addNew">
                  <a className="text-md font-semibold flex items-center">
                    <span>
                      <IoPersonAdd className="mr-2 h-6 w-6" />
                    </span>
                    New Contact
                  </a>
                </Link>
              </li>
            )}
            {(role == "admin" || permissionList.includes("DPT")) && (
              <li className="" onClick={toggleDrawer}>
                <Link to="/dept">
                  <a className="text-md font-semibold flex items-center">
                    <span>
                      <FaRegBuilding className="mr-2 h-6 w-6" />
                    </span>
                    Department
                  </a>
                </Link>
              </li>
            )}
            {(role == "admin" || permissionList.includes("DSG")) && (
              <li onClick={toggleDrawer}>
                <Link to="/designation">
                  <a className="text-md font-semibold flex items-center">
                    <span>
                      <FaUserDoctor className="mr-2 h-6 w-6" />
                    </span>
                    Designation
                  </a>
                </Link>
              </li>
            )}
            {role == "admin" && (
              <li onClick={toggleDrawer}>
                <Link to="/users">
                  <a className="text-md font-semibold flex items-center">
                    <span>
                      <AiOutlineUserAdd className="mr-2 h-6 w-6" />
                    </span>
                    Manage Users
                  </a>
                </Link>
              </li>
            )}
          </div>

          {/* Report Group */}
          <div className="group">
            <h2 className="group-heading border-b p-1 border-gray-700 font-semibold">
              Report
            </h2>
            <li onClick={toggleDrawer}>
              <div>
                <PDFDownloadLink document={<PDFFile />} filename="FORM">
                  {({ loading }) =>
                    loading ? (
                      <button>Loading Document...</button>
                    ) : (
                      <button className="text-md font-semibold flex items-center">
                        <BsFiletypePdf className="mr-2 h-6 w-6" /> Save as pdf
                      </button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </li>
          </div>

          {/* Settings Group */}
          <div className="group">
            <h2 className="group-heading border-b p-1 border-gray-700 font-semibold">
              Settings
            </h2>
            <li onClick={toggleDrawer}>
              <Link to="/settings">
                <a className="text-md font-semibold flex items-center">
                  <span>
                    <CiSettings className="mr-2 h-6 w-6" />
                  </span>
                  Settings
                </a>
              </Link>
            </li>
          </div>

          {/* Logout Group */}
          {/* <div className="group">
            <h2 className="group-heading">Logout</h2>
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
          </div> */}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
