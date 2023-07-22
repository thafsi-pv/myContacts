import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BsSun, BsMoonStars } from "react-icons/bs";

function Settings() {
  const { toggleTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="ml-16 mt-16 ">
      <div className="flex justify-start items-center space-x-4 pt-10">
        <label htmlFor="theme" className="font-semibold">
          Switch Luminosity
        </label>
        <label className="swap swap-rotate">
          <input id="theme" type="checkbox" onClick={handleToggle} />
          <BsSun className="swap-on fill-current w-8 h-8" />
          <BsMoonStars className="swap-off fill-current w-8 h-8" />
        </label>
      </div>
    </div>
  );
}

export default Settings;
