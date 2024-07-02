import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="h-screen md:w-1/4 w-1/2  p-10 flex flex-col md:relative absolute bg-white dark:bg-slate-800">
      {/* <ul>
                <li className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white" onClick={() => setActiveComponent('Dashboard')}>
                    Dashboard
                </li>
                <li className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white" onClick={() => setActiveComponent('Profile')}>
                    My Profile
                </li>
                <li className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white" onClick={() => setActiveComponent('Setting')}>
                    Setting
                </li>
            </ul> */}
      <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/UserDashboard"
      >
        Dashboard
      </Link>
      <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/UserDashboard/infodetail"
      >
        My Profile
      </Link>
      <Link
        className="cursor-pointer mb-2 bg-[#4aa4d9] p-3 rounded-lg text-white dark:bg-gray-700"
        to="/UserDashboard/profile"
      >
        Setting
      </Link>
    </div>
  );
};

export default Sidebar;
