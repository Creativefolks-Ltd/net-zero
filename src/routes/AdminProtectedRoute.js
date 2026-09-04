import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { ROLES } from '../constants';


const useAdminAuth = () => {
  const user = useSelector((state) => state.auth);
  return !!user?.userInfo && user?.userInfo?.role === ROLES.ADMIN;
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
