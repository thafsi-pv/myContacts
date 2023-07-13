import React from "react";

function Input({ id, name, type, autoComplete, handleChange, refer, val,placeholder }) {
  return (
    <div className="mt-2">
      <input
        id={id}
        ref={refer}
        name={name}
        placeholder={placeholder}
        type={type}
        value={val}
        onChange={(e) => handleChange(e)}
        required
        className="block w-full rounded-md border-0 px-1 py-2 bg-gray-800 text-gray-100 shadow-sm ring-1 ring-gray-600 placeholder:text-gray-400  sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default Input;
