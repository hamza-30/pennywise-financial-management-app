import React, { useContext } from 'react';
import SidebarContext from "../context/SidebarContext/SidebarContext";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext/AuthContextProvider"

function Header() {
  const { isOpen } = useContext(SidebarContext);
  const { pathname } = useLocation();
  const { user } = useAuthContext()

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : "?";
  };

  return (
    <div className={`min-h-16 flex items-center pr-5 transition-all duration-300 ease-in-out text-[#383f45]
        ${isOpen ? "pl-7.5" : "pl-15"}`}>
        
        {pathname === "/" && (
          <span className="text-2xl font-bold hidden md:inline">
            Dashboard
          </span>
        )}

        <div className="flex items-center gap-x-3 ml-auto md:px-3 py-1.5 rounded-full hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all cursor-pointer group">
          
          <div className="relative">
            {user.photoURL ? (
              <div className="w-10 h-10 rounded-full border-2 border-[#c4f82b] p-0.5 overflow-hidden bg-white">
                <img 
                  src={user?.photoURL} 
                  alt="profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ) : (

              <div className="w-10 h-10 rounded-full bg-[#c4f82a] flex items-center justify-center border-2 border-white shadow-sm">
                <span className="text-black font-bold text-xs">
                  {getInitials(user?.displayName)}
                </span>
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-bold text-[#373c4a] leading-tight">
              {user.displayName}
            </span>
            <span className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              Personal Account
            </span>
          </div>
    
        </div>
    </div>
  );
}

export default Header;