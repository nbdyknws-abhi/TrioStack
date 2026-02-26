import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../animations/animations";
import { Layout, Codepen, Globe, Cpu, Zap, Shield } from "lucide-react";

const services = [
  {
    icon: <Layout />,
    title: "UI/UX Vision",
    desc: "Cinematic designs that tell a story and engage users on an emotional level.",
  },
  {
    icon: <Globe />,
    title: "Web Galaxy",
    desc: "Scalable MERN applications built with high-performance architecture.",
  },
  {
    icon: <Cpu />,
    title: "AI Integration",
    desc: "Smarter workflows with custom AI models and neural network integrations.",
  },
  {
    icon: <Zap />,
    title: "Performance",
    desc: "Lightning fast load times and ultra-smooth motion-based interactions.",
  },
  {
    icon: <Shield />,
    title: "Security",
    desc: "Enterprise-grade security protocols to protect your digital assets.",
  },
  {
    icon: <Codepen />,
    title: "Custom R&D",
    desc: "Research and development for unique, never-before-seen tech solutions.",
  },
];

const Services = () => {
  const revealRef = useScrollReveal({ y: 50 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={revealRef} className="mb-24">
          <span className="text-cyber-teal font-display font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
            Capabilities
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.95] max-w-2xl">
            Surgical Solutions for{" "}
            <span className="text-gradient">THE NEW REGIME</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className="p-10 luxury-card rounded-[32px] transition-all duration-500 group relative overflow-hidden"
            >
              {/* Card Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-teal/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="w-16 h-16 bg-cyber-teal/10 rounded-2xl flex items-center justify-center text-cyber-teal mb-8 group-hover:scale-110 group-hover:bg-cyber-teal group-hover:text-cyber-black transition-all duration-500 shadow-lg shadow-cyber-teal/5">
                {React.cloneElement(service.icon, {
                  size: 32,
                  strokeWidth: 1.5,
                })}
              </div>
              <h4 className="text-2xl font-display font-bold mb-6 tracking-tight">
                {service.title}
              </h4>
              <p className="opacity-50 leading-relaxed text-base font-light">
                {service.desc}
              </p>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center text-xs tracking-[0.2em] uppercase text-cyber-teal opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                Dive Deeper <Zap size={12} className="ml-2" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-teal/5 blur-[150px] rounded-full"></div>
    </section>
  );
};

export default Services;
