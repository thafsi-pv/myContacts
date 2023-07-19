import { useState } from "react";

const useInputChange = (initialvalues = {}) => {
  const [inputValues, setInputValues] = useState(initialvalues);
  console.log(
    "🚀 ~ file: useInputChange.jsx:5 ~ useInputChange ~ inputValues:",
    inputValues
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneInputChange = (value, countryData, event) => {
    const { name } = event.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  return [inputValues, handleInputChange, handlePhoneInputChange];
};

export default useInputChange;
