import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "../components/Input";
import { AiOutlinePlus } from "react-icons/ai";

function AddContact() {
  const [phone, setPhone] = useState();
  const [phoneInput, setPhoneInput] = useState([]);

  const addMorePhoneInput = () => {
    const newInput = { id: Date.now(), phone: "" };
    setPhoneInput((prev) => [...prev, newInput]);
  };

  return (
    <div className="p-5 space-y-3 mb-[500px]">
      <div>
        <label htmlFor="name">Name</label>
        <Input />
      </div>
      <div className="w-full">
        <label htmlFor="office">Department</label>
        <select className="select w-full max-w-xs">
          <option disabled selected>
            Pick your favorite Simpson
          </option>
          <option>Homer</option>
          <option>Marge</option>
          <option>Bart</option>
          <option>Lisa</option>
          <option>Maggie</option>
        </select>
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
      
        {phoneInput.map((input,index) => (
          <div key={input.id}>
            <label htmlFor="office">
              Phone {index + 1}
            </label>
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
