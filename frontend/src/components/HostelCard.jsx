import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosFemale, IoMdMale } from "react-icons/io";
import Carasoule from "./Carasoule";

const HostelCard = (props) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  console.log(props.images);
  const fetchHostelDetails = (id) => {
    navigate(`/HostelDetails/${id}`);
  };

  let items = props.images.map((image) => `${baseUrl}/${image}`);

  return (
    <div className="grid grid-cols-2">
      <div>
        {/* <img src={`${items[0]}`} alt="image5" width={400} className="h-full" /> */}
        <Carasoule items={items} />
      </div>
      <div className="">
        <div className="flex ml-4">
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <FaStar className="text-yellow-300 pt-1 w-5 h-5" />
          <h1 className="pl-3">{props.review}</h1>
        </div>
        <div className="mt-2 ml-4 ">
          <h1 className="font-bold text-2xl">{props.hostelName}</h1>
          <p className="my-2">{props.location}</p>
          <h2>
            <span className="font-bold text-lg">{props.rent}</span> Per Month
          </h2>

          <div className="flex align-middle justify-between mt-2">
            <div className="flex flex-col gap-0 leading-3">
              <h3 className="text-[#39573E] text-xl">View on map</h3>
              <div className="flex align-middle items-center gap-2">
                {props.category == "boys" ? <IoMdMale /> : <IoIosFemale />}
                <h1 className="text-lg">{props.category}</h1>
              </div>
            </div>
            <button
              className="bg-[#2296EA] h-10 text-center items-center text-white rounded-xl py-2 px-8"
              onClick={() => fetchHostelDetails(props.id)}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;
