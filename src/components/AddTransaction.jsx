import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import  {nanoid} from "nanoid";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";


function AddTransaction({addTransactionOpen, setAddTransactionOpen, editingTransaction, setEditingTransaction}) {
  const [activeTab, setActiveTab] = useState("Expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {addTransaction, editTransaction} = useTransactions()

  const categoryList = [
    { name: "Salary", type: "Income" },
    { name: "Freelance", type: "Income" },
    { name: "Investments", type: "Income" },
    { name: "Rental Income", type: "Income" },
    { name: "Gifts", type: "Income" },
    { name: "Refunds", type: "Income" },
    { name: "Crypto", type: "Income" },

    { name: "Housing", type: "Expense" },
    { name: "Utilities", type: "Expense" },
    { name: "Food & Dining", type: "Expense" },
    { name: "Groceries", type: "Expense" },
    { name: "Transport", type: "Expense" },
    { name: "Shopping", type: "Expense" },
    { name: "Health", type: "Expense" },
    { name: "Insurance", type: "Expense" },
    { name: "Entertainment", type: "Expense" },
    { name: "Travel", type: "Expense" },
    { name: "Education", type: "Expense" },
    { name: "Software/Subs", type: "Expense" },
    { name: "Personal Care", type: "Expense" },
    { name: "Debt/Loans", type: "Expense" },
    { name: "Gifts & Charity", type: "Expense" },
    { name: "Taxes", type: "Expense" },
    { name: "Other", type: "Expense" },
  ];

  useEffect(() => {
    if(editingTransaction){
      setActiveTab(editingTransaction.type)
      setDescription(editingTransaction.desc)
      setAmount(editingTransaction.amount)
      setDate(editingTransaction.date)
      setCategory(editingTransaction.category)
    } 
    else{
      setActiveTab("Expense")
      setDescription("")
      setAmount(0)
      setDate("Apr 26, 2026")
      setCategory("Other")
    }
}, [editingTransaction])

  function submit(){
    if(editingTransaction){
      let updatedTransaction = { 
        desc: description,
        type: activeTab,
        date: date,
        category: category,
        amount: amount,
      
      }
      editTransaction(editingTransaction.id, updatedTransaction)
      setEditingTransaction(null)
    }
    else{
      let newTransaction = {
        id: nanoid(),
        desc: description,
        type: activeTab,
        date: date,
        category: category,
        amount: amount,
      }

      addTransaction(newTransaction)
    }

    setAddTransactionOpen(!addTransactionOpen)
  }

  function handleCancelClick(){
    if(editingTransaction){
      setEditingTransaction(null)
    }
    setAddTransactionOpen(!addTransactionOpen)
  }

  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-[90vw] md:w-[60vw] lg:w-120 py-5 px-4 md:px-6 backdrop-blur-xl flex flex-col bg-white rounded-2xl border border-gray-600 transition-all duration-300 ease-in-out z-50
                  ${addTransactionOpen ? "absolute" : "hidden"}`}
      >
        <div
          className={`flex justify-between  h-fit items-center pb-6 border-b border-gray-200`}
        >
          <span className={`text-[1.25rem] font-bold text-[#373c4a]`}>
            {editingTransaction ? "Edit Transaction" : "New Transaction"}
          </span>
          <span
            className={`px-1 py-1 hover:bg-gray-100 active:bg-gray-100 rounded-lg group`}
            onClick={handleCancelClick}
          >
            <IoCloseOutline
              className={`text-2xl text-gray-400 group-hover:text-black group-active:text-black`}
            />
          </span>
        </div>

        <div className={`mt-5 flex flex-col gap-y-3`}>
          <div
            className={`w-full bg-gray-100 h-10 rounded-lg flex items-center px-1 cursor-pointer
                    font-semibold text-[0.95rem] transition-all ease-in-out duration-300`}
          >
            <div
              onClick={() => setActiveTab("Expense")}
              className={`w-[50%] h-8 text-center hover:text-black rounded-md flex items-center justify-center
                        ${activeTab == "Expense" ? "bg-white text-black" : " text-gray-500 bg-none"}
                        `}
            >
              Expense
            </div>
            <div
              onClick={() => setActiveTab("Income")}
              className={`w-[50%] h-8 text-center hover:text-black rounded-md flex items-center justify-center
                        ${activeTab == "Income" ? "bg-white text-black" : "text-gray-500 bg-none"}
                        `}
            >
              Income
            </div>
          </div>

          <div
            className={`flex flex-col gap-y-1 text-[0.80rem] text-gray-500 tracking-wide`}
          >
            <span className={`font-semibold`}>DESCRIPTION</span>
            <input
              type="text"
              value={description}
              placeholder="e.g. Grocery Shopping"
              className={`h-11 rounded-lg px-4 border border-gray-300 text-base focus:text-black focus:border-[#c4f82a] focus:shadow-[0_0_9px_rgba(196,248,42,0.35)] focus:outline-none`}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div
            className={`flex flex-col gap-y-3 md:flex-row justify-between gap-x-4`}
          >
            <div
              className={`flex flex-1 flex-col gap-y-1 text-[0.80rem] text-gray-500 tracking-wide`}
            >
              <span className={`font-semibold`}>AMOUNT</span>
              <input
                type="text"
                value={amount}
                placeholder="0.00"
                className={`h-11 rounded-lg px-4 border border-gray-300 text-base focus:text-black focus:border-[#c4f82a] focus:shadow-[0_0_9px_rgba(196,248,42,0.35)] focus:outline-none`}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>

            <div
              className={`flex flex-1 md:min-w-0 flex-col gap-y-1 text-[0.80rem] text-gray-500 tracking-wide`}
            >
              <span className={`font-semibold`}>DATE</span>
              <input
                type="date"
                value={date}
                className={`h-11 w-full rounded-lg px-4 border border-gray-300 text-base focus:text-black focus:border-[#c4f82a] focus:shadow-[0_0_9px_rgba(196,248,42,0.35)] focus:outline-none`}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div
            className={`flex flex-1 flex-col gap-y-1 text-[0.80rem] text-gray-500 tracking-wide`}
          >
            <span className={`font-semibold`}>CATEGORY</span>
            <div
              className={`h-11 rounded-lg px-4 border border-gray-300 text-base hover:border-[#c4f82a] focus:shadow-[0_0_9px_rgba(196,248,42,0.35)] focus:outline-none flex items-center relative `}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {category}

              <div
                className={`absolute left-0 top-10 bg-white w-full overflow-y-scroll ${isDropdownOpen ? "block" : "hidden"}`}
              >
                <ul className={`rounded-lg h-24 cursor-pointer`}>
                  {activeTab == "Expense"
                    ? categoryList
                        .filter((cat) => cat.type == "Expense")
                        .map((cat, index) => (
                          <li
                            key={cat.name}
                            className={`py-2 px-4 hover:bg-gray-200 active:bg-gray-200 text-black`}
                            value={cat.name}
                            onClick={() => setCategory(cat.name)}
                          >
                            {cat.name}
                          </li>
                        ))
                    : categoryList
                        .filter((cat) => cat.type == "Income")
                        .map((cat, index) => (
                          <li
                            key={cat.name}
                            className={`py-2 px-4 hover:bg-gray-200 active:bg-gray-200 text-black`}
                            value={cat.name}
                            onClick={() => setCategory(cat.name)}
                          >
                            {cat.name}
                          </li>
                        ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`h-fit flex justify-end items-center gap-x-3 text-sm mt-5 font-semibold text-[#2e420b]`}
          >
            <span
              className={`px-3 py-2 hover:bg-gray-100 active:bg-gray-100 rounded-lg cursor-pointer`}
              onClick={handleCancelClick}
            >
              Cancel
            </span>
            <span
              className={`px-3 py-2 rounded-lg bg-[#c5f828] hover:bg-[#b6e726] active:bg-[#b6e726] cursor-pointer`}
              onClick={submit}
            >
              {editingTransaction ? "Update" : "Add Transaction"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTransaction;
