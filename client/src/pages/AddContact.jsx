import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../components/Input";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import { changeKeyInArray } from "../utils/utils";
import axios from "axios";

const keyChanges = {
  _id: "value",
  name: "label",
};
function AddContact() {
  const [phone, setPhone] = useState();
  const [phoneInput, setPhoneInput] = useState([
    { id: Date.now(), phone: "Mobile" },
    { id: Date.now(), phone: "WhatsApp" },
    { id: Date.now(), phone: "Office" },
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
    const newInput = { id: Date.now(), phone: "" };
    setPhoneInput((prev) => [...prev, newInput]);
  };

  return (
    <div className="p-5 space-y-3 mb-[500px] mt-16">
      <div className="flex space-x-2">
        <div>
          <label htmlFor="name">First Name</label>
          <Input />
        </div>
        <div>
          <label htmlFor="name">Last Name</label>
          <Input />
        </div>
      </div>
      <div className="w-full ">
        <label htmlFor="office">Department</label>
        <Select options={departments} />
      </div>
      {phoneInput.map((input, index) => (
        <div key={input.id}>
          <label htmlFor="office">
            {input.phone != "" ? input.phone : "Phone " + parseInt(index+1)}
          </label>
          <div className="w-full ">
            <PhoneInput
              containerClass="w-100 "
              dropdownClass="w-100 !bg-gray-800 border-0"
              buttonClass="w-100 !bg-gray-800 !border-gray-500"
              inputClass="p-5 !w-full !bg-gray-800  !border-gray-500"
              country={"in"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
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
        <textarea className="w-full rounded-md bg-gray-800" id="" cols="30" rows="3"></textarea>
      </div>
      <div className="w-full flex flex-nowrap space-x-2 !mt-10">
          <button
            className="btn btn-primary w-1/2"
            onClick>
            Save
          </button>
          <button className="btn btn-neutral w-1/2">Clear</button>
        </div>
    </div>
  );
}

export default AddContact;
