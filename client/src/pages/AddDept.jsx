import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DEPARTMENT_API } from "../const/const";

function AddDept() {
  const [newDept, setNewDept] = useState({ name: "", isActive: true });
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
    if(response.status==200){
      setDepartments((prev) => [...prev, response?.data]);
      toast.success('Department added successfully');
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
  };

  return (
    <div className="mt-16 max-h-56 p-4 space-y-4 lg:w-2/4 m-auto">
      <div className="space-y-4">
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <Input
          id="deptname"
          name="name"
          type="text"
          handleChange={handleInputChange}
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
      <div className="!mt-10">
        {departments.map((dept) => (
          <div key={dept.id} className="flex justify-between">
            <p>{dept.name} </p>
            <div className="flex justify-between space-x-2">
              <div>
                <BiPencil />
              </div>
              <div>
                <BiTrash />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddDept;
