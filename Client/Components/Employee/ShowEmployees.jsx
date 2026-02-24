import React from 'react'

import api from "../../Services/api.js";
import { useState,useEffect } from 'react';

import { Trash2 } from "lucide-react";
import toast from 'react-hot-toast';

import { fetchEmployees } from '../../Services/fetchEmp.js';
const DEPT_COLORS = {
  Engineering: "bg-blue-50 text-blue-700",
  Design:      "bg-purple-50 text-purple-700",
  Marketing:   "bg-orange-50 text-orange-700",
  HR:          "bg-green-50 text-green-700",
  Finance:     "bg-yellow-50 text-yellow-700",
  Operations:  "bg-rose-50 text-rose-700",
};
function getInitials(name) {
   return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(name) {
  const colors = ["bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-cyan-500"];
  return colors[name.charCodeAt(0) % colors.length];
}




export default function ShowEmployees({ employees,setEmployees}) {


// const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
 const [open, setOpen] = useState(false)
    

  //    const fetchEmployees = async () => {
  //   try {
  //       setLoading(true);
  //       // console.log("Fetching employees...");
  //       const res = await api.get("/employees/get-employees");
        
  //       console.log("Fetched employees:", res.data.data); 
  //       setEmployees(res.data.data || []);
        
  //       console.log("Employees state updated:", res.data.data);
      
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Failed to fetch employees");
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // }
  
  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  const handleDelete = async (empId) => {
    try {
        setLoading(true);
        console.log("Deleting employee with ID:", empId);
        const resp = await api.delete(`/employees/delete-employee/${empId}`);
        toast.success(resp.data.message || "Employee deleted successfully ");
        
     setEmployees(prev =>
  prev.filter(emp => String(emp._id) !== String(empId))

);
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete employee");
    } finally {
        setLoading(false);
    }
    }



  
  return (
    <>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Employees</h1>
        <p className="text-sm text-gray-400 mt-0.5">{employees.length} total employees</p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Employee</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">ID</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Email</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Department</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50/60 transition-colors">

                  {/* Name + Avatar */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-semibold  ${getAvatarColor(emp.fullName)}`}>
                        {getInitials(emp.fullName)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{emp.fullName}</span>
                    </div>
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                      {emp.employeeId}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-500">{emp.email}</span>
                  </td>

                  {/* Department */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${DEPT_COLORS[emp.department] || "bg-gray-50 text-gray-600"}`}>
                      {emp.department}
                    </span>
                  </td>
                  {/* DELETE EMP */}
                  <td className="px-5 py-4">
                    <button 
                    onClick={() => setOpen(true)}
                    className="cursor-pointer  text-red-500 hover:text-red-700 text-xs">
                      <Trash2/>
                    </button>
                  </td>

                  {/* CONFORMATION POPUP FROM TAILWIND */}
             
{open && (
//   <ConfirmModal
//     message="Are you sure you want to delete this employee?"
//     onConfirm={() => { handleDelete(); setOpen(false); }}
//     onCancel={() => setOpen(false)}
//   />

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm mx-4 p-6">

        <p className="text-sm text-gray-700 text-center">Are you sure you want to delete this employee?</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setOpen(false)}
            className=" cursor-pointer flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { handleDelete(emp._id); setOpen(false); }}
            className=" cursor-pointer flex-1 py-2 rounded-lg bg-red-500 text-sm text-white hover:bg-red-600 transition-colors"
          >
            OK
          </button>
        </div>

      </div>
    </div>
)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing <span className="font-medium text-gray-600">{employees.length}</span> employees
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
