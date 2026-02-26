import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post("/api/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-cyber-teal font-display font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
              Deployment
            </span>
            <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.9] mb-12 tracking-tighter">
              READY TO <br />
              <span className="text-gradient">LAUNCH?</span>
            </h2>
            <p className="text-xl opacity-50 mb-16 leading-relaxed font-light max-w-lg">
              Have a visionary project in mind? Let's build something that
              defies gravity together. Our team is ready for the next orbit.
            </p>

            <div className="space-y-12">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-3xl luxury-card flex items-center justify-center text-cyber-teal shadow-xl shadow-cyber-teal/5">
                  <Send size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] opacity-30 mb-1">
                    Direct Channel
                  </p>
                  <p className="text-2xl font-display font-bold tracking-tight">
                    hello@triostack.tech
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="luxury-card rounded-[64px] p-12 md:p-20 relative overflow-hidden group">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-teal/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-24 h-24 bg-cyber-teal/10 text-cyber-teal rounded-full flex items-center justify-center mb-10 shadow-inner">
                    <CheckCircle size={56} strokeWidth={1} />
                  </div>
                  <h4 className="text-4xl font-display font-black mb-4 tracking-tight">
                    TRANSMISSION COMPLETE
                  </h4>
                  <p className="opacity-40 mb-12 text-lg font-light">
                    We've received your coordinates and will respond shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-cyber-teal font-bold tracking-widest uppercase text-xs hover:tracking-[0.3em] transition-all"
                  >
                    Send another signal
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] tracking-[0.4em] font-bold opacity-30 uppercase ml-1">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/5 border-b border-white/10 px-1 py-4 focus:outline-none focus:border-cyber-teal transition-all  placeholder:opacity-20 text-lg"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] tracking-[0.4em] font-bold opacity-30 uppercase ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@orbit.com"
                        className="w-full bg-white/5 border-b border-white/10 px-1 py-4 focus:outline-none focus:border-cyber-teal transition-all bg-transparent placeholder:opacity-20 text-lg"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] tracking-[0.4em] font-bold opacity-30 uppercase ml-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Mission Proposal"
                      className="w-full bg-white/5 border-b border-white/10 px-1 py-4 focus:outline-none focus:border-cyber-teal transition-all bg-transparent placeholder:opacity-20 text-lg"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] tracking-[0.4em] font-bold opacity-30 uppercase ml-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Detail your vision..."
                      className="w-full bg-white/5 border-b border-white/10 px-1 py-4 focus:outline-none focus:border-cyber-teal transition-all bg-transparent resize-none placeholder:opacity-20 text-lg"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <button
                    disabled={status === "sending"}
                    className="w-full py-6 bg-cyber-teal text-cyber-black font-black text-xs tracking-[0.3em] uppercase rounded-2xl hover:shadow-[0_20px_40px_rgba(0,242,255,0.2)] hover:-translate-y-1 transition-all disabled:opacity-50"
                  >
                    {status === "sending"
                      ? "TRANSMITTING..."
                      : "INITIATE CONTACT"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-[10px] tracking-widest uppercase text-center">
                      Transmission failed. Check connection.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
