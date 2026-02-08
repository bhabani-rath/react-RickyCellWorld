import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash, HiOutlineExclamationCircle, HiOutlineShieldCheck, HiOutlineBuildingStorefront, HiOutlineFingerPrint, HiArrowRight } from "react-icons/hi2";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
};

const errorVariants = {
  hidden: { opacity: 0, height: 0, scale: 0.95 },
  show: { 
    opacity: 1, 
    height: "auto", 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  shake: {
    x: [0, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 }
  }
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useInventory();
  
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      // Determine the correct redirect path based on role
      let defaultPath = "/admin";
      if (user.role === "SUPERADMIN") {
        defaultPath = "/superadmin";
      } else if (user.role === "STORE_MANAGER") {
        defaultPath = "/store-manager";
      }
      const from = location.state?.from?.pathname || defaultPath;
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Elegant delay
      
      const result = login(formData.username, formData.password);
      if (!result.success) {
        setError(result.message);
      } else if (result.redirectTo) {
        navigate(result.redirectTo, { replace: true });
      }
    } catch (err) {
      setError("Authentication service unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on type
  };

  const fillDemoCreds = (username, password, type) => {
    setActiveDemo(type);
    setFormData({ username, password });
    setError("");
    // Subtle haptic feedback effect could go here
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Ambient Background Effects (keeping slate tones) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo Mark */}
        <motion.div 
          className="flex justify-center"
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-14 h-14 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/20 flex items-center justify-center mb-6 ring-1 ring-white/50">
            <HiOutlineBuildingStorefront className="w-7 h-7 text-white" />
          </div>
        </motion.div>
        
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Sign in to access the Inventory Command Center
        </p>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl shadow-slate-900/5 sm:rounded-2xl sm:px-10 border border-white/50 ring-1 ring-slate-900/5"
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username Field */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineUser className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 sm:text-sm bg-slate-50/50 hover:bg-white"
                  placeholder="Enter your username"
                />
              </div>
            </motion.div>

            {/* Password Field with Toggle */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 sm:text-sm bg-slate-50/50 hover:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <HiOutlineEyeSlash className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                </button>
              </div>
            </motion.div>

            {/* Error Message with Animation */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  variants={errorVariants}
                  initial="hidden"
                  animate={["show", "shake"]}
                  exit="hidden"
                  className="rounded-xl bg-red-50/80 backdrop-blur border border-red-100 p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <HiOutlineExclamationCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-red-900">
                        Authentication Failed
                      </h3>
                      <p className="text-xs text-red-700 mt-1 leading-relaxed">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-slate-900/10 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
              >
                {isLoading ? (
                  <motion.span 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign in 
                    <HiArrowRight className="w-4 h-4" />
                  </span>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Demo Credentials Section */}
          <motion.div variants={itemVariants} className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white/80 text-slate-500 font-medium uppercase tracking-wider">
                  Quick Access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { user: "admin", pass: "12345", role: "Admin", icon: HiOutlineShieldCheck, color: "bg-slate-100 hover:bg-slate-200 border-slate-200" },
                { user: "manager", pass: "12345", role: "Manager", icon: HiOutlineUser, color: "bg-slate-100 hover:bg-slate-200 border-slate-200" },
                { user: "superadmin", pass: "12345", role: "Superadmin", icon: HiOutlineFingerPrint, color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900" }
              ].map((demo) => (
                <motion.button
                  key={demo.role}
                  type="button"
                  onClick={() => fillDemoCreds(demo.user, demo.pass, demo.role)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative w-full flex items-center gap-3 px-4 py-3 border rounded-xl text-left transition-all duration-200 group ${demo.color} ${activeDemo === demo.role ? 'ring-2 ring-indigo-500/30 border-indigo-500' : ''}`}
                >
                  <div className={`p-2 rounded-lg ${demo.role === 'Superadmin' ? 'bg-indigo-200/50 text-indigo-700' : 'bg-white text-slate-600'} shadow-sm`}>
                    <demo.icon size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold ${demo.role === 'Superadmin' ? 'text-indigo-900' : 'text-slate-900'}`}>
                      {demo.role}
                    </div>
                    <div className={`text-xs ${demo.role === 'Superadmin' ? 'text-indigo-600' : 'text-slate-500'}`}>
                      {demo.user} / {demo.pass}
                    </div>
                  </div>
                  <HiArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${demo.role === 'Superadmin' ? 'text-indigo-600' : 'text-slate-400'}`} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-xs text-slate-400"
        >
          Protected by 256-bit encryption • Session expires in 30 minutes
        </motion.p>
      </motion.div>
    </div>
  );
}

export default LoginPage;