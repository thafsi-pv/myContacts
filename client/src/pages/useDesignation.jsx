import React, { useEffect, useState } from 'react'
import { DESIGNATION_API } from '../const/const';
import axios from 'axios';

function useDesignation() {
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

    return {newDesignation,designation,handleInputChange,handleAddDesignattion,handleEditDesignattion,handleDeleteDesignation}
}

export default useDesignation