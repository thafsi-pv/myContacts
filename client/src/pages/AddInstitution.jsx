import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";
import { INSTITUTION_API } from "../const/const";
import { genricError } from "../utils/genricError";


function AddInstitution() {
  const [newInstitution, setNewInstitution] = useState({ id: 0, name: "", isActive: true });
  const [departments, setInstitution] = useState([]);

  useEffect(() => {
    getInstitution();
  }, []);

  const getInstitution = async () => {
    const data = await axios(INSTITUTION_API);
    setInstitution(data?.data);
  };

  const handleInputChange = (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewInstitution((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleAddInstitution = async () => {
    try {
      const response = await axios(INSTITUTION_API, {
        method: "POST",
        data: { newInstitution },
      });
      if (response.status == 200) {
        if (newInstitution.id != 0) {
          const itemIndex = departments.findIndex(
            (item) => item._id == newInstitution.id
          );
          const depts = [...departments];
          depts[itemIndex].name = response.data.name;
          depts[itemIndex].isActive = response.data.isActive;
          setInstitution(depts);
          toast.success("Institution updated successfully");
        } else {
          setInstitution((prev) => [...prev, response?.data]);
          toast.success("Institution added successfully");
        }
        setNewInstitution({ id: 0, name: "", isActive: true });
      }
    } catch (error) {
      console.log("🚀 ~ file: AddInstitution.jsx:51 ~ handleAddInstitution ~ error:", error)
      genricError(error);
    }
  };

  const handleEditInstitution = (Institution) => {
    const { _id, name, isActive } = Institution;
    setNewInstitution({ id: _id, name, isActive });
  };

  const handleDeleteDetartment = async (id) => {
    const result = window.confirm("Are you sure you want to delete?");

    if (result) {
      // Perform the delete operation
      const response = await axios(INSTITUTION_API, {
        method: "DELETE",
        data: { id },
      });
      if (response.status == 200) {
        const Institution = [...departments];
        const filterList = Institution.filter((item) => item._id != id);
        setInstitution(filterList);
        toast.success("Institution deleted successfully");
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
        {departments.map((Institution) => (
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
