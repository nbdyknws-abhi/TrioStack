import React from "react";
import { Rocket, Twitter, Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Rocket className="text-cyber-teal w-10 h-10" />
              <span className="text-3xl font-display font-bold tracking-tighter text-gradient">
                TRIOSTACK
              </span>
            </div>
            <p className="max-w-md opacity-40 mb-8 leading-relaxed">
              Leading the digital frontier with cinematic experiences and
              future-ready technology. We build the universes others only dream
              of.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-cyber-teal hover:bg-cyber-teal hover:text-cyber-black transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Orbit</h4>
            <ul className="space-y-4 opacity-50">
              <li>
                <a
                  href="#about"
                  className="hover:text-cyber-teal transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-cyber-teal transition-colors"
                >
                  Capabilities
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-cyber-teal transition-colors"
                >
                  Missions
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-cyber-teal transition-colors"
                >
                  Launch Pad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 opacity-50">
              <li>Deep Space 9, Digital Universe</li>
              <li>hello@antigravity.dev</li>
              <li>+1 (555) NEON-ANTIGRAVITY</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-30 text-xs tracking-widest uppercase">
          <p>© 2026 TRIOSTACK TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
