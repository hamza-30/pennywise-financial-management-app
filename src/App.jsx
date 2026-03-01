import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import TransactionContextProvider from "./context/TransactionContext/TransactionContextProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },

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
