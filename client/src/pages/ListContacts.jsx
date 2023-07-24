import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { changeKeyInArray } from "../utils/utils";
import {
  CONTACTS_API,
  DEPARTMENT_API,
  DESIGNATION_API,
  USER_API,
} from "../const/const";
import ShimmerContacts from "../components/ShimmerContacts";
import Select from "react-select";
import NoResultFound from "../components/NoResultFound";
import useLoader from "../hooks/useLoader";
import { genricError } from "../utils/genricError";
//import ContactListItem from "../components/ContactListItem";
import ContaListItem from "../components/ContaListItem";

const keyChanges = {
  _id: "value",
  name: "label",
};
function ListContacts() {
  const [allContacts, setAllContacts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designation, setDesignation] = useState({});
  const [selectedDept, setSelectedDept] = useState({});
  const [selectedDesig, setSelectedDesig] = useState({});
  const [searchText, setSearchText] = useState("");
  const [contactCount, setContactCount] = useState(0);
  const abortController = useRef(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { isLoading, toggleLoading, loader } = useLoader(false);

  useEffect(() => {
    abortController.current = new AbortController();
    getAllContacts();
    getDepartments();
    getDesignation();
    return () => {
      abortController.current.abort();
    };
  }, []);

  const getAllContacts = async () => {
    const response = await axios.get(CONTACTS_API + "/contactGrouped", {
      signal: abortController.current.signal,
    });
    setAllContacts(response?.data?.contactList);
    setContactCount(response?.data?.totalCount);
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

  const handleDepartmentChange = (selectedOptions) => {
    setSelectedDept(selectedOptions);
  };
  const handleDesignationChange = (selectedOptions) => {
    setSelectedDesig(selectedOptions);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen((prevState) => !prevState);
  };

  const handleSearchContact = async () => {
    try {
      toggleLoading(true);
      const designation =
        selectedDesig.value != undefined ? selectedDesig.value : "";
      const department =
        selectedDept.value != undefined ? selectedDept.value : "";
      const response = await axios.get(`
    ${CONTACTS_API}/contactGrouped?name=${searchText}&designationId=${designation}&departmentId=${department}`);
      setAllContacts(response?.data?.contactList);
      toggleAccordion();
    } catch (error) {
      genricError(error);
    } finally {
      toggleLoading(false);
    }
  };

  // Custom styles for the Select component
  const selectStyles = {
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black", // Set the color to black for menu list items
    }),
  };

  if (
    allContacts.length == 0 &&
    searchText == "" &&
    Object.keys(selectedDept).length === 0 &&
    Object.keys(selectedDesig).length === 0
  ) {
    return <ShimmerContacts />;
  } else {
    return (
      <div className="flex flex-col justify-center  w-full  lg:w-2/4 m-auto">
        <div className="w-full px-5 top-16  bg-base-100 p-3 z-[5] relative ">
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="radio"
              name="my-accordion-2"
              checked={isAccordionOpen}
              onClick={toggleAccordion}
            />
            <div className="collapse-title text-xl font-medium">
              <p className="text-sm flex">
                <AiOutlineSearch className="w-5 h-5" />
                Search among {contactCount} contacts..
              </p>
            </div>
            <div className="collapse-content">
              <div className="flex gap-2 pb-2">
                <div className="w-full ">
                  <Select
                    className="w-full" // Add this class to make the select box expand to full width
                    menuPortalTarget={document.body}
                    styles={{ ...selectStyles }}
                    placeholder="designation"
                    options={designation}
                    //value={selectedDesig}
                    onChange={(e) => handleDesignationChange(e)}
                  />
                </div>
                <div className="w-full ">
                  <Select
                    menuPortalTarget={document.body}
                    styles={{ ...selectStyles }}
                    placeholder="Department"
                    options={departments}
                    //value={selectedDept}
                    onChange={(e) => handleDepartmentChange(e)}
                  />
                </div>
              </div>
              <div className="join w-full !border-gray-600">
                <div className="w-[100%]">
                  <div>
                    <input
                      className="input !border-gray-600 join-item w-full"
                      placeholder="Search..."
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="indicator">
                  <button
                    className="btn join-item !border-gray-600 !bg-base-300"
                    onClick={handleSearchContact}>
                    <AiOutlineSearch className="w-5 h-5 " />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {allContacts.length == 0 &&
        (searchText != "" ||
          Object.keys(selectedDept).length !== 0 ||
          Object.keys(selectedDesig).length !== 0) ? (
          <NoResultFound />
        ) : (
          <div className="overflow-y-auto mt-14 p-3 pt-0 max-h-[700px] relative top-0 pb-16">
            <table className="table table-pin-rows">
              {allContacts.map((item) => (
                <ContaListItem item={item} />
              ))}
            </table>
          </div>
        )}

        {/* <div className="overflow-x-auto mt-14 p-3 pt-5 max-h-[700px]">
          <table className="table table-xs lg:table-lg table-pin-rows table-pin-cols max-h-[68%] overflow-scroll cursor-pointer">
            <thead>
              <tr className="!top-[-13px]">
                <th></th>
                <td>Image</td>
                <td>Name</td>
                <td>View</td>
              </tr>
            </thead>
            <tbody>
              {allContacts.map((item, index) => {
                return (
                  <tr
                    key={item._id}
                    className="h-10 border-1 border-base-200 hover:bg-base-200 mb-4"
                    onClick={() => handleContact(item._id)}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      <span
                        className={`flex items-center justify-center text-white w-10 h-10 rounded-full shadow-lg my-auto text-center text-xl font-bold`}
                        style={{ backgroundColor: getRandomColorCode() }}>
                        {getInitialLetters(
                          (item.firstName + " " + item.lastName).toString()
                        )}
                      </span>
                    </td>
                    <td className="w-[80%]">
                      <div className="flex flex-col justify-start">
                        <span className="text-lg font-medium">
                          {item.firstName} {item.lastName}
                        </span>
                        <div>
                          <span className="">{item?.designation[0]?.name}</span>
                          {item?.designation[0]?.name && item?.department[0]?.name
                            ? ` | `
                            : ""}
                          <span>{item?.department[0]?.name}</span>
                        </div>
                        <div>
                          <span>{formatNo(item.contactNos[0].mobile)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <BsArrowRight className="h-6 w-6" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
        {isLoading && loader}
      </div>
    );
  }
}

export default ListContacts;
