import React from 'react';
import { motion } from 'framer-motion';

const EVBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050b18] flex items-center justify-center">
            {/* Dark Blue to Black Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#050b18] to-black"></div>

            {/* Grid background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Cyberpunk Glows */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyberpunk-blue rounded-full blur-[160px] opacity-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyberpunk-green rounded-full blur-[160px] opacity-5 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

            {/* Main SVG Animation container */}
            <div className="relative w-full h-full max-w-7xl flex items-center justify-center opacity-70 pointer-events-none">
                <svg
                    viewBox="0 0 1000 600"
                    className="w-full h-full drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* EV Silhouette (Left Side) */}
                    <motion.path
                        d="M 80 470 L 130 470 A 40 40 0 0 1 230 470 L 370 470 A 40 40 0 0 1 470 470 L 520 470 L 520 390 L 580 390 L 680 330 L 450 330 L 400 450 L 80 450 Z"
                        fill="none"
                        stroke="#00f3ff"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />

                    {/* Windows */}
                    <motion.path
                        d="M 430 340 L 550 340 L 560 390 L 430 390 Z M 570 340 L 650 340 L 650 390 L 580 390 Z"
                        fill="none"
                        stroke="#00f3ff"
                        strokeWidth="2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1 }}
                    />

                    {/* Wheels */}
                    <motion.circle
                        cx="180" cy="470" r="35"
                        fill="#0a0a0a" stroke="#00f3ff" strokeWidth="4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    />
                    <motion.circle
                        cx="420" cy="470" r="35"
                        fill="#0a0a0a" stroke="#00f3ff" strokeWidth="4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    />

                    {/* Glowing pulse rings inside wheels */}
                    <motion.circle
                        cx="180" cy="470" r="10"
                        fill="#00ff66"
                        className="animate-pulse drop-shadow-[0_0_12px_#00ff66]"
                    />
                    <motion.circle
                        cx="420" cy="470" r="10"
                        fill="#00ff66"
                        className="animate-pulse drop-shadow-[0_0_12px_#00ff66]"
                    />

                    {/* Charging Station (Right Side) */}
                    <motion.path
                        d="M 780 500 L 780 200 L 850 200 L 850 500 Z"
                        fill="none"
                        stroke="#00ff66"
                        strokeWidth="3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    {/* Station Screen */}
                    <motion.path
                        d="M 795 220 L 835 220 L 835 280 L 795 280 Z"
                        fill="rgba(0,255,102,0.1)"
                        stroke="#00ff66"
                        strokeWidth="2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="animate-pulse"
                    />

                    {/* Connect cable (Right to Left) */}
                    <motion.path
                        d="M 780 320 C 700 320 650 450 550 450 C 500 450 480 400 450 400"
                        fill="none"
                        stroke="#00f3ff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                    />

                    {/* Energy Flow Animation on the cable */}
                    <circle
                        r="6"
                        fill="#00ff66"
                        className="drop-shadow-[0_0_15px_#00ff66]"
                    >
                        <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path="M 780 320 C 700 320 650 450 550 450 C 500 450 480 400 450 400"
                        />
                    </circle>

                    {/* Floor Line */}
                    <motion.line
                        x1="50" y1="505" x2="950" y2="505"
                        stroke="rgba(0, 243, 255, 0.2)"
                        strokeWidth="2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2 }}
                    />
                </svg>
            </div>
        </div>
    );
};

export default EVBackground;
