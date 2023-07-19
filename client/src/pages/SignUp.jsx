import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function SignUp() {
  return (
    <div className="h-[100%]">
      <div className="flex flex-col items-center justify-center h-full m-4 ">
        <div className="max-w-md w-full p-6 bg-base-300  rounded-md shadow-md">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-sm text-base-500 font-bold">Sign Up</h2>
            <div className="pb-5">
              <p className="flex text-xl px-4 items-baseline font-bold">
                my<p className="text-green-500 p-0 m-0 font-bold text-2xl">C</p>
                ontacts
              </p>
            </div>
          </div>
          <form className="space-y-3">
            <div className="flex gap-2 w-full items-stretch">
              <div className="flex-1 space-y-0">
                <label htmlFor="email" className="text-base-500">
                  First Name
                </label>
                <Input type="text" placeholder="First name" />
              </div>
              <div className="flex-1 space-y-0">
                <label htmlFor="email" className="text-base-500 ">
                  Last Name
                </label>
                <Input type="text" placeholder="Last name"/>
              </div>
            </div>
            <div className="space-y-0">
              <label htmlFor="email" className="text-base-500">
                Email
              </label>
              <Input type="text" placeholder="Enter your email" />
            </div>
            <div className="space-y-0">
              <label htmlFor="email" className="text-base-500">
                Mobile No
              </label>
              <div className="w-full ">
                <PhoneInput
                  containerClass="w-100 "
                  dropdownClass="w-100 !bg-base-200 border-0"
                  buttonClass="w-100 !bg-base-200 !border-blue-400"
                  inputClass="p-5 !w-full !bg-base-200  !border-blue-400 "
                  country={"in"}
                  onChange={''}
                  // value={
                  //   contactNos && contactNos[input.name]
                  //     ? contactNos[input.name].toString()
                  //     : ""
                  // }
                  inputProps={{
                    //name: input.name,
                    required: true,
                    autoFocus: true,
                  }}
                />
              </div>
            </div>
            <div className="space-y-0">
              <label htmlFor="password" className="text-base-500">
                Password
              </label>
              <Input type="text" placeholder="Enter your password" />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
              Sign Up
            </button>
            <div className="flex justify-center !mt-10 font-semibold text-xs">
              <p className="text-gray-500">
                Already registered?,
                <span className="text-green-700 hover:cursor-pointer">
                  <Link to="/login">
                    {" "}
                    <a href=""> LogIn</a>
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
