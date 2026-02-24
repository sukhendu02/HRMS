import express from 'express';
const app = express();
import generateEmpId from "../Utils/generateEmpId.js";
import Employee from '../models/EmployeeModal.js';
import {connectDB} from "../Config/db.js"


const createEmployee = async (req, res) => {
await connectDB();
    try{

    
    const { full_name, email, department } = req.body;
    if(!full_name || !email || !department) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(!email.includes("@")) {
        return res.status(400).json({ message: "Invalid Email Format!" });
    }

     const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
        return res.status(400).json({ message: "Employee with this ID or email already exists" });
    }

    // CREATE EMPLOYEE ID 
    const employeeId = await generateEmpId();

    
   
       const employee = await Employee.create({
      employeeId,
      fullName: full_name,
      email:email,
      department: department,
    });
    console.log("Employee created:", employee);
     return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
    }
    catch (err) {
        console.error("Error creating employee:", err);
       return res.status(500).json({ message: "Failed to add new employee!" });
    }

};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        // console.log("Fetched employees:", employees);
        return res.status(200).json({
            success: true,
            data: employees,
        });
    }
    catch (err) {
        console.error("Error fetching employees:", err);
        return res.status(500).json({ message: "Failed to fetch employees!" });
    }

}

const deleteEmployee = async (req, res) => {
    try {
        console.log("Delete request received for employee ID:", req.params.empId);
        
        const { empId } = req.params;
        const employee = await Employee.findByIdAndDelete(empId);   
        console.log("Deleted ID:", req.params.empId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({ message: "Failed to delete employee!" });
    }
}

export { createEmployee ,getEmployees, deleteEmployee};