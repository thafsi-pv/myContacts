import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

function DesignationList({
  designation,
  handleEditDesignattion,
  handleDeleteDesignation,
}) {
  return (
    <div className="!mt-60 max-h-50 overflow-y-scroll !mb-8">
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
    </div>
  );
}

export default DesignationList;
