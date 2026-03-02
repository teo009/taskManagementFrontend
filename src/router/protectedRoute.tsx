import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">
    validating permissions...
  </div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <React.Fragment>
    { children} 
  </React.Fragment>;
};