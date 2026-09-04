import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../constants";

const ProtectedRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth);

    const isAuthenticated =
        !!userInfo && userInfo?.role === ROLES.USER;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;