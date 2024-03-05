import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminView from "./AdminView.jsx";
import AdminLogin from "./AdminLogin.jsx";
import CreateNewUser from "./CreateNewUser.jsx";
import AdminChangePassword from "./AdminChangePassword.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";

import AdminProtectedRoute from "../../routes/AdminProtectedRoute.js";
import PageNotFound from "../PageNotFound.jsx";

function Dashboard() {

    return (
        <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route index element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
            <Route path="dashboard" element={<AdminProtectedRoute><AdminDashboard /> </AdminProtectedRoute>} />
            <Route path="form-view/:form_id" element={<AdminProtectedRoute><AdminView /></AdminProtectedRoute>} />
            <Route path="create-user" element={<AdminProtectedRoute><CreateNewUser /></AdminProtectedRoute>} />
            <Route path="manage-password" element={<AdminProtectedRoute><AdminChangePassword /></AdminProtectedRoute>} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="/*" element={<PageNotFound isAdmin={true} />} />
        </Routes>
    );
}
export default Dashboard;
