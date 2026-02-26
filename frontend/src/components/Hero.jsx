import React from "react";
import { motion } from "framer-motion";
import {
  useScrollReveal,
  useFloat,
  useParallax,
  useMagnetic,
} from "../animations/animations";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  const revealRef = useScrollReveal({ y: 100, duration: 1.5 });
  const orb1Ref = useFloat({ distance: 30, duration: 3 });
  const orb2Ref = useFloat({ distance: -40, duration: 4, delay: 0.5 });
  const contentRef = useParallax({ speedX: 30, speedY: 30 });
  const cta1Ref = useMagnetic({ pull: 0.3 });
  const cta2Ref = useMagnetic({ pull: 0.3 });

  const title = "CREATING DIGITAL GALAXY";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700">
      {/* Cinematic Mesh Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyber-teal/30 dark:bg-cyber-teal/30 rounded-full blur-[120px] animate-float-slow transition-colors"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-amber/20 dark:bg-neon-amber/20 rounded-full blur-[120px] animate-float-delayed transition-colors"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[150px] animate-pulse-slow transition-colors"></div>

        {/* Scanline Effect - Visible mostly in dark mode */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] pointer-events-none opacity-20 dark:opacity-20 transition-opacity"></div>
      </div>

      <div
        ref={revealRef}
        className="container mx-auto px-6 relative z-10 text-center pt-24 md:pt-0"
      >
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1 rounded-full glass-morphism text-cyber-teal text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6">
            Future-Ready Development
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black leading-[0.9] mb-8 tracking-tighter">
            {title.split(" ").map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-2 md:mr-6 last:mr-0 filter drop-shadow-[0_0_30px_rgba(0,242,255,0.3)] dark:drop-shadow-[0_0_30px_rgba(0,242,255,0.3)]"
              >
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: wordIdx * 0.2 + charIdx * 0.05,
                      ease: "easeOut",
                    }}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-xl opacity-70 mb-8 md:mb-12 font-light leading-relaxed">
            We are a creative collective of designers and developers building
            cinematic digital experiences that push the boundaries of gravity.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button
              ref={cta1Ref}
              onClick={() => scrollToSection("about")}
              className="px-10 py-4 bg-cyber-teal text-cyber-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] transition-all duration-300 flex items-center group cursor-pointer"
            >
              Start Your Journey
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              ref={cta2Ref}
              onClick={() => scrollToSection("projects")}
              className="px-10 py-4 glass-morphism font-bold rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-40 mb-2">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyber-teal to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
