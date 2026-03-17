import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/api";
import EVBackground from "../components/EVBackground";

const CyberAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        vehicleNumber: "",
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const data = await loginUser(formData.email, formData.password);
                login(data.user, data.token);
                navigate("/dashboard");
            } catch (err) {
                alert(err.response?.data?.msg || "Login failed");
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                const data = await registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    vehicleNumber: formData.vehicleNumber,
                });
                login(data.user, data.token);
                navigate("/dashboard");
            } catch (err) {
                alert(err.response?.data?.msg || "Signup failed");
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center font-inter text-white overflow-hidden bg-[#050b18]">
            {/* Background Component with Neon EV Animation */}
            <EVBackground />

            {/* Centered Futuristic Glassmorphism Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-[380px] p-8 rounded-[20px] bg-black/40 backdrop-blur-xl border border-cyberpunk-blue/30 shadow-[0_8px_32px_rgba(0,243,255,0.15)] flex flex-col items-center overflow-hidden"
            >
                {/* Tabs Top Section */}
                <div className="flex w-full border-b border-white/10 mb-8 relative">
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 flex justify-center pb-4 text-[13px] font-medium tracking-wide transition-all duration-300 relative ${isLogin ? "text-cyberpunk-blue" : "text-gray-400 hover:text-gray-300"
                            }`}
                    >
                        LOGIN
                        {isLogin && (
                            <motion.div
                                layoutId="tab-underline"
                                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-cyberpunk-blue shadow-[0_0_10px_#00f3ff]"
                            />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 flex justify-center pb-4 text-[13px] font-medium tracking-wide transition-all duration-300 relative ${!isLogin ? "text-gray-200" : "text-gray-400 hover:text-gray-300"
                            }`}
                    >
                        SIGN UP
                        {!isLogin && (
                            <motion.div
                                layoutId="tab-underline"
                                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-cyberpunk-blue shadow-[0_0_10px_#00f3ff]"
                            />
                        )}
                    </button>
                </div>

                {/* Title Section */}
                <div className="flex flex-col items-center text-center w-full mb-8">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-[28px] font-bold tracking-widest mb-1 text-cyberpunk-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]"
                    >
                        EVSECURA
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 text-[13px] tracking-wide"
                    >
                        Smart EV Monitoring System
                    </motion.p>
                </div>

                <form onSubmit={handleAuth} className="flex flex-col w-full space-y-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLogin ? "login" : "signup"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col w-full gap-5"
                        >
                            {!isLogin && (
                                <div className="relative group w-full">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyberpunk-blue transition-colors" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={!isLogin}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-medium"
                                    />
                                </div>
                            )}

                            <div className="relative group w-full">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyberpunk-blue transition-colors" />
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Username or Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-medium"
                                />
                            </div>

                            <div className="flex flex-col w-full gap-2">
                                <div className="relative group w-full">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyberpunk-blue transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute flex items-center justify-center right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {isLogin && (
                                    <div className="flex justify-end w-full">
                                        <button type="button" className="text-[12px] font-medium text-cyberpunk-green hover:text-[#00cc52] transition-colors drop-shadow-[0_0_5px_rgba(0,255,102,0.4)]">
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex flex-col w-full pt-1 gap-6">
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 102, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex items-center justify-center w-full py-3.5 rounded-full font-bold tracking-wider text-[15px] bg-cyberpunk-green text-black shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all"
                        >
                            {isLogin ? "LOGIN" : "SIGN UP"}
                        </motion.button>

                        {isLogin && (
                            <div className="flex justify-center w-full">
                                <label className="flex items-center justify-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-4 h-4 bg-transparent border-[1.5px] border-cyberpunk-blue rounded-[4px] peer-checked:bg-cyberpunk-blue transition-all"></div>
                                        <div className="absolute flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity">
                                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-[13px] text-cyberpunk-blue font-medium tracking-wide">Remember Me</span>
                                </label>
                            </div>
                        )}
                    </div>
                </form>

                <div className="flex flex-col w-full mt-8">
                    <div className="flex items-center justify-center mb-6 w-full gap-4">
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                        <span className="text-[12px] text-gray-400 font-normal whitespace-nowrap">Or login with</span>
                        <div className="flex-1 h-[1px] bg-white/10"></div>
                    </div>

                    <div className="flex justify-center items-center gap-6 w-full">
                        <button type="button" className="w-[42px] h-[42px] flex items-center justify-center rounded-[12px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                            <svg className="w-[18px] h-[18px] opacity-40 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.266 9.767c0-1.881 1.577-3.403 3.518-3.403.931 0 1.814.363 2.474.954l2.652-2.591C12.286 3.227 10.15 2.318 7.749 2.318 4.155 2.318 1 5.227 1 8.818c0 1.209.336 2.345.932 3.318l2.763-2.045c-.354-.727-.54-1.545-.54-2.386v-.012l1.111.074z" />
                                <path fill="#FBBC05" d="M16.04 18c0 1.881-1.577 3.404-3.518 3.404-.931 0-1.814-.363-2.474-.954l-2.652 2.591C8.614 24.318 10.75 25.227 13.151 25.227c3.594 0 6.749-2.909 6.749-6.5s-3.155-6.5-6.749-6.5c-1.209 0-2.345.336-3.318.932l2.045 2.763c.727-.354 1.545-.54 2.386-.54 1.881 0 3.404 1.523 3.404 3.404v1.111l2.422-.074z" />
                                <path fill="#4285F4" d="M22.545 12.227c0-.727-.068-1.409-.205-2.091H11.455v4.273h6.227c-.273 1.455-1.09 2.727-2.318 3.545v2.773h6.818c.227-.636.363-1.318.363-2.045v-3.682h-.001z" />
                                <path fill="#34A853" d="M11.455 22.773c3.09 0 5.681-1.045 7.59-2.773l-3.682-2.727c-1 1-2.318 1.409-3.909 1.409-3 0-5.545-2.045-6.454-4.773L1.136 16.545c1.864 3.727 5.773 6.228 10.319 6.228z" />
                            </svg>
                        </button>
                        <button type="button" className="w-[42px] h-[42px] flex items-center justify-center rounded-[12px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                            <svg className="w-[20px] h-[20px] opacity-40 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="white">
                                <path d="M12.125 10.635c.148 0 .31.025.485.07.175.045.344.116.5.215.158.098.291.228.4.385.109.157.163.344.163.565 0 .221-.059.418-.175.592s-.273.315-.467.424-.418.188-.669.237-.518.073-.799.073c-.279 0-.542-.031-.789-.093s-.463-.153-.647-.272c-.184-.119-.333-.272-.447-.46s-.171-.418-.171-.692c0-.284.067-.52.203-.706.136-.187.329-.337.58-.451.251-.114.545-.19.882-.228s.705-.057 1.109-.057zM12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                            </svg>
                        </button>
                        <button type="button" className="w-[42px] h-[42px] flex items-center justify-center rounded-[12px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                            <svg className="w-[18px] h-[18px] opacity-40 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none">
                                <path fill="#f35325" d="M0 0h11.4v11.4H0z" />
                                <path fill="#81bc06" d="M12.6 0H24v11.4H12.6z" />
                                <path fill="#05a6f0" d="M0 12.6h11.4V24H0z" />
                                <path fill="#ffba08" d="M12.6 12.6H24V24H12.6z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CyberAuth;
