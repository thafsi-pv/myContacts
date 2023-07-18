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
        className="block w-full rounded-md border-0 px-1 py-2 bg-base-200  shadow-sm ring-1 ring-base-500 placeholder:text-gray-400  sm:text-sm sm:leading-6"
      />
    </div>
  );
}

export default Input;
