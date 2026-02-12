import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import aimLogo from "../../src/assets/aim logo.png";
const ProtectedRoutes = () => {
  const { isAuthenticated, isReady } = useContext(AuthContext);

  if (!isReady)
    return (
      <div className="loading_design">
        <img src={aimLogo} alt="Al-Furqan Institute Missionary" />
        <Loading3QuartersOutlined spin />
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
