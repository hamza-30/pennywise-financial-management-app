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
import { NavLink, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { logout } = useAuthContext();
  const { pathname } = useLocation();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname]);

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
            <NavLink
              to={""}
              className={({
                isActive,
              }) => `w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl 
              ${isActive ? "bg-[#c4f82b] text-black font-semibold" : "text-[#898e96] hover:bg-gray-100 hover:text-black "}
              `}
            >
              <MdOutlineDashboard className={`text-[1.3rem] mr-3`} />
              <p className={`text-[1.02rem] `}>Dashboard</p>
            </NavLink>

            <NavLink
              to={"/transactions"}
              className={({
                isActive,
              }) => `w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl 
              ${isActive ? "bg-[#c4f82b] text-black font-semibold" : "text-[#898e96] hover:bg-gray-100 hover:text-black "}
              `}
            >
              <IoCardOutline className={`text-[1.3rem] mr-3`} />
              <p className={`text-[1.02rem] `}>Transactions</p>
            </NavLink>
            <NavLink
              to={"/analytics"}
              className={({
                isActive,
              }) => `w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl
              ${isActive ? "bg-[#c4f82b] text-black font-semibold" : "text-[#898e96] hover:bg-gray-100 hover:text-black "}
              `}
            >
              <GrAnalytics className={`text-[1.3rem] mr-3`} />
              <p className={`text-[1.02rem] `}>Analytics</p>
            </NavLink>
            <NavLink
              to={"/settings"}
              className={({
                isActive,
              }) => `w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl
              ${isActive ? "bg-[#c4f82b] text-black font-semibold" : "text-[#898e96] hover:bg-gray-100 hover:text-black "}
              `}
            >
              <IoSettingsOutline className={`text-[1.3rem] mr-3`} />
              <p className={`text-[1.02rem] `}>Settings</p>
            </NavLink>
          </div>

          <div
            onClick={() => setLogoutModalOpen(true)}
            className={`w-full flex items-center text-[#898e96] pl-4 py-3 rounded-xl hover:text-red-400 active:text-red-400 cursor-pointer`}
          >
            <HiOutlineLogout className={`text-[1.3rem] mr-3`} />
            <p className={`text-[1.02rem]`}>Logout</p>
          </div>
        </div>
      </div>

      <div
        className={`inset-0 z-40
        ${logoutModalOpen ? "fixed" : "hidden"}`}
        onClick={() => setLogoutModalOpen(false)}
      ></div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[90vw] md:w-[60vw] lg:w-120 pt-4 pb-3 px-4 md:px-6 backdrop-blur-xl flex flex-col bg-white rounded-2xl border border-gray-600 transition-all duration-300 ease-in-out z-50 gap-y-5
                ${logoutModalOpen ? "absolute" : "hidden"}
                `}
      >
        <p className={`font-medium`}>Are you sure you want to logout?</p>

        <div className={`ml-auto`}>
          <button
            className={`px-3 py-1.5 text-sm mr-3 hover:bg-gray-100 active:bg-gray-100 rounded-lg cursor-pointer`}
            onClick={() => setLogoutModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-3 py-1.5 text-sm w-fit text-white rounded-lg bg-[#ef4444] hover:bg-[#dc2626] active:bg-[#dc2626] cursor-pointer`}
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
