import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../constants";

const PublicRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth);

    if (userInfo) {
        const redirectPath =
            userInfo.role === ROLES.ADMIN
                ? "/admin/dashboard"
                : "/my-account";

        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PublicRoute;