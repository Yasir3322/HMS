import React, { useEffect, useState } from "react";
import HostelDetailCard from "../../../components/HostelDetailCard";
import { Link } from "react-router-dom";
import image from "../../../../public/image5.png";
import wifi from "../../../../public/Wi-Fi.png";
import Fridge from "../../../../public/Fridge.png";
import Officer from "../../../../public/Officer.png";
import Reading from "../../../../public/Reading.png";
import Camera from "../../../../public/Camera.png";
import electricity from "../../../../public/electricity.png";
import axios from "axios";

const PendingHostels = () => {
  const [pendingHostels, setPendingHostels] = useState([]);

  const getAllHostels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/postHostel",
        {
          params: { status: "pending" },
        }
      );
      console.log(response.data.hostels);
      setPendingHostels(response.data.hostels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllHostels();
  }, []);

  async function handleupdate(id, status) {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posthostel/${id}/status`,
        {
          status,
        }
      );
      // setResponseMessage(response.data.message);
      if (response.data.success) {
        alert("hostel updated");
        getAllHostels();
      }
    } catch (error) {
      setResponseMessage("Error updating hostel status");
    }
  }

  return (
    <div>
      {pendingHostels.map((data) => {
        return (
          <div>
            <div className="grid grid-cols-2 dark:bg-gray-700 dark:text-white">
              <div>
                <h1 className="text-[#2296EA] font-bold pl-4 text-lg mb-3">
                  Hostel Details
                </h1>
                <div>
                  <HostelDetailCard
                    images={data.images}
                    imagewidth="3/4"
                    imageheight="72"
                    review="5.0 (120 Reviews)"
                    hostelName={data.hostelName}
                    location={data.hostelAddress}
                    rent={`${data.rent} PKR/`}
                    category={`${data.hostelType} Hostel`}
                    showbtn={false}
                  />
                </div>
              </div>
              <div className="w-full ml-36">
                <div className="w-full">
                  <table className="flex flex-col gap-y-4 text-2xl w-full">
                    <tr className="flex w-full align-middle justify-between">
                      <button
                        className="bg-[#F85A50] px-8 py-1 rounded-lg text-white"
                        onClick={() => handleupdate(data._id, "reject")}
                      >
                        Reject
                      </button>
                      <button
                        className="bg-[#4AA4D9] px-8 py-1 rounded-lg text-white"
                        onClick={() => handleupdate(data._id, "approved")}
                      >
                        Approve
                      </button>
                    </tr>
                    <tr className="flex w-full align-middle justify-between">
                      <td>Condition</td>
                      <td className="capitalize">{data.condition}</td>
                    </tr>
                    <tr className="flex w-full align-middle justify-between">
                      <td>Floor</td>
                      <td className="capitalize">{data.floor}</td>
                    </tr>
                    <tr className="flex w-full align-middle justify-between">
                      <td>Bills</td>
                      <td className="capitalize">{data.bills}</td>
                    </tr>
                    <tr className="flex w-full align-middle justify-between">
                      <td>Rent Period</td>
                      <td className="capitalize">
                        {data.rentPeriod === "1"
                          ? "Per Month"
                          : data.rentPeriod}
                      </td>
                    </tr>
                    <tr className="flex w-full align-middle justify-between">
                      <td>Bathroom</td>
                      <td className="capitalize">
                        {data.bathroom === "yes" ? "Attached" : data.bathroom}
                      </td>
                    </tr>
                    <tr className="flex w-full align-middle justify-between">
                      <td>Mess</td>
                      <td className="capitalize">
                        {data.mess === "yes" ? "Included" : data.mess}
                      </td>
                    </tr>
                    <tr className="flex w-full align-middle justify-between">
                      <td>Lawn</td>
                      <td className="capitalize">{data.lawn}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-2xl py-6 font-bold">Amenities</h1>
              <div className="grid grid-cols-3 gap-x-36 gap-y-10">
                <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                  <img src={wifi} className="h-14 w-8" />
                  {data.wifi === "yes" ? "Wi-fi" : "Not Availible"}
                </div>
                <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                  <img src={Fridge} className="h-6" />
                  {data.mineralWater === "yes"
                    ? "Mineral Water"
                    : "Not Availible"}
                </div>
                <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                  <img src={Officer} className="h-10" />
                  {data.securityGuard === "yes"
                    ? "Security Guard"
                    : "Not Availible"}
                </div>
                <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                  <img src={Reading} className="h-20" />
                  {data.studyRoom === "yes" ? "Study Room" : "Not Availible"}
                </div>
                <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                  <img src={Camera} className="h-16" />
                  {data.cctv === "yes" ? "CCTV Camera" : "Not Availible"}
                </div>
                <div className="border border-[#3AACFF] rounded-lg h-10 w-48  flex align-middle justify-center  items-center  text-center bg-[#EAF4FC]">
                  <img src={electricity} className="h-8" />
                  {data.laundary === "yes" ? "Laundary" : "Not Availible"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PendingHostels;
