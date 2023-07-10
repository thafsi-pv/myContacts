import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

import axios from "axios";
import { getInitialLetters, getRandomColorCode } from "../utils/utils";
import { CONTACTS_API } from "../const/const";

function ListContacts() {
  const [allContacts, setAllContacts] = useState([]);
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

  return (
    <div className="flex flex-col justify-center mt-16 max-h-[700px] lg:w-2/4 m-auto">
      <div className=" top-0 w-[100%] px-5">
        <Input />
      </div>
      <div className="overflow-x-auto mt-5 p-3">
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
                  className="h-10 border-1 border-gray-700 hover:bg-gray-700 mb-44"
                  onClick={() => handleContact(item._id)}>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      className={`flex items-center justify-center text-white w-10 h-10 mb-3 rounded-full shadow-lg my-auto text-center text-xl font-bold border-2 border-gray-800`}
                      style={{ backgroundColor: getRandomColorCode() }}>
                      {getInitialLetters(
                        (item.firstName + " " + item.lastName).toString()
                      )}
                    </span>
                  </td>
                  <td className="w-[80%]">
                    <div className="flex flex-col justify-start">
                      <span className="text-lg">
                        {item.firstName} {item.lastName}
                      </span>
                      <span>{item?.department[0]?.name}</span>
                    </div>
                  </td>
                  <td>
                    {/* <Link to={`/contactDetails/${item._id}`}> */}
                    <BsArrowRight className="h-6 w-6" />
                    {/* </Link> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default ListContacts;
