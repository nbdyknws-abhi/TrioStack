const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.post("/", contactController.submitMessage);
router.get("/", auth, contactController.getMessages);
router.put("/:id/read", auth, contactController.markAsRead);

module.exports = router;
