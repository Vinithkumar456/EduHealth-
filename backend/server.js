const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes=require("./routes/chatRoutes");
const assessmentRoutes=require("./routes/assessmentRoutes");
 // 🔹 Import course routes

require("dotenv").config();

const app = express();

// 🔹 Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://127.0.0.1:8080", // Replace with your frontend URL
  credentials: true, // Allow cookies and authentication headers
  methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // Prevents CSRF attacks while allowing authentication cookies
    },
  })
);

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/bot",chatRoutes);
app.use("/api/assessment",assessmentRoutes);


// 🔹 Add course routes

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
