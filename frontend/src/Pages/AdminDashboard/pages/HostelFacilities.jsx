import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";

const HostelFacilities = () => {
  const [hostels, setHostels] = useState([]);
  useEffect(() => {
    const getHostelFacilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/postHostel"
        );
        setHostels(response.data.hostels);
        console.log(response.data.hostels);
      } catch (error) {
        console.log(error);
      }
    };
    getHostelFacilities();
  }, []);
  return (
    <div className="w-full h-auto">
      <table className=" w-full p-2 h-auto">
        <thead className="h-20  font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-center">
            <td>ID</td>
            <td>Parking</td>
            <td>Geyser</td>
            <td>Security Guard</td>
            <td>Study Room</td>
            <td>GYM</td>
            <td>CCTV Cameras</td>
            <td>Wi-Fi</td>
            <td>Laundry</td>
            <td>Mineral Water</td>
            <td>Setting</td>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={index} className="border text-center h-20 font-serif">
              <td>{index + 1}</td>
              <td>{hostel.parking}</td>
              <td>{hostel.geyser}</td>
              <td>{hostel.securityGuard}</td>
              <td>{hostel.studyRoom}</td>
              <td>{hostel.gym}</td>
              <td>{hostel.cctv}</td>
              <td>{hostel.wifi}</td>
              <td>{hostel.laundary}</td>
              <td>{hostel.mineralWater}</td>
              <td className="pl-8">
                <img src={setting} alt="setting" className="w-6 h-6" />
              </td>
            </tr>
          ))}
        </tbody>
        {/* <tbody className="border text-center h-20 font-serif">
          <tr>
            <td>2</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
            <td>No</td>
            <td>Yes</td>
            <td className="pl-8">
              <img src={setting} alt="setting" className="w-6 h-6" />
            </td>
          </tr>
        </tbody> */}
      </table>
    </div>
  );
};

export default HostelFacilities;
