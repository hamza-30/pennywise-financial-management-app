import React from 'react'
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'

function SpendingTrendChart({spendingTrendChartData}) {
  return (
    <>
    <div className={`flex-1 min-h-92 lg:min-h-100 pl-6 pr-7 pt-5 pb-2 bg-white rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-y-5`}>
        <div className={`text-[1.13rem] font-semibold text-[rgb(17,30,67)] `}>Spending Trend</div>
        <ResponsiveContainer width="100%" height="100%" debounce={100}>
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
                tickFormatter={(str) => str.slice(0,6)}
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
    </div>
    </>
  )
}

export default SpendingTrendChart