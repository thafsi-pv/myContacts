import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DESIGNATION_API } from "../const/const";

function Designation() {
  const [newDesignation, setNewDesignation] = useState({ id: 0, name: "", isActive: true });
  const [designation, setDesignation] = useState([]);

  useEffect(() => {
    getDesignation();
  }, []);

  const getDesignation = async () => {
    const data = await axios(DESIGNATION_API);
    setDesignation(data?.data);
  };

  const handleInputChange = (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setNewDesignation((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleAddDesignattion = async () => {
    try {
      const response = await axios(DESIGNATION_API, {
        method: "POST",
        data: { newDesignation },
      });
      if (response.status == 200) {
        if (newDesignation.id != 0) {
          const itemIndex = designation.findIndex(
            (item) => item._id == newDesignation.id
          );
          const Designations = [...designation];
          Designations[itemIndex].name = response.data.name;
          Designations[itemIndex].isActive = response.data.isActive;
          setDesignation(Designations);
          toast.success("Designation updated successfully");
        } else {
          setDesignation((prev) => [...prev, response?.data]);
          toast.success("Designation added successfully");
        }
        setNewDesignation({ id: 0, name: "", isActive: true });
      }
    } catch (error) {
      console.log("🚀 ~ file: Designation.jsx:52 ~ handleAddDesignattion ~ error:", error)
      toast.error(error.response.data.message);
    }
  };

  const handleEditDesignattion = (Designation) => {
    const { _id, name, isActive } = Designation;
    setNewDesignation({ id: _id, name, isActive });
  };

  const handleDeleteDesignation = async (id) => {
    const result = window.confirm("Are you sure you want to delete?");

    if (result) {
      // Perform the delete operation
      const response = await axios(DESIGNATION_API, {
        method: "DELETE",
        data: { id },
      });
      console.log("🚀 ~ file: Designation.jsx:68 ~ handleDeleteDesignation ~ response:", response)
      if (response.status == 200) {
        const desig = [...designation];
        const filterList = desig.filter((item) => item._id != id);
        setDesignation(filterList);
        toast.success("Designattion deleted successfully");
      }
    } else {
      // User canceled the delete operation
      console.log("Delete operation canceled");
    }
  };

  return (
    <div className="mt-12  p-4 space-y-4 lg:w-2/4 m-auto ">
      <div className="space-y-4 fixed w-[90%] p-2">
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
    </div>
  );
}

export default Designation;
