import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useInputChange from "../hooks/useInputChange";
import axios from "axios";
import { USER_API } from "../const/const";

function User() {
  const [allUsers, setAllUsers] = useState([]);
  console.log("🚀 ~ file: User.jsx:11 ~ User ~ allUsers:", allUsers);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const users = await axios(USER_API);
      setAllUsers(users?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChkChange = (item) => {
    const { name, checked } = event.target;
    console.log("🚀 ~ file: User.jsx:27 ~ handleChkChange ~ name:", name);
    console.log("🚀 ~ file: User.jsx:26 ~ handleChkChange ~ item:", item);

    const currentList = [...allUsers];
    const index = currentList.findIndex((user) => user._id == item._id);
    // currentList[index].permission.permmision.push(name);
    // setAllUsers(currentList);
    if (checked) {
      currentList[index].permission.permmision.push(name);
    } else {
      const permissionIndex =
        currentList[index].permission.permmision.indexOf(name);
      if (permissionIndex !== -1) {
        currentList[index].permission.permmision.splice(permissionIndex, 1);
      }
    }
    setAllUsers(currentList);
  };

  const handleApproveUser = async (item) => {
    const response = await axios.post(USER_API + "/permission", item);
    console.log("🚀 ~ file: User.jsx:48 ~ handleApproveUser ~ response:", response)
  };

  return (
    <div className="overflow-x-auto mt-16">
      <table className="table table-sm border !border-gray-300 m-3 ">
        {/* head */}
        <thead>
          <tr className="border !border-gray-300">
            <th colSpan={5} className="text-center border !border-gray-300">
              Allow Permission
            </th>
            <th colSpan={2} className="text-center border !border-gray-300">
              Action
            </th>
          </tr>
          <tr>
            <th className="text-center border !border-gray-300" colSpan={2}>
              Name
            </th>
            <th className="text-center border !border-gray-300">
              Add Contacts
            </th>
            <th className="text-center border !border-gray-300">Department</th>
            <th className="text-center border !border-gray-300">Designation</th>
            <th className="text-center border !border-gray-300">Approve</th>
            <th className="text-center border !border-gray-300">Reject</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item) => (
            <tr>
              <th className="text-center border !border-gray-300">1</th>
              <td className="text-center border !border-gray-300">
                {item.firstName}
                <br />
                {item.email}
              </td>
              <td className="text-center border !border-gray-300">
                <input
                  id={`chk${item._id}`}
                  type="checkbox"
                  className="toggle toggle-success"
                  name="AC"
                  checked={item.permission.permmision.includes("AC")}
                  onChange={() => handleChkChange(item)}
                />
              </td>
              <td className="text-center border !border-gray-300">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  name="DPT"
                  checked={item.permission.permmision.includes("DPT")}
                  onChange={() => handleChkChange(item)}
                />
              </td>
              <td className="text-center border !border-gray-300">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  name="DSG"
                  checked={item.permission.permmision.includes("DSG")}
                  onChange={() => handleChkChange(item)}
                />
              </td>
              <td className="text-center border !border-gray-300">
                <button
                  className="btn btn-success btn-outline btn-xs"
                  onClick={() => handleApproveUser(item)}>
                  APPROVE
                </button>
              </td>
              <td className="text-center border !border-gray-300">
                <button
                  className="btn btn-error btn-outline btn-xs"
                  onClick={() => handleRejectUser(item)}>
                  REJECT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
