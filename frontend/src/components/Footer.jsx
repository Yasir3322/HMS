import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

import axios from "axios";

const Footer = () => {
  const [emailToSub, setEmailToSub] = useState("");

  async function handleSubscribeClick(e) {
    e.preventDefault();
    console.log(emailToSub);
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/subscribe",
      { email: emailToSub },
      {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDViNTgyNTEyMjM0NTdjMWJiYzdhNiIsInVzZXJlbWFpbCI6InRlc3R1c2VyQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzE1ODQ0NDgzLCJleHAiOjE3MTU4NDUzODN9.9dFz-w3UJLfe3NQ32I0BVjme0wjENo_HJW1cLHdpaaY",
        },
      }
    );

    console.log(data);
  }

  return (
    <div>
      <div className="pl-48 my-20 leading-10">
        <h1 className="text-[#2991DC] text-3xl font-bold">Contact Us</h1>
        <h2 className="font-serif text-2xl pt-4">For Inquiries</h2>
        <p className="font-serif">
          Reach our to us for any queries or assistance regarding hostel
          bookings.
        </p>
        <h2 className="font-serif text-2xl">Feedback</h2>
        <p className="font-serif">
          We appreciate your feedback and suggestions to enhance our services
          and offerings.
        </p>
      </div>
      <div className="bg-[#1A1D3A] text-white text-center py-10">
        <h1 className="text-4xl mb-2 tracking-wider">Sign Up For Newsletter</h1>
        <p className="font-serif mb-2">
          Subscribe to our newsletter to get the latest news and updates
        </p>
        <div className="">
          <input
            type="text"
            placeholder="Email address"
            value={emailToSub}
            onChange={(e) => setEmailToSub(e.target.value)}
            className="w-72 h-10 font-serif pl-2 text-black"
          />
          <button
            className="bg-[#2991DC] py-2 px-6"
            onClick={() => handleSubscribeClick()}
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 pl-52 bg-[#88C7F5] font-serif py-10">
        <div>
          <h1 className="font-serif text-2xl">HARP</h1>
          <ul className="pt-4 leading-8">
            <Link to="#">
              <li>About Us</li>
            </Link>
            <Link to="/allhostels">
              <li>All Hostels</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div>
          <h1 className="font-serif text-2xl">Contact Us</h1>
          <ul className="pt-4 leading-8">
            <Link to="#">
              <li>+923169820534</li>
            </Link>
            <Link to="#">
              <li>harphostel@harp.com</li>
            </Link>
          </ul>
        </div>
        <div>
          <h1 className="font-serif text-2xl">Get in Touch</h1>
          <div className="pt-4 flex gap-4 relative">
            <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center">
              <Link to="#">
                <FaFacebook className="text-blue-700 w-6 h-6" />
              </Link>
            </div>
            <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center">
              <Link to="#">
                <FaInstagramSquare className="text-pink-600 w-6 h-6" />
              </Link>
            </div>
            <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center">
              <Link to="#">
                <FaTwitterSquare className="text-blue-800 w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
