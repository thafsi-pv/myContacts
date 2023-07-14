import React from 'react'
import Input from '../components/Input'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function User() {
  return (
    <div className="p-5 space-y-3 mt-16 lg:w-2/4 m-auto">
    <div className="flex space-x-2 w-full">
      <div className="w-full">
        <label htmlFor="name">User Name</label>
        <Input
          //refer={firsNameRef}
          id="firstName"
          name="firstName"
          //val={newContact.firstName}
          //handleChange={(e) => handleInputChange(e)}
        />
      </div>
    </div>
    <div className="w-full">
        <label htmlFor="name">Email</label>
        <Input
          id="email"
          name="email"
          type='email'
          //val={newContact.lastName}
          //handleChange={(e) => handleInputChange(e)}
        />
      </div>
    <div className="w-full">
        <label htmlFor="name">Password</label>
        <Input
          id="password"
          name="password"
          type='text'
          //val={newContact.lastName}
          //handleChange={(e) => handleInputChange(e)}
        />
      </div>
      <div>
        <label htmlFor="office">
          Mobile
        </label>
        <div className="w-full ">
          <PhoneInput
            containerClass="w-100 "
            dropdownClass="w-100 !bg-gray-800 border-0"
            buttonClass="w-100 !bg-gray-800 !border-gray-500"
            inputClass="p-5 !w-full !bg-gray-800  !border-gray-500 text-white"
            country={"in"}
            //onChange={handlePhoneInputChange}
            //value={contactNos ? contactNos[input.name].toString() : ""}
            inputProps={{
              name: 'mobile',
              required: true,
              autoFocus: true,
            }}
          />
        </div>
      </div>

    <div className="w-full flex flex-nowrap space-x-2 !mt-10 !mb-20">
      <button className="btn btn-primary w-1/2" onClick={''}>
        Save
      </button>
      <button className="btn btn-neutral w-1/2">Clear</button>
    </div>
  </div>
  )
}

export default User