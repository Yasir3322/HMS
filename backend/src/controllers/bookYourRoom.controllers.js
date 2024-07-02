const BookYourRoom = require("../models/bookYourRoom.model.js");

const bookYourRoom = async (req, res) => {

  const { id } = req.user;

  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      city,
      state,
      roomType,
      roomNo,
      joiningDate,
      vacateDate,
      paymentMethod,
      hostelId
    } = req.body;
    const bookRoom = await BookYourRoom.create({
      firstName,
      lastName,
      email,
      phoneNo,
      city,
      state,
      roomType,
      roomNo,
      joiningDate,
      vacateDate,
      paymentMethod,
      hostelId,
      userId: id
    });
    return res.status(201).json({ bookRoom });
  } catch (error) {
    console.log("Error while Searching Hostel", error);
    return res.status(501).json({ error: "Internal Server error" });
  }
};

const getAllUser = async (req, res) => {
  const getAllUser = await BookYourRoom.find({});
  return res.status(201).json({ getAllUser });
};

const getUserRoom = async (req, res) => {


  const { id } = req.user;
  try {
    const userId = id;
    const room = await BookYourRoom.findOne({ userId });
    if (!room) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(room);
  } catch (error) {
    console.log("Error while updating user", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await BookYourRoom.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error while deleting user", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { bookYourRoom, getAllUser, getUserRoom, deleteUser };
