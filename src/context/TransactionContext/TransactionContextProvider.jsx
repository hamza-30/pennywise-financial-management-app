import React, { useState } from "react";
import TransactionContext from "./TransactionContext";
import { useContext } from "react";

function TransactionContextProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  function addTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((trans) => trans.id !== id));
  }

  function editTransaction(id, updatedTransaction){
    setTransactions((prev) => prev.map((trans) => trans.id == id ? {...trans, ...updatedTransaction} : trans))
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, editTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export default TransactionContextProvider;

export function useTransactions() {
  return useContext(TransactionContext);
}
