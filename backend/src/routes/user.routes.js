const Router = require("express");
const { registerUser, loginUser, getUser, getUserBooking, updateUser, uploadImage, removeImage } = require("../controllers/user.controllers");
const { verifyToken } = require("../middleware/authenticate");
const upload = require("../middleware/multer.middleware");
const router = Router();

router.route("/register").post(registerUser);
router.route("/getbookinginfo").get(verifyToken, getUserBooking);
router.route("/").post(loginUser).get(verifyToken, getUser).patch(verifyToken, updateUser);
router.route('/uploadimg').patch(verifyToken, upload.single('images'), uploadImage)
router.route('/removeimg').patch(verifyToken, removeImage)
module.exports = router;
