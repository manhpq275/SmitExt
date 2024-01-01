import React from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router";
import { useLocation } from "react-router";

export default function AuthGuard({ children }: any) {
  const isAuth = useAuth();
  const location = useLocation();

  if (!isAuth) return <Navigate to="/login" state={location.pathname} />;

  return children;
}
