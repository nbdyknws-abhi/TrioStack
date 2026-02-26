import React from "react";
import { motion } from "framer-motion";
import {
  useScrollReveal,
  useFloat,
  useParallax,
} from "../animations/animations";

const About = () => {
  const revealRef = useScrollReveal({ y: 50 });
  const imageParallax = useParallax({ speedX: 0, speedY: 40 });
  const rocketRef = useFloat({ distance: 25, duration: 2.5 });

  const timeline = [
    {
      year: "2020",
      title: "The Big Bang",
      desc: "Started as a small collective of 3 visionaries.",
    },
    {
      year: "2022",
      title: "Orbit Reached",
      desc: "Expanded to 15+ developers and designers globally.",
    },
    {
      year: "2024",
      title: "Deep Space",
      desc: "Launching high-end cinematic web experiences for Fortune 500s.",
    },
  ];

  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div
          ref={revealRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
        >
          {/* Text Content */}
          <div className="space-y-12">
            <div>
              <span className="text-cyber-teal font-display font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
                The Architects
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.95] mb-8">
                Pioneering the <br />
                <span className="text-gradient">NEW FRONTIER</span>
              </h2>
            </div>

            <p className="text-lg md:text-xl opacity-60 leading-relaxed font-light max-w-xl">
              Antigravity is not just a dev shop. We are a digital laboratory
              where physics-defying interfaces meet rock-solid engineering. Our
              mission is to erase the line between the virtual and the visceral.
            </p>

            <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-12">
              {[
                { label: "Uptime", value: "99.9%" },
                { label: "Experience", value: "8+ Yrs" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-display font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase opacity-40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              ref={rocketRef}
              className="aspect-square rounded-3xl overflow-hidden glass-morphism p-2 rotate-3"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyber-teal/20 to-neon-amber/20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-64 h-64 border-2 border-dashed border-cyber-teal/30 rounded-full flex items-center justify-center"
                >
                  <RocketIcon />
                </motion.div>
              </div>
            </motion.div>
            {/* Absolute decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyber-teal/10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RocketIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyber-teal opacity-40"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="m9 12 2.5 2.5" />
    <path d="M12 22v-5l-2-2" />
    <path d="M17 17h5l-2-2" />
  </svg>
);

export default About;
