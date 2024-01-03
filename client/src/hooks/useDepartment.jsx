import React, { useEffect, useState } from "react";
import { DEPARTMENT_API } from "../const/const";
import axios from "axios";
import toast from "react-hot-toast";
import { genricError } from "../utils/genricError";

function useDepartment() {
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

  return {
    newDept,
    departments,
    getDepartments,
    handleInputChange,
    handleAddDepartment,
    handleEditDepartment,
    handleDeleteDetartment,
  };
}

export default useDepartment;
