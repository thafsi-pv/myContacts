import React from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useInputChange from "../hooks/useInputChange";
import axios from "axios";
import { USER_API } from "../const/const";
import { genricError } from "../utils/genricError";
import { toast } from "react-hot-toast";
import useLoader from "../hooks/useLoader";

function SignUp() {
  const [values, handleInputChange, handlePhoneInputChange] = useInputChange({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate(null);
  const { isLoading, toggleLoading, loader } = useLoader(false);

  const handleSignUp = async () => {
    try {
      toggleLoading(true);
      const response = await axios.post(USER_API, { data: values });
      if (response.status == 200) {
        toast.success("successfully registered!");
        navigate("/login");
      }
    } catch (error) {
      genricError(error);
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <div className="h-[100%]">
      <div className="flex flex-col items-center justify-center h-screen m-4 ">
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
                <Input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  val={values.firstName}
                  handleChange={handleInputChange}
                />
              </div>
              <div className="flex-1 space-y-0">
                <label htmlFor="email" className="text-base-500 ">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  val={values.lastName}
                  handleChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-0">
              <label htmlFor="email" className="text-base-500">
                Email
              </label>
              <Input
                type="text"
                placeholder="Enter your email"
                name="email"
                val={values.email}
                handleChange={handleInputChange}
              />
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
                  onChange={handlePhoneInputChange}
                  value={values.mobile}
                  inputProps={{
                    name: "mobile",
                    required: true,
                    autoFocus: false,
                  }}
                />
              </div>
            </div>
            <div className="space-y-0">
              <label htmlFor="password" className="text-base-500">
                Password
              </label>
              <Input
                type="text"
                placeholder="Enter your password"
                name="password"
                val={values.password}
                handleChange={handleInputChange}
              />
            </div>
            <button
              onClick={handleSignUp}
              type="button"
              className="w-full py-2 px-4 bg-[#00BFA6] text-white rounded-md hover:bg-green-600 focus:outline-none">
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
      {isLoading && loader}
    </div>
  );
}

export default SignUp;
