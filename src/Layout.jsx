import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

function Layout() {
  return (
    <div className='w-full h-screen flex overflow-hidden'>
        <Sidebar />

        <div className='flex flex-col flex-1  overflow-y-auto'>
          <Header />
          <main className={`flex-1`}>
            <Outlet />
          </main>
        </div>
      </div>
  )
}

export default Layout