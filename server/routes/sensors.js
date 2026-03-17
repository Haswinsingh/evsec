const express = require('express');
const SensorData = require('../models/SensorData');
const Alert = require('../models/Alert');

const router = express.Router();

// Get latest sensor data
router.get('/latest', async (req, res) => {
    try {
        const data = await SensorData.findOne().sort({ timestamp: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Get alert history
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 }).limit(20);
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Get historical usage (for chips/graphs)
router.get('/history', async (req, res) => {
    try {
        const history = await SensorData.find().sort({ timestamp: -1 }).limit(50);
        res.json(history.reverse());
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
