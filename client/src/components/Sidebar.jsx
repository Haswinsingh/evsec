import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Zap, Battery, Car, ShieldCheck, Settings, LogOut, Map } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: Zap },
        { name: "Battery Life", path: "/battery", icon: Battery },
        { name: "Vehicle Data", path: "/vehicle", icon: Car },
        { name: "Route Optimization", path: "/route-optimization", icon: Map },
        { name: "Safety Logs", path: "/safety", icon: ShieldCheck },
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    return (
        <aside className="w-72 bg-white border-r border-[#e5e7eb] flex flex-col h-screen sticky top-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4 p-8 pb-10">
                <div className="w-12 h-12 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#22c55e] shadow-sm transform transition-transform hover:scale-105">
                    <Zap size={24} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tighter text-[#1f2937] leading-none">EV SECURA</span>
                    <span className="text-xs font-bold text-gray-400 tracking-widest mt-1 uppercase">Analytics Fleet</span>
                </div>
            </div>

            <nav className="flex-1 px-5 flex flex-col gap-2.5">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const displayName = item.name === "Battery Life" ? "Battery Intelligence" : item.name;
                    return (
                        <div
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${isActive ? "bg-[#dcfce7] shadow-sm" : "hover:bg-[#f9fafb]"
                                }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#22c55e] rounded-r-md"></div>
                            )}
                            <item.icon
                                size={22}
                                className={`transition-all duration-300 ${isActive ? "text-[#22c55e]" : "text-gray-400 group-hover:text-[#22c55e] group-hover:scale-110"
                                    }`}
                            />
                            <span
                                className={`font-bold text-[15px] tracking-wide transition-colors duration-300 ${isActive ? "text-[#1f2937]" : "text-gray-500 group-hover:text-[#1f2937]"
                                    }`}
                            >
                                {displayName}
                            </span>
                        </div>
                    );
                })}
            </nav>

            <div className="p-6">
                <div className="bg-[#f9fafb] rounded-2xl p-4 mb-4 border border-gray-100 hidden">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">System Status</span>
                    </div>
                    <span className="text-sm font-semibold text-[#1f2937]">All systems operational</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex justify-start items-center gap-4 px-4 py-3.5 w-full rounded-2xl cursor-pointer text-gray-500 hover:bg-red-50 hover:text-red-600 hover:shadow-sm transition-all duration-300 group"
                >
                    <LogOut size={22} className="text-gray-400 group-hover:text-red-500 transition-transform group-hover:-translate-x-1" />
                    <span className="font-bold text-[15px] tracking-wide">Logout Account</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
