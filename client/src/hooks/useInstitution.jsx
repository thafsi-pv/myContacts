import React from "react";

function useInstitution() {
  const [newInstitution, setNewInstitution] = useState({
    id: 0,
    name: "",
    isActive: true,
  });
  const [institution, setInstitution] = useState([]);

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
          const itemIndex = institution.findIndex(
            (item) => item._id == newInstitution.id
          );
          const depts = [...institution];
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
      console.log(
        "🚀 ~ file: AddInstitution.jsx:51 ~ handleAddInstitution ~ error:",
        error
      );
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
        const Institution = [...institution];
        const filterList = Institution.filter((item) => item._id != id);
        setInstitution(filterList);
        toast.success("Institution deleted successfully");
      }
    } else {
      // User canceled the delete operation
      console.log("Delete operation canceled");
    }
  };
  return {newInstitution,institution,handleInputChange,handleAddInstitution,handleEditInstitution,handleDeleteDetartment}
}

export default useInstitution;
