import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BookYourRoom = () => {

  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const hid = query.get('hid');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    city: "",
    state: "",
    roomType: "",
    roomNo: "",
    joiningDate: "",
    vacateDate: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let objtosend = { ...formData, hostelId: hid }
    console.log(objtosend)
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/bookyourroom",
        objtosend
      );
      console.log(response.data);
      if (response.data) {
        alert("Your Room Book Successfully");
      }
    } catch (error) {
      console.log("There was an error submitting the form", error);
      alert("error while submitting the form");
    }
  };

  return (
    <div>
      <div className="mt-24 ml-44 leading-8">
        <h1 className="font-bold">Book Your Room</h1>
        <h2>Enter your Details</h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 mx-60 gap-40">
          <div className="">
            <label className="block font-serif">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block font-serif">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mx-60 gap-40">
          <div className="">
            <label className="block font-serif">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block font-serif">Phone No</label>
            <input
              type="number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mx-60 gap-40">
          <div className="">
            <label className="block font-serif">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block font-serif">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mx-60 gap-40">
          <div className="">
            <label className="block font-serif">Room type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-72 font-serif mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value=""></option>
              <option value="One Seater">One Seater</option>
              <option value="Two Seater">Two Seater</option>
              <option value="Three Seater">Three Seater</option>
              <option value="Four Seater">Four Seater</option>
            </select>
          </div>
          <div>
            <label className="block font-serif">Room No</label>
            <select
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              className="w-72 font-serif mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 mx-60 gap-40">
          <div className="">
            <label className="block font-serif">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block font-serif">Vacate Date</label>
            <input
              type="date"
              name="vacateDate"
              value={formData.vacateDate}
              onChange={handleChange}
              className="w-72 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div className="mx-60">
          <label className="block font-serif">Payment Method</label>
          <select
            className="w-full font-serif mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="Your Choice">Your Choice</option>
            <option value="No prepament needed - pay at the property">
              No prepament needed - pay at the property
            </option>
            <option value="EasyPaisa">EasyPaisa</option>
          </select>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-[#2991DC] px-6 py-2 rounded-md my-6 text-white"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookYourRoom;
