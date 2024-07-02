import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";

const HostelSpecification = () => {
  const [hostels, setHostels] = useState([]);
  useEffect(() => {
    const getHostelSpecification = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/postHostel"
        );
        setHostels(response.data.hostels);
      } catch (error) {
        console.log(error);
      }
    };
    getHostelSpecification();
  }, []);
  return (
    <div className="w-full h-auto">
      <table className=" w-full p-2 h-auto">
        <thead className="h-20  font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-center">
            <td>ID</td>
            <td>Rent per Month</td>
            <td>Rent Period</td>
            <td>Bill Included</td>
            <td>Condition</td>
            <td>Select Floor</td>
            <td>Bathroom</td>
            <td>Mess</td>
            <td>Lawn</td>
            <td>No of Rooms</td>
            <td>Setting</td>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={index} className="border text-center h-20 font-serif">
              <td>{index + 1}</td>
              <td>{hostel.rent}</td>
              <td>{hostel.rentPeriod}</td>
              <td>{hostel.bills}</td>
              <td>{hostel.condition}</td>
              <td>{hostel.floor}</td>
              <td>{hostel.bathroom}</td>
              <td>{hostel.mess}</td>
              <td>{hostel.lawn}</td>
              <td>{hostel.numberOfRooms}</td>
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

export default HostelSpecification;
