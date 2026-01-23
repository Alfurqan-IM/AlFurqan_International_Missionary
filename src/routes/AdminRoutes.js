import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts";

const AdminRoutes = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return isAuthenticated && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default AdminRoutes;
