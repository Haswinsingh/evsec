import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CyberAuth from "./pages/CyberAuth";
import Dashboard from "./pages/Dashboard";
import RouteOptimization from "./pages/RouteOptimization";
import BatteryIntelligence from "./pages/BatteryIntelligence";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CyberAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/route-optimization" element={<RouteOptimization />} />
        <Route path="/battery" element={<BatteryIntelligence />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
