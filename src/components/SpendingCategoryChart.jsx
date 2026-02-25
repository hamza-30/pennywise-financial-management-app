import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

function SpendingCategoryChart({spendingCategoryChartData}) {
    let colors = ["#BCD9A2","#D8E983","#AEB877","#36656B","#75B06F","#DAD887","#F0F8A4","#1B211A","#628141","#8BAE66","#EBD5AB","#A8BBA3","#B87C4C","#FF9F1C","#C4A484","#F7F1DE", "#8BAE66"];

    const dateWithColors = spendingCategoryChartData.map((entry, index) => (
        {...entry, fill: colors[index % colors.length]}
    ))

  return (
    <>
    <div className={`flex-1 min-h-116 lg:min-h-100 px-6 pt-5 pb-9.5 bg-white rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)]`}>
        <div className={`text-[1.13rem] font-semibold text-[#111e43]`}>Spending by Category</div>
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
                >
        
                </Pie>
                <Tooltip />
                <Legend iconType='circle' verticalAlign='bottom' wrapperStyle={{ paddingTop: "10px"}}/>
            </PieChart>
        </ResponsiveContainer>
    </div>
    </>
  )
}

export default SpendingCategoryChart