import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagnetic } from "../animations/animations";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { admin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use hash anchors for in-page navigation (single-page portfolio)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "#about" },
    { name: "Services", path: "#services" },
    { name: "Projects", path: "#projects" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "py-4 glass-morphism backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20" : "py-6 bg-transparent"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Rocket className="text-cyber-teal w-8 h-8" />
          <span className="text-xl sm:text-2xl font-display font-bold tracking-tighter text-gradient">
            TRIOSTACK
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-sm font-medium hover:text-cyber-teal transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-2xl glass-morphism text-cyber-teal hover:scale-110 active:scale-95 transition-all duration-500 hover:rotate-12 group"
          >
            {theme === "dark" ? (
              <Sun
                size={20}
                className="group-hover:text-neon-amber transition-colors"
              />
            ) : (
              <Moon
                size={20}
                className="group-hover:text-blue-400 transition-colors"
              />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-cyber-teal">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-cyber-teal"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-morphism border-t border-white/10"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium hover:text-cyber-teal transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
