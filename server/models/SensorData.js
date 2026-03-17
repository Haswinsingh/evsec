const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    temperature: { type: Number, required: true },
    gasLevel: { type: Number, required: true },
    batteryLevel: { type: Number, required: true },
    isCharging: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
