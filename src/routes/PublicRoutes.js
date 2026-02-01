import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts";

import aimLogo from "../../src/assets/aim logo.png";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const PublicRoutes = () => {
  const { isAuthenticated, isReady } = useContext(AuthContext);

  if (!isReady)
    return (
      <div className="loading_design">
        <img
          src={aimLogo} // Replace with the path to your logo
          alt="Al-Furqan Institute Missionary"
        />
        <Loading3QuartersOutlined spin />
      </div>
    );

  if (isAuthenticated) {
    return <Navigate to="/userprofile" replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;
