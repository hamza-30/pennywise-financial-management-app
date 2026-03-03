import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SidebarContextProvider from './context/SidebarContext/SidebarContextProvider.jsx'
import AuthContextProvider from './context/AuthContext/AuthContextProvider.jsx'
import TransactionContextProvider from "./context/TransactionContext/TransactionContextProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TransactionContextProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </TransactionContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
