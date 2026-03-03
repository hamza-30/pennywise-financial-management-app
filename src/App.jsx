import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordReset from "./pages/PasswordReset";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgotpassword",
      element: <PasswordReset />,
    },

    {
      element: <ProtectedRoute />,
      children: [
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
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
