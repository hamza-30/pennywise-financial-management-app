import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { useContext } from 'react';
import SidebarContext from "../context/SidebarContext/SidebarContext"
import { FaUserCircle } from "react-icons/fa"; 
import { useLocation } from 'react-router-dom';

function Header() {
    const {isOpen, setIsOpen} = useContext(SidebarContext)
    const {pathname} = useLocation()

  return (
    <>
        <div className={`min-h-16 flex items-center pr-5 transition-all duration-300 ease-in-out text-[#383f45]
            ${isOpen ? "pl-7.5" : "pl-15"}`}>
            {pathname == "/" &&
                <span className={`text-2xl font-bold hidden md:inline`}>
                    Dashboard
                </span>
            }

            <div className='flex items-center gap-x-2 ml-auto'>
                <FaUserCircle className={`text-[1.8rem]`}/>
                <span className='text-sm font-bold hidden md:inline'>Magnus Carlsen</span>
            </div>
        </div>
    </>
  )
}

export default Header