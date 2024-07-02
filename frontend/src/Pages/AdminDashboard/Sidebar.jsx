import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showPages, setShowPages] = useState(false);
  const handleClick = () => {
    setShowPages(!showPages);
  };
  return (
    <div className="h-screen md:w-1/4 w-1/2 p-10 flex flex-col md:relative absolute bg-white dark:bg-slate-800">
      <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/AdminDashboard"
      >
        Dashboard
      </Link>
      <button
        className="cursor-pointer pr-16 mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        onClick={handleClick}
      >
        Hostel Details
      </button>
      {showPages && (
        <ul className="font-serif py-1 pl-8">
          <li>
            <Link to="/AdminDashboard/hostelgeneraldetails">
              - Hostel Details
            </Link>
          </li>
          <li>
            <Link to="/AdminDashboard/hostelspecification">
              - Hostel Specification
            </Link>
          </li>
          <li>
            <Link to="/AdminDashboard/hostelfacilities">
              - Hostel Facilities
            </Link>
          </li>
        </ul>
      )}
      <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/AdminDashboard/allusers"
      >
        All Users
      </Link>
      <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/AdminDashboard/reviews"
      >
        Reviews
      </Link>
      <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/AdminDashboard/contactus"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default Sidebar;
