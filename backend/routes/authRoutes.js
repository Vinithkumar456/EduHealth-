const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// 🟢 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, classNum } = req.body;

    if (!["student", "teacher", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!classNum || !Number.isInteger(classNum) || classNum < 1 || classNum > 10) {
      return res.status(400).json({ message: "Class must be a number between 1 and 10" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role, class: classNum });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 🟢 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = user;
    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email, role: user.role, class: user.class },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// 🟢 LOGOUT
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
