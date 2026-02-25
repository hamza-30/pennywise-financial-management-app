import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { IoStatsChartOutline } from "react-icons/io5";

function SpendingTrendChart({ spendingTrendChartData }) {
  return (
    <>
      <div
        className={`flex-1 min-h-92 lg:min-h-100 pl-6 pr-7 pt-5 pb-2 bg-white rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-y-5 relative`}
      >
        <div className={`text-[1.13rem] font-semibold text-[rgb(17,30,67)] `}>
          Spending Trend
        </div>
        <ResponsiveContainer width="100%" height="100%" debounce={300}>
          <AreaChart
            data={spendingTrendChartData}
            margin={{ left: -22, right: 0 }}
            accessibilityLayer={false}
          >
            <defs>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#cdf045" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#cdf045" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey={"fullDate"}
              fontSize={13}
              axisLine={false}
              tickLine={false}
              padding={{ left: 3, right: 0 }}
              interval="preserveStartEnd"
              minTickGap={30}
              tickFormatter={(str) => str.slice(0, 6)}
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
              strokeWidth={2.5}
              dot={false}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {spendingTrendChartData.length == 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-11 bg-slate-50 rounded-2xl flex items-center justify-center mb-3">
              <IoStatsChartOutline className="text-slate-300 text-2xl" />
            </div>
            <h3 className="text-[#111e43] font-semibold text-sm">
              No activity to report
            </h3>
            <p className="text-gray-400 text-xs mt-1 w-[80%]">
              Your spending patterns will appear here once new transactions are
              detected
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SpendingTrendChart;
