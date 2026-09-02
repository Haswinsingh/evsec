import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Eye, EyeOff, Car } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/api";
import EVBackground from "../components/EVBackground";

const CyberAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAuth = async (e) => {
        e.preventDefault();

        // LOGIN
        if (isLogin) {
            try {
                const data = await loginUser(
                    formData.email,
                    formData.password
                );

                console.log("Login response:", data);

                login(data.user, data.token);
                navigate("/dashboard");

            } catch (err) {
                console.error("Login error:", err);

                alert(
                    err.response?.data?.msg ||
                    err.response?.data?.message ||
                    "Login failed"
                );
            }

            return;
        }

        // SIGN UP
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            const data = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                vehicleNumber: formData.vehicleNumber,
            });

            console.log("Signup response:", data);

            login(data.user, data.token);
            navigate("/dashboard");

        } catch (err) {
            console.error("Signup error:", err);

            alert(
                err.response?.data?.msg ||
                err.response?.data?.message ||
                "Signup failed"
            );
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center font-inter text-white overflow-hidden bg-[#050b18]">

            <EVBackground />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-[380px] p-8 rounded-[20px] bg-black/40 backdrop-blur-xl border border-cyberpunk-blue/30 shadow-[0_8px_32px_rgba(0,243,255,0.15)] flex flex-col items-center overflow-hidden"
            >

                {/* TABS */}
                <div className="flex w-full border-b border-white/10 mb-8 relative">

                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 flex justify-center pb-4 text-[13px] font-medium tracking-wide transition-all duration-300 relative ${
                            isLogin
                                ? "text-cyberpunk-blue"
                                : "text-gray-400 hover:text-gray-300"
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
                        className={`flex-1 flex justify-center pb-4 text-[13px] font-medium tracking-wide transition-all duration-300 relative ${
                            !isLogin
                                ? "text-gray-200"
                                : "text-gray-400 hover:text-gray-300"
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

                {/* TITLE */}
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

                {/* FORM */}
                <form
                    onSubmit={handleAuth}
                    className="flex flex-col w-full space-y-5"
                >

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={isLogin ? "login" : "signup"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col w-full gap-5"
                        >

                            {/* NAME */}
                            {!isLogin && (
                                <div className="relative group w-full">

                                    <User
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue transition-all font-medium"
                                    />

                                </div>
                            )}

                            {/* EMAIL */}
                            <div className="relative group w-full">

                                <User
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue transition-all font-medium"
                                />

                            </div>

                            {/* VEHICLE NUMBER */}
                            {!isLogin && (
                                <div className="relative group w-full">

                                    <Car
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                                    />

                                    <input
                                        type="text"
                                        name="vehicleNumber"
                                        placeholder="Vehicle Number"
                                        value={formData.vehicleNumber}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue transition-all font-medium"
                                    />

                                </div>
                            )}

                            {/* PASSWORD */}
                            <div className="relative group w-full">

                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue transition-all font-medium"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>

                            </div>

                            {/* CONFIRM PASSWORD */}
                            {!isLogin && (
                                <div className="relative group w-full">

                                    <Lock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                                    />

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-cyberpunk-blue transition-all font-medium"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={16} />
                                        ) : (
                                            <Eye size={16} />
                                        )}
                                    </button>

                                </div>
                            )}

                            {/* FORGOT PASSWORD */}
                            {isLogin && (
                                <div className="flex justify-end w-full">

                                    <button
                                        type="button"
                                        className="text-[12px] font-medium text-cyberpunk-green hover:text-[#00cc52]"
                                    >
                                        Forgot Password?
                                    </button>

                                </div>
                            )}

                        </motion.div>

                    </AnimatePresence>

                    {/* SUBMIT BUTTON */}
                    <div className="flex flex-col w-full pt-1 gap-6">

                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                boxShadow:
                                    "0 0 20px rgba(0, 255, 102, 0.5)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex items-center justify-center w-full py-3.5 rounded-full font-bold tracking-wider text-[15px] bg-cyberpunk-green text-black shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all"
                        >
                            {isLogin ? "LOGIN" : "SIGN UP"}
                        </motion.button>

                        {/* REMEMBER ME */}
                        {isLogin && (
                            <div className="flex justify-center w-full">

                                <label className="flex items-center justify-center gap-3 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                    />

                                    <span className="text-[13px] text-cyberpunk-blue font-medium tracking-wide">
                                        Remember Me
                                    </span>

                                </label>

                            </div>
                        )}

                    </div>

                </form>

                {/* SOCIAL LOGIN */}
                <div className="flex flex-col w-full mt-8">

                    <div className="flex items-center justify-center mb-6 w-full gap-4">

                        <div className="flex-1 h-[1px] bg-white/10"></div>

                        <span className="text-[12px] text-gray-400 whitespace-nowrap">
                            Or login with
                        </span>

                        <div className="flex-1 h-[1px] bg-white/10"></div>

                    </div>

                    <div className="flex justify-center items-center gap-6 w-full">

                        <button
                            type="button"
                            className="w-[42px] h-[42px] flex items-center justify-center rounded-[12px] bg-white/5 border border-white/10 hover:bg-white/10"
                        >
                            Google
                        </button>

                        <button
                            type="button"
                            className="w-[42px] h-[42px] flex items-center justify-center rounded-[12px] bg-white/5 border border-white/10 hover:bg-white/10"
                        >
                            ◉
                        </button>

                        <button
                            type="button"
                            className="w-[42px] h-[42px] flex items-center justify-center rounded-[12px] bg-white/5 border border-white/10 hover:bg-white/10"
                        >
                            ⊞
                        </button>

                    </div>

                </div>

            </motion.div>
        </div>
    );
};

export default CyberAuth;
