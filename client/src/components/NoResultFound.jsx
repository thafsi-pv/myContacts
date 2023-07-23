import React from "react";
import { VscSearchStop } from "react-icons/vsc";

function NoResultFound() {
  return (
    <div className="flex items-center h-screen">
      <div className="flex flex-col items-center p-8 text-center bg-base-300 m-5 -mt-28 rounded-md">
        <div>
          <VscSearchStop className="w-10 h-10 text-red-500" />
        </div>
        <p className="text-lg font-semibold">Sorry! No contacts found ☹️</p>
        <p className="text-sm text-gray-400">
          We're sorry what you were looking for. Please use another name
        </p>
      </div>
    </div>
  );
}

export default NoResultFound;
