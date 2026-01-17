import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {

  return (
    <>
      <div className='w-screen h-screen flex'>
        <Sidebar />

        <div className='flex flex-col flex-1 overflow-hidden'>
          <Header />
        </div>
      </div>
    </>
  ) 
}

export default App
