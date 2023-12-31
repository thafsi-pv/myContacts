import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../components/Input";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import { changeKeyInArray } from "../utils/utils";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  CONTACTS_API,
  DEPARTMENT_API,
  DESIGNATION_API,
  INSTITUTION_API,
} from "../const/const";
import useLoader from "../hooks/useLoader";
import { genricError } from "../utils/genricError";

const keyChanges = {
  _id: "value",
  name: "label",
};
function AddContact() {
  const navigate = useNavigate();
  const firsNameRef = useRef(null);
  const [newContact, setNewContact] = useState([]);
  const [contactNos, setContactNos] = useState();
  const [phoneInput, setPhoneInput] = useState([
    { id: uuidv4(), phone: "Mobile", name: "mobile" },
    { id: uuidv4(), phone: "WhatsApp", name: "whatsApp" },
    { id: uuidv4(), phone: "Office", name: "office" },
  ]);
  const [departments, setDepartments] = useState([]);
  const [institution, setInstitution] = useState([]);
  const [designation, setDesignation] = useState([]);
  const params = useParams();
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedDesig, setSelectedDesig] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const { isLoading, toggleLoading, loader } = useLoader(false);

  useEffect(() => {
    getDepartments();
    getDesignation();
    getInstitution();
    firsNameRef.current.focus();
    if (params.id) {
      getContactDetailsById();
    }
  }, []);

  const getContactDetailsById = async () => {
    const response = await axios(`${CONTACTS_API}/id`, {
      method: "POST",
      data: { id: params.id },
    });

    const { data } = response;
    setNewContact(response?.data[0]);
    setContactNos(response.data[0].contactNos[0]);
    setSelectedDept({
      value: data[0].department[0]._id,
      label: data[0].department[0].name,
    });
    setSelectedInstitution({
      value: data[0].institution[0]._id,
      label: data[0].institution[0].name,
    });
    setSelectedDesig({
      value: data[0].designation[0]._id,
      label: data[0].designation[0].name,
    });

    const pi = Object.keys(response.data[0].contactNos[0]).map((item) => {
      return { id: uuidv4(), phone: item, name: item };
    });
    setPhoneInput(pi);
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

  const addMorePhoneInput = () => {
    const newInput = {
      id: uuidv4(),
      phone: "",
      name: `phone ${phoneInput.length}`,
    };
    setPhoneInput((prev) => [...prev, newInput]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneInputChange = (value, countryData, event) => {
    const { name } = event.target;
    setContactNos((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (selectedOptions) => {
    setNewContact((prev) => ({ ...prev, department: selectedOptions.value }));
    setSelectedDept(selectedOptions);
  };

  const handleDesignationChange = (selectedOptions) => {
    setNewContact((prev) => ({ ...prev, designation: selectedOptions.value }));
    setSelectedDesig(selectedOptions);
  };
  
  const handleInstitutionChange = (selectedOptions) => {
    setNewContact((prev) => ({ ...prev, institution: selectedOptions.value }));
    setSelectedInstitution(selectedOptions);
  };

  const handleAddNewContact = async () => {
    try {
      const validation = handleValidation();
      if (validation) {
        toggleLoading(true);
        const response = await axios(CONTACTS_API, {
          method: "POST",
          data: { newContact, contactNos },
        });
        if (response.status == 200) {
          if (newContact._id) {
            toast.success("Contact updated successfully");
          } else {
            toast.success("New contact added successfully");
          }
          navigate("/contactDetails/" + response.data._id);
        }
      }
    } catch (error) {
      genricError(error);
    } finally {
      toggleLoading(false);
    }
  };

  const handleValidation = () => {
    if (
      newContact.length == 0 ||
      newContact.firstName == undefined ||
      newContact.firstName == ""
    ) {
      toast.error(`FirstName is required! 😕`);
      return false;
    } else if (contactNos == undefined || contactNos?.length == 0) {
      toast.error(`Atleast one contact no is required! 😕`);
      return false;
    }
    const isPhoneNumberValid = Object.values(contactNos).every(
      (number) => number.toString().length == 12
    );

    if (!isPhoneNumberValid) {
      toast.error(`Entered a valid contact no! 😕`);
      return false;
    }
    return true;
  };

  const handleClearContact = () => {
    setNewContact([]);
    setContactNos(null);
    setSelectedDept(null);
    setSelectedDesig(null);
  };

  return (
    <div className="p-5 space-y-3 mt-16 lg:w-2/4 m-auto relative overflow-y-scroll h-screen pb-56 !mb-52">
      <div className="flex space-x-2 w-full">
        <div className="w-1/2">
          <label htmlFor="name">First Name</label>
          <Input
            refer={firsNameRef}
            id="firstName"
            name="firstName"
            val={newContact.firstName}
            handleChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="name">Last Name</label>
          <Input
            id="lastName"
            name="lastName"
            val={newContact.lastName}
            handleChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <div className="flex flex-col flex-wrap">
        <div className="w-full ">
          <label htmlFor="office">Institution</label>
          <Select
            options={institution}
            value={selectedInstitution}
            placeholder="Select Institution"
            onChange={(e) => handleInstitutionChange(e)}
          />
        </div>
        <div className="flex gap-1">
          <div className="w-full ">
            <label htmlFor="office">Designation</label>
            <Select
              options={designation}
              value={selectedDesig}
              placeholder="Select desig.."
              onChange={(e) => handleDesignationChange(e)}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="office">Department</label>
            <Select
              options={departments}
              placeholder="Select dep.."
              value={selectedDept}
              onChange={(e) => handleDepartmentChange(e)}
            />
          </div>
        </div>
      </div>
      {phoneInput.map((input, index) => (
        <div key={input.id}>
          <label htmlFor="office">
            {input.phone != "" ? input.phone : "Phone " + parseInt(index + 1)}
          </label>
          <div className="w-full ">
            <PhoneInput
              containerClass="w-100 "
              dropdownClass="w-100 !bg-base-200 border-0"
              buttonClass="w-100 !bg-base-200 !border-gray-500"
              inputClass="p-5 !w-full !bg-base-200  !border-gray-500 "
              country={"in"}
              onChange={handlePhoneInputChange}
              value={
                contactNos && contactNos[input.name]
                  ? contactNos[input.name].toString()
                  : ""
              }
              inputProps={{
                name: input.name,
                required: true,
                autoFocus: true,
              }}
            />
          </div>
        </div>
      ))}

      <div className="w-full flex justify-end">
        <span
          className="flex items-center font-semibold"
          onClick={addMorePhoneInput}>
          <AiOutlinePlus className="h-5 w-5 mr-1" />
          Add More
        </span>
      </div>
      <div>
        <label htmlFor="Note">Note</label>
        <textarea
          onChange={handleInputChange}
          className="w-full rounded-md bg-base-200"
          name="notes"
          id=""
          cols="30"
          rows="3"></textarea>
      </div>
      <div className="w-full flex flex-nowrap space-x-2 !mt-10 ">
        <button
          className="btn bg-[#00BFA6] border-[#00BFA6] w-1/2"
          onClick={handleAddNewContact}>
          Save
        </button>
        <button className="btn  btn-outline w-1/2" onClick={handleClearContact}>
          Clear
        </button>
      </div>
      {isLoading && loader}
    </div>
  );
}

export default AddContact;
