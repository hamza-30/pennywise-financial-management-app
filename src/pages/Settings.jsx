import React, { useState } from "react";
import { LuShield } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbAlertTriangle } from "react-icons/tb";
import { useTransactions } from "../context/TransactionContext/TransactionContextProvider";
import { toast } from "react-hot-toast"

function Settings() {
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { transactions , deleteAllTransactions } = useTransactions();

  async function handleDeleteClick() {
    setIsDeleting(true);
    const toastId = toast.loading("Wiping your data...")

    try {
      await deleteAllTransactions();
      toast.success("All transactions cleared.", {id: toastId})
      setWarningModalOpen(false);

    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete data. Try again.", {id: toastId})
      
    } finally {
      setIsDeleting(false);
    }
  }

  function closeWarningModal() {
    if (!isDeleting) {
      setWarningModalOpen(false);
    }
  }

  function handleExportClick() {
    if(transactions.length == 0){
      toast.error("No transactions to download.", {duration: 3000})
      return
    }

    const filteredTransactions = transactions.map((trans) => trans).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const header = "Date,Description,Type,Category,Amount\n"
    const rows = filteredTransactions.map((trans) => {
      return `"${trans.date}","${trans.desc}",${trans.type},${trans.category},${trans.amount}\n`
    }).join('')

    const csvContent = header + rows
    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"})

    const url = URL.createObjectURL(blob)

    const element = document.createElement("a")
    element.setAttribute("href", url)
    const fileName = `PennyWise_Export_${new Date().toISOString().split('T')[0]}.csv`;
    element.setAttribute("download", fileName)
    element.click()

    toast.success("CSV exported successfully!", {duration: 3000})

    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div
        className={`flex flex-col h-full gap-y-8 md:gap-y-6 pt-8 pb-5 px-4 lg:px-8 overflow-hidden`}
      >
        <div
          className={`h-12 flex gap-y-4 justify-between items-center text-[#383f45]`}
        >
          <span className="text-[1.5rem] font-bold text-2xl ">Settings</span>
        </div>

        <div
          className={`w-full flex flex-col px-6 py-5 rounded-xl shadow-[0_0px_8px_rgba(0,0,0,0.04)]
                  bg-white gap-y-6`}
        >
          <div className={`flex items-center gap-x-2 text-[#383f45] mb-1`}>
            <LuShield className="text-xl" />
            <span className={`text-lg font-semibold`}>Data & Privacy</span>
          </div>

          <div className={`flex justify-between items-center`}>
            <div className={`flex flex-col w-1/2 md:w-fit`}>
              <span
                className={`text-base md:text-[1.03rem] leading-tight font-medium text-[#3b3a3a]`}
              >
                Export Data
              </span>
              <span className={`text-[0.8rem] md:text-sm text-gray-500`}>
                Download your transaction history
              </span>
            </div>
            <button
              onClick={handleExportClick}
              className={`flex items-center justify-center px-2 md:w-30 h-7.5 rounded-lg gap-x-2 bg-[#292929] hover:bg-[#292929c3] active:bg-[#292929c3] text-white cursor-pointer transition-all ease-in duration-100
                   active:ring-[#292929] active:ring-[0.15rem] active:ring-offset-2`}
            >
              <FiDownload className={`text-base md:text-lg`} />
              <span className={`text-sm md:text-[0.95rem] font-medium`}>
                Export CSV
              </span>
            </button>
          </div>

          <div className={`flex justify-between items-center`}>
            <div className={`flex flex-col w-1/2 md:w-fit`}>
              <span
                className={`text-base md:text-[1.03rem] leading-tight font-medium text-red-500`}
              >
                Clear Data
              </span>
              <span className={`text-[0.8rem] md:text-sm text-gray-500`}>
                Permanently remove all transactions
              </span>
            </div>
            <button
              onClick={() => setWarningModalOpen(true)}
              className={`flex items-center justify-center px-2 md:w-30 h-7.5 rounded-lg gap-x-2 bg-red-50 hover:bg-red-100 active:bg-red-100 cursor-pointer text-red-500 transition-all ease-in duration-100
                 active:ring-[0.15rem] active:ring-offset-2`}
            >
              <RiDeleteBin6Line className={`text-base md:text-lg`} />
              <span className={`text-sm md:text-[0.95rem] font-medium`}>
                Delete All
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`inset-0 z-40
        ${warningModalOpen ? "fixed" : "hidden"}`}
        onClick={closeWarningModal}
      ></div>
      <div
        className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[90vw] md:w-[60vw] lg:w-120 pt-4 pb-3 px-4 md:px-6 backdrop-blur-xl flex flex-col items-center bg-white rounded-2xl border border-gray-600 transition-all duration-300 ease-in-out z-50 gap-y-5
                ${warningModalOpen ? "fixed" : "hidden"}
                `}
      >
        <div className={`flex flex-col items-center text-red-500`}>
          <TbAlertTriangle className={`text-5xl`} />
          <p className={`font-medium`}>Danger Zone</p>
        </div>
        <p className={`font-medium`}>
          Once you delete your data, there is no going back. Please be certain.
        </p>

        <div className={`ml-auto`}>
          <button
            className={`px-3 py-1.5 text-sm mr-3 hover:bg-gray-100 active:bg-gray-100 rounded-lg cursor-pointer`}
            onClick={closeWarningModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isDeleting}
            className={`min-w-44 py-1.5 text-sm w-fit text-white rounded-lg bg-[#ef4444] hover:bg-[#dc2626] active:bg-[#dc2626] cursor-pointer`}
            onClick={handleDeleteClick}
          >
            {isDeleting ? "Deleting everything..." : "Delete All Transactions"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;
