const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const sensorRoutes = require('./routes/sensors');
const SensorData = require('./models/SensorData');
const Alert = require('./models/Alert');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://evsec-nine.vercel.app",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "https://evsec-nine.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sensors', sensorRoutes);
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'EVSECURA backend is running'
    });
});

let isChargingSimulated = false;
let chargingStartTime = null;

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('toggleCharging', (status) => {
        isChargingSimulated = status;
        if (isChargingSimulated) {
            chargingStartTime = Date.now();
        } else {
            chargingStartTime = null;
        }
        io.emit('chargingStatusChanged', isChargingSimulated);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Simulate IoT Data and check for alerts
setInterval(async () => {
    // Simulate reading sensors
    const newData = {
        temperature: Math.floor(Math.random() * (isChargingSimulated ? 15 : 10) + (isChargingSimulated ? 40 : 25)), // Hotter if charging
        gasLevel: Math.floor(Math.random() * (100 - 0) + 0),
        batteryLevel: Math.max(0, Math.min(100, (isChargingSimulated ? 1 : -0.5) + (await SensorData.findOne().sort({ timestamp: -1 }) || { batteryLevel: 50 }).batteryLevel)),
        isCharging: isChargingSimulated
    };

    // Store in DB
    try {
        const sensorEntry = new SensorData(newData);
        await sensorEntry.save();

        // Analyze for alerts
        if (newData.temperature > 50) {
            const alert = new Alert({
                type: 'OVERHEATING',
                message: `Temperature reached ${newData.temperature}°C!`,
                severity: 'high'
            });
            await alert.save();
            io.emit('alert', alert);
        }

        if (newData.gasLevel > 80) {
            const alert = new Alert({
                type: 'GAS_LEAKAGE',
                message: `Gas leakage detected! Level: ${newData.gasLevel}`,
                severity: 'high'
            });
            await alert.save();
            io.emit('alert', alert);
        }

        if (isChargingSimulated && chargingStartTime && (Date.now() - chargingStartTime > 60000)) {
            const alert = new Alert({
                type: 'CHARGING_ISSUE',
                message: `Abnormal charging duration detected! Check battery health.`,
                severity: 'medium'
            });
            await alert.save();
            io.emit('alert', alert);
            chargingStartTime = Date.now();
        }

        // Emit real-time sensor data
        io.emit('sensorData', newData);

    } catch (err) {
        console.error('Error in simulation:', err);
    }

}, 5000); // Every 5 seconds

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
