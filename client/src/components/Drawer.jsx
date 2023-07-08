import React from "react";
import { GrFormClose } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { Link } from "react-router-dom";
import PDFFile from "../components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Drawer = ({ isOpen, onClose, setDrawerOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
      <div
        className={`flex items-center justify-center h-screen bg-gray-900 bg-opacity-75 transition-transform ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}>
        <div className="bg-base-200 w-2/3 p-4 rounded-lg shadow-lg h-full">
          <button className="absolute top-4 right-4" onClick={onClose}>
            <GrFormClose className="text-white bg-white rounded-full h-5 w-5" />
          </button>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content mt-10">
            {/* Sidebar content here */}
            <li>
              <Link to="/settings" onClick={() => setDrawerOpen(false)}>
                <a className="text-md font-semibold flex items-center">
                  <span>
                    <CiSettings className="mr-2 h-6 w-6" />
                  </span>
                  Settings
                </a>
              </Link>
            </li>
            <li>
              <div>
                <PDFDownloadLink document={<PDFFile />} filename="FORM">
                  {({ loading }) =>
                    loading ? (
                      <button>Loading Document...</button>
                    ) : (
                      <button className="text-md font-semibold flex items-center"> <BsFiletypePdf className="mr-2 h-6 w-6" /> Download All Contacts</button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
