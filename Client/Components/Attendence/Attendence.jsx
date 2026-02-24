import React from 'react'
import { fetchEmployees } from '../../Services/fetchEmp'
import { useEffect, useState } from 'react';
import api from '../../Services/api';
import toast from 'react-hot-toast';
import { IdCardLanyard } from "lucide-react";
import EmployeeAttendance from './EmployeeAttendence';

export default function Attendence() {

const [employees, setEmployees] = useState([]);
const [selectedEmployee, setSelectedEmployee] = useState("");
const [form, setForm] = useState({
  employeeId: "",
  date: new Date().toISOString().split('T')[0],
  status: "Present"
});

const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value  });


const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);

    //   console.log("Fetched employees:", data);
    } catch (err) {
      toast.error("Failed to load employees");
    }
  };

useEffect(() => {
   loadEmployees();

}, [])




const handleSubmit = async (e) => {
  e.preventDefault();
//   console.log(form);

    // CLIENT-SIDE VALIDATION
    if (!form.employeeId || !form.date || !form.status) {
        return toast.error("All fields are required");
    }
    try {
        
        const res = await api.post("/attendance/update-attendence", form);
        toast.success(res.data.message || "Attendance saved successfully");
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to save attendance");    
    }
    finally {
        setForm({
            employeeId: "",
            date: new Date().toISOString().split('T')[0],
            status: "Present"
        });
    }


}

    return (
    <>
    
      <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance</h1>
            <p className="text-sm text-gray-400 mt-0.5">Track and manage daily attendance</p>
          </div>

    </div>
        
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Mark Attendance</p>
<form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3 items-end">



          {/* Employee */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Employee</label>
            <select
              name="employeeId"  value={form.employeeId} onChange={handle}
              className="cursor-pointer w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-primary transition bg-white"
            >
              <option value="">Select employee</option>
              {employees.map((e) => (
                <option key={e.id} value={e.employeeId}>{e.employeeId} - {e.fullName}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Date</label>
            <input
              type="date" name="date"
               value={form.date}
               onChange={handle}
               max={
                new Date().toISOString().split('T')[0]
               }
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-primary transition"
            />
          </div>

          {/* Status */}
          <div className="flex-1">
            <label className="block text-xs cursor-pointer font-medium text-gray-600 mb-1.5">Status</label>
            <div className="flex gap-2 ">
              {["Present", "Absent"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({ ...form, status: s })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer border transition-all ${
                    form.status === s
                      ? s === "Present"
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          </div>
          <div className='flex justify-end my-4'>
            <button type='submit'  className="cursor-pointer mt-4 px-4 py-2 bg-primary text-white rounded-lg transition-colors duration-150">
              Save Attendance
            </button>
          </div>
          </form>
      </div>        
  

       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Show Attendance</p>


      <div className="grid grid-cols-1 lg:grid-cols-1 flex-1">


       {/* List of all the emp names  */}

      <div className="h-[650px] bg-white rounded-xl  flex w-full overflow-hidden">

      {/* ================= LEFT SIDE ================= */}
      <div className="w-1/3  bg-gray-50">

        <h2 className="p-4 font-semibold ">
          Employees
        </h2>

        {/* Scrollable employee list */}
        <div className="overflow-y-auto h-[500px]">
          {employees.map((emp) => (
            <div
              key={emp._id}
              onClick={() => setSelectedEmployee(emp)}
              className={`flex items-center justify-between p-3 cursor-pointer rounded-lg hover:bg-gray-100
                ${
                  selectedEmployee?._id === emp._id
                    ? "bg-accent"
                    : ""
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {emp.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div>
                  <p className="text-sm font-medium">{emp.fullName}</p>
                  <p className="text-xs text-gray-500">
                    {emp.department}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 p-6 overflow-y-auto">

        {!selectedEmployee ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select an employee to view attendance
          </div>
        ) : (
          <EmployeeAttendance employee={selectedEmployee} />
        )}

      </div>
    </div>

      
      
          </div>
    </div>
          
    </>
  )
}
