const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, vehicleNumber } = req.body;

        // Validate input
        if (!name || !email || !password || !vehicleNumber) {
            return res.status(400).json({
                msg: "Please provide name, email, password and vehicle number"
            });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing");
            return res.status(500).json({
                msg: "Server configuration error"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            vehicleNumber
        });

        await user.save();

        // Create JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                vehicleNumber: user.vehicleNumber
            }
        });

    } catch (err) {
        console.error("REGISTER ERROR:", err);

        return res.status(500).json({
            msg: "Server Error",
            error: err.message
        });
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Please provide email and password"
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing");
            return res.status(500).json({
                msg: "Server configuration error"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid Credentials"
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                vehicleNumber: user.vehicleNumber
            }
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err);

        return res.status(500).json({
            msg: "Server Error",
            error: err.message
        });
    }
});

module.exports = router;
