import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import { useUiSelector } from "./redux/hooks";
import { RootState } from "./redux/store";


function App() {
  const isAuthenticated = useUiSelector((state: RootState) => state.auth.loggedIn);

  const router = createBrowserRouter([
    { path: "/", element: isAuthenticated ? <Navigate to="/dashboard" /> : <Landing /> },
    { path: "/login", element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login /> },
    { element: <ProtectedRoute />, children: [{ path: "/dashboard", element: <Dashboard /> }] },

    { path: "/register" },
    { path: "*", element: <h1>Page not found</h1> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
