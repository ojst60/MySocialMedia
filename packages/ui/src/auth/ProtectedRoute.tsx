import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUiSelector } from "../redux/hooks"; 
import { RootState } from "../redux/store";

function ProtectedRoute() {
  const isLoggedIn = useUiSelector((state: RootState) => state.auth.loggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
