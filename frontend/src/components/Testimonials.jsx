import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { io } from "socket.io-client";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/api/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        console.error("Error fetching testimonials", err);
        setTestimonials([
          {
            _id: "1",
            name: "Alex Rivers",
            position: "CEO",
            company: "TechFlow",
            message:
              "Their work is absolutely mind-blowing. The animations are so smooth and the attention to detail is unmatched.",
            image: "https://i.pravatar.cc/150?u=1",
          },
          {
            _id: "2",
            name: "Sarah Chen",
            position: "CTO",
            company: "Neuralis",
            message:
              "Defied all our expectations. The cinematic storytelling approach changed how we think about web apps.",
            image: "https://i.pravatar.cc/150?u=2",
          },
          {
            _id: "3",
            name: "John Doe",
            position: "Founder",
            company: "Nova",
            message: "Best agency in the game. Period.",
            image: "https://i.pravatar.cc/150?u=3",
          },
        ]);
      }
    };

    fetchTestimonials();

    // Use relative connection so Vite proxy (`/socket.io`) forwards to backend
    const socket = io();
    socket.on("testimonialAdded", (newTestimonial) => {
      setTestimonials((prev) => [newTestimonial, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  if (testimonials.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24">
          <span className="text-cyber-teal font-display font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
            Client Verdict
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.95] max-w-2xl">
            Voices from <span className="text-gradient">THE VOID</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card rounded-[48px] p-12 md:p-32 text-left relative overflow-hidden"
            >
              {/* Massive Quote Decor */}
              <Quote className="absolute -top-10 -right-10 w-64 h-64 text-cyber-teal/5 rotate-12" />

              <p className="text-2xl md:text-4xl font-display font-light leading-tight mb-16 tracking-tight relative z-10">
                "{testimonials[currentIndex].message}"
              </p>

              <div className="flex items-center space-x-8 relative z-10">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-2xl object-cover grayscale brightness-125 border border-white/10"
                />
                <div>
                  <h4 className="text-2xl font-display font-bold mb-1 tracking-tight">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-cyber-teal text-xs font-display font-bold tracking-[0.2em] uppercase">
                    {testimonials[currentIndex].position} //{" "}
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls - Floating Right */}
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 flex flex-col space-y-4">
            <button
              onClick={prev}
              className="p-5 rounded-2xl luxury-card hover:bg-cyber-teal hover:text-cyber-black transition-all duration-500 text-cyber-teal group"
            >
              <ChevronLeft
                size={28}
                className="group-hover:scale-125 transition-transform"
              />
            </button>
            <button
              onClick={next}
              className="p-5 rounded-2xl luxury-card hover:bg-cyber-teal hover:text-cyber-black transition-all duration-500 text-cyber-teal group"
            >
              <ChevronRight
                size={28}
                className="group-hover:scale-125 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
