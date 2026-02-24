import express from "express";
import cors from "cors";
import dotenv from "dotenv";


const app = express();


// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// ROUTES
import empRoutes from "./Routes/EmpRoutes.js";
app.use("/api/employees", empRoutes);

import attendanceRoutes from "./Routes/AttendanceRoutes.js";
app.use("/api/attendance", attendanceRoutes);


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Global Error Handler
// app.use(errorHandler);

export default app;