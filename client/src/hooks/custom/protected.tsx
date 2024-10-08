import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToken } from "./token";

const ProtectedRoute = () => {
  const { getToken } = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, [getToken, navigate]);

  return getToken() ? <Outlet /> : null;
};

export default ProtectedRoute;
