import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  formatNo,
  getInitialLetters,
  getRandomColorCode,
} from "../utils/utils";
import { CONTACTS_API, USER_API } from "../const/const";
import ShimmerContacts from "../components/ShimmerContacts";

function ListContacts() {
  const [allContacts, setAllContacts] = useState([]);
  const navigate = useNavigate();
  const abortController = useRef(null);

  const handleContact = (id) => {
    navigate("/contactDetails/" + id);
  };

  useEffect(() => {
    abortController.current = new AbortController();
    getAllContacts();
    return () => {
      abortController.current.abort();
    };
  }, []);

  const getAllContacts = async () => {
    const response = await axios.get(CONTACTS_API+'/contactGrouped', {
      signal: abortController.current.signal,
    });
    setAllContacts(response?.data);
  };

  if (allContacts.length == 0) {
    return <ShimmerContacts />;
  }
  return (
    <div className="flex flex-col justify-center mt-16 w-full  lg:w-2/4 m-auto">
      <div className=" top-16 w-full px-5 fixed bg-base-100 p-3 z-[5] ">
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
          <div className="w-[70%] lg:w-[40%]">
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

      <div className="overflow-x-auto mt-14 p-3 pt-5 max-h-[700px]">
        <table className="table table-pin-rows">
          {allContacts.map((item) => (
            <React.Fragment key={item._id}>
              <thead>
                <tr>
                  <th className="text-lg font-semibold">{item._id}</th>
                </tr>
              </thead>
              <tbody>
                {item.contacts.map((contact,index) => (
                  // <tr key={contact._id}>
                  //   {" "}
                  //   {/* Assuming each contact object has a unique _id */}
                  //   <td>{contact.firstName}</td>{" "}
                  //   {/* Replace this with the appropriate property */}
                  // </tr>

                  <tr
                    key={contact._id}
                    className="h-10 border-1 border-base-200 hover:bg-base-200 mb-4"
                    onClick={() => handleContact(contact._id)}>
                    {/* <td className="p-2">{index + 1}</td> */}
                    <td className="p-2">
                      <span
                        className={`flex items-center justify-center text-white w-10 h-10 rounded-full shadow-lg my-auto text-center text-xl font-bold`}
                        style={{ backgroundColor: getRandomColorCode() }}>
                        {getInitialLetters(
                          (contact.firstName + " " + contact.lastName).toString()
                        )}
                      </span>
                    </td>
                    <td className="w-[80%]">
                      <div className="flex flex-col justify-start">
                        <span className="text-lg font-medium">
                          {contact.firstName} {contact.lastName}
                        </span>
                        <div>
                          <span className="">{contact?.designation[0]?.name}</span>
                          {contact?.designation[0]?.name &&
                          contact?.department[0]?.name
                            ? ` | `
                            : ""}
                          <span>{contact?.department[0]?.name}</span>
                        </div>
                        <div>
                          <span>{formatNo(contact.contactNos[0].mobile)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <BsArrowRight className="h-6 w-6" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </React.Fragment>
          ))}
        </table>
      </div>

      {/* <div className="overflow-x-auto mt-14 p-3 pt-5 max-h-[700px]">
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
                  className="h-10 border-1 border-base-200 hover:bg-base-200 mb-4"
                  onClick={() => handleContact(item._id)}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
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
                      <span className="text-lg font-medium">
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
      </div> */}
    </div>
  );
}

export default ListContacts;
