import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-darker px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-morphism rounded-3xl p-10 border border-cyber-teal/20"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-cyber-teal/10 text-cyber-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-display font-bold">Admin Portal</h2>
          <p className="opacity-40 mt-2 uppercase tracking-widest text-xs font-bold">
            Secure Access Required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-teal/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyber-teal transition-colors"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-teal/40"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyber-teal transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-xl text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button className="w-full py-4 bg-cyber-teal text-cyber-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all">
            Unlock Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
