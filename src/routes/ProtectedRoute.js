import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const useAuth = () => {
  const user = useSelector((state) => state.auth);
  return !!user?.userInfo;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return children;
  } else {
    return (
      <Navigate to="/login" />
    );
  }
};

export default ProtectedRoute;
