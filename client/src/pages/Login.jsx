import React from "react";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-4 bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-800  rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-sm text-gray-200 font-bold">Login</h2>
          <div className="pb-5">
            <p className="flex text-xl px-4 items-baseline font-bold">
              my<p className="text-green-500 p-0 m-0 font-bold text-2xl">C</p>
              ontacts
            </p>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-200">
              User Name
            </label>
            <input
              id="username"
              type="text"
              className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
