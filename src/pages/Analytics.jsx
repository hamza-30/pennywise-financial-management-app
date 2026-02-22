import React, { useMemo, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiArrowDownRight } from "react-icons/fi";
import { LuArrowUpRight } from "react-icons/lu";
import { IoIosTrendingUp } from "react-icons/io";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";

function filterByDate(transaction, dateFilter) {
  let transactionDate = new Date(transaction.date);
  let today = new Date();

  switch (dateFilter) {
    case "Last 7 Days":
      let previousSevenDaysDate = new Date(today);
      previousSevenDaysDate.setDate(today.getDate() - 7);
      return (
        transactionDate >= previousSevenDaysDate && transactionDate <= today
      );

    case "This Month":
      return (
        transactionDate.getMonth() == today.getMonth() &&
        transactionDate.getFullYear() == today.getFullYear()
      );

    case "Last Month":
      let lastMonthDate = new Date(today);
      lastMonthDate.setMonth(today.getMonth() - 1);
      lastMonthDate.setDate(1);

      return (
        transactionDate.getMonth() == lastMonthDate.getMonth() &&
        transactionDate.getFullYear() == lastMonthDate.getFullYear()
      );

    case "This Year":
      return transactionDate.getFullYear() == today.getFullYear();

    default:
      return true;
  }
}

function filterByPreviousDate(transaction, dateFilter) {
  let transactionDate = new Date(transaction.date);
  let today = new Date();

  switch (dateFilter) {
    case "Last 7 Days":
      let endDate = new Date(today);
      endDate.setDate(today.getDate() - 7);

      let startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 7);

      return transactionDate >= startDate && transactionDate < endDate;

    case "This Month":
      let startOfCurrentMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      );
      let startOfPreviousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );

      return (
        transactionDate >= startOfPreviousMonth &&
        transactionDate < startOfCurrentMonth
      );

    case "Last Month":
      let previousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );
      let consecutivePreviousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 2,
        1,
      );

      return (
        transactionDate >= consecutivePreviousMonth &&
        transactionDate < previousMonth
      );

    case "This Year":
      return transactionDate.getFullYear() == today.getFullYear() - 1;

    default:
      return true;
  }
}

const getDaysForComparison = (filter) => {
  const today = new Date();
  
  switch (filter) {
    case 'Last 7 Days':
      return { current: 7, previous: 7 };

    case 'This Month':
      const currentDays = today.getDate(); 
  
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      return { current: currentDays, previous: lastMonth };

    case 'Last Month':
      const selectedMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

      const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate();
      return { current: selectedMonth, previous: twoMonthsAgo };

    case 'This Year':
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const daysSoFar = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
     
      return { current: daysSoFar, previous: 365 };

    default:
      return { current: 1, previous: 1 };
  }
};

function calculateChangePercentage(current, previous){
  if(previous === 0){
    return current > 0 ? 100 : 0
  }

  let change = ((current - previous) / previous) * 100
  return Math.round(change)
}

function Analytics() {
  const { transactions } = useTransactions();

  let filterDropdown = ["Last 7 Days", "This Month", "Last Month", "This Year"];

  const [dateFilter, setDateFilter] = useState("This Month");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  let percentageSentence = {
    "Last 7 Days": "from previous 7 days",
    "This Month": "from last month",
    "Last Month": "from previous month",
    "This Year": "from last year",
  };

  const analyticsData = useMemo(() => {
    let dateFilteredTransactions = transactions.filter((trans) =>
      filterByDate(trans, dateFilter),
    );
    let previousDateFilteredTransactions = transactions.filter((trans) =>
      filterByPreviousDate(trans, dateFilter),
    );

    let totalSpending = Number(dateFilteredTransactions
      .filter((trans) => trans.type == "Expense")
      .reduce((acc, trans) => acc + trans.amount, 0).toFixed(2))
    let previousTotalSpending = previousDateFilteredTransactions
      .filter((trans) => trans.type == "Expense")
      .reduce((acc, trans) => acc + trans.amount, 0);

    let totalSpendingPercentage = calculateChangePercentage(totalSpending, previousTotalSpending)

    let {current: currentDays, previous: previousDays} = getDaysForComparison(dateFilter)
   
    let avgDaily = Number((totalSpending / currentDays).toFixed(2))
    let previousAvgDaily = previousTotalSpending / previousDays

    let avgDailyPercentage = calculateChangePercentage(avgDaily, previousAvgDaily)

    let expenseTransactions = dateFilteredTransactions.filter(
      (trans) => trans.type == "Expense",
    );
    let categoryObj = {};
    let highestCategory = "None";
    let maxExpense = 0;
    let highestCategoryPercentage = 0;

    if (expenseTransactions.length !== 0) {
      for (const trans of expenseTransactions) {
        categoryObj[trans.category] =
          (categoryObj[trans.category] || 0) + trans.amount;

        if (categoryObj[trans.category] > maxExpense) {
          maxExpense = categoryObj[trans.category];
          highestCategory = trans.category;
        }
      }

      highestCategoryPercentage =
        totalSpending > 0
          ? Math.round((categoryObj[highestCategory] / totalSpending) * 100)
          : 0;
    }

    return {
      totalSpending,
      totalSpendingPercentage,
      avgDaily,
      avgDailyPercentage,
      highestCategory,
      highestCategoryPercentage,
    };
  }, [transactions, dateFilter]);

  const {
    totalSpending,
    totalSpendingPercentage,
    avgDaily,
    avgDailyPercentage,
    highestCategory,
    highestCategoryPercentage,
  } = analyticsData;

  return (
    <>
      <div
        className={`flex flex-col h-full gap-y-8 md:gap-y-6 pt-8 pb-5 px-4 lg:px-8 overflow-hidden`}
      >
        <div
          className={`h-12 flex gap-y-4 justify-between items-center text-[#383f45]`}
        >
          <span className="text-[1.5rem] font-bold text-2xl ">Analytics</span>

          <div
            className={`bg-white w-33 h-7 rounded-lg border flex items-center pl-5 justify-between relative cursor-pointer
            ${filterDropdownOpen ? "border-[#c4f82a] ring-1 ring-[#c4f82a]" : "border-[#cecece]"}`}
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          >
            <span className={`text-[0.93rem]`}>{dateFilter}</span>
            <MdOutlineKeyboardArrowDown
              className={`text-xl transform ease-in-out duration-150
                  ${filterDropdownOpen ? "rotate-180" : "rotate-0"}`}
            />

            <ul
              className={`w-full bg-white top-8 left-0 border border-gray-200 text-[0.9rem]
                  ${filterDropdownOpen ? "absolute" : "hidden"}`}
            >
              {filterDropdown &&
                filterDropdown.map((filter, index) => (
                  <li
                    key={index}
                    className={`py-1 px-5 hover:bg-[#d6f96c] active:bg-[#d6f96c] z-10`}
                    onClick={() => setDateFilter(filter)}
                  >
                    {filter}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div
          className={`w-full min-h-fit flex justify-between items-center flex-col md:flex-row gap-x-6 gap-y-4`}
        >
          <div
            className={`flex-1 w-full flex px-6 py-5 rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)]
                  bg-white justify-between h-33`}
          >
            <div className={`flex flex-col `}>
              <span className={`text-[0.91rem] text-[#737374]`}>
                Total Spending
              </span>
              <span className={`text-[1.7rem] font-bold font-[Calibri]`}>
                ${totalSpending}
              </span>
              <span
                className={`text-[0.8rem] mt-3 font-medium text-gray-500
                ${totalSpendingPercentage > 0 ? "text-red-600" : "text-green-600"}`}
              >
                {`${totalSpendingPercentage > 0 ? "+" : ""}${totalSpendingPercentage}% ${percentageSentence[dateFilter]}`}
              </span>
            </div>

            {totalSpendingPercentage > 0 ? (
              <div
                className={`w-9 h-9 flex items-center justify-center bg-red-100 rounded-lg mt-0.5`}
              >
                <LuArrowUpRight className={`text-xl text-red-600`} />
              </div>
            ) : (
              <div
                className={`w-9 h-9 flex items-center justify-center bg-green-100 rounded-lg mt-0.5`}
              >
                <FiArrowDownRight className={`text-xl text-green-600`} />
              </div>
            )}
          </div>

          <div
            className={`flex-1 w-full flex px-6 py-5 rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)]
                  bg-white justify-between h-33`}
          >
            <div className={`flex flex-col `}>
              <span className={`text-[0.91rem] text-[#737374]`}>
                Average Daily
              </span>
              <span className={`text-[1.7rem] font-bold font-[Calibri]`}>
                ${avgDaily}
              </span>
              <span
                className={`text-[0.8rem] mt-3 text-green-600 font-medium
                ${avgDailyPercentage > 0 ? "text-red-600" : "text-green-600"}`}
              >
                {`${avgDailyPercentage > 0 ? "+" : ""}${avgDailyPercentage}% ${percentageSentence[dateFilter]}`}
              </span>
            </div>

            {avgDailyPercentage > 0 ? (
              <div
                className={`w-9 h-9 flex items-center justify-center bg-red-100 rounded-lg mt-0.5`}
              >
                <LuArrowUpRight className={`text-xl text-red-600`} />
              </div>
            ) : (
              <div
                className={`w-9 h-9 flex items-center justify-center bg-green-100 rounded-lg mt-0.5`}
              >
                <FiArrowDownRight className={`text-xl text-green-600`} />
              </div>
            )}
          </div>

          <div
            className={`flex-1 w-full flex px-6 py-5 rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)]
                  bg-white justify-between h-33`}
          >
            <div className={`flex flex-col `}>
              <span className={`text-[0.91rem] text-[#737374]`}>
                Highest Category
              </span>
              <span className={`text-[1.7rem] font-bold font-[Calibri]`}>
                {highestCategory}
              </span>
              <span className={`text-[0.8rem] mt-3 text-gray-500 font-medium`}>
                {highestCategoryPercentage}% of total spending
              </span>
            </div>

            <div
              className={`w-9 h-9 flex items-center justify-center bg-[#ebf7c9] rounded-lg mt-0.5`}
            >
              <IoIosTrendingUp className={`text-xl`} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Analytics;
