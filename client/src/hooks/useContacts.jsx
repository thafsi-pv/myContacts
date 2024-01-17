function useContacts() {
  const getDepartments = async () => {
    const data = await axios(DEPARTMENT_API);
    const updatedArray = changeKeyInArray(data.data, keyChanges);
    setDepartments(updatedArray);
  };

  const getDesignation = async () => {
    const data = await axios(DESIGNATION_API);
    const updatedArray = changeKeyInArray(data.data, keyChanges);
    setDesignation(updatedArray);
  };

  const handleDepartmentChange = (selectedOptions) => {
    setSelectedDept(selectedOptions);
  };
  const handleDesignationChange = (selectedOptions) => {
    setSelectedDesig(selectedOptions);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const handleSearchContact = async (e) => {
    try {
      const txt = e.target.value;
      setSearchText(txt);
      setPage(1);
      //toggleLoading(true);
      const designation =
        selectedDesig.value != undefined ? selectedDesig.value : "";
      const department =
        selectedDept.value != undefined ? selectedDept.value : "";
      const response = await axios.get(`
    ${CONTACTS_API}/contactGrouped?name=${txt}&designationId=${designation}&departmentId=${department}&page=${page}&pageSize=${pageSize}`);
      setAllContacts(response?.data?.contactList);
      // toggleAccordion();
    } catch (error) {
      genricError(error);
    } finally {
      //toggleLoading(false);
    }
  };

  return {
    getDepartments,
    getDesignation,
    handleDepartmentChange,
    handleDesignationChange,
    toggleAccordion,
    handleSearchContact,
  };
}

export default useContacts;
