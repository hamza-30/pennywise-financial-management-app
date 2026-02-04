import React from 'react'
import { MdAccountBalanceWallet } from "react-icons/md";
import { HiTrendingUp } from "react-icons/hi";
import { HiTrendingDown } from "react-icons/hi";

function DashboardStatsCard({description, amount}) {
  return (
    <div
        className={`flex-1 flex items-center justify-start gap-x-4 px-6 py-5 rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)]
            ${description == "Total balance" ? "bg-[#2c2c2c]": "bg-white"} `}
    >
        <div className={`h-12 w-12 flex items-center justify-center rounded-[100%]
            ${description == "Total balance" ? "bg-[#4f4f4f]" : "bg-[#eaeaea]"}`}>
            {description == "Total balance" && <MdAccountBalanceWallet className={`text-2xl text-[#c4f82a]`} />}
            {description == "Total spending" && <HiTrendingDown className={`text-2xl`} />}
            {description == "Total income" && <HiTrendingUp className={`text-2xl`} />}
        </div>
        <div className={`flex flex-col gap-y-1`}>
            <div className={`text-[#a8a7a7] text-sm font-medium`}>{description}</div>
            <div className={`text-[1.8rem] font-semibold font-[Calibri]
            ${description == "Total balance" && "text-white"}    
            `}>${amount}</div>
        </div>
    </div>
  ) 
}

export default DashboardStatsCard