import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import TransactionContextProvider from "./context/TransactionContext/TransactionContextProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "transactions",
          element: <Transactions />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
      ],
    },
  ]);

  return (
    <>
      <TransactionContextProvider>
        <RouterProvider router={router} />
      </TransactionContextProvider>
    </>
  );
}

export default App;
