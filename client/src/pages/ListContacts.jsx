import React, { useEffect, useRef, useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { changeKeyInArray } from "../utils/utils";
import {
  CONTACTS_API,
  DEPARTMENT_API,
  DESIGNATION_API,
  INSTITUTION_API,
} from "../const/const";
import ShimmerContacts from "../components/shimmerUI/ShimmerContacts";
import Select from "react-select";
import NoResultFound from "../components/NoResultFound";
import useLoader from "../hooks/useLoader";
import { genricError } from "../utils/genricError";
import ContactListItem from "../components/ContactListItem";
import { useSelector } from "react-redux";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";

const keyChanges = {
  _id: "value",
  name: "label",
};

function ListContacts() {
  const [allContacts, setAllContacts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [institution, setInstitution] = useState([]);
  const [selectedDept, setSelectedDept] = useState({});
  const [selectedDesig, setSelectedDesig] = useState({});
  const [selectedInsti, setSelectedInsti] = useState({});
  const [searchText, setSearchText] = useState("");
  const [contactCount, setContactCount] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { isLoading, toggleLoading, loader } = useLoader(false);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [lazyLoad, setLazyLoad] = useState(false);
  const { permissionList, userDetails } = useSelector((store) => store.permission);

  // useInView hook from react-intersection-observer
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    getAllContacts();
    if (page === 1) {
      getInstitution();
      getDepartments();
      getDesignation();
    }
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const getAllContacts = async () => {
    try {
      setLazyLoad(true);
      const response = await axios.get(
        `${CONTACTS_API}/contactGrouped?page=${page}&pageSize=${pageSize}`
      );
      setAllContacts((prev) => [...prev, ...response?.data?.contactList]);
      setContactCount(response?.data?.totalCount);
    } catch (error) {
      genricError(error);
    } finally {
      setLazyLoad(false);
    }
  };

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

  const getInstitution = async () => {
    const data = await axios(INSTITUTION_API);
    const updatedArray = changeKeyInArray(data.data, keyChanges);
    setInstitution(updatedArray);
  };

  const handleDepartmentChange = (selectedOptions) => {
    setSelectedDept(selectedOptions);
  };

  const handleDesignationChange = (selectedOptions) => {
    setSelectedDesig(selectedOptions);
  };

  const handleInstitutionChange = (selectedOptions) => {
    setSelectedInsti(selectedOptions);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const handleSearchContact = async (e) => {
    try {
      const txt = e.target.value;
      setSearchText(txt);
      setPage(1);

      const designation = selectedDesig.value || "";
      const department = selectedDept.value || "";
      const institution = selectedInsti.value || "";
      const response = await axios.get(
        `${CONTACTS_API}/contactGrouped?name=${txt}&designationId=${designation}&departmentId=${department}&page=${page}&pageSize=${pageSize}&institutionId=${institution}`
      );
      setAllContacts(response?.data?.contactList);
    } catch (error) {
      genricError(error);
    }
  };

  const selectStyles = {
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
    }),
  };

  if (
    allContacts.length === 0 &&
    searchText === "" &&
    Object.keys(selectedDept).length === 0 &&
    Object.keys(selectedDesig).length === 0
  ) {
    return <ShimmerContacts count={9} showSearch={true} />;
  } else {
    return (
      <div className="flex flex-col justify-center w-full lg:w-2/4 m-auto">
        {(userDetails.role === "admin" || permissionList.includes("VC")) && (
          <>
            <div className="w-full px-5 top-16 bg-base-100 p-3 z-[5] relative">
              <div className="collapse collapse-arrow bg-base-200">
                <input
                  type="radio"
                  name="my-accordion-2"
                  checked={isAccordionOpen}
                  onClick={toggleAccordion}
                />
                <div className="flex justify-between collapse-title text-xl font-medium">
                  <p className="text-sm flex">
                    <AiOutlineSearch className="w-5 h-5" />
                    Search among {contactCount} contacts..
                  </p>
                  <span className="z-10">
                    <FaFilterCircleXmark />
                  </span>
                </div>
                <div className="collapse-content">
                  <div className="flex flex-col gap-1">
                    <div className="w-full">
                      <Select
                        className="w-full"
                        menuPortalTarget={document.body}
                        styles={{ ...selectStyles }}
                        placeholder="Institution"
                        options={institution}
                        onChange={handleInstitutionChange}
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-full">
                        <Select
                          className="w-full"
                          menuPortalTarget={document.body}
                          styles={{ ...selectStyles }}
                          placeholder="Designation"
                          options={designation}
                          onChange={handleDesignationChange}
                        />
                      </div>
                      <div className="w-full">
                        <Select
                          menuPortalTarget={document.body}
                          styles={{ ...selectStyles }}
                          placeholder="Department"
                          options={departments}
                          onChange={handleDepartmentChange}
                        />
                      </div>
                    </div>
                    <div className="join w-full !border-gray-600">
                      <div className="w-[100%]">
                        <div>
                          <input
                            className="input !border-gray-600 join-item w-full"
                            placeholder="Search..."
                            onChange={handleSearchContact}
                          />
                        </div>
                      </div>
                      <div className="indicator">
                        <button
                          className="btn join-item !border-gray-600 !bg-base-300"
                          onClick={handleSearchContact}
                        >
                          <AiOutlineSearch className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-0 relative top-0 pb-4">
              {allContacts.length === 0 &&
              (searchText !== "" ||
                Object.keys(selectedDept).length !== 0 ||
                Object.keys(selectedDesig).length !== 0) ? (
                <NoResultFound />
              ) : (
                <div className="overflow-y-auto mt-16 p-3 pt-0 max-h-[800px] relative top-0 pb-64">
                  <table className="table table-pin-rows">
                    {allContacts.map((item, index) => {
                      return (
                        <ContactListItem item={item} key={item._id} />
                      );
                    })}
                  </table>
                  <div ref={ref}></div> {/* Intersection Observer Element */}
                  {lazyLoad && (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-400 w-32 rounded"></div>
                          <div className="h-4 bg-gray-400 w-20 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-400 w-32 rounded"></div>
                          <div className="h-4 bg-gray-400 w-20 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-400 w-32 rounded"></div>
                          <div className="h-4 bg-gray-400 w-20 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-400 w-32 rounded"></div>
                          <div className="h-4 bg-gray-400 w-20 rounded mt-2"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {isLoading && loader}
      </div>
    );
  }
}

export default ListContacts;
