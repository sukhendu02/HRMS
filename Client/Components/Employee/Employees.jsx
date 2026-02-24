import React from 'react'
import { useState,useEffect } from 'react';
import toast from "react-hot-toast";
import api from '../../Services/api';
import { IdCardLanyard } from "lucide-react";
// import { fetchEmployees } from '../../Services/fetchEmp.js';
import { fetchEmployees } from '../../Services/fetchEmp';
import ShowEmployees from './ShowEmployees.jsx';


export default function Employees() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const [employees, setEmployees] = useState([]);

     const fetchEmployees = async () => {
    try {
        setLoading(true);
        // console.log("Fetching employees...");
        const res = await api.get("/employees/get-employees");
        
        console.log("Fetched employees:", res.data.data); 
        setEmployees(res.data.data || []);
        
        console.log("Employees state updated:", res.data.data);
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees");
    }
    finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  
   const [formData, setFormData] = useState({

    full_name: "",
    email: "",
    department: "",
   
  });

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // CLIENT-SIDE VALIDATION

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.department
    ) {
      return toast.error("All fields are required");
      
    }
    try {
        setLoading(true);
       const res = await api.post("/employees/create-employee", formData);
       toast.success(res.data.message || "Employee saved successfully");
      await fetchEmployees();

      } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save employee");
      setError(err.response?.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
        setFormData({
          full_name: "",
          email: "",
          department: "",
        });

    }
  };

  return (


    <>
    

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Employees</h1>
            <p className="text-gray-500 mt-1">Manage your employee records and details.</p>
          </div>
          <div className="flex gap-2">
           
           
          </div>
        </div>

      


    <div className="p-6 mt-8 md:p-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Employee</h1>
            <p className="text-sm text-gray-400 mt-0.5">Fill out the form below to add a new employee to the system</p>
          </div>

    
        {/* <h2 className="text-lg text-heading font-semibold">Add New Employee</h2> */}
        {/* <p className="text-gray-500 text-sm mb-4">Fill out the form below to add a new employee to the system.</p> */}
        <form className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name='full_name'
               className="w-full border-slate-300 rounded-md shadow-sm p-2 border  focus:ring-primary focus:border-primary" 
               placeholder="John Doe"
                id="full_name"
              onChange={handleChange}
              value={formData.full_name} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name='email' className="w-full border-slate-300 rounded-md shadow-sm p-2 border  focus:ring-primary focus:border-primary" placeholder="john.doe@example.com" onChange={handleChange} value={formData.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select name='department' className="w-full border-slate-300 rounded-md shadow-sm p-2 border  focus:ring-primary focus:border-primary" onChange={handleChange} value={formData.department}>
                <option value="">Select Department</option>
                <option value="hr">Human Resources</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="it">IT</option>
                {/* <option value=""></option> */}

                
              </select>
            </div>
          </div>
          <div className="mt-6">


            <button onClick={handleSubmit} className="float-right cursor-pointer px-4 py-2  bg-primary text-white rounded hover:bg-primary-dark transition-colors duration-150">
              Save Employee
            </button>
          </div>
        </form>
      </div>

      </div>


      <div className="section  my-4">
        {/* <h2 className="text-lg text-heading font-semibold mb-4 mt-8">Employee List</h2> */}
        {/* <p className="text-gray-500 text-sm mb-4">View and manage all employees in the system.</p> */}
        <ShowEmployees employees={employees} setEmployees={setEmployees}/>
      </div>

    </>
  )
}
