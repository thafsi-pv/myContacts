import React from "react";
import Input from "../components/Input";
import DepartmentList from "../components/department/DepartmentList";
import useDepartment from "../hooks/useDepartment";

function AddDept() {
  const {
    newDept,
    departments,
    handleInputChange,
    handleAddDepartment,
    handleEditDepartment,
    handleDeleteDetartment,
  } = useDepartment();

  return (
    <div className="mt-12  p-4 space-y-4 lg:w-2/4 m-auto ">
      <div className="space-y-2 fixed w-[100%] bg-base-200 px-6 py-3 left-0 right-0">
        <label htmlFor="name" className="font-semibold">
          Department
        </label>
        <Input
          id="deptname"
          name="name"
          type="text"
          val={newDept.name}
          handleChange={handleInputChange}
          placeholder="Enter Department"
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
            checked={newDept.isActive}
          />
        </div>
        <div className="w-full flex flex-nowrap space-x-2 !mt-3">
          <button
            className="btn btn-primary w-1/2"
            onClick={handleAddDepartment}>
            Save
          </button>
          <button className="btn btn-neutral w-1/2">Clear</button>
        </div>
      </div>
      <DepartmentList
        departments={departments}
        handleEditDepartment={handleEditDepartment}
        handleDeleteDetartment={handleDeleteDetartment}
      />
    </div>
  );
}

export default AddDept;
