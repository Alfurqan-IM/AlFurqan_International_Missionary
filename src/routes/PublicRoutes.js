import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts";

const PublicRoutes = () => {
  const { isAuthenticated, isReady } = useContext(AuthContext);

  if (!isReady) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/userprofile" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
