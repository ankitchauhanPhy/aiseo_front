import { useAuth } from "@/authContext/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const {setLoginType} = useAuth();
  const isLogin = localStorage.getItem("login") === "true";

  if (!isLogin) {
    // redirect to login page (or homepage if you want)
    return <Navigate to="/" replace />;
  }
  setLoginType(true);
  return children;
};

export default ProtectedRoute;
