import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import Input from "../components/Input";
import useInstitution from "../hooks/useInstitution";

function AddInstitution() {
  const {
    newInstitution,
    institution,
    handleInputChange,
    handleAddInstitution,
    handleEditInstitution,
    handleDeleteDetartment,
  } = useInstitution();

  return (
    <div className="mt-12  p-4 space-y-4 lg:w-2/4 m-auto ">
      <div className="space-y-2 fixed w-[100%] bg-base-200 px-6 py-3 left-0 right-0">
        <label htmlFor="name" className="font-semibold">
          Institution
        </label>
        <Input
          id="deptname"
          name="name"
          type="text"
          val={newInstitution.name}
          handleChange={handleInputChange}
          placeholder="Enter Institution"
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
            checked={newInstitution.isActive}
          />
        </div>
        <div className="w-full flex flex-nowrap space-x-2 !mt-10">
          <button
            className="btn btn-primary w-1/2"
            onClick={handleAddInstitution}>
            Save
          </button>
          <button className="btn btn-neutral w-1/2">Clear</button>
        </div>
      </div>
      <div className="!mt-60 max-h-50 overflow-y-scroll !mb-8">
        {institution.map((Institution) => (
          <div
            key={Institution._id}
            className="flex justify-between p-3 border-b border-b-base-300">
            <p className="font-semibold flex-1">{Institution.name} </p>
            <span className="flex-none">
              <div
                className={`badge ${
                  Institution.isActive ? "badge-success" : "badge-error"
                } gap-1 text-xs !p-2 mr-8`}>
                {Institution.isActive ? "Active" : "Inactive"}
              </div>
            </span>
            <div className="flex justify-between space-x-3">
              <div>
                <BiPencil
                  className="w-5 h-5 hover:bg-gray-700 "
                  onClick={() => handleEditInstitution(Institution)}
                />
              </div>
              <div>
                <BiTrash
                  className="w-5 h-5"
                  onClick={() => handleDeleteDetartment(Institution._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddInstitution;
