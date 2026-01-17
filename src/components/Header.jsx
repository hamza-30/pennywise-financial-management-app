import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { useContext } from 'react';
import SidebarContext from "../context/SidebarContext/SidebarContext"
import { FaUserCircle } from "react-icons/fa";

function Header() {
    const {isOpen, setIsOpen} = useContext(SidebarContext)

  return (
    <>
        <div className={`h-16 flex items-center pr-5 justify-between transform-all duration-300 ease-in-out text-[#383f45]
            ${isOpen ? "pl-5" : "pl-15"}`}>
            <span className={`text-2xl font-bold`}>
                Dashboard
            </span>

            <div className='flex items-center gap-x-2'>
                <FaUserCircle className={`text-[1.8rem]`}/>
                <span className='text-sm font-bold hidden md:inline'>Magnus Carlsen</span>
            </div>
        </div>
    </>
  )
}

export default Header