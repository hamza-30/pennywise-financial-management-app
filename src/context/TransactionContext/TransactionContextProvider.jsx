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
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useAuthContext } from "../AuthContext/AuthContextProvider";
import { db } from "../../firebase/firebase";
import { toast } from "react-hot-toast"

function TransactionContextProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true)
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoadingTransactions(false);
      return;
    }

    setLoadingTransactions(true)

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
        setLoadingTransactions(false)
      },
      (error) => {
        console.error("Firestore Listener Error:", error.message);
        setLoadingTransactions(false)
      },
    );

    return () => unsubscribe();
  }, [user]);

  async function addTransaction(newTransaction) {
    try {
      await addDoc(collection(db, "transactions"), {...newTransaction,
        userId: user.uid
      })
      toast.success("Transaction added!", {duration: 3000})

    } catch (error) {
      console.error("Error adding transaction:", error)
      toast.error("Error adding transaction.", {duration: 3000})
    }
  }

  async function deleteTransaction(id) {
    try {
      const docRef = doc(db, "transactions", id)
      await deleteDoc(docRef)
      toast.success("Transaction deleted!", {duration: 3000})

    } catch (error) {
      console.error("Error deleting transaction:", error)
      toast.success("Error deleting transaction.", {duration: 3000})
    }
  }

  async function editTransaction(id, updatedTransaction) {
    try {
      const docRef = doc(db, "transactions", id)
      await updateDoc(docRef, updatedTransaction)
      toast.success("Transaction edited successfully!", {duration: 3000})

    } catch (error) {
      console.error("Error updating transaction:", error)
      toast.error("Error editing transaction.", {duration: 3000})
    }
  }

  async function deleteAllTransactions() {
  if (!user) return;

  try {
    const colRef = collection(db, "transactions");
    const q = query(colRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return;

    const docs = querySnapshot.docs;
    const batchSize = 500;

    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = writeBatch(db);
      const chunk = docs.slice(i, i + batchSize);

      chunk.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    }

    console.log(`Deleted ${docs.length} transactions successfully.`);
  } catch (error) {
    console.error("Batch delete failed:", error);
    throw error;
  }
}

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        deleteAllTransactions,
        editTransaction,
        loadingTransactions,
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
