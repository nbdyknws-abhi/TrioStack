const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.post(
  "/",
  auth,
  upload.single("imageFile"),
  projectController.createProject,
);
router.put(
  "/:id",
  auth,
  upload.single("imageFile"),
  projectController.updateProject,
);
router.delete("/:id", auth, projectController.deleteProject);

module.exports = router;
