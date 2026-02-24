import { useState } from 'react'

import './App.css'

import {BrowserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './MainLayout/MainLayout'
import Dashboard from '../Components/Dashboard/Dashboard'
import Attendence from '../Components/Attendence/Attendence'
import Employees from '../Components/Employee/Employees'
import { Toaster } from "react-hot-toast";


function App() {
  

  return (
    <>
      {/* REACT HOT TOST */}
       <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            fontSize: "14px",
          },
        }}
      />
         <BrowserRouter>
         <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/attendance" element={<Attendence />} />
            </Route>
         </Routes>
         </BrowserRouter>
    </>
  )
}

export default App
