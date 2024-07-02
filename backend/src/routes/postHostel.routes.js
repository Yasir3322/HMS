const Router = require("express");
const {
  createHostel,
  getAllHostels,
  getHostel,
  updateHostelStatus
} = require("../controllers/postHostel.controllers.js");
const upload = require("../middleware/multer.middleware.js");
const { verifyToken } = require("../middleware/authenticate.js");
const router = Router();

router.route("/").get(getAllHostels).post(verifyToken, upload.array('images'), createHostel);
router.route("/:id").get(getHostel);
router.route("/:id/status").patch(updateHostelStatus);
module.exports = router;
