import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";

function App() {
  const isAuthenticated = true;
  const router = createBrowserRouter([
    { path: "/", element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login /> },
    { element: <ProtectedRoute />, children: [{ path: "/dashboard", element: <Dashboard /> }] },

    { path: "/register" },
    { path: "*", element: <h1>Page not found</h1> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
