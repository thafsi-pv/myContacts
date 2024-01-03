import React from "react";
import useDepartment from "../../hooks/useDepartment";
import { BiPencil, BiTrash } from "react-icons/bi";

function DepartmentList({departments,handleDeleteDetartment,handleEditDepartment}) {
  return (
    <div className="!mt-52 h-[550px] overflow-y-scroll !mb-8 border border-white dark:border-black rounded-md shadow-md">
      {departments.map((dept) => (
        <div
          key={dept._id}
          className="flex justify-between p-3 border-b border-b-base-300">
          <p className="font-semibold flex-1">{dept.name} </p>
          <span className="flex-none">
            <div
              className={`badge ${
                dept.isActive ? "badge-success" : "badge-error"
              } gap-1 text-xs !p-2 mr-8`}>
              {dept.isActive ? "Active" : "Inactive"}
            </div>
          </span>
          <div className="flex justify-between space-x-3">
            <div>
              <BiPencil
                className="w-5 h-5 hover:bg-gray-700 "
                onClick={() => handleEditDepartment(dept)}
              />
            </div>
            <div>
              <BiTrash
                className="w-5 h-5"
                onClick={() => handleDeleteDetartment(dept._id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DepartmentList;
