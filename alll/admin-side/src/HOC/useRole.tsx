import React from "react";
import { useSelector } from "react-redux";
import { AuthSliceModule } from "pages/_redux/auth";

export default function useRole() {
  const role = useSelector(AuthSliceModule.getUserRoleSelector);
  return role;
}
