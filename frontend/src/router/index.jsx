import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login";
import { useAuth } from "../store/AuthProvider";

// ProtectedRoute untuk proteksi halaman dashboard
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // bisa diganti spinner
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
};

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
     
    </Routes>
  );
}
