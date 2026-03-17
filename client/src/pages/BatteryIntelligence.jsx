import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import {
    Battery,
    Zap,
    Map,
    Thermometer,
    ShieldCheck,
    Activity,
    Lightbulb,
    Car,
    Clock,
    Settings,
    TrendingDown
} from "lucide-react";

// Mock Data for Charts
const dischargeData = [
    { time: "08:00", battery: 100, temp: 25 },
    { time: "09:00", battery: 92, temp: 27 },
    { time: "10:00", battery: 84, temp: 28 },
    { time: "11:00", battery: 77, temp: 30 },
    { time: "12:00", battery: 71, temp: 30 },
    { time: "13:00", battery: 68, temp: 29 },
];

const systemUsageData = [
    { name: "Motor System", value: 55, color: "#22c55e" },      // EV green
    { name: "Cooling System", value: 18, color: "#3b82f6" },    // Blue
    { name: "Electronics", value: 10, color: "#a855f7" },       // Purple
    { name: "Charging System", value: 10, color: "#f59e0b" },   // Amber
    { name: "Lighting System", value: 4, color: "#ef4444" },    // Red
    { name: "Infotainment", value: 3, color: "#ec4899" },       // Pink
];

export default function BatteryIntelligence() {
    const { user } = useContext(AuthContext);

    const batteryLevel = 68;
    const batteryHealth = 92;
    const batteryEfficiency = 87;
    const remainingRange = 185;
    const degradationLevel = 100 - batteryHealth;

    return (
        <div className="flex w-full min-h-screen bg-white text-[#1f2937] font-sans">
            {/* LEFT SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <main className="flex-1 max-h-screen overflow-y-auto bg-white">
                {/* HEADER */}
                <header className="flex justify-between items-center p-6 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                    <div className="header-left">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
                            Battery <span className="text-[#22c55e]">Intelligence</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Advanced analytics and AI insights for your EV battery
                        </p>
                    </div>
                    <div className="header-right flex items-center gap-4">
                        <div className="user-profile">
                            <div className="w-11 h-11 rounded-full bg-[#dcfce7] text-[#22c55e] flex items-center justify-center font-bold text-lg hover:scale-105 transition-transform cursor-pointer">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT PAD */}
                <div className="p-8 pb-12 max-w-7xl mx-auto space-y-8 animate-fade-in">

                    {/* SECTION 1: Top Section - Battery Overview */}
                    <section className="bg-[#f9fafb] rounded-[2rem] p-8 shadow-sm border border-gray-100 relative w-full block">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-8">
                            <span className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center">
                                <Battery size={18} className="text-[#22c55e]" />
                            </span>
                            Battery Overview
                        </h3>

                        {/* Central Battery Indicator */}
                        <div className="flex flex-col items-center justify-center mb-10 w-full">
                            <div className="relative w-[340px] h-40 border-[8px] border-gray-300 rounded-[2.5rem] p-2.5 bg-white shadow-inner flex items-center">
                                <div className="absolute -right-[22px] top-1/2 -translate-y-1/2 w-[14px] h-[60px] bg-gray-300 rounded-r-2xl"></div>

                                {/* The fill bar */}
                                <div
                                    className="h-full bg-[#22c55e] rounded-[1.8rem] flex items-center justify-center transition-all duration-[2000ms] ease-out relative overflow-hidden shadow-sm"
                                    style={{ width: `${batteryLevel}%` }}
                                >
                                    {/* Subtle shine running across */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite]"></div>
                                    <span className="text-white font-black text-[2.5rem] tracking-tight drop-shadow-md relative z-10 px-4">
                                        {batteryLevel}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Four Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
                            <div className="text-center group hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Battery Level</p>
                                <p className="text-3xl font-black text-gray-800">{batteryLevel}%</p>
                            </div>
                            <div className="text-center border-l border-gray-200 group hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Battery Health</p>
                                <p className="text-3xl font-black text-gray-800">{batteryHealth}%</p>
                            </div>
                            <div className="text-center border-l lg:border-l border-gray-200 max-lg:border-none group hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Efficiency</p>
                                <p className="text-3xl font-black text-gray-800">{batteryEfficiency}%</p>
                            </div>
                            <div className="text-center border-l border-gray-200 group hover:-translate-y-1 transition-transform">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Remaining Range</p>
                                <p className="text-3xl font-black text-[#22c55e]">
                                    {remainingRange} <span className="text-xl font-bold text-gray-400">km</span>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: Battery Health & Efficiency */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Battery Health Card */}
                        <div className="bg-[#f9fafb] rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-800">
                                <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                    <ShieldCheck size={18} className="text-[#22c55e]" />
                                </span>
                                Battery Health
                            </h4>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Health Score</span>
                                    <span className="text-5xl font-black text-gray-800">{batteryHealth}%</span>
                                </div>
                                <div className="px-4 py-2 bg-[#dcfce7] text-[#16a34a] rounded-full text-sm font-bold flex items-center gap-2 border border-[#bbf7d0]">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse"></span> Excellent
                                </div>
                            </div>
                            <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2 mt-8">
                                <span>Degradation Level</span>
                                <span className="text-gray-800 bg-gray-200 px-2 py-0.5 rounded text-xs">{degradationLevel}%</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-gray-800 h-full rounded-full" style={{ width: `${degradationLevel}%` }}></div>
                            </div>
                        </div>

                        {/* Battery Efficiency Card */}
                        <div className="bg-[#f9fafb] rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-800">
                                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Zap size={18} className="text-blue-500" />
                                </span>
                                Battery Efficiency
                            </h4>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Efficiency Score</span>
                                    <span className="text-5xl font-black text-gray-800">{batteryEfficiency}%</span>
                                </div>
                                <div className="text-blue-600 bg-blue-50 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
                                    Rating: A+
                                </div>
                            </div>
                            <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2 mt-8">
                                <span>Overall Performance</span>
                                <span className="text-blue-600">{batteryEfficiency}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${batteryEfficiency}%` }}></div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: Battery Usage Pattern */}
                    <section className="bg-[#f9fafb] rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                                <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                    <TrendingDown size={18} className="text-indigo-500" />
                                </span>
                                Battery Usage Pattern
                            </h4>
                            <div className="flex gap-4">
                                <span className="flex items-center gap-2 text-sm font-semibold text-gray-500"><div className="w-3 h-3 bg-[#22c55e] rounded-sm opacity-50"></div> Battery %</span>
                                <span className="flex items-center gap-2 text-sm font-semibold text-gray-500"><div className="w-3 h-3 border-b-2 border-dashed border-[#ec4899]"></div> Temp °C</span>
                            </div>
                        </div>
                        <div className="h-[320px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dischargeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="battGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
                                    />
                                    <Area yAxisId="left" type="monotone" name="Battery %" dataKey="battery" stroke="#22c55e" strokeWidth={3} fill="url(#battGradient)" />
                                    <Area yAxisId="right" type="monotone" name="Temperature °C" dataKey="temp" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" fill="url(#tempGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    {/* SECTION 4, 5, 6 */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

                        {/* SECTION 4: Battery Utilization by System */}
                        <div className="bg-[#f9fafb] rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                            <h4 className="text-lg font-bold flex items-center gap-2 mb-4 text-gray-800">
                                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Settings size={18} className="text-gray-600" />
                                </span>
                                System Utilization
                            </h4>
                            <div className="h-[220px] mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={systemUsageData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={90}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {systemUsageData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                            itemStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-4 mt-auto">
                                {systemUsageData.slice(0, 5).map((sys, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-3 text-gray-600 font-semibold">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sys.color }}></div>
                                            {sys.name}
                                        </div>
                                        <span className="font-bold text-gray-800">{sys.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 5: Range Prediction */}
                        <div className="bg-[#f9fafb] rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                            <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-800">
                                <span className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                                    <Map size={18} className="text-amber-500" />
                                </span>
                                Range Prediction
                            </h4>

                            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm flex items-center justify-between relative overflow-hidden group">
                                <div className="relative z-10 w-full">
                                    <p className="text-gray-500 font-bold text-xs mb-2 uppercase tracking-wide">Remaining Distance</p>
                                    <p className="text-4xl font-black text-gray-800 group-hover:scale-105 transition-transform origin-left w-max">
                                        {remainingRange} <span className="text-xl text-gray-400">km</span>
                                    </p>
                                </div>
                                <Car size={64} className="text-gray-100 absolute -right-2 -bottom-2 translate-x-1/4 rotate-[-5deg] z-0 transition-transform group-hover:translate-x-0" />
                            </div>

                            <div className="space-y-5 mt-auto bg-white p-5 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3 text-gray-600 font-semibold text-sm">
                                        <span className="text-indigo-400 bg-indigo-50 p-1.5 rounded-lg"><Clock size={16} /></span>
                                        Remaining Time
                                    </div>
                                    <span className="font-bold text-gray-800">3h 20m</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3 text-gray-600 font-semibold text-sm">
                                        <span className="text-amber-400 bg-amber-50 p-1.5 rounded-lg"><Zap size={16} /></span>
                                        Cons. Rate
                                    </div>
                                    <span className="font-bold text-gray-800">0.18 kWh/km</span>
                                </div>
                                <div className="pt-1">
                                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                        <span>Range Progress</span>
                                        <span>Max: 400km</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full" style={{ width: `${(remainingRange / 400) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 6: Smart Battery Insights */}
                        <div className="bg-[#f9fafb] rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                            <h4 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-800">
                                <span className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                                    <Lightbulb size={18} className="text-yellow-500" />
                                </span>
                                Smart Insights
                            </h4>

                            <div className="space-y-4 flex-1 flex flex-col justify-start">
                                {/* Insight 1 */}
                                <div className="bg-white rounded-2xl p-5 flex gap-4 items-start border border-gray-100 shadow-sm transition-all hover:border-[#22c55e] hover:shadow-md cursor-default">
                                    <div className="mt-0.5 w-10 h-10 rounded-xl bg-[#dcfce7] text-[#22c55e] flex items-center justify-center shrink-0">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 mb-1">Battery health is stable.</p>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Recent discharge curves match ideal parameters exactly.</p>
                                    </div>
                                </div>

                                {/* Insight 2 */}
                                <div className="bg-white rounded-2xl p-5 flex gap-4 items-start border border-red-50 shadow-sm transition-all hover:border-red-400 hover:shadow-md cursor-default relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-400"></div>
                                    <div className="mt-0.5 w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 ml-1.5">
                                        <Thermometer size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 mb-1">Cooling system consuming higher energy.</p>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">HVAC usage is at 18%, consider lowering fan speed.</p>
                                    </div>
                                </div>

                                {/* Insight 3 */}
                                <div className="bg-white rounded-2xl p-5 flex gap-4 items-start border border-gray-100 shadow-sm transition-all hover:border-blue-400 hover:shadow-md cursor-default">
                                    <div className="mt-0.5 w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                        <Activity size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 mb-1">Driving smoothly can increase range by 5%.</p>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">Optimizing motor acceleration saves approximately ~0.02 kWh/km.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}} />
        </div>
    );
}
