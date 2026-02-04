import React from "react";
import DashboardStatsCard from "../components/DashboardStatsCard";

function Dashboard() {
  return (
    <div
      className={`flex flex-col h-full gap-y-15 md:gap-y-4 pt-8 pb-5 px-4 lg:px-8 overflow-hidden`}
    >
      <div className={`flex flex-col md:flex-row justify-between gap-x-7 gap-y-5 h-30`}>
        <DashboardStatsCard description={"Total balance"} amount={"5432"}/>
        <DashboardStatsCard description={"Total spending"} amount={"550"}/>
        <DashboardStatsCard description={"Total income"} amount={"240"}/>
      </div>
    </div>
  );
}

export default Dashboard;
