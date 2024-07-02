import React, { useEffect, useLayoutEffect, useState } from "react";
import HostelCard from "../../components/HostelCard";
import HostelDetailCard from "../../components/HostelDetailCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const HostelDetails = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [relatedHostels, setRelatedHostels] = useState([])

  const { id } = useParams()
  async function getdetails() {
    const { data } = await axios.get(`http://localhost:8000/api/v1/posthostel/${id}`);
    console.log(data)
    setData(data.hostel)
    setRelatedHostels(data.relatedHostels)
  }
  useLayoutEffect(() => {
    getdetails()
  }, [])


  const handleBookNow = async (id) => {

    // const { data } = await axios.post('http://localhost:8000/api/v1/bookhostel', { hostelId: id }, {
    //   headers: {
    //     authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDViNTgyNTEyMjM0NTdjMWJiYzdhNiIsInVzZXJlbWFpbCI6InRlc3R1c2VyQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzE1ODQ0NDgzLCJleHAiOjE3MTU4NDUzODN9.9dFz-w3UJLfe3NQ32I0BVjme0wjENo_HJW1cLHdpaaY'
    //   },
    // }) 

    const params = new URLSearchParams();
    params.append('hid', id);
    navigate(`/BookYourRoom?${params.toString()}`);


  }


  return (
    Object.keys(data).length > 0 && <div className="p-16">
      <div className="grid grid-cols-2 gap-32">
        <div>
          <p className="text-2xl pb-3 font-semibold text-[#2296EA]">Hostel Details</p>
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
        <div className="w-full">
          <button className="text-2xl text-center w-full pb-3 font-semibold text-[#2296EA]" onClick={() => handleBookNow(data._id)}>Book Now</button>
          <p className="text-2xl">You must be signIn to Book Online</p>
          <div className="w-full">
            <h3 className="text-3xl font-bold py-3">Feature</h3>
            <table className="flex flex-col gap-y-4 text-2xl w-full">
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
                <td className="capitalize">{data.rentPeriod === '1' ? 'Per Month' : data.rentPeriod}</td>
              </tr>
              <tr className="flex w-full align-middle justify-between">
                <td>Bathroom</td>
                <td className="capitalize">{data.bathroom === 'yes' ? 'Attached' : data.bathroom}</td>
              </tr>
              <tr className="flex w-full align-middle justify-between">
                <td>Mess</td>
                <td className="capitalize">{data.mess === 'yes' ? 'Included' : data.mess}</td>
              </tr>
              <tr className="flex w-full align-middle justify-between">
                <td>Lawn</td>
                <td className="capitalize">{data.lawn}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="p-16">
        <h1 className="text-2xl py-6 font-bold">Amenities</h1>
        <div className="grid grid-cols-3 gap-x-20 gap-y-10">
          <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center  items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
            <img src="/Wi-Fi.png" />
            {data.wifi === 'yes' ? 'Wi-fi' : 'Not Availible'}
          </p>
          <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
            <img src="/Fridge.png" />
            {data.mineralWater === 'yes' ? 'Mineral Water' : 'Not Availible'}
          </p>
          <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
            <img src="/Officer.png" />
            {data.securityGuard === 'yes' ? 'Security Guard' : 'Not Availible'}
          </p>
          <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
            <img src="/Reading.png" />
            {data.studyRoom === 'yes' ? 'Study Room' : 'Not Availible'}
          </p>
          <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
            <img src="/Camera.png" />
            {data.cctv === 'yes' ? 'CCTV Camera' : 'Not Availible'}
          </p>
          <p className="w-72 flex font-semibold text-xl gap-3  align-middle justify-center items-center h-24 text-center border-[#3AACFF] bg-[#EAF4FC]">
            <img src="/electricity.png" />
            {data.laundary === 'yes' ? 'Laundary' : 'Not Availible'}
          </p>
        </div>
      </div>
      <div className="p-16">
        {relatedHostels.length > 0 && <h1 className="py-6 text-2xl font-bold">Related Hostels</h1>}
        <div>
          {
            relatedHostels.length > 0 &&
            <div className="grid grid-cols-3 gap-7">
              {
                relatedHostels.map(hostel => {
                  return <HostelDetailCard
                    images={hostel.images}
                    imagewidth="3/4"
                    review="5.0 (120 Reviews)"
                    hostelName={hostel.hostelName}
                    location={hostel.hostelAddress}
                    rent={`${hostel.rent} PKR/`}
                    category={`${hostel.hostelType} Hostel`}
                    showbtn={false}
                  />
                })
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
