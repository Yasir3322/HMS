import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TotalHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  const getHostel = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/postHostel"
      );
      setHostels(response.data.hostels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHostel();
  }, []);

  const handleDeleteButton = async (hostelId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/postHostel/${hostelId}`);
      setHostels(hostels.filter((hostel) => hostel._id !== hostelId));
      setActiveRow(null);
    } catch (error) {
      console.log("Error while deleting hostel", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleUpdateButton = (index) => {
    setEditMode(true);
    setActiveRow(index);
    setEditData(hostels[index]);
  };

  const handleSaveButton = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/postHostel/${editData._id}`,
        editData
      );
      setHostels(
        hostels.map((hostel) =>
          hostel._id === editData._id ? response.data : hostel
        )
      );
      setActiveRow(null);
      setEditMode(false);
      getHostel();
    } catch (error) {
      console.log("Error while updating user", error);
    }
  };

  const handleViewButton = (hostelId) => {
    navigate("/AdminDashboard/hostelgeneraldetails");
  };

  return (
    <div className="w-full h-auto">
      <table className=" w-full p-2 h-auto">
        <thead className="h-16  font-serif border bg-[#EAF4FC]">
          <tr className="">
            <td>ID</td>
            <td>Hostel Name</td>
            <td>Location</td>
            <td>Active/Deative</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {hostels.map((hostel, index) => (
            <tr key={hostel._id} className="border h-16 font-serif">
              <td>{index + 1}</td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="hostelName"
                    value={editData.hostelName}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.hostelName
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="hostelAddress"
                    value={editData.hostelAddress}
                    onChange={handleInputChange}
                  />
                ) : (
                  hostel.hostelAddress
                )}
              </td>
              <td>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    defaultChecked={true}
                  />
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </td>
              {editMode ? (
                <button
                  onClick={handleSaveButton}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-lg mt-4"
                >
                  Save
                </button>
              ) : (
                <td className="space-x-2">
                  <button
                    onClick={() => handleUpdateButton(index)}
                    className="bg-[#4AA4D9] py-1 px-4 text-white rounded-lg "
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteButton(hostel._id)}
                    className="bg-[#F85A50] py-1 px-4 text-white rounded-lg "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleViewButton(hostel._id)}
                    className="bg-[#4AA4D9] py-1 px-6 text-white rounded-lg "
                  >
                    View
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalHostels;
