import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { changeKeyInArray } from "../utils/utils";
import { CONTACTS_API, DEPARTMENT_API, DESIGNATION_API } from "../const/const";
import ShimmerContacts from "../components/shimmerUI/ShimmerContacts";
import Select from "react-select";
import NoResultFound from "../components/NoResultFound";
import useLoader from "../hooks/useLoader";
import { genricError } from "../utils/genricError";
import ContactListItem from "../components/ContactListItem";
import { useSelector } from "react-redux";
import { FaFilterCircleXmark } from "react-icons/fa6";

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

  const [searchTerms, setSearchTerms] = useState({
    institution: "",
    department: "",
    designation: "",
    searchText: "",
  });

  const [contactCount, setContactCount] = useState(0);
  const abortController = useRef(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const { isLoading, toggleLoading, loader } = useLoader(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const contactListRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [lazyLoad, setLazyLoad] = useState(false);
  const { permissionList, userDetails } = useSelector(
    (store) => store.permission
  );

  // useEffect(() => {
  //   // Function to handle the click outside event
  //   const handleClickOutside = (event) => {
  //     // Check if the clicked target is outside the element
  //     if (
  //       searchBoxRef.current &&
  //       !searchBoxRef.current.contains(event.target)
  //     ) {
  //       // Perform the action you want when clicking outside the element
  //       setIsAccordionOpen(false);
  //     }
  //   };

  //   // Add the event listener to the document when the component mounts
  //   document.addEventListener("click", handleClickOutside);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // useEffect(() => {
  //   // Check if contactListRef.current is not null before adding the event listener
  //   if (contactListRef.current !== null) {
  //     contactListRef.current.addEventListener("scroll", handleScroll);
  //   }

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     if (contactListRef.current !== null) {
  //       contactListRef.current.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, [contactListRef.current, allContacts]);

  useEffect(() => {
    abortController.current = new AbortController();
    getAllContacts();
    if (page == 1) {
      getDepartments();
      getDesignation();
    }
    return () => {
      abortController.current.abort();
    };
  }, [page]);

  const getAllContacts = async () => {
    try {
      setLazyLoad(true);
      const response = await axios.get(
        `${CONTACTS_API}/contactGrouped?page=${page}&pageSize=${pageSize}`,
        {
          signal: abortController.current.signal,
        }
      );
      setAllContacts((prev) => [...prev, ...response?.data?.contactList]);
      setContactCount(response?.data?.totalCount);
    } catch (error) {
      genricError(error);
    } finally {
      setLazyLoad(false);
    }
  };

  const handleScroll = () => {
    // Calculate the scroll position of the contact list container
    const { scrollHeight, scrollTop, clientHeight } = contactListRef.current;
    // Check if the user has scrolled to the bottom of the contact list container
    if (scrollHeight - scrollTop === clientHeight) {
      // Increment the page number to fetch the next page of contacts
      if (page <= 3) {
        console.log("page", page);
        setPage((prevPage) => page + 1);
      }
    }
  };

  // const handleScroll = () => {
  //   // Calculate the scroll position of the contact list container
  //   const { scrollHeight, scrollTop, clientHeight } = contactListRef.current;

  //   // Define a threshold (percentage of container height) to start loading the next page
  //   const threshold = 0.8; // You can adjust this value as needed

  //   // Calculate the distance from the bottom of the container to the current scroll position
  //   const distanceToBottom = scrollHeight - scrollTop - clientHeight;

  //   // Check if the user has reached the threshold before the scroll end
  //   if (distanceToBottom <= clientHeight * threshold) {
  //     // Check if there are more contacts to fetch
  //     if ((page * 10) < contactCount) {
  //       console.log("🚀 ~ file: ListContacts.jsx:100 ~ handleScroll ~ contactCount:", contactCount)
  //       console.log("🚀 ~ file: ListContacts.jsx:100 ~ handleScroll ~ (page * 10):", (page * 10))

  //       // Increment the page number to fetch the next page of contacts
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   }
  // };

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
    return <ShimmerContacts count={9} showSearch={true} />;
  } else {
    return (
      <div className="flex flex-col justify-center  w-full  lg:w-2/4 m-auto">
        {(userDetails.role == "admin" || permissionList.includes("VC")) && (
          <>
            <div
              className="w-full px-5 top-16  bg-base-100 p-3 z-[5] relative"
              ref={searchBoxRef}>
              <div className="collapse collapse-arrow bg-base-200">
                <input
                  type="radio"
                  name="my-accordion-2"
                  checked={isAccordionOpen}
                  onClick={toggleAccordion}
                />
                <div className=" flex justify-between collapse-title text-xl font-medium">
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
                    <div className="w-full ">
                      <Select
                        className="w-full" // Add this class to make the select box expand to full width
                        menuPortalTarget={document.body}
                        styles={{ ...selectStyles }}
                        placeholder="Institution"
                        options={designation}
                        //value={selectedDesig}
                        onChange={(e) => handleDesignationChange(e)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-full ">
                        <Select
                          className="w-full" // Add this class to make the select box expand to full width
                          menuPortalTarget={document.body}
                          styles={{ ...selectStyles }}
                          placeholder="Designation"
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
                            onChange={handleSearchContact}
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
            </div>
            <div className="pt-0  relative top-0 pb-4">
              {allContacts.length == 0 &&
              (searchText != "" ||
                Object.keys(selectedDept).length !== 0 ||
                Object.keys(selectedDesig).length !== 0) ? (
                <NoResultFound />
              ) : (
                <div
                  className="overflow-y-auto  mt-16 p-3 pt-0 max-h-[800px] relative top-0 pb-64"
                  ref={contactListRef}>
                  <table className="table table-pin-rows">
                    {allContacts.map((item) => (
                      <ContactListItem item={item} key={item._id} />
                    ))}
                  </table>
                  {lazyLoad && (
                    <div className="space-y-3">
                      <div className="flex items-center ">
                        <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-400 w-32 rounded"></div>
                          <div className="h-4 bg-gray-400 w-20 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center ">
                        <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-400 w-32 rounded"></div>
                          <div className="h-4 bg-gray-400 w-20 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center ">
                        <div className="h-12 w-12 bg-gray-400 rounded-full"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-400 w-32 rounded"></div>
                          <div className="h-4 bg-gray-400 w-20 rounded mt-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center ">
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
