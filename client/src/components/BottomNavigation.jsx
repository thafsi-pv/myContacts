import React, { useState } from "react";
import { BiSolidContact } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

function BottomNavigation() {
  const [activeTab,setActiveTab]=useState(1)
  return (
    <div className="btm-nav">
      <button className= {`${activeTab==1?"active":''}`} onClick={()=>setActiveTab(1)}>
        <Link to='/'>
        <BiSolidContact className="h-5 w-5" />
        </Link>
      </button>
      <button className={`${activeTab==2?"active":''}`} onClick={()=>setActiveTab(2)}>
        <Link to='/addNew'>
          <IoPersonAdd className="h-5 w-5" />
        </Link>
      </button>
      {/* <button className={`${activeTab==3?"active":''}`} onClick={()=>setActiveTab(3)}>
       <Link to='/dept'> <FaRegBuilding  className="h-5 w-5"/></Link>
      </button> */}
    </div>
  );
}

export default BottomNavigation;
