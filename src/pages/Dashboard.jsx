import { useState } from "react";
import DashboardStatsCard from "../components/DashboardStatsCard";
import { FiArrowRight } from "react-icons/fi";
import { IoReceiptSharp } from "react-icons/io5";
import RecentTransactionCard from "../components/RecentTransactionCard";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";
import WorkingCapitalChart from "../components/WorkingCapitalChart";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const formatAmount = (amt) => {
  return Number(amt || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

function Dashboard() {
  const [isNudgeDismissed, setIsNudgeDismissed] = useState(false);
  const { transactions, loadingTransactions } = useTransactions();
  const { userProfile } = useAuthContext();
  const initialBalance = userProfile?.initialBalance || 0;

  const monthlyIncome = transactions
    .filter((trans) => trans.type == "Income")
    .filter((trans) => {
      let transDate = new Date(trans.date);
      let today = new Date();

      return transDate.getMonth() == today.getMonth();
    })
    .reduce((acc, trans) => acc + Number(trans.amount), 0);

  const monthlyExpense = transactions
    .filter((trans) => trans.type == "Expense")
    .filter((trans) => {
      let transDate = new Date(trans.date);
      let today = new Date();

      return transDate.getMonth() == today.getMonth();
    })
    .reduce((acc, trans) => acc + Number(trans.amount), 0);

  const totalIncome = transactions
    .filter((trans) => trans.type == "Income")
    .reduce((acc, trans) => acc + Number(trans.amount), 0);
  const totalExpense = transactions
    .filter((trans) => trans.type == "Expense")
    .reduce((acc, trans) => acc + Number(trans.amount), 0);

  const totalBalance = initialBalance + totalIncome - totalExpense;

  const filteredTransactions = transactions
    .sort((a, b) => {
      let dateA = new Date(a.date).getTime();
      let dateB = new Date(b.date).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  if (loadingTransactions) {
    return <Spinner />;
  }

  return (
    <>
      {userProfile &&
        initialBalance == 0 &&
        transactions.length < 1 &&
        !isNudgeDismissed && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: -20 }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className={`fixed top-1/3 left-1/2 w-85 h-fit py-3 px-3 z-20 bg-white border border-gray-600 rounded-2xl`}
            >
              <div
                onClick={() => setIsNudgeDismissed(true)}
                className={`w-fit px-0.5 py-0.5 hover:bg-gray-200 active:bg-gray-200 rounded-sm ml-auto mb-1 cursor-pointer`}
              >
                <RxCross2 className={`text-xl`} />
              </div>

              <div className={`flex flex-col gap-y-6`}>
                <div className="flex items-center gap-x-4 mb-4 md:mb-0">
                  <div className="p-2.5 bg-[#c4f82a] rounded-lg shadow-sm">
                    <IoReceiptSharp className="text-xl text-[#2c2c2c]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#2c2c2c]">
                      Your balance looks a bit empty!
                    </p>
                    <p className="text-xs text-gray-500">
                      Add your starting account balance in Settings to get
                      accurate insights.
                    </p>
                  </div>
                </div>
                <Link
                  to="/settings"
                  className="w-full md:w-auto px-6 py-2.5 text-xs font-bold bg-[#2c2c2c] text-white rounded-lg hover:bg-black transition-all active:scale-95 text-center"
                >
                  Set Balance Now
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

      <div
        className={`flex flex-col h-full gap-y-8 md:gap-y-6 pt-8 pb-5 px-4 lg:px-8 overflow-hidden`}
      >
        <span className={`text-2xl font-bold block md:hidden`}>Dashboard</span>

        <div
          className={`flex flex-col h-fit md:flex-row justify-between gap-x-7 gap-y-5`}
        >
          <DashboardStatsCard
            description={"Total balance"}
            amount={totalBalance}
          />
          <DashboardStatsCard
            description={"Total spending"}
            amount={monthlyExpense}
          />
          <DashboardStatsCard
            description={"Total income"}
            amount={monthlyIncome}
          />
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
            <Link
              to={"/transactions"}
              className={`flex items-center text-sm gap-x-1 text-[#c4f82a] hover:text-[#b2e220] active:text-[#b2e220] cursor-pointer`}
            >
              View All <FiArrowRight className={`text-base`} />
            </Link>
          </div>

          <div className={`flex flex-col gap-y-4`}>
            {filteredTransactions.length == 0 && (
              <div
                className={`w-full h-50 flex flex-col items-center justify-center gap-y-2`}
              >
                <IoReceiptSharp className={`text-4xl text-[#a0c435]`} />
                <p className={`font-semibold text-xl text-gray-400`}>
                  No transactions yet
                </p>
              </div>
            )}

            {filteredTransactions.map((trans) => (
              <RecentTransactionCard
                key={trans.id}
                desc={trans.desc}
                type={trans.type}
                amount={formatAmount(trans.amount)}
                date={trans.date}
                category={trans.category}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
