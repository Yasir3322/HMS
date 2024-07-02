import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
      .then(
        async () => {
          alert("email Send successfully");
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_UR}/api/v1/contactmess`,
            { message: formRef.current }
          );
        },
        (error) => {
          alert("failed sending mail");
        }
      );
  };

  return (
    <div>
      <div className="border border-[#88C7F5] rounded-md md:m-20 m-10 p-4 bg-[#EAF4FC]">
        <h1 className="font-bold text-xl">CONTACT US NOW!</h1>
        <p className="pt-5 font-medium">
          Let us know what you think! In order to provide better service, please
          do not hesitate to give us your feedback, Thank you.
        </p>
      </div>
      <form ref={formRef} onSubmit={sendEmail}>
        <div className="md:grid md:grid-cols-2 md:mx-48 mx-1 md:gap-40">
          <div className="">
            <label className="font-serif">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="md:mt-0 mt-4">
            <label className="font-serif">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
        <div className="md:mx-48 mx-10 my-4 md:my-10">
          <label className="font-serif">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="md:mx-48 mx-10 md:my-10">
          <label className="font-serif">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            className="w-full mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="md:mx-48 mx-10 md:my-10 my-4">
          <label className="font-serif">Message</label>
          <br />
          <textarea className="w-full h-64 mt-1 p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        <div className="flex md:justify-end gap-4 md:mr-48 ml-10 mb-40">
          <button className="bg-[#2991DC] rounded-md py-2 px-10 text-white">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#2991DC] rounded-md py-2 px-10 text-white"
          >
            send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
