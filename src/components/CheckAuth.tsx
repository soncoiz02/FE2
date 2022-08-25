import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getCookie } from "../utils/cookie";

const CheckAuth = ({ children }: any) => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/auth/login" />;
  return children;
};

export default CheckAuth;
