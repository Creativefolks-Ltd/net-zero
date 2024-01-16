import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';


const useAdminAuth = () => {
  const user = useSelector((state) => state.auth);
  return !!user?.adminDetails;
};


const AdminProtectedRoute = ({ children }) => {
  const isAuthenticated = useAdminAuth();

  if (isAuthenticated) {
    return children;
  } else {
    return (
      <Navigate to="/admin/login" />
    );
  }
};

export default AdminProtectedRoute;
