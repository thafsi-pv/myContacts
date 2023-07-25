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
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const contactListRef = useRef(null);
  const [lazyLoad, setLazyLoad] = useState(false);

  useEffect(() => {
    console.log("Start useEffect event listener");
    // Check if contactListRef.current is not null before adding the event listener
    if (contactListRef.current !== null) {
      console.log("Enter useEffect event listener");
      contactListRef.current.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (contactListRef.current !== null) {
        console.log("leave useEffect event listener");
        contactListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [contactListRef.current, allContacts]);

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
      console.log(
        "🚀 ~ file: ListContacts.jsx:71 ~ getAllContacts ~ response:",
        response
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
      setPage((prevPage) => prevPage + 1);
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

  const handleSearchContact = async () => {
    try {
      setPage(1);
      toggleLoading(true);
      const designation =
        selectedDesig.value != undefined ? selectedDesig.value : "";
      const department =
        selectedDept.value != undefined ? selectedDept.value : "";
      const response = await axios.get(`
    ${CONTACTS_API}/contactGrouped?name=${searchText}&designationId=${designation}&departmentId=${department}&page=${page}&pageSize=${pageSize}`);
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
    return <ShimmerContacts count={9} showSearch={true} />;
  } else {
    return (
      <div className="flex flex-col justify-center  w-full  lg:w-2/4 m-auto">
        <div className="w-full px-5 top-16  bg-base-100 p-3 z-[5] fixed ">
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
        <div className="pt-0  relative top-0 pb-4">
          {allContacts.length == 0 &&
          (searchText != "" ||
            Object.keys(selectedDept).length !== 0 ||
            Object.keys(selectedDesig).length !== 0) ? (
            <NoResultFound />
          ) : (
            <div
              className="overflow-y-auto  mt-24 p-3 pt-0 max-h-[800px] relative top-0 pb-4"
              ref={contactListRef}>
              <table className="table table-pin-rows">
                {allContacts.map((item) => (
                  <ContactListItem item={item} key={item._id} />
                ))}
              </table>
              {lazyLoad && (
                <div>
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
