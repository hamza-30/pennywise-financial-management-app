import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";

function TransactionRow({ id, desc, type, category, date, amount, setEditingTransaction, setAddTransactionOpen, transaction }) {
  const { deleteTransaction } = useTransactions()

  function handleClick(){
    setEditingTransaction(transaction)
    setAddTransactionOpen(true)
  }
  
  return (
    <>
      <tr className="hover:bg-gray-50 hidden md:table-row">
        <td className="px-3 py-4 text-black">{desc}</td>
        <td className="px-3 py-4">
          {type == "Expense" ? (
            <span
              className={`text-[0.8rem] text-center text-[#ab4f55] font-semibold bg-[#fae5e6] px-3 pb-0.5 rounded-xl`}
            >
              expense
            </span>
          ) : (
            <span
              className={`text-[0.8rem] text-center text-[#428176] font-semibold bg-[#bef9ef] px-3 pb-0.5 rounded-xl`}
            >
              income
            </span>
          )}
        </td>
        <td className="px-3 py-4 text-[#777e86]">{category}</td>
        <td className="px-3 py-4 text-[#777e86]">{date}</td>
        <td className="px-3 py-4 text-right text-[1.06rem] font-semibold">
          {type == "Income" ? `+${amount}` : `-${amount}`}
        </td>
        <td className="px-3 py-4 text-right">
          <button
            className={`text-[#c4f82a] text-[1.1rem] bg-[#f2fdd3] inline-flex mr-3 px-1 py-1 rounded-md lg:text-gray-500 lg:bg-gray-100 hover:text-[#c4f82a] hover:bg-[#f3fcda]`}
            onClick={handleClick}
          >
            <FiEdit2 />
          </button>
          <button
            className={`text-[#ab4f55] text-[1.1rem] bg-[#fee4e6] inline-flex px-1 py-1 rounded-md lg:text-gray-500 lg:bg-gray-100 hover:text-[#ab4f55] hover:bg-[#fee4e6]`}
            onClick={() => deleteTransaction(id)}
          >
            <RiDeleteBinLine />
          </button>
        </td>
      </tr>
    </>
  );
}

export default TransactionRow;
