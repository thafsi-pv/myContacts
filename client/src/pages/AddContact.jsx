import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../components/Input";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import { changeKeyInArray } from "../utils/utils";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

const keyChanges = {
  _id: "value",
  name: "label",
};
function AddContact() {
  const [newContact, setNewContact] = useState();
  const [phoneInput, setPhoneInput] = useState([
    { id: uuidv4(), phone: "Mobile", name: "mobile" },
    { id: uuidv4(), phone: "WhatsApp", name: "whatsApp" },
    { id: uuidv4(), phone: "Office", name: "office" },
  ]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const data = await axios("http://localhost:3458/api/departments");
    const updatedArray = changeKeyInArray(data.data, keyChanges);
    setDepartments(updatedArray);
  };

  const addMorePhoneInput = () => {
    const newInput = {
      id: uuidv4(),
      phone: "",
      name: `phone${phoneInput.length}`,
    };
    setPhoneInput((prev) => [...prev, newInput]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneInputChange = (value, countryData, event) => {
    const { name } = event.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (selectedOptions) => {
    setNewContact((prev) => ({ ...prev, department: selectedOptions.value }));
  };

  const handleAddNewContact = async () => {
    const response = await axios("http://localhost:3458/api/contacts", {
      method: "POST",
      data: { newContact },
    });
    if(response.status==200){
      toast.success('New contact added successfully');
    }
  };

  return (
    <div className="p-5 space-y-3 mb-[500px] mt-16">
      <div className="flex space-x-2">
        <div>
          <label htmlFor="name">First Name</label>
          <Input
            id="firstName"
            name="firstName"
            handleChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label htmlFor="name">Last Name</label>
          <Input
            id="lastName"
            name="lastName"
            handleChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <div className="w-full ">
        <label htmlFor="office">Department</label>
        <Select
          options={departments}
          onChange={(e) => handleDepartmentChange(e)}
        />
      </div>
      {phoneInput.map((input, index) => (
        <div key={input.id}>
          <label htmlFor="office">
            {input.phone != "" ? input.phone : "Phone " + parseInt(index + 1)}
          </label>
          <div className="w-full ">
            <PhoneInput
              containerClass="w-100 "
              dropdownClass="w-100 !bg-gray-800 border-0"
              buttonClass="w-100 !bg-gray-800 !border-gray-500"
              inputClass="p-5 !w-full !bg-gray-800  !border-gray-500 text-white"
              country={"in"}
              onChange={handlePhoneInputChange}
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
          className="w-full rounded-md bg-gray-800"
          name="notes"
          id=""
          cols="30"
          rows="3"></textarea>
      </div>
      <div className="w-full flex flex-nowrap space-x-2 !mt-10">
        <button className="btn btn-primary w-1/2" onClick={handleAddNewContact}>
          Save
        </button>
        <button className="btn btn-neutral w-1/2">Clear</button>
      </div>
    </div>
  );
}

export default AddContact;
