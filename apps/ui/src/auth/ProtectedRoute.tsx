import { Navigate } from "react-router-dom";
import { useUiSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import LayoutRoute from "./LayoutRoute";

function ProtectedRoute() {
  const isLoggedIn = useUiSelector((state: RootState) => state.auth.loggedIn);

  return isLoggedIn ? <LayoutRoute /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
