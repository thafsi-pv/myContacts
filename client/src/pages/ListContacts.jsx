import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import axios from "axios";
import {
  formatNo,
  getInitialLetters,
  getRandomColorCode,
} from "../utils/utils";
import { CONTACTS_API } from "../const/const";
import ShimmerContacts from "../components/ShimmerContacts";

function ListContacts() {
  const [allContacts, setAllContacts] = useState([]);
  console.log(
    "🚀 ~ file: ListContacts.jsx:13 ~ ListContacts ~ allContacts:",
    allContacts
  );
  const navigate = useNavigate();

  const handleContact = (id) => {
    navigate("/contactDetails/" + id);
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    const response = await axios(CONTACTS_API);
    setAllContacts(response?.data);
  };
  if (allContacts.length == 0) {
    return <ShimmerContacts />;
  }
  return (
    <div className="flex flex-col justify-center mt-16  lg:max-w-2/4 m-auto">
      <div className=" top-16 w-[100%] px-5 fixed bg-gray-900 p-3 z-[5]">
        <div className="join w-full !border-gray-600">
          <div className="w-20">
            <select className="select !border-gray-600 join-item">
              <option disabled selected>
                Type
              </option>
              <option>Name</option>
              <option>Designation</option>
              <option>Department</option>
            </select>
          </div>
          <div className="w-2/3">
            <div>
              <input
                className="input !border-gray-600 join-item w-full"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="indicator">
            <button className="btn join-item !border-gray-600 !bg-gray-600">
              <AiOutlineSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-14 p-3 max-h-[700px]">
        <table className="table table-xs lg:table-lg table-pin-rows table-pin-cols max-h-[68%] overflow-scroll cursor-pointer">
          <thead>
            <tr className="!top-[-13px]">
              <th></th>
              <td>Image</td>
              <td>Name</td>
              <td>View</td>
            </tr>
          </thead>
          <tbody>
            {allContacts.map((item, index) => {
              return (
                <tr
                  key={item._id}
                  className="h-10 border-1 border-gray-700 hover:bg-gray-700 mb-4"
                  onClick={() => handleContact(item._id)}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <span
                      className={`flex items-center justify-center text-white w-10 h-10 rounded-full shadow-lg my-auto text-center text-xl font-bold`}
                      style={{ backgroundColor: getRandomColorCode() }}>
                      {getInitialLetters(
                        (item.firstName + " " + item.lastName).toString()
                      )}
                    </span>
                  </td>
                  <td className="w-[80%]">
                    <div className="flex flex-col justify-start">
                      <span className="text-lg font-semibold">
                        {item.firstName} {item.lastName}
                      </span>
                      <div>
                        <span className="">{item?.designation[0]?.name}</span>
                        {item?.designation[0]?.name && item?.department[0]?.name
                          ? ` | `
                          : ""}
                        <span>{item?.department[0]?.name}</span>
                      </div>
                      <div>
                        <span>{formatNo(item.contactNos[0].mobile)}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <BsArrowRight className="h-6 w-6" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ListContacts;
