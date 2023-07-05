import React from "react";
import Input from "../components/Input";

function AddDept() {
  return (
    <div className="mt-16 max-h-56 p-4 space-y-4">
      <label htmlFor="name" className="font-semibold">
        Name
      </label>
      <Input />
      <div className="flex items-center space-x-3">
        <label htmlFor="name" className="font-semibold">
          Active
        </label>
        <input type="checkbox" className="toggle toggle-success" />
      </div>
      <div className="w-full space-y-3 !mt-10">
        <button className="btn btn-primary w-full">Save</button>
        <button className="btn btn-neutral w-full">Clear</button>
      </div>
    </div>
  );
}

export default AddDept;
