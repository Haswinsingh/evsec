import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Zap, Map, Navigation, Activity, Award, BatteryCharging, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import "./RouteOptimization.css";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Dummy Data for Map
const startPoint = [13.0827, 80.2707]; // Chennai Center
const endPoint = [12.9716, 80.2405]; // Velachery

const regularRoute = [
    startPoint,
    [13.0500, 80.2500],
    [13.0100, 80.2300],
    endPoint
];

const optimizedRoute = [
    startPoint,
    [13.0600, 80.2600],
    [13.0200, 80.2600],
    endPoint
];

const chargingStations = [
    { pos: [13.0500, 80.2500], name: "Shell Recharge, T. Nagar" },
    { pos: [13.0200, 80.2600], name: "Tata Power EZ, Guindy" },
];

// Custom icon for charging station
const chargeIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: "charge-marker"
});

// Chart Data
const batteryVsDistance = [
    { distance: "0km", battery: 100, optBattery: 100 },
    { distance: "5km", battery: 92, optBattery: 95 },
    { distance: "10km", battery: 83, optBattery: 89 },
    { distance: "15km", battery: 71, optBattery: 82 },
    { distance: "20km", battery: 58, optBattery: 74 },
];

const efficiencyTrend = [
    { day: "Mon", score: 72 },
    { day: "Tue", score: 75 },
    { day: "Wed", score: 68 },
    { day: "Thu", score: 82 },
    { day: "Fri", score: 85 },
    { day: "Sat", score: 89 },
    { day: "Sun", score: 92 },
];

function RouteOptimization() {
    return (
        <div className="ev-layout">
            <Sidebar />

            <main className="route-opt-root">
                <header className="route-opt-header">
                    <div>
                        <h2>Route <span className="highlight">Optimization</span></h2>
                        <p className="subtitle">AI-powered battery saving and driver analytics</p>
                    </div>
                </header>

                <section className="route-content">
                    {/* MAP SECTION (70%) */}
                    <motion.div
                        className="map-section"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="map-container">
                            <MapContainer center={[13.0450, 80.2500]} zoom={12} scrollWheelZoom={false}>
                                {/* Light CartoDB Map style to match the new white/green theme */}
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />

                                {/* Routes */}
                                <Polyline positions={regularRoute} color="#3b82f6" weight={5} opacity={0.6} />
                                <Polyline positions={optimizedRoute} color="#16a34a" weight={5} opacity={1} dashArray="5, 10" />

                                {/* Charging Stations */}
                                {chargingStations.map((station, idx) => (
                                    <Marker position={station.pos} icon={chargeIcon} key={idx}>
                                        <Popup>{station.name}</Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </motion.div>

                    {/* ANALYTICS SECTION (30%) */}
                    <motion.div
                        className="analytics-section"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >

                        {/* 1. Route Pattern */}
                        <div className="analytics-card">
                            <h3><Map size={20} style={{ color: "var(--accent-blue)" }} /> Route Pattern</h3>
                            <p style={{ color: "var(--accent-blue)", fontWeight: "600", fontSize: "1.1rem" }}>Regular Route Detected</p>
                            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Home to Office (15km)</span>
                        </div>

                        {/* 2. Battery Optimization */}
                        <div className="analytics-card">
                            <h3><BatteryCharging size={20} style={{ color: "var(--accent-primary)" }} /> Battery Optimization</h3>
                            <div className="stat-grid">
                                <div className="stat-item">
                                    <span>Est. Consumption</span>
                                    <strong className="warning-text">24% Battery</strong>
                                </div>
                                <div className="stat-item">
                                    <span>Optimized Route</span>
                                    <strong className="success-text">14% Battery</strong>
                                </div>
                            </div>
                            <div className="chart-wrapper" style={{ marginTop: '1rem' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={batteryVsDistance}>
                                        <defs>
                                            <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }} />
                                        <Area type="monotone" dataKey="battery" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReg)" name="Regular Route" />
                                        <Area type="monotone" dataKey="optBattery" stroke="#16a34a" fillOpacity={1} fill="url(#colorOpt)" name="Optimized Route" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 3. Driver Behaviour Analysis */}
                        <div className="analytics-card">
                            <h3><Activity size={20} style={{ color: "var(--accent-primary)" }} /> Driver Behaviour</h3>
                            <div className="score-display">
                                <div className="score-circle">92</div>
                                <div className="score-info">
                                    <p>Excellent</p>
                                    <span>Driving Efficiency Score</span>
                                </div>
                            </div>
                            <div className="stat-grid">
                                <div className="stat-item">
                                    <span>Harsh Accel.</span>
                                    <strong>1 time</strong>
                                </div>
                                <div className="stat-item">
                                    <span>Sudden Braking</span>
                                    <strong>0 times</strong>
                                </div>
                                <div className="stat-item">
                                    <span>Overspeeding</span>
                                    <strong>2 mins</strong>
                                </div>
                                <div className="stat-item">
                                    <span>Idle Time</span>
                                    <strong>5 mins</strong>
                                </div>
                            </div>

                            <div className="chart-wrapper" style={{ marginTop: '1rem', height: '100px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={efficiencyTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="day" hide />
                                        <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                                        <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937' }} />
                                        <Line type="monotone" dataKey="score" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 4. AI Suggestions Card */}
                        <div className="analytics-card ai-suggest-card">
                            <h3><Award size={20} style={{ color: "var(--accent-primary)" }} /> AI Suggestions</h3>
                            <div className="suggestion-list">
                                <div className="suggestion-item">
                                    <TrendingUp size={16} />
                                    <span>Your daily route can save 10% battery with optimized driving.</span>
                                </div>
                                <div className="suggestion-item">
                                    <AlertTriangle size={16} />
                                    <span>Reduce sudden acceleration near traffic signals to improve battery health.</span>
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="btn-primary">
                                <Navigation size={18} /> Simulate Optimized Route
                            </button>
                            <button className="btn-secondary">
                                <Zap size={18} /> View Battery Saving Report
                            </button>
                        </div>

                    </motion.div>
                </section>
            </main>
        </div>
    );
}

export default RouteOptimization;
