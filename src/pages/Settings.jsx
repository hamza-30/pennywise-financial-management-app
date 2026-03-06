import React from 'react'
import { LuShield } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";


function Settings() {
  return (
    <div
        className={`flex flex-col h-full gap-y-8 md:gap-y-6 pt-8 pb-5 px-4 lg:px-8 overflow-hidden`}
    >
        <div
          className={`h-12 flex gap-y-4 justify-between items-center text-[#383f45]`}
        >
          <span className="text-[1.5rem] font-bold text-2xl ">Settings</span>
        </div>

        <div
            className={`w-full flex flex-col px-6 py-5 rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)]
                  bg-white gap-y-6`}
          >
            <div className={`flex items-center gap-x-2 text-[#383f45] mb-1`}>
                <LuShield className='text-xl'/>
                <span className={`text-lg font-semibold`}>Data & Privacy</span>
            </div> 

            <div className={`flex justify-between items-center`}>
                <div className={`flex flex-col w-1/2 md:w-fit`}>
                    <span className={`text-base md:text-[1.03rem] leading-tight font-medium text-[#3b3a3a]`}>Export Data</span>
                    <span className={`text-[0.8rem] md:text-sm text-gray-500`}>Download your transaction history</span>
                </div>
                <div className={`flex items-center justify-center px-2 md:w-30 h-7.5 rounded-lg gap-x-2 bg-[#292929] hover:bg-[#292929c3] active:bg-[#292929c3] text-white cursor-pointer`}>
                    <FiDownload className={`text-base md:text-lg`}/>
                    <span className={`text-sm md:text-[0.95rem] font-medium`}>Export CSV</span>
                </div>
            </div>

            <div className={`flex justify-between items-center`}>
                <div className={`flex flex-col w-1/2 md:w-fit`}>
                    <span className={`text-base md:text-[1.03rem] leading-tight font-medium text-red-500`}>Clear Data</span>
                    <span className={`text-[0.8rem] md:text-sm text-gray-500`}>Permanently remove all transactions</span>
                </div>
                <div className={`flex items-center justify-center px-2 md:w-30 h-7.5 rounded-lg gap-x-2 bg-red-50 hover:bg-red-100 active:bg-red-100 cursor-pointer text-red-500`}>
                    <RiDeleteBin6Line className={`text-base md:text-lg`}/>
                    <span className={`text-sm md:text-[0.95rem] font-medium`}>Delete All</span>
                </div>
            </div>
          </div>


    </div>
  )
}

export default Settings