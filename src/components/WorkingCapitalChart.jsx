import React, { useMemo, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TiChartLineOutline } from "react-icons/ti";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";
import { BiReplyAll } from "react-icons/bi";

function WorkingCapitalChart() {
  const { transactions } = useTransactions();

  const [graphDateModalOpen, setGraphDateModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("This month");

  let chartData = useMemo(() => {
    let computeChartData = transactions.reduce((acc, trans) => {
      if (!acc.hasOwnProperty(trans.date)) {
        if (trans.type == "Income") {
          acc[trans.date] = {
            fullDate: trans.date,
            date: trans.date.slice(0, 6),
            income: trans.amount,
            expense: 0,
          };
        } else {
          acc[trans.date] = {
            fullDate: trans.date,
            date: trans.date.slice(0, 6),
            expense: trans.amount,
            income: 0,
          };
        }
      } else {
        if (trans.type == "Income") {
          acc[trans.date].income += trans.amount;
        } else {
          acc[trans.date].expense += trans.amount;
        }
      }

      return acc;
    }, {});

    return Object.values(computeChartData)
      .sort((a, b) => {
        return new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime();
      })
      .filter((trans) => {
        let today = new Date();
        let transactionDate = new Date(trans.fullDate);

        switch (dateFilter) {
          case "This month":
            return (
              transactionDate.getMonth() == today.getMonth() && transactionDate.getFullYear() == today.getFullYear()
            );

          case "Last 7 days":
            let previousSevenDate = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() - 7,
            );
            return (
              transactionDate > previousSevenDate && transactionDate <= today
            );

          default:
            return true;
        }
      });
  }, [transactions, dateFilter]);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <div className="text-5xl mb-2 text-[#ade110]"><TiChartLineOutline /></div>
        <p className="text-base font-medium">No data available for this month</p>
        <p className="text-sm">Add a transaction to see your capital flow.</p>
      </div>
    );
  }

  return (
    <div className={`h-full w-full flex flex-col gap-y-5`}>
      <div className={`flex justify-between md:items-center`}>
        <span className={`text-[1.2rem] text-[#111e43] font-semibold`}>
          Working Capital
        </span>

        <div
          className={`flex gap-x-3 flex-col gap-y-1 md:flex-row mt-1 md:mt-0`}
        >
          <div className={`flex gap-x-3`}>
            <div className={`flex items-center gap-x-1.5`}>
              <span
                className={`w-2 h-2 bg-[#2cb283] rounded-full inline-block`}
              ></span>
              <span className={`text-[#787878] text-[0.93rem]`}>Income</span>
            </div>
            <div className={`flex items-center gap-x-1.5`}>
              <span
                className={`w-2 h-2 bg-[#cdf045] rounded-full inline-block`}
              ></span>
              <span className={`text-[#787878] text-[0.93rem]`}>Expense</span>
            </div>
          </div>

          <div
            className={`min-w-28 flex items-center justify-between bg-gray-50 rounded-lg text-[0.85rem] pl-1.5 relative cursor-pointer transform ease-in-out duration-300 ml-auto`}
            onClick={() => setGraphDateModalOpen(!graphDateModalOpen)}
          >
            <div>{dateFilter}</div>
            <RiArrowDropDownLine
              className={`text-2xl 
              ${graphDateModalOpen ? " rotate-180 duration-300" : "rotate-0"}`}
            />

            <div
              className={`bg-gray-50 w-full h-fit top-6 left-0 rounded-md z-10
              ${graphDateModalOpen ? "absolute" : "hidden"}`}
            >
              <ul className="w-full">
                <li
                  className={`py-1 hover:bg-[#eeeded] active:bg-[#eeeded] pl-1.5`}
                  onClick={() => setDateFilter("Last 7 days")}
                >
                  Last 7 days
                </li>
                <li
                  className={`py-1 pl-1.5 hover:bg-[#eeeded] active:bg-[#eeeded]`}
                  onClick={() => setDateFilter("This month")}
                >
                  This month
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%" debounce={100}>
        <AreaChart
          data={chartData}
          margin={{ left: -22, right: 0 }}
          accessibilityLayer={false}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2cb283" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#2cb283" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#cdf045" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#cdf045" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey={"date"}
            fontSize={13}
            axisLine={false}
            tickLine={false}
            padding={{ left: 3, right: 0 }}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis
            fontSize={13}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              value >= 1000 ? `${value / 1000}k` : value
            }
            padding={{ bottom: 10 }}
          />
          <Tooltip />
          <Area
            dataKey={"expense"}
            type={`monotone`}
            stroke={"#cdf045"}
            strokeWidth={2}
            dot={false}
            fill="url(#colorExpense)"
          />
          <Area
            dataKey={"income"}
            type={`monotone`}
            stroke={"#2cb283"}
            strokeWidth={2}
            dot={false}
            fill="url(#colorIncome)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WorkingCapitalChart;
