import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  LayoutDashboard,
  FolderPlus,
  MessageSquare,
  List,
  LogOut,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";

const Dashboard = () => {
  const { logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    technologies: "",
    github: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const fetchData = async () => {
    try {
      const projRes = await axios.get("/api/projects");
      setProjects(projRes.data);
      const msgRes = await axios.get("/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(msgRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("category", newProject.category);
      formData.append("description", newProject.description);
      formData.append("technologies", newProject.technologies);
      formData.append("github", newProject.github);
      formData.append("link", newProject.link);
      formData.append("image", newProject.image);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      if (editMode) {
        await axios.put(`/api/projects/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("/api/projects", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      resetModal();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditingId(null);
    setImageFile(null);
    setNewProject({
      title: "",
      category: "",
      description: "",
      image: "",
      technologies: "",
      github: "",
      link: "",
    });
  };

  const handleEdit = (proj) => {
    setNewProject({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      image: proj.image,
      technologies: proj.technologies.join(", "),
      github: proj.github || "",
      link: proj.link || "",
    });
    setEditingId(proj._id);
    setEditMode(true);
    setShowModal(true);
  };

  const toggleMessage = async (msg) => {
    if (expandedMessageId === msg._id) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(msg._id);
      if (!msg.isRead) {
        try {
          await axios.put(
            `/api/contact/${msg._id}/read`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          // Update local state to reflect read status
          setMessages(
            messages.map((m) =>
              m._id === msg._id ? { ...m, isRead: true } : m,
            ),
          );
        } catch (err) {
          console.error("Failed to mark as read:", err);
        }
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      try {
        await axios.delete(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cyber-darker flex text-white">
      {/* Sidebar */}
      <aside className="w-64 glass-morphism border-r border-white/10 p-8 flex flex-col">
        <div className="mb-12">
          <h2 className="text-xl font-display font-bold text-gradient">
            ADMIN CENTER
          </h2>
        </div>

        <nav className="flex-1 space-y-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-colors ${activeTab === "projects" ? "bg-cyber-teal text-cyber-black font-bold" : "hover:bg-white/5"}`}
          >
            <List size={20} />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-colors ${activeTab === "messages" ? "bg-cyber-teal text-cyber-black font-bold" : "hover:bg-white/5"}`}
          >
            <MessageSquare size={20} />
            <span>Messages</span>
          </button>
        </nav>

        <button
          onClick={logout}
          className="flex items-center space-x-3 p-4 hover:text-cyber-teal transition-colors mt-auto opacity-50 hover:opacity-100"
        >
          <LogOut size={20} />
          <span>Exit System</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-display font-bold capitalize">
            {activeTab}
          </h1>
          {activeTab === "projects" && (
            <button
              onClick={() => {
                resetModal();
                setShowModal(true);
              }}
              className="bg-cyber-teal text-cyber-black px-6 py-3 rounded-xl font-bold flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Project</span>
            </button>
          )}
        </div>

        {activeTab === "projects" && (
          <div className="grid gap-6">
            {projects.map((proj) => (
              <div
                key={proj._id}
                className="glass-morphism p-6 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-20 h-20 object-cover rounded-xl bg-cyber-darker"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                  <div>
                    <h4 className="text-lg font-bold">{proj.title}</h4>
                    <p className="text-sm opacity-40 uppercase tracking-widest">
                      {proj.category}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(proj)}
                    className="text-cyber-teal p-3 hover:bg-cyber-teal/10 rounded-xl transition-colors font-bold text-sm"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="text-red-500 p-3 hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="grid gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`glass-morphism p-6 rounded-2xl border-l-4 transition-all duration-500 overflow-hidden ${msg.isRead ? "border-white/5" : "border-cyber-teal"} ${expandedMessageId === msg._id ? "ring-2 ring-cyber-teal/20 bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)]" : "hover:bg-white/5 shadow-lg hover:shadow-cyber-teal/5"}`}
              >
                <div
                  className="flex justify-between mb-2 cursor-pointer"
                  onClick={() => toggleMessage(msg)}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${msg.isRead ? "border-white/10 text-white/20" : "border-cyber-teal/30 text-cyber-teal"}`}
                    >
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <h4
                        className={`font-display font-bold transition-colors ${msg.isRead ? "text-white/70" : "text-white"}`}
                      >
                        {msg.subject || "Mission Inquiry"}
                      </h4>
                      {!msg.isRead && (
                        <span className="text-[10px] text-cyber-teal font-bold uppercase tracking-widest flex items-center mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal mr-2 animate-pulse"></span>
                          Encrypted Message
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs opacity-40">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                    {expandedMessageId === msg._id ? (
                      <ChevronUp size={16} className="text-cyber-teal" />
                    ) : (
                      <ChevronDown size={16} className="opacity-40" />
                    )}
                  </div>
                </div>

                {expandedMessageId === msg._id && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="uppercase tracking-[0.2em] opacity-40 font-bold mb-1">
                          From
                        </p>
                        <p className="font-bold">{msg.name}</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.2em] opacity-40 font-bold mb-1">
                          Email
                        </p>
                        <p className="opacity-60">{msg.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">
                        Message Content
                      </p>
                      <div className="bg-cyber-black/40 rounded-xl p-5 border border-white/5">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words opacity-80">
                          {msg.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <a
                        href={`mailto:${msg.email}?subject=Reply to your message: ${msg.subject || "Portfolio Inquiry"}`}
                        className="bg-cyber-teal text-cyber-black px-6 py-2 rounded-xl font-bold flex items-center space-x-2 text-sm hover:shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all"
                      >
                        <Mail size={16} />
                        <span>Reply via Email</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl glass-morphism rounded-3xl p-10 border border-cyber-teal/20 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-display font-bold mb-8 text-gradient">
              {editMode ? "Recalibrate Mission" : "Add New Mission"}
            </h2>
            <form onSubmit={handleAddSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] font-bold opacity-40 uppercase">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-teal transition-colors"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] font-bold opacity-40 uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-teal transition-colors"
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject({ ...newProject, category: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] font-bold opacity-40 uppercase">
                    Github URL
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-teal transition-colors"
                    value={newProject.github}
                    onChange={(e) =>
                      setNewProject({ ...newProject, github: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] font-bold opacity-40 uppercase">
                    Live Link
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-teal transition-colors"
                    value={newProject.link}
                    onChange={(e) =>
                      setNewProject({ ...newProject, link: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4 p-6 border border-white/10 rounded-2xl bg-white/5">
                <label className="text-xs tracking-[0.2em] font-bold opacity-40 uppercase block mb-4">
                  Project Image
                </label>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] opacity-40 uppercase">
                      Option 1: Upload File
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-xs"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] opacity-40 uppercase">
                      Option 2: Image URL
                    </span>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyber-teal transition-colors"
                      value={newProject.image}
                      onChange={(e) =>
                        setNewProject({ ...newProject, image: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] font-bold opacity-40 uppercase">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, GSAP, Node.js"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-teal transition-colors"
                  value={newProject.technologies}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      technologies: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] font-bold opacity-40 uppercase">
                  Description
                </label>
                <textarea
                  required
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyber-teal transition-colors resize-none"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={resetModal}
                  className="flex-1 py-4 glass-morphism font-bold rounded-xl hover:bg-white/5 transition-all text-white/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-cyber-teal text-cyber-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all"
                >
                  {editMode ? "Update Mission" : "Launch Mission"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
