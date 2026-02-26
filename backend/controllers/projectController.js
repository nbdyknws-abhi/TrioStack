const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;
    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    // Convert technologies string to array if it's coming from FormData
    if (typeof projectData.technologies === "string") {
      projectData.technologies = projectData.technologies
        .split(",")
        .map((t) => t.trim());
    }

    const project = new Project(projectData);
    const savedProject = await project.save();

    // Notify frontend via Socket.io
    const io = req.app.get("socketio");
    if (io) io.emit("projectAdded", savedProject);

    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (typeof updateData.technologies === "string") {
      updateData.technologies = updateData.technologies
        .split(",")
        .map((t) => t.trim());
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
