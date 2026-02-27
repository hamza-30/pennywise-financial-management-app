import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"

function Layout() {
  const {pathname} = useLocation()
  const scrollRef = useRef(null)

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollTop = 0
    }
  }, [pathname])

  return (
    <div className='w-full h-screen flex overflow-hidden'>
        <Sidebar />

        <div ref={scrollRef} className='flex flex-col flex-1  overflow-y-auto'>
          <Header />
          <main className={`flex-1`}>
            <Outlet />
          </main>
        </div>
      </div>
  )
}

export default Layout