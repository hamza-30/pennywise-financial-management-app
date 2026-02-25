import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { IoPieChartOutline } from "react-icons/io5";

function SpendingCategoryChart({ spendingCategoryChartData }) {
  let colors = [
    "#BCD9A2",
    "#D8E983",
    "#AEB877",
    "#36656B",
    "#75B06F",
    "#DAD887",
    "#F0F8A4",
    "#1B211A",
    "#628141",
    "#8BAE66",
    "#EBD5AB",
    "#A8BBA3",
    "#B87C4C",
    "#FF9F1C",
    "#C4A484",
    "#F7F1DE",
    "#8BAE66",
  ];

  const dateWithColors = spendingCategoryChartData.map((entry, index) => ({
    ...entry,
    fill: colors[index % colors.length],
  }));

  return (
    <>
      <div
        className={`flex-1 min-h-116 lg:min-h-100 px-6 pt-5 pb-9.5 bg-white rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)] relative`}
      >
        <div className={`text-[1.13rem] font-semibold text-[#111e43]`}>
          Spending by Category
        </div>
        <ResponsiveContainer width="100%" height="100%" debounce={300}>
          <PieChart>
            <Pie
              data={dateWithColors}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={95}
              paddingAngle={5}
              dataKey="amount"
              nameKey="category"
            ></Pie>
            <Tooltip />
            <Legend
              iconType="circle"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {spendingCategoryChartData.length == 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <IoPieChartOutline className="text-gray-300 text-2xl" />
            </div>
            <h3 className="text-[#111e43] font-semibold text-sm">
              No categorized spending
            </h3>
            <p className="text-gray-400 text-xs mt-1 w-[80%]">
              We couldn't find any spending records for the selected period.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SpendingCategoryChart;
