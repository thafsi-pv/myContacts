import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DEPARTMENT_API } from "../const/const";
import { genricError } from "../utils/genricError";

function AddDept() {
  const [newDept, setNewDept] = useState({ id: 0, name: "", isActive: true });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const data = await axios(DEPARTMENT_API);
    setDepartments(data?.data);
  };

  const handleInputChange = (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewDept((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleAddDepartment = async () => {
    try {
      const response = await axios(DEPARTMENT_API, {
        method: "POST",
        data: { newDept },
      });
      if (response.status == 200) {
        if (newDept.id != 0) {
          const itemIndex = departments.findIndex(
            (item) => item._id == newDept.id
          );
          const depts = [...departments];
          depts[itemIndex].name = response.data.name;
          depts[itemIndex].isActive = response.data.isActive;
          setDepartments(depts);
          toast.success("Department updated successfully");
        } else {
          setDepartments((prev) => [...prev, response?.data]);
          toast.success("Department added successfully");
        }
        setNewDept({ id: 0, name: "", isActive: true });
      }
    } catch (error) {
      genricError(error);
    }
  };

  const handleEditDepartment = (dept) => {
    const { _id, name, isActive } = dept;
    setNewDept({ id: _id, name, isActive });
  };

  const handleDeleteDetartment = async (id) => {
    const result = window.confirm("Are you sure you want to delete?");

    if (result) {
      // Perform the delete operation
      const response = await axios(DEPARTMENT_API, {
        method: "DELETE",
        data: { id },
      });
      if (response.status == 200) {
        const dept = [...departments];
        const filterList = dept.filter((item) => item._id != id);
        setDepartments(filterList);
        toast.success("Department deleted successfully");
      }
    } else {
      // User canceled the delete operation
      console.log("Delete operation canceled");
    }
  };

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
        <div className="w-full flex flex-nowrap space-x-2 !mt-10">
          <button
            className="btn btn-primary w-1/2"
            onClick={handleAddDepartment}>
            Save
          </button>
          <button className="btn btn-neutral w-1/2">Clear</button>
        </div>
      </div>
      <div className="!mt-60 max-h-50 overflow-y-scroll !mb-8">
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
    </div>
  );
}

export default AddDept;
