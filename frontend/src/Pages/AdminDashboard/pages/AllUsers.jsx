// import React, { useEffect, useState } from "react";
// import setting from "../../../../public/Settings.png";
// import axios, { all } from "axios";

// const AllUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [activeRow, setActiveRow] = useState(null);

//   useEffect(() => {
//     const getAllUserInfo = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/bookyourroom"
//         );
//         setAllUsers(response.data.getAllUser);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getAllUserInfo();
//   }, []);

//   const handleSettingButton = (index) => {
//     setActiveRow(index);
//   };

//   const handleDeleteButton = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/bookyourroom/${userId}`);
//       setAllUsers(allUsers.filter((user) => user._id !== userId));
//       setActiveRow(null);
//     } catch (error) {
//       console.log("Error while deleting user", error);
//     }
//   };

//   const handleViewButton = async () => {
//     setActiveRow(null);
//   };

//   const formatDate = (dateString) => {
//     const options = { day: "2-digit", month: "2-digit", year: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-GB", options);
//   };

//   return (
//     <div className="w-full h-auto">
//       <table className=" w-full p-2 h-auto">
//         <thead className="h-20  font-serif border bg-[#4aa4d9] text-white">
//           <tr className="text-center">
//             <td>ID</td>
//             <td>Name</td>
//             <td>Email</td>
//             <td>Phone</td>
//             <td>City</td>
//             {activeRow === null && (
//               <>
//                 <td>State</td>
//                 <td>R-Type</td>
//                 <td>R-No</td>
//                 <td>J-Date</td>
//                 <td>V-Date</td>
//                 <td>Setting</td>
//               </>
//             )}
//             {activeRow !== null && (
//               <td colSpan="6" className="">
//                 Action
//               </td>
//             )}
//           </tr>
//         </thead>
//         <tbody className="">
//           {allUsers.map((allUser, index) => (
//             <tr className="text-center h-20 font-serif">
//               <td>{index + 1}</td>
//               <td>{allUser.firstName}</td>
//               <td>{allUser.email}</td>
//               <td>{allUser.phoneNo}</td>
//               <td>{allUser.city}</td>
//               {activeRow === index ? (
//                 <>
//                   <td colSpan="5" className=""></td>{" "}
//                   <td className="flex space-x-2 ml-40 pt-5">
//                     <button className="bg-[#4AA4D9] text-white px-3 py-1 rounded">
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDeleteButton(allUser._id)}
//                       className="bg-[#F85A50] text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={handleViewButton}
//                       className="bg-[#4AA4D9] text-white px-3 py-1 rounded"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{allUser.state}</td>
//                   <td>{allUser.roomType}</td>
//                   <td>{allUser.roomNo}</td>
//                   <td>{formatDate(allUser.joiningDate)}</td>
//                   <td>{formatDate(allUser.vacateDate)}</td>
//                   <td className="pl-8">
//                     <img
//                       src={setting}
//                       alt="setting"
//                       className="w-6 h-6 cursor-pointer"
//                       onClick={() => handleSettingButton(index)}
//                     />
//                   </td>
//                   <td></td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllUsers;

import React, { useEffect, useState } from "react";
import setting from "../../../../public/Settings.png";
import axios from "axios";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const getAllUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/bookyourroom"
      );
      setAllUsers(response.data.getAllUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserInfo();
  }, []);

  const handleSettingButton = (index) => {
    setActiveRow(index);
    setEditData(allUsers[index]);
    setEditMode(false);
  };

  const handleUpdateButton = () => {
    setEditMode(true);
  };

  const handleDeleteButton = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/bookyourroom/${userId}`);
      setAllUsers(allUsers.filter((user) => user._id !== userId));
      setActiveRow(null);
    } catch (error) {
      console.log("Error while deleting user", error);
    }
  };

  const handleViewButton = () => {
    setActiveRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveButton = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/bookyourroom/${editData._id}`,
        editData
      );
      setAllUsers(
        allUsers.map((user) =>
          user._id === editData._id ? response.data : user
        )
      );
      setActiveRow(null);
      setEditMode(false);
      getAllUserInfo();
    } catch (error) {
      console.log("Error while updating user", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="w-full h-auto">
      <table className=" w-full p-2 h-auto">
        <thead className="h-20  font-serif border bg-[#4aa4d9] text-white dark:bg-gray-700">
          <tr className="text-center">
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>City</td>
            {activeRow === null && (
              <>
                <td>State</td>
                <td>R-Type</td>
                <td>R-No</td>
                <td>J-Date</td>
                <td>V-Date</td>
                <td>Setting</td>
              </>
            )}
            {activeRow !== null && (
              <td colSpan="6" className="">
                Action
              </td>
            )}
          </tr>
        </thead>
        <tbody className="">
          {allUsers.map((allUser, index) => (
            <tr className="text-center h-20 font-serif" key={allUser._id}>
              <td>{index + 1}</td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.firstName
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.email
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="phoneNo"
                    value={editData.phoneNo}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.phoneNo
                )}
              </td>
              <td>
                {activeRow === index && editMode ? (
                  <input
                    type="text"
                    name="city"
                    value={editData.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  allUser.city
                )}
              </td>
              {activeRow === index ? (
                <>
                  <td colSpan="5" className=""></td>
                  <td className="flex space-x-2 mr-48 pt-5">
                    {editMode ? (
                      <button
                        onClick={handleSaveButton}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={handleUpdateButton}
                        className="bg-[#4AA4D9] text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteButton(allUser._id)}
                      className="bg-[#F85A50] text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleViewButton}
                      className="bg-[#4AA4D9] text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{allUser.state}</td>
                  <td>{allUser.roomType}</td>
                  <td>{allUser.roomNo}</td>
                  <td>{formatDate(allUser.joiningDate)}</td>
                  <td>{formatDate(allUser.vacateDate)}</td>
                  <td className="pl-8">
                    <img
                      src={setting}
                      alt="setting"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleSettingButton(index)}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
