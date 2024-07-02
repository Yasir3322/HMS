const Router = require("express");
const {
  bookYourRoom,
  getAllUser,
  getUserRoom,
  deleteUser,
} = require("../controllers/bookYourRoom.controllers");
const { verifyToken } = require("../middleware/authenticate");
const router = Router();

router.route("/").post(verifyToken, bookYourRoom).get(getAllUser);
router.route("/userroom").get(verifyToken, getUserRoom).delete(deleteUser);

module.exports = router;
