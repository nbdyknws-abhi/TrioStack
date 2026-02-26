import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../animations/animations";
import { ExternalLink, Github } from "lucide-react";
import { io } from "socket.io-client";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const revealRef = useScrollReveal({ y: 50 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        const data = res.data;
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching projects", err);
        setProjects([
          {
            _id: "1",
            title: "Cyber Portal",
            category: "Web App",
            image:
              "https://images.unsplash.com/photo-1614850523296-e8c041de8c2b?auto=format&fit=crop&q=80&w=800",
            description:
              "A futuristic web application portal with biometric integration and neural networking.",
            technologies: ["React", "GSAP", "Three.js"],
            github: "#",
            link: "#",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Use relative connection so Vite proxy (`/socket.io`) forwards to backend
    const socket = io();
    socket.on("projectAdded", (newProject) => {
      setProjects((prev) => [newProject, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen relative">
      <div className="container mx-auto px-6">
        <div ref={revealRef} className="mb-32">
          <span className="text-cyber-teal font-display font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
            Our Missions
          </span>
          <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter">
            DEEP SPACE <br />
            <span className="text-gradient">ARCHIVES</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-32 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={cardVariants}
                style={{
                  top: `calc(15vh + ${index * 24}px)`,
                }}
                whileHover={{
                  scale: 0.99,
                  transition: { duration: 0.5 },
                }}
                className=" shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group relative h-[500px] md:h-[700px] rounded-[64px] overflow-hidden luxury-card border border-white/5 hover:border-cyber-teal/30 transition-all duration-700 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/1200x800?text=System+Ready";
                  }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="text-cyber-teal text-sm font-display font-bold tracking-[0.3em] uppercase mb-4 block opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.category}
                    </span>
                    <h4 className="text-4xl md:text-6xl font-display font-black mb-8 leading-tight tracking-tight">
                      {project.title}
                    </h4>

                    <div className="flex items-center space-x-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
                      <div className="px-8 py-4 bg-cyber-teal text-cyber-black font-black text-xs tracking-widest uppercase rounded-full shadow-xl shadow-cyber-teal/20">
                        View Mission
                      </div>
                      <div className="flex space-x-3">
                        {project.link && (
                          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                            <ExternalLink size={20} />
                          </div>
                        )}
                        {project.github && (
                          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                            <Github size={20} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-12 right-12 w-12 h-12 border-t-2 border-r-2 border-white/10 rounded-tr-3xl group-hover:border-cyber-teal/30 transition-colors"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl glass-morphism rounded-[40px] overflow-hidden border border-cyber-teal/20 flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyber-black/40"></div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-6 overflow-y-auto max-h-[70vh] md:max-h-none">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-cyber-teal text-xs font-bold tracking-[0.3em] uppercase mb-2 block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-white/40 hover:text-cyber-teal transition-colors text-2xl font-light font-sans"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-lg opacity-60 leading-relaxed font-light">
                  {selectedProject.description}
                </p>

                <div className="space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-cyber-teal opacity-80">
                    Tech Arsenal
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium opacity-80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto pt-8">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-4 bg-cyber-teal text-cyber-black text-center font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all"
                    >
                      VIEW MISSION
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-8 py-4 glass-morphism border border-white/10 font-bold rounded-2xl hover:bg-white/5 transition-all text-center"
                    >
                      SOURCE
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
