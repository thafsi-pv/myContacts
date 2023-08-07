import React from "react";

function ShimmerContactDetails() {
  return (
    <div className="flex justify-center align-middle w-full items-center mt-16 animate-pulse">
      <div className=" p-5 m-3 w-full max-w-sm   rounded-lg bg-red-500 dark:bg-base-100 shadow-2xl">
        <div className="flex flex-col items-center pb-10 mt-10">
          <span
            className={`flex items-center justify-center text-white w-24 h-24 mb-3 rounded-full shadow-lg my-auto text-center text-5xl font-bold bg-gray-400`}></span>
          <h5 className="mb-1 text-xl font-medium h-4 w-28 rounded-sm bg-gray-400"></h5>
          <span className="text-sm text-gray-500 h-4 w-24 rounded-sm bg-gray-400"></span>

          <div className="flex flex-col mt-4 md:mt-6">
            <label className="text-sm h-3 w-8 bg-gray-400 mb-1 rounded-sm"></label>
            <div className="flex flex-nowrap items-center">
              <label className="mr-3 bg-gray-400 h-6 w-72 rounded-sm"></label>
            </div>
          </div>
          <div className="flex flex-col mt-4 md:mt-6">
            <label className="text-sm h-3 w-8 bg-gray-400 mb-1 rounded-sm"></label>
            <div className="flex flex-nowrap items-center">
              <label className="mr-3 bg-gray-400 h-6 w-72 rounded-sm"></label>
            </div>
          </div>
          <div className="flex flex-col mt-4 md:mt-6">
            <label className="text-sm h-3 w-8 bg-gray-400 mb-1 rounded-sm"></label>
            <div className="flex flex-nowrap items-center">
              <label className="mr-3 bg-gray-400 h-16 w-72 rounded-sm"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShimmerContactDetails;
