import React from "react";

const ShimmerContacts = () => {
  return (
    <div className="flex flex-col p-8  justify-center mt-16 max-h-[700px] lg:w-2/4 m-auto bg-gray-800">
      <input
        className="borde bg-gray-700 border-gray-300 rounded-lg p-2 mb-4"
        type="text"
        placeholder="Search contacts"
      />
      <div className="space-y-4">
        {[...Array(10)].map((_, index) => (
          <div className="flex items-center" key={index}>
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-300 w-32 rounded"></div>
              <div className="h-4 bg-gray-300 w-20 rounded mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerContacts;
