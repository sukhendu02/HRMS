import React from 'react'
import {LayoutDashboard,SquareUserRound} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Employees",
    path: "/employees",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
  },
];


export default function Sidebar() {

   const [active, setActive] = useState("/");
  const [collapsed, setCollapsed] = useState(false);


  return (
    <>
      <div className="flex h-screen ">

      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-60"
        }  border-r border-gray-200 bg-grey-100 flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-200">
          {/* Icon mark */}
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          {!collapsed && (
            <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
              HRMS Lite
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
         
              to={item.path}
              className={({ isActive }) =>
                
                `flex items-center gap-4 px-3 py-3 my-1 cursor-pointer text-slate-700 text-sm font-semibold rounded-lg w-full text-left transition-colors duration-150 hover:bg-accent  ${
                isActive ? " text-primary bg-accent"
                  : "text-gray-500 hover:bg-accent hover:text-primary"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <span className="">{item.icon}</span>
              {!collapsed && (
             

                <span className={({isActive})=>`text-sm font-semibold  ${isActive ? "text-primary" : "text-gray-700"}`}>
                  {item.label}
                  </span>
                // <span className="text-sm font-semibold">
                //   {item.label}
                //   </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 py-3 border-t border-gray-200">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-accent cursor-pointer hover:text-primary transition-colors duration-150 ${collapsed ? "justify-center" : ""}`}
          >
            <svg
              width="16" height="16"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {!collapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </aside>

   
    </div>
    </>
  )
}
