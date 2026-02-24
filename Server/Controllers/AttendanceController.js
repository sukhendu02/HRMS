import express from 'express';
const app = express();
import Attendance from '../models/Attendance.js';
import Employee from '../models/EmployeeModal.js';

const updateAttendance = async (req, res) => {
    try {
        const { employeeId, date,status } = req.body;
      
        if (!employeeId || !date || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        
        const existingRecord = await Attendance.findOne({ employee: employee._id, date });
        if (existingRecord) {
            existingRecord.status = status;
            await existingRecord.save();
            return res.status(200).json({ message: "Attendance updated successfully" });
        }

        const attendance = await Attendance.create({
            employee: employee._id,
            date,
            status
        });
        return res.status(201).json({ message: "Attendance recorded successfully", data: attendance });
        
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

const getAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        // console.log("Fetching attendance for employeeId:", employeeId);
        // console.log("Fetching attendance for employeeId:", employeeId);
        const employee = await Employee.findById( employeeId );
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        
        const attendance = await Attendance.find({ employee: employee._id })
        .populate("employee", "fullName employeeId department")
        .sort({ date: -1 });
        // console.log(`Found ${attendance.length} attendance records for employeeId ${employeeId}`);
      
        return res.status(200).json({ message: "Attendance retrieved successfully", data: attendance });
    } catch (err) {
        // console.error("Error fetching attendance:", err);
        return res.status(500).json({ message: "Failed to retrieve attendance", error: err.message });
    }
}

export { updateAttendance, getAttendance };