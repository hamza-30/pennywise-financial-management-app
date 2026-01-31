import React, { use, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoReceiptSharp } from "react-icons/io5";
import TransactionRow from "../components/TransactionRow";
import TransactionCard from "../components/TransactionCard";
import AddTransaction from "../components/AddTransaction";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";
import { checkDate } from "../utils/dateUtils";

function Transactions() {
  const [dateFilter, setDateFilter] = useState("This month");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTransaction, setSearchTransaction] = useState("")

  let categories = [
    { name: "All"}, 
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

  if(typeFilter == "Income"){
    categories = [{ name: "All"} , ...categories.filter((item) => item.type == "Income")]
  }
  else if(typeFilter == "Expense"){
    categories = [{ name: "All"} , ...categories.filter((item) => item.type == "Expense")]
  }

  let dateStyle =
    dateFilter !== "This month" ? "bg-[#c4f82a]" : "text-gray-700";
  let typeStyle = typeFilter !== "All" ? "bg-[#c4f82a]" : "text-gray-700";
  let categoryStyle =
    categoryFilter !== "All" ? "text-black bg-[#c4f82a]" : "text-gray-700";

  let { transactions } = useTransactions();

  let filteredTransactions = transactions.filter((trans) => {
    let matchesType = trans.type == typeFilter || typeFilter == "All";
    let matchesCategory =
      trans.category == categoryFilter || categoryFilter == "All";
    const matchesDate = checkDate(trans.date, dateFilter);

    return matchesType && matchesCategory && matchesDate;
  }).filter((trans) => {
    let desc = trans.desc.toLowerCase()
    return desc.includes(searchTransaction.toLowerCase())
  })

  filteredTransactions.sort((a, b) => {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });

  return (
    <>
      <div
        className={`inset-0
        ${addTransactionOpen ? "fixed" : "hidden"}`}
        onClick={() => setAddTransactionOpen(!addTransactionOpen)}
      ></div>
      <AddTransaction
        addTransactionOpen={addTransactionOpen}
        setAddTransactionOpen={setAddTransactionOpen}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />

      <div
        className={`flex flex-col h-full gap-y-15 md:gap-y-4 pt-8 pb-5 px-4 lg:px-8 overflow-hidden`}
      >
        <div
          className={`h-12 flex flex-col md:flex-row gap-y-4 items-start md:justify-between md:items-center text-[#383f45]`}
        >
          <span className="text-[1.5rem] font-bold text-2xl ">
            Transactions
          </span>

          <div
            className={`bg-[#c4f82a] hover:bg-[#b1e11e] flex items-center px-5 py-0.5 rounded-lg gap-x-2 transition-colors duration-150 ease-in-out cursor-pointer active:bg-[#b1e11e]`}
            onClick={() => setAddTransactionOpen(!addTransactionOpen)}
          >
            <span className="text-lg md:mb-1">+</span>
            <span className="text-sm font-medium">Add Transaction</span>
          </div>
        </div>

        <div
          className={`flex flex-col flex-1 bg-white rounded-2xl shadow-[0_0px_20px_rgba(0,0,0,0.04)] px-3 md:px-6 py-6`}
        >
          <div className={`flex w-full gap-x-2 gap-y-2 flex-col md:flex-row`}>
            <div
              className={`min-h-11 flex-1 flex items-center border border-gray-200 rounded-lg text-gray-500 px-3 focus-within:border-[#c4f82a] focus-within:shadow-[0_0_9px_rgba(196,248,42,0.35)]`}
            >
              <CiSearch className="text-lg" />
              <input
                type="text"
                value={searchTransaction}
                name="search-transaction"
                placeholder="Search transactions..."
                className={`h-full w-full focus:outline-0 pl-3 pb-[0.16rem] text-gray-800`}
                onChange={(e) => setSearchTransaction(e.target.value)}
              />
            </div>

            <div className={`flex gap-x-2`}>
              <select
                className={`h-8 md:h-11 max-w-22 rounded-lg text-gray-700 border border-gray-200 pl-2 hover:border-gray-400 text-sm focus:outline-[#c4f82a] ${dateStyle}`}
                name="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option className="bg-white" value="Today">
                  Today
                </option>
                <option className="bg-white" value="This week">
                  This week
                </option>
                <option className="bg-white" value="This month">
                  This month
                </option>
                <option className="bg-white" value="Last month">
                  Last month
                </option>
              </select>

              <select
                className={`h-8 md:h-11 min-w-22  rounded-lg text-gray-700 border border-gray-200 pl-2 hover:border-gray-400 text-sm focus:outline-[#c4f82a] ${typeStyle}`}
                name="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option className="bg-white" value="All">
                  All
                </option>
                <option className="bg-white" value="Income">
                  Income
                </option>
                <option className="bg-white" value="Expense">
                  Expense
                </option>
              </select>

              <select
                className={`h-8 md:h-11 max-w-22 rounded-lg text-gray-700 border border-gray-200 pl-2 hover:border-gray-400 text-sm focus:outline-[#c4f82a] ${categoryStyle}`}
                name="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((cat) => (
                  <option className="bg-white" key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className="w-full overflow-y-auto text-left border-collapse hidden md:table mt-8">
            <thead
              className={`text-[#777e86] text-xs font-extralight font-[Liberation Mono] border-b border-b-gray-300`}
            >
              <tr>
                <th className="pl-3 pr-18 py-2 pb-3">DESCRIPTION</th>
                <th className="px-3 py-2 pb-3">TYPE</th>
                <th className="px-3 py-2 pb-3">CATEGORY</th>
                <th className="px-3 py-2 pb-3">DATE</th>
                <th className="px-3 py-2 pb-3 text-right">AMOUNT</th>
                <th className="px-3 py-2 pb-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody >
              {filteredTransactions.map((trans) => (
                <TransactionRow
                  key={trans.id}
                  id={trans.id}
                  desc={trans.desc}
                  type={trans.type}
                  category={trans.category}
                  date={trans.date}
                  amount={trans.amount}
                  setEditingTransaction={setEditingTransaction}
                  setAddTransactionOpen={setAddTransactionOpen}
                  transaction={trans}
                />
              ))}
            </tbody>
          </table>

          <div className={``}>
            {filteredTransactions.map((trans) => (
              <TransactionCard
                key={trans.id}
                id={trans.id}
                desc={trans.desc}
                type={trans.type}
                category={trans.category}
                date={trans.date}
                amount={trans.amount}
                setEditingTransaction={setEditingTransaction}
                setAddTransactionOpen={setAddTransactionOpen}
                transaction={trans}
              />
            ))}
          </div>

          <div className={`flex-1 w-full flex flex-col items-center justify-center gap-y-2
            ${transactions.length == 0 ? "flex" : "hidden"}`}>
            <IoReceiptSharp className={`text-3xl md:text-5xl text-[#a0c435]`}/>
            <p className={`font-semibold text-xl md:text-2xl text-[#484848]`}>No transactions yet</p>
          </div>

          <div className={`flex-1 w-full flex flex-col items-center justify-center gap-y-2
            ${filteredTransactions.length == 0 ? "flex" : "hidden"}`}>
            <IoReceiptSharp className={`text-3xl md:text-5xl text-[#a0c435]`}/>
            <p className={`font-semibold text-xl md:text-2xl text-[#484848]`}>No transactions found</p>
            <p className={`text-[#595959] text-sm`}>Try refining your search or adjust filters.</p>
          </div>
        </div> 
      </div>
    </>
  );
}

export default Transactions;
