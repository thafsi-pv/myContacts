import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DESIGNATION_API } from "../const/const";
import useDesignation from "./useDesignation";
import DesignationList from "../components/designation/DesignationList";

function Designation() {
  const {
    newDesignation,
    designation,
    handleInputChange,
    handleAddDesignattion,
    handleEditDesignattion,
    handleDeleteDesignation,
  } = useDesignation();

  return (
    <div className="mt-12  p-4 space-y-4 lg:w-2/4 m-auto ">
      <div className="space-y-2 fixed w-[100%] lg:w-2/4 p-4 bg-base-200 left-0 lg:left-1/4 right-0">
        <label htmlFor="name" className="font-semibold">
          Designation
        </label>
        <Input
          id="Designationname"
          name="name"
          type="text"
          val={newDesignation.name}
          handleChange={handleInputChange}
          placeholder="Enter Designation"
        />
        <div className="flex items-center space-x-3">
          <label htmlFor="name" className="font-semibold">
            Active
          </label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            onChange={handleInputChange}
            className="toggle toggle-success"
            checked={newDesignation.isActive}
          />
        </div>
        <div className="w-full flex flex-nowrap space-x-2 !mt-10">
          <button
            className="btn btn-primary w-1/2"
            onClick={handleAddDesignattion}>
            Save
          </button>
          <button className="btn btn-neutral w-1/2">Clear</button>
        </div>
      </div>
      <DesignationList
        designation={designation}
        handleEditDesignattion={handleEditDesignattion}
        handleDeleteDesignation={handleDeleteDesignation}
      />
      {/* <div className="!mt-60 max-h-50 overflow-y-scroll !mb-8">
        {designation.map((Designation) => (
          <div
            key={Designation._id}
            className="flex justify-between p-3 border-b border-b-base-300">
            <p className="font-semibold flex-1">{Designation.name} </p>
            <span className="flex-none">
              <div
                className={`badge ${
                  Designation.isActive ? "badge-success" : "badge-error"
                } gap-1 text-xs !p-2 mr-8`}>
                {Designation.isActive ? "Active" : "Inactive"}
              </div>
            </span>
            <div className="flex justify-between space-x-3">
              <div>
                <BiPencil
                  className="w-5 h-5 hover:bg-gray-700 "
                  onClick={() => handleEditDesignattion(Designation)}
                />
              </div>
              <div>
                <BiTrash
                  className="w-5 h-5"
                  onClick={() => handleDeleteDesignation(Designation._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Designation;
