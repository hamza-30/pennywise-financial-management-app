import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Transactions from './pages/Transactions'
import TransactionContextProvider from './context/TransactionContext/TransactionContextProvider'

function App() {

  return (
    <>
      <div className='w-full h-screen flex overflow-hidden'>
        <Sidebar />

        <div className='flex flex-col flex-1 h-full overflow-y-auto'>
          <Header />
          <main>
            <TransactionContextProvider>
              <Transactions />
            </TransactionContextProvider>
          </main>
        </div>
      </div>
    </>
  ) 
}

export default App
