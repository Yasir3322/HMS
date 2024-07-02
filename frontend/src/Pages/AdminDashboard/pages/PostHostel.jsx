import axios from "axios";
import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AdminPostHostel = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [formData, setFormData] = useState({
        hostelName: "",
        hostelType: "",
        hostelContact: "",
        hostelAddress: "",
        // images: null,
        accountName: "",
        accountNumber: "",
        accountEmail: "",
        accountPass: "",
        rent: "",
        rentPeriod: "",
        bills: "",
        condition: "",
        floor: "",
        bathroom: "",
        mess: "",
        lawn: "",
        numberOfRooms: "",
        parking: false,
        geyser: false,
        securityGuard: false,
        studyRoom: false,
        gym: false,
        cctv: false,
        wifi: false,
        laundary: false,
        mineralWater: false,
    });

    const goToPreviousPage = () => {
        setCurrentPage((previes) => previes - 1);
    };

    const handleCancel = () => setPreviewVisible(false);

    const handleImageChange = (e) => {
        e.preventDefault();
        const selectedImageFile = e.target.files[0];
        console.log("this is selected image file", selectedImageFile);
        setSelectedImage(URL.createObjectURL(selectedImageFile));
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: selectedImageFile,
        }));
        console.log("hello");
        console.log("Selected image:", selectedImage);
        e.target.value = "";
    };

    const goToNextPageOrSubmit = async (e) => {
        if (currentPage < 3) {
            setCurrentPage((previes) => previes + 1);
        } else {
            // form submited logic here
            try {
                e.preventDefault();
                const data = new FormData();
                const imagefiles = fileList.map((file) => {
                    return file.originFileObj;
                });
                data.append("hostelName", formData.hostelName);
                data.append("hostelType", formData.hostelType);
                data.append("hostelContact", formData.hostelContact);
                data.append("hostelAddress", formData.hostelAddress);
                data.append("accountName", formData.accountName);
                data.append("accountNumber", formData.accountNumber);
                data.append("accountEmail", formData.accountEmail);
                data.append("accountPass", formData.accountPass);
                data.append("rent", formData.rent);
                data.append("rentPeriod", formData.rentPeriod);
                data.append("bills", formData.bills);
                data.append("condition", formData.condition);
                data.append("floor", formData.floor);
                data.append("bathroom", formData.bathroom);
                data.append("mess", formData.mess);
                data.append("lawn", formData.lawn);
                data.append("numberOfRooms", formData.numberOfRooms);
                data.append("parking", formData.parking);
                data.append("geyser", formData.geyser);
                data.append("securityGuard", formData.securityGuard);
                data.append("studyRoom", formData.studyRoom);
                data.append("gym", formData.gym);
                data.append("cctv", formData.cctv);
                data.append("wifi", formData.wifi);
                data.append("laundary", formData.laundary);
                data.append("mineralWater", formData.mineralWater);
                for (const image of imagefiles) {
                    data.append("images", image);
                }

                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/v1/postHostel`,
                    data
                );
                if (data) {
                    alert("Hostel Post Successfully");
                }
            } catch (error) {
                console.log("form submiting error", error);
                alert("Error while posting hostel");
            }
        }
    };

    const handleFormHandler = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]:
                    e.target.type === "checkbox"
                        ? e.target.checked
                            ? "Yes"
                            : "No"
                        : e.target.value,
            };
        });
    };

    const handleChange = ({ fileList }) => {
        console.log(fileList);
        setFileList(fileList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    const renderPageContent = () => {
        switch (currentPage) {
            case 1:
                return (
                    <form>
                        <h1 className="flex justify-center mt-20 font-bold text-3xl">
                            General Details
                        </h1>
                        <div className="flex justify-center gap-16 mt-20 mx-16">
                            <input
                                type="text"
                                placeholder="Youth Hostel"
                                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                name="hostelName"
                                value={formData.hostelName}
                                onChange={handleFormHandler}
                            />
                            <select
                                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                name="hostelType"
                                value={formData.hostelType}
                                onChange={handleFormHandler}
                            >
                                <option>Select category</option>
                                <option>boys</option>
                                <option>girls</option>
                            </select>
                        </div>
                        <div className="flex justify-center gap-16 mt-20 mx-15">
                            <input
                                type="text"
                                placeholder="03169820534"
                                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                name="hostelContact"
                                value={formData.hostelContact}
                                onChange={handleFormHandler}
                            />
                            <input
                                type="text"
                                placeholder="Peshawar Hayatabad "
                                className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                name="hostelAddress"
                                value={formData.hostelAddress}
                                onChange={handleFormHandler}
                            />
                        </div>
                        <div>
                            <div className="flex flex-col items-center justify-center mt-20 text-xl font-serif">
                                <h1 className="">Hostel Pictures</h1>
                                <br />
                                <p className="mt-[-2rem]">(Select up to 5 pictures)</p>
                            </div>

                            <div class="md:flex md:flex-row flex flex-col items-center ml-[25rem]">
                                <div className="clearfix">
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                    >
                                        {fileList.length >= 5 ? null : (
                                            <div>
                                                <PlusOutlined />
                                                <div className="ant-upload-text">Upload</div>
                                            </div>
                                        )}
                                    </Upload>
                                    <Modal
                                        // visible={previewVisible}
                                        footer={null}
                                        onCancel={handleCancel}
                                    >
                                        <img
                                            alt="example"
                                            style={{ width: "100%" }}
                                            src={previewImage}
                                        />
                                    </Modal>
                                </div>
                            </div>

                            <div>
                                <h1 className="flex justify-center font-serif text-3xl">
                                    Account Setup
                                </h1>
                                <div className="flex justify-center gap-16 mt-10">
                                    <input
                                        type="text"
                                        placeholder="walid Shinware"
                                        className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                        name="accountName"
                                        value={formData.accountName}
                                        onChange={handleFormHandler}
                                    />
                                    <input
                                        type="text"
                                        placeholder="03179820434"
                                        className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleFormHandler}
                                    />
                                </div>
                                <div className="flex justify-center gap-16 mt-10">
                                    <input
                                        type="text"
                                        placeholder="walidshinwari@gmail.com"
                                        className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                        name="accountEmail"
                                        value={formData.accountEmail}
                                        onChange={handleFormHandler}
                                    />
                                    <input
                                        type="text"
                                        placeholder="************"
                                        className="border border-gray-300 w-80 font-serif py-3 pl-2 rounded-lg"
                                        name="accountPass"
                                        value={formData.accountPass}
                                        onChange={handleFormHandler}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mx-72 mt-10 font-serif mb-36 text-[#2991DC]">
                            <button disabled onClick={goToPreviousPage}>
                                Previous
                            </button>
                            <button type="button" onClick={goToNextPageOrSubmit}>
                                Next
                            </button>
                        </div>
                    </form>
                );
            case 2:
                return (
                    <div>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="mt-20 font-bold text-3xl">
                                Hostel Specifications
                            </h1>
                            <h2 className="mt-10 font-serif">Rent and Area</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-y-10 gap-x-32 mx-10 mt-10">
                            <input
                                type="text"
                                placeholder="Rent Per Month"
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="rent"
                                value={formData.rent}
                                onChange={handleFormHandler}
                            />
                            <select
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="rentPeriod"
                                value={formData.rentPeriod}
                                onChange={handleFormHandler}
                            >
                                <option>Rent Period</option>
                                <option>Anually</option>
                                <option>Monthly</option>
                            </select>
                            <select
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="bills"
                                value={formData.bills}
                                onChange={handleFormHandler}
                            >
                                <option>Bills Include</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <select
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="condition"
                                value={formData.condition}
                                onChange={handleFormHandler}
                            >
                                <option>Condition</option>
                                <option>Furnished</option>
                                <option>Unfurnished</option>
                            </select>
                            <select
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="floor"
                                value={formData.floor}
                                onChange={handleFormHandler}
                            >
                                <option>Select Floor</option>
                                <option>Basement</option>
                                <option>Ground floor</option>
                                <option>1st floor</option>
                                <option>2nd floor</option>
                            </select>
                            <select
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="bathroom"
                                value={formData.bathroom}
                                onChange={handleFormHandler}
                            >
                                <option>Bathroom</option>
                                <option>Attached</option>
                                <option>NotAttached</option>
                            </select>
                            <select
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="mess"
                                value={formData.mess}
                                onChange={handleFormHandler}
                            >
                                <option>Mess</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <select
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="lawn"
                                value={formData.lawn}
                                onChange={handleFormHandler}
                            >
                                <option>Lawn</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                            <input
                                type="text"
                                placeholder="No of rooms"
                                className="border border-gray-300 w-48 font-serif py-3 pl-2 rounded-lg"
                                name="numberOfRooms"
                                value={formData.numberOfRooms}
                                onChange={handleFormHandler}
                            />
                        </div>
                        <div className="flex justify-between mx-72 mt-10 font-serif mb-36 text-[#2991DC]">
                            <button onClick={goToPreviousPage}>Previous</button>
                            <button type="button" onClick={goToNextPageOrSubmit}>
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="mt-20 font-bold text-3xl">Hostel Facilities</h1>
                            <h2 className="mt-10 font-serif">Facilities</h2>
                        </div>
                        <div className="grid grid-cols-3 mx-40 gap-x-32 justify-center items-center">
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="parking"
                                    checked={formData.parking}
                                    onChange={handleFormHandler}
                                />
                                <img src="/Carpool.png" className="w-5 h-10" />
                                <label className="font-serif">Parking</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="geyser"
                                    checked={formData.geyser}
                                    onChange={handleFormHandler}
                                />
                                <img src="/Springs.png" className="w-5 h-10" />
                                <label className="font-serif">Geyser</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="securityGuard"
                                    checked={formData.securityGuard}
                                    onChange={handleFormHandler}
                                />
                                <img src="/Officer.png" className="w-5 h-10" />
                                <label className="font-serif">Security Guard</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="studyRoom"
                                    checked={formData.studyRoom}
                                    onChange={handleFormHandler}
                                />
                                <img src="/Reading.png" className="w-5 h-10" />
                                <label className="font-serif">Study Room</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="gym"
                                    checked={formData.gym}
                                    onChange={handleFormHandler}
                                />
                                <img src="/gym.png" className="w-5 h-10" />
                                <label className="font-serif">Gym</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="cctv"
                                    checked={formData.cctv}
                                    onChange={handleFormHandler}
                                />
                                <img src="/Camera.png" className="w-5 h-10" />
                                <label className="font-serif">CCTV Cameras</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="wifi"
                                    checked={formData.wifi}
                                    onChange={handleFormHandler}
                                />
                                <img src="/Wi-Fi.png" className="w-5 h-10" />
                                <label className="font-serif">Wi-Fi</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="laundary"
                                    checked={formData.laundary}
                                    onChange={handleFormHandler}
                                />
                                <img src="/Machine.png" className="w-5 h-10" />
                                <label className="font-serif">Laundary</label>
                            </div>
                            <div className="flex justify-center items-center gap-x-2">
                                <input
                                    type="checkbox"
                                    name="mineralWater"
                                    checked={formData.mineralWater}
                                    onChange={handleFormHandler}
                                />
                                {/* <img src="Carpool.png" className="w-5 h-10" /> */}
                                <label className="font-serif">Mineral Water</label>
                            </div>
                        </div>
                        <div className="flex justify-between mx-72 mt-10 font-serif mb-36">
                            <button onClick={goToPreviousPage} className="text-[#2991DC]">
                                Previous
                            </button>
                            <button
                                onClick={goToNextPageOrSubmit}
                                className="bg-[#2991DC] text-white rounded-lg py-2 px-6"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return <div>{renderPageContent()}</div>;
};

export default AdminPostHostel;
