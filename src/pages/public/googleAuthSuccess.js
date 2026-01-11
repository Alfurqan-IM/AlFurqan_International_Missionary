import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    authenticate(token);
    navigate("/userprofile", { replace: true });
  }, []);

  return null;
};

export default GoogleAuthSuccess;
