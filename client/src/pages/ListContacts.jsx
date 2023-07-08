import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

import axios from "axios";
import { getInitialLetters, getRandomColorCode } from "../utils/utils";

function ListContacts() {
  const [allContacts, setAllContacts] = useState([]);
  const navigate = useNavigate();

  const handleContact = (id) => {
    navigate("/contactDetails");
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    const response = await axios("http://localhost:3458/api/contacts");
    setAllContacts(response?.data);
  };

  return (
    <div className="flex flex-col justify-center mt-16">
     
      <div className=" top-0 w-[100%]">
        <Input />
      </div>
      <div className="overflow-x-auto h-[800px] w-screen mt-20 p-3">
        <table className="table table-xs lg:table-lg table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Image</td>
              <td>Name</td>
              <td>View</td>
            </tr>
          </thead>
          <tbody>
            {allContacts.map((item, index) => {
              return (
                <tr key={item._id} className="h-10">
                  <th>{index + 1}</th>
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
                    <Link to={`/contactDetails/${item._id}`}>
                      <BsArrowRight className="h-6 w-6" />
                    </Link>
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
