import React from 'react'
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { LuHouse } from "react-icons/lu";
import { IoGiftOutline } from "react-icons/io5";
import { RiRefund2Line } from "react-icons/ri";
import { MdCandlestickChart } from "react-icons/md";
import { BsHouseDoor } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdOutlineBakeryDining } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { MdOutlineSchool } from "react-icons/md";
import { IoAppsOutline } from "react-icons/io5";
import { TbUserHeart } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";
import { BiDonateHeart } from "react-icons/bi";
import { TbTax } from "react-icons/tb";
import { LuPackage2 } from "react-icons/lu";


function RecentTransactionCard({desc, type, date, category, amount}) {
   let categObj = {
        "Health": [MdOutlineHealthAndSafety, "text-blue-600"],
        "Salary": [MdOutlinePayments, "text-emerald-600"],
        "Freelance": [LuBriefcaseBusiness, "text-teal-500"],
        "Investments": [IoBarChartOutline, "text-cyan-600"],
        "Rental Income": [LuHouse, "text-emerald-700"],
        "Gifts": [IoGiftOutline, "text-purple-600"],
        "Refunds": [RiRefund2Line, "text-violet-500"],
        "Crypto": [MdCandlestickChart, "text-sky-600"],
        "Housing": [BsHouseDoor, "text-slate-600"],
        "Utilities": [AiOutlineThunderbolt, "text-amber-500"],
        "Food & Dining": [MdOutlineBakeryDining, "text-orange-600"],
        "Groceries": [MdOutlineLocalGroceryStore, "text-orange-500"],
        "Transport": [MdOutlineEmojiTransportation, "text-indigo-600"],
        "Shopping": [LuShoppingBag, "text-pink-600"],
        "Insurance": [IoShieldCheckmarkOutline, "text-blue-700"],
        "Entertainment": [IoPlayOutline, "text-rose-500"],
        "Travel": [MdOutlineAirplaneTicket, "text-indigo-500"],
        "Education": [MdOutlineSchool, "text-sky-500"],
        "Software/Subs": [IoAppsOutline, "text-cyan-500"],
        "Personal Care": [TbUserHeart, "text-pink-500"],
        "Debt/Loans": [CiMoneyBill, "text-slate-800"],
        "Gifts & Charity": [BiDonateHeart, "text-purple-500"],
        "Taxes": [TbTax, "text-slate-500"],
        "Other": [LuPackage2, "text-gray-500"],
   };

    const [IconComponent, colorClass] = categObj[category]

  return (
    <div
          className={`w-full flex justify-between h-fit font-[sans-serif]`}
        >
            <div className={`flex gap-x-2 md:gap-x-4 items-center`}>
                <div className={`bg-gray-50 rounded-lg w-9 h-9 flex items-center justify-center`}>
                    <IconComponent className={`text-xl ${colorClass}`}/>
                </div>

                <div className={`flex flex-col`}>
                <span className={`text-[0.93rem] font-semibold text-[#111e43] pr-4`}>
                    {desc}  
                </span>
                <span className={`text-xs text-gray-500`}>{category}</span>
                </div>
            </div>

            <div className={`flex flex-col`}>
                {type == "Income" ? (
                <div className={`font-semibold text-[0.93rem] text-[#33a887] text-right`}>
                    +${amount}
                </div>
                ) : (
                <div className={`font-semibold text-[0.93rem] text-[#111e43] text-right`}>
                    -${amount}
                </div>
                )}
                <span className={`text-xs text-gray-500`}>{date}</span>
            </div>
        </div>
  )
}

export default RecentTransactionCard