import React from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-[90%]">
      <div className="flex flex-col items-center justify-center h-4/5 m-4 ">
        <div className="max-w-md w-full p-6 bg-base-300  rounded-md shadow-md">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-sm text-base-500 font-bold">Login</h2>
            <div className="pb-5">
              <p className="flex text-xl px-4 items-baseline font-bold">
                my<p className="text-green-500 p-0 m-0 font-bold text-2xl">C</p>
                ontacts
              </p>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="text-base-500">
                User Name
              </label>
              <Input placeholder="Enter user name" />
            </div>
            <div>
              <label htmlFor="password" className="text-base-500">
                Password
              </label>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
              Login
            </button>
            <div className="flex justify-center !mt-10 font-semibold text-xs">
              <p className="text-gray-500">
                New User?
                <span className="text-green-700 hover:cursor-pointer">
                  <Link to="/signup">
                    <a href=""> Sign Up</a>
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

export default Login;
