import React from 'react'
import { fetchEmployees } from '../../Services/fetchEmp';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IdCardLanyard, Check, X,User2 } from "lucide-react";
export default function Dashboard() {

  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentEmployees, setrecentEmployees] = useState([]);

  const LoadData= async () => {
    try {
      // Latest 5 employees
      const Empdata = await fetchEmployees();
      setStats([
        { label: "Total Employees", value: Empdata.length, color: "bg-indigo-500", icon: <IdCardLanyard className="w-5 h-5 text-white" /> },
        // { label: "Present Today", value: 45, color: "bg-green-500", icon: <Check className="w-5 h-5 text-white" /> },
        // { label: "Absent Today", value: 5, color: "bg-red-500", icon: <X className="w-5 h-5 text-white" /> },
      ]);
      setrecentEmployees(Empdata.slice(0, 5));

    } catch (err) {
      toast.error("Failed to load employees");
    }
  }
  useEffect(() => {
    // Simulate fetching stats from an API
    LoadData();
    
      setLoading(false);

  }, []);

  return (
    <>
     <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>





      {/* STATS */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

{/*  */}
 <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Recently Added Employees</p>
          <span className="text-xs text-gray-400">Last 5</span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Employee</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden sm:table-cell">ID</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Department</th>
              {/* <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3 hidden md:table-cell">Joined</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold flex-shrink-0
                       bg-primary `}>
                      <User2/>
                      {/* {getInitials(emp.fullName)} */}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{emp.fullName}</span>
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{emp.employeeId}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg 

                     "bg-gray-50 text-gray-600"}`}>
                    {emp.department}
                  </span>
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  )
}
