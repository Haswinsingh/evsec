import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getLatestSensorData, getHistory, getAlerts } from "../services/api";
import { io } from "socket.io-client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts";
import {
  Bell, Battery, Thermometer, ShieldCheck, AlertTriangle, Car, Zap, BatteryCharging, PowerOff,
  Navigation, CheckCircle, Activity, Map as MapIcon, Compass, Star, AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

const socket = io("http://localhost:5000");

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [sensorData, setSensorData] = useState({
    batteryLevel: 0,
    temperature: 0,
    gasLevel: 0,
    isCharging: false
  });
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latest = await getLatestSensorData();
        if (latest) setSensorData(latest);
        const hist = await getHistory();
        setHistory(hist || []);
        const alrt = await getAlerts();
        setAlerts(alrt || []);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();

    socket.on("sensorData", (data) => {
      setSensorData(data);
      setHistory(prev => [...(prev || []).slice(-19), { ...data, timestamp: new Date() }]);
    });

    socket.on("alert", (alert) => {
      setAlerts(prev => [alert, ...(prev || []).slice(0, 19)]);
    });

    return () => {
      socket.off("sensorData");
      socket.off("alert");
    };
  }, []);

  const getHealthStatus = () => {
    if (sensorData.temperature > 50 || sensorData.gasLevel > 70) return { label: "Critical", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50", fill: "bg-red-500" };
    if (sensorData.temperature > 40 || sensorData.gasLevel > 40) return { label: "Warning", icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50", fill: "bg-amber-500" };
    return { label: "Excellent", icon: ShieldCheck, color: "text-[#22c55e]", bg: "bg-[#dcfce7]", fill: "bg-[#22c55e]" };
  };

  const health = getHealthStatus();

  // Mock Data for Charts
  const batteryHealth = 96;
  const batteryEfficiency = 92;
  const remainingRange = Math.floor((sensorData.batteryLevel / 100) * 450) || 310;

  return (
    <div className="flex w-full min-h-screen bg-[#ffffff] text-[#1f2937] font-sans">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto bg-white">
        {/* TOP NAVIGATION BAR */}
        <header className="flex justify-between items-center p-6 bg-white sticky top-0 z-40 border-b border-[#e5e7eb] shadow-sm">
          <div className="header-left">
            <h2 className="text-2xl font-black tracking-tight text-[#1f2937]">
              Welcome back, <span className="text-[#22c55e]">{user?.name || "Driver"}</span>
            </h2>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Your vehicle fleet is operating optimally.
            </p>
          </div>

          <div className="header-right flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#f9fafb] rounded-full border border-[#e5e7eb]">
              <div className={`w-2 h-2 rounded-full ${health.fill} animate-pulse`}></div>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Live Sync</span>
            </div>

            <div className="relative">
              <div
                className="w-10 h-10 rounded-full bg-[#f9fafb] border border-[#e5e7eb] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} className="text-gray-500" />
                {alerts.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>}
              </div>

              {showNotifications && (
                <div className="absolute top-14 right-0 w-80 bg-white border border-[#e5e7eb] rounded-2xl shadow-lg p-4 z-50 animate-fade-in">
                  <h4 className="font-bold text-gray-800 mb-3 px-2">Recent Alerts</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {alerts.length === 0 ? <p className="text-sm text-gray-500 px-2">No active alerts.</p> : alerts.map((a, i) => (
                      <div key={i} className="flex gap-3 items-start p-3 bg-[#f9fafb] rounded-xl border border-gray-100">
                        <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">{a.message}</p>
                          <span className="text-xs text-gray-400 font-medium mt-1 block">{new Date(a.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-11 h-11 rounded-full bg-[#dcfce7] text-[#22c55e] flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm cursor-pointer hover:scale-105 transition-transform">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto space-y-8 pb-16">

          {/* SECTION 1: EV Status Overview */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#dcfce7] text-[#22c55e] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Battery size={24} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Battery Level</span>
                  <p className="text-3xl font-black text-[#1f2937] mt-1">{sensorData.batteryLevel}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-[#22c55e] rounded-full transition-all duration-1000" style={{ width: `${sensorData.batteryLevel}%` }}></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Thermometer size={24} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Temperature</span>
                  <p className="text-3xl font-black text-[#1f2937] mt-1">{sensorData.temperature}°C</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (sensorData.temperature / 60) * 100)}%` }}></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <AlertTriangle size={24} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hazard Gas</span>
                  <p className="text-3xl font-black text-[#1f2937] mt-1">{sensorData.gasLevel} <span className="text-sm text-gray-400">ppm</span></p>
                </div>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (sensorData.gasLevel / 100) * 100)}%` }}></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
              className={`${health.bg} border ${health.border} rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center group relative overflow-hidden`}
            >
              {health.label === "Excellent" && (
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <ShieldCheck size={120} />
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm ${health.color}`}>
                  <health.icon size={28} />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${health.color} opacity-80`}>System Health</span>
                <p className={`text-3xl font-black ${health.color}`}>{health.label}</p>
              </div>
            </motion.div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {/* SECTION 2: Smart Battery Analytics */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row items-center gap-10"
              >
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * sensorData.batteryLevel) / 100} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-[#1f2937]">{sensorData.batteryLevel}%</span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Power</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 w-full">
                  <div>
                    <h5 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                      <Zap size={16} className="text-[#22c55e]" /> Efficiency
                    </h5>
                    <p className="text-3xl font-black text-[#1f2937]">{batteryEfficiency}%</p>
                  </div>
                  <div>
                    <h5 className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                      <ShieldCheck size={16} className="text-blue-500" /> Health
                    </h5>
                    <p className="text-3xl font-black text-[#1f2937]">{batteryHealth}%</p>
                  </div>
                  <div className="col-span-2 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-2">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Range</p>
                        <p className="text-3xl font-black text-[#22c55e]">{remainingRange} <span className="text-lg text-gray-500">km</span></p>
                      </div>
                      <Car size={40} className="text-gray-200" />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* SECTION 3: Vehicle Performance Charts */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[2rem] p-8 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#1f2937] flex items-center gap-2">
                    <Activity size={22} className="text-[#22c55e]" /> Performance Trend
                  </h3>
                  <div className="flex gap-4 text-sm font-bold">
                    <span className="flex items-center gap-2 text-[#22c55e]"><div className="w-3 h-3 rounded-full bg-[#22c55e]"></div> Battery</span>
                    <span className="flex items-center gap-2 text-orange-500"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Temp</span>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBatt" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="timestamp" hide />
                      <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} />
                      <Area type="monotone" dataKey="batteryLevel" stroke="#22c55e" strokeWidth={3} fill="url(#colorBatt)" />
                      <Area type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorTemp)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.section>
            </div>

            <div className="space-y-8">
              {/* SECTION 4: Vehicle Details Panel */}
              <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[2rem] p-8 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#1f2937]">
                    <Car size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1f2937]">Model S Plaid</h3>
                    <p className="text-gray-500 font-medium">TN 10 AB 1234</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest">Insurance</span>
                    <span className="text-[#1f2937] font-semibold bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm flex items-center gap-1"><CheckCircle size={14} className="text-[#22c55e]" /> Valid '26</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest">Last Service</span>
                    <span className="text-[#1f2937] font-semibold">05 Jan 2025</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-bold uppercase tracking-widest">Status</span>
                    <span className={`font-semibold flex items-center gap-1 ${sensorData.isCharging ? "text-[#22c55e]" : "text-gray-600"}`}>
                      {sensorData.isCharging ? <><BatteryCharging size={16} /> Charging...</> : <><PowerOff size={16} /> Offline</>}
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 transition-all shadow-md hover:shadow-lg ${sensorData.isCharging ? 'bg-white border-2 border-red-500 text-red-500 hover:bg-red-50' : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white hover:-translate-y-1'}`}
                  onClick={() => socket.emit('toggleCharging', !sensorData.isCharging)}
                >
                  {sensorData.isCharging ? <><PowerOff size={20} /> Stop Charging</> : <><Zap size={20} className="fill-white" /> Start Charging</>}
                </button>
              </motion.section>

              {/* SECTION 5: Route Optimization Panel */}
              <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[2rem] p-6 shadow-sm flex flex-col items-center relative overflow-hidden"
              >
                <div className="w-full flex justify-between items-center mb-4 z-10">
                  <h3 className="font-bold text-[#1f2937] flex items-center gap-2">
                    <Compass size={20} className="text-blue-500" /> Route Optimizer
                  </h3>
                  <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-md">14% Saved</span>
                </div>

                <div className="w-full h-32 bg-gray-100 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center border border-gray-200">
                  <MapIcon size={48} className="text-gray-300 absolute" />
                  <svg className="absolute w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M 10 25 Q 30 10 50 25 T 90 25" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                    <circle cx="10" cy="25" r="3" fill="#3b82f6" />
                    <circle cx="90" cy="25" r="3" fill="#ef4444" />
                  </svg>
                </div>
                <div className="w-full text-sm font-semibold flex justify-between text-gray-600">
                  <span>Current Pos</span>
                  <Navigation size={14} className="text-gray-400" />
                  <span>Destination</span>
                </div>
              </motion.section>

              {/* SECTION 6: Driver Behavior Analysis */}
              <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-[#dcfce7] border border-[#bbf7d0] rounded-[2rem] p-6 shadow-sm flex gap-4 items-center"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-[#22c55e] shrink-0">
                  <Star size={28} className="fill-[#22c55e]" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-[#1f2937]">96<span className="text-sm font-bold text-gray-500 ml-1">Score</span></h3>
                  <p className="text-sm font-semibold text-green-700">Excellent driving behavior detected today.</p>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fade-in { 0% { opacity: 0; transform: translateY(-5px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes dash { to { stroke-dashoffset: -1000; } }
      `}} />
    </div>
  );
}

export default Dashboard;
