import React from "react";
import setting from "../../../../public/Settings.png";
import { Link } from "react-router-dom";

const ActiveHostels = () => {
  return (
    <div className="w-full h-auto">
      <div className="flex items-end justify-end pr-10 p-2">
        <Link to="/AdminDashboard/addnew" className="w-32 rounded-md p-1 text-center bg-blue-400 text-black">Add New</Link>
      </div>
      <table className=" w-full p-2 h-auto">
        <thead className="h-16  font-serif border bg-[#EAF4FC]">
          <tr className="">
            <td>ID</td>
            <td>Hostel Name</td>
            <td>Location</td>
            <td>Active/Deative</td>
            <td>Verified/Not Verified</td>
            <td>Rent</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className="border h-16 font-serif">
          <tr>
            <td>1</td>
            <td>Youth Hostel</td>
            <td>Peshawar</td>
            <td>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  defaultChecked={true}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </td>
            <td>Verified</td>
            <td>9000</td>
            <td className="">
              <img src={setting} alt="setting" className="w-6 h-6" />
            </td>
          </tr>
        </tbody>
        <tbody className="border h-16 font-serif">
          <tr>
            <td>2</td>
            <td>Imperial Hostel </td>
            <td>Peshawar</td>
            <td>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  defaultChecked={true}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </td>
            <td>Verified</td>
            <td>9000</td>
            <td className="">
              <img src={setting} alt="setting" className="w-6 h-6" />
            </td>
          </tr>
        </tbody>
        <tbody className="border h-16 font-serif">
          <tr>
            <td>3</td>
            <td>Youth Hostel</td>
            <td>Peshawar</td>
            <td>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  defaultChecked={true}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </td>
            <td>Verified</td>
            <td>9000</td>
            <td className="">
              <img src={setting} alt="setting" className="w-6 h-6" />
            </td>
          </tr>
        </tbody>
        <tbody className="border h-16 font-serif">
          <tr>
            <td>4</td>
            <td>Dua Boys Hostel </td>
            <td>Peshawar</td>
            <td>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  defaultChecked={true}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </td>
            <td>Verified</td>
            <td>9000</td>
            <td className="">
              <img src={setting} alt="setting" className="w-6 h-6" />
            </td>
          </tr>
        </tbody>
        <tbody className="border h-16 font-serif">
          <tr>
            <td>5</td>
            <td>Premium Girls Hostel </td>
            <td>Peshawar</td>
            <td>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  defaultChecked={true}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </td>
            <td>Verified</td>
            <td>9000</td>
            <td className="">
              <img src={setting} alt="setting" className="w-6 h-6" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ActiveHostels;
