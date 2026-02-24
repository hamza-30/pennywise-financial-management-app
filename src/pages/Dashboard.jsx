import React, { useState } from "react";
import DashboardStatsCard from "../components/DashboardStatsCard";
import { FiArrowRight } from "react-icons/fi";
import { IoReceiptSharp } from "react-icons/io5";
import RecentTransactionCard from "../components/RecentTransactionCard";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";
import WorkingCapitalChart from "../components/WorkingCapitalChart";

function Dashboard() {
  const { transactions } = useTransactions();
  const [initialBalance, setInitialBalance] = useState(0)

  const income = Number( (transactions.filter((trans) => trans.type == "Income").filter((trans) => {
    let transDate = new Date(trans.date)
    let today = new Date()

    return transDate.getMonth() == today.getMonth()
  }).reduce((acc, trans) => acc + trans.amount, 0)).toFixed(2) )

  const expense = Number( (transactions.filter((trans) => trans.type == "Expense").filter((trans) => {
    let transDate = new Date(trans.date)
    let today = new Date()

    return transDate.getMonth() == today.getMonth()
  }).reduce((acc, trans) => acc + trans.amount, 0)).toFixed(2) )

  const filteredTransactions = transactions
    .sort((a, b) => {
      let dateA = new Date(a.date).getTime();
      let dateB = new Date(b.date).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div
      className={`flex flex-col h-full gap-y-8 md:gap-y-6 pt-8 pb-5 px-4 lg:px-8 overflow-hidden`}
    >
      <div
        className={`flex flex-col h-fit md:flex-row justify-between gap-x-7 gap-y-5`}
      >
        <DashboardStatsCard description={"Total balance"} amount={initialBalance + income - expense} />
        <DashboardStatsCard description={"Total spending"} amount={expense} />
        <DashboardStatsCard description={"Total income"} amount={income} />
      </div>

      <div
        className={`h-96 w-full flex flex-col pt-5 pb-2 px-4 md:px-6 bg-white rounded-xl`}
      >
        <WorkingCapitalChart />
      </div>

      <div
        className={`rounded-xl h-fit bg-white py-5 px-4 md:px-6 shadow-[0_0px_8px_rgba(0,0,0,0.04)`}
      >
        <div className={`flex justify-between mb-6`}>
          <span className={`text-[1.2rem] text-[#111e43] font-semibold`}>
            Recent Transactions
          </span>
          <span
            className={`flex items-center text-sm gap-x-1 text-[#c4f82a] hover:text-[#b2e220] active:text-[#b2e220] cursor-pointer`}
          >
            View All <FiArrowRight className={`text-base`} />
          </span>
        </div>

        <div className={`flex flex-col gap-y-4`}>

          {filteredTransactions.length == 0 && (
            <div className={`w-full h-50 flex flex-col items-center justify-center gap-y-2`}>
            <IoReceiptSharp className={`text-4xl text-[#a0c435]`}/>
            <p className={`font-semibold text-xl text-gray-400`}>No transactions yet</p>
          </div>
          )}

          {filteredTransactions.map((trans) => (
            <RecentTransactionCard
              key={trans.id}
              desc={trans.desc}
              type={trans.type}
              amount={trans.amount}
              date={trans.date}
              category={trans.category}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
