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
  const [phoneInput, setPhoneInput] = useState([]);
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
      <div>
        <label htmlFor="name">Name</label>
        <Input />
      </div>
      <div className="w-full">
        <label htmlFor="office">Department</label>
        <Select options={departments} />
      </div>
      <div>
        <label htmlFor="phone">Mobile</label>
        <PhoneInput
          containerClass="w-100 "
          inputClass="p-5 !w-full"
          country={"in"}
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
      </div>
      <div>
        <label htmlFor="whatsapp">WhatsApp</label>
        <PhoneInput
          containerClass="w-100 "
          inputClass="p-5 !w-full"
          country={"in"}
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />
      </div>
      <div>
        <label htmlFor="office">Office</label>
        <div className="w-full ">
          <PhoneInput
            containerClass="w-100 "
            inputClass="p-5 !w-full"
            country={"in"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
        </div>
      </div>

      {phoneInput.map((input, index) => (
        <div key={input.id}>
          <label htmlFor="office">Phone {index + 1}</label>
          <div className="w-full ">
            <PhoneInput
              containerClass="w-100 "
              inputClass="p-5 !w-full"
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
        <textarea className="w-full" id="" cols="30" rows="3"></textarea>
      </div>
      <div className="w-full space-y-3">
        <button className="btn btn-primary w-full">Save</button>
        <button className="btn btn-neutral w-full">Clear</button>
      </div>
    </div>
  );
}

export default AddContact;
