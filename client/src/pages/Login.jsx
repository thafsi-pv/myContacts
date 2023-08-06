import React, { useEffect } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import useInputChange from "../hooks/useInputChange";
import axios from "axios";
import { USER_API } from "../const/const";
import { genricError } from "../utils/genricError";
import { useDispatch } from "react-redux";
import { addPermission, addUserDetails } from "../redux/userPermissionSlice";
import useLoader from "../hooks/useLoader";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(null);
  const [values, handleInputChange] = useInputChange({
    email: "",
    password: "",
  });
  const { isLoading, toggleLoading, loader } = useLoader(false);

  const getUserPermission = async (id) => {
    const permission = await axios(USER_API + "/permission?id=" + id);
    localStorage.setItem("myc_uid", id);

    const userDetails = {
      firstName: permission.data.firstName,
      lastName: permission.data.lastName,
      email: permission.data.email,
      role: permission.data.permission.role,
    };

    dispatch(addPermission(permission.data.permission.permmision));
    dispatch(addUserDetails(userDetails));
  };

  const handleLogIn = async () => {
    try {
      toggleLoading(true);
      const response = await axios.post(USER_API + "/signIn", values);
      if ((response.status = 200)) {
        localStorage.setItem("myc_token", response.data.accesstoken);
        getUserPermission(response.data.id);
        navigate("/");
      }
    } catch (error) {
      genricError(error);
    } finally {
      console.log("finaly");
      toggleLoading(false);
    }
  };
  // if (isLoading) {
  //   return loader;
  // }
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-screen mx-4 ">
        <div className="max-w-md w-full p-6 bg-base-300  rounded-md shadow-md">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-sm text-base-500 font-bold">Login</h2>
            <div className="pb-5">
              <p className="flex text-xl px-4 items-baseline font-bold">
                my<p className="text-[#00BFA6] p-0 m-0 font-bold text-2xl">C</p>
                ontacts
              </p>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="text-base-500">
                Email
              </label>
              <Input
                placeholder="Enter user name"
                name="email"
                handleChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-base-500">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                handleChange={handleInputChange}
              />
            </div>
            <button
              type="button"
              onClick={handleLogIn}
              className="w-full py-2 px-4 bg-[#00BFA6] text-white rounded-md hover:bg-[#00bfa6ba] focus:outline-none">
              Login
            </button>
            <div className="flex justify-center !mt-10 font-semibold text-xs">
              <p className="text-gray-500">
                New User?
                <span className="text-[#00BFA6] hover:cursor-pointer">
                  <Link to="/signup">
                    <a href=""> Sign Up</a>
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

export default Login;
