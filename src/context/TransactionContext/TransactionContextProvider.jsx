import React, { useEffect, useState } from "react";
import TransactionContext from "./TransactionContext";
import { useContext } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useAuthContext } from "../AuthContext/AuthContextProvider";
import { db } from "../../firebase/firebase";

function TransactionContextProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }

    const colRef = collection(db, "transactions");
    const q = query(colRef, where("userId", "==",  user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const remoteTransactions = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setTransactions(remoteTransactions);
      },
      (error) => {
        console.error("Firestore Listener Error:", error.message);
      },
    );

    return () => unsubscribe();
  }, [user]);

  async function addTransaction(newTransaction) {
    try {
      await addDoc(collection(db, "transactions"), {...newTransaction,
        userId: user.uid
      })

    } catch (error) {
      console.error("Error adding transaction:", error)
    }
  }

  async function deleteTransaction(id) {
    try {
      const docRef = doc(db, "transactions", id)
      await deleteDoc(docRef)

    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  async function editTransaction(id, updatedTransaction) {
    try {
      const docRef = doc(db, "transactions", id)
      await updateDoc(docRef, updatedTransaction)

    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export default TransactionContextProvider;

export function useTransactions() {
  return useContext(TransactionContext);
}
