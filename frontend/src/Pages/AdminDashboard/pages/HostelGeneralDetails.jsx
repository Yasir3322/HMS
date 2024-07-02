import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";

const HostelGeneralDetails = () => {
  const [hostels, setHostels] = useState([]);
  useEffect(() => {
    const getHostelDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/postHostel"
        );
        setHostels(response.data.hostels);
      } catch (error) {
        console.log(error);
      }
    };
    getHostelDetails();
  }, []);
  return (
    <div className="w-full h-auto">
      <table className=" w-full p-2 h-auto">
        <thead className="h-20  font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-center">
            <td>ID</td>
            <td>Hostel Name</td>
            <td>Category</td>
            <td>Hostel Phone No</td>
            <td>Address</td>
            <td>Manager Name</td>
            <td>Contact No</td>
            <td>Email</td>
            <td>Setting</td>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={index} className="border text-center h-20 font-serif">
              <td>{index + 1}</td>
              <td>{hostel.hostelName}</td>
              <td>{hostel.hostelType}</td>
              <td>{hostel.hostelContact}</td>
              <td>{hostel.hostelAddress}</td>
              <td>{hostel.accountName}</td>
              <td>{hostel.accountNumber}</td>
              <td>{hostel.accountEmail}</td>
              <td className="pl-6">
                <img src={setting} alt="setting" className="w-6 h-6" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostelGeneralDetails;
