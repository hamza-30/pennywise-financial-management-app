import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";

function TransactionCard({ id, desc, type, date, category, amount, editingTransaction, setEditingTransaction, setAddTransactionOpen, transaction, onDeleteClick}) {

  function handleClick(){
    setEditingTransaction(transaction)
    setAddTransactionOpen(true)
  }

  return (
    <div
      className={`md:hidden w-full h-fit mt-7 rounded-xl border border-gray-100 px-5 py-5 font-[sans-serif] shadow-[0_0px_10px_rgba(0,0,0,0.04)]`}
    >
      <div
        className={`flex justify-between border-b border-gray-100 pb-4 mb-5`}
      >
        <div className={`flex flex-col `}>
          <span className={`text-[1.05rem] font-semibold text-[#111e43] pr-4`}>
            {desc}  
          </span>
          <span className={`text-xs text-gray-500`}>{date}</span>
        </div>

        {type == "Income" ? (
          <div className={`font-semibold text-[1.04rem] text-[#33a887]`}>
            +${amount}
          </div>
        ) : (
          <div className={`font-semibold text-[1.04rem] text-[#111e43]`}>
            -${amount}
          </div>
        )}
      </div>

      <div className={`flex justify-between items-center`}>
        <span
          className={`h-fit text-xs text-gray-600 bg-[#f0eeee] px-2 py-1 rounded-lg`}
        >
          {category}
        </span>
        <div>
          <button
            className={`text-[#c4f82a] text-[1.1rem] bg-[#f2fdd3] active:bg-[#e6fcac] inline-flex mr-3 px-1.5 py-1.5 rounded-md lg:text-gray-500 lg:bg-gray-100 hover:text-[#c4f82a] hover:bg-[#f3fcda]`}
            onClick={handleClick}
          >
            <FiEdit2 />
          </button>
          <button
            className={`text-[#ab4f55] text-[1.1rem] bg-[#fee4e6] active:bg-[#ffcdd1] inline-flex px-1.5 py-1.5 rounded-md`}
            onClick={() => onDeleteClick(id)}
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
