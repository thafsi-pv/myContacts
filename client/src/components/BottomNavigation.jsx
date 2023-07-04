import React from "react";
import { BiSolidContact } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

function BottomNavigation() {
  return (
    <div className="btm-nav">
      <button>
        <Link to='/'>
        <BiSolidContact className="h-5 w-5" />
        </Link>
      </button>
      <button className="active">
        <Link to='/addNew'>
          <IoPersonAdd className="h-5 w-5" />
        </Link>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </button>
    </div>
  );
}

export default BottomNavigation;
