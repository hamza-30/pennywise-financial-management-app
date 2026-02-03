import React, { useContext, useEffect, useState } from "react";
import pennywiselogo from "../assets/images/pennywiselogo.png";
import { FiSidebar } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import SidebarContext from "../context/SidebarContext/SidebarContext";

const Sidebar = () => {

  const {isOpen, setIsOpen} = useContext(SidebarContext)

  return (
    <>
      <div
        className={`fixed min-h-screen inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`h-screen fixed lg:static py-4 transition-all duration-300 ease-in-out bg-white z-50
      ${isOpen ? "w-68 md:w-65" : "w-0"} flex flex-col`}
      >
        <div className="w-full flex justify-between pl-5 pr-4 ">
          <div
            className={`w-40 h-auto
              ${!isOpen ? "opacity-0" : "opacity-100"}`}
          >
            <img
              src={pennywiselogo}
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="group w-fit h-fit mt-1 lg:mt-0.5">
            <FiSidebar
              className={`text-2xl opacity-10 hover:opacity-100 transition-opacity duration-300 hidden lg:inline-block
                  ${!isOpen ? "opacity-100" : "opacity-10"}`}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />

            <GiHamburgerMenu
              className={`text-2xl lg:hidden transition-all duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              } `}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>
        </div>

        <div
          className={`h-full px-5 flex flex-col justify-between transform transition-transform duration-300 ${
            isOpen ? "scale-x-100" : "scale-x-0"
          }`}
        >
          <div
            className={`pt-10 flex flex-col gap-y-1 transition-all duration-300
            `}
          >
            <a
              href=""
              onClick={(e) => e.preventDefault()}
              className={`w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl hover:bg-gray-100 hover:text-black active:bg-[#c4f82b] active:font-semibold
                
                `}
            >
              <MdOutlineDashboard className={`text-2xl mr-3`} />
              <p className={`text-[1rem] `}>Dashboard</p>
            </a>
            
            <a
              href=""
              onClick={(e) => e.preventDefault()}
              className={`w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl hover:bg-gray-100 hover:text-black active:bg-[#c4f82b] active:font-semibold
                `}
            >
              <IoCardOutline className={`text-2xl mr-3`} />
              <p className={`text-[1rem] `}>Transactions</p>
            </a>
            <a
              href=""
              onClick={(e) => e.preventDefault()}
              className={`w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl hover:bg-gray-100 hover:text-black active:bg-[#c4f82b] active:font-semibold
                `}
            >
              <GrAnalytics className={`text-2xl mr-3`} />
              <p className={`text-[1rem] `}>Analytics</p>
            </a>
            <a
              href=""
              onClick={(e) => e.preventDefault()}
              className={`w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl hover:bg-gray-100 hover:text-black active:bg-[#c4f82b] active:font-semibold`}
            >
              <IoSettingsOutline className={`text-2xl mr-3`} />
              <p className={`text-[1rem] `}>Settings</p>
            </a>
          </div>

          <div
            className={`w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl hover:text-red-400 active:text-red-400 cursor-pointer`}
          >
            <HiOutlineLogout className={`text-2xl mr-3`} />
            <p className={`text-[1rem]`}>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
