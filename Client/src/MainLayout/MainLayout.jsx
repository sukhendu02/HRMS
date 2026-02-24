import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
export default function MainLayout() {
  return (
    <>
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
    </>
  )
}
