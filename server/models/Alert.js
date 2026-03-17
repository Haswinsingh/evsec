const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    type: { type: String, required: true }, // 'OVERHEATING', 'GAS_LEAKAGE', 'CHARGING_ISSUE'
    message: { type: String, required: true },
    severity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', AlertSchema);
