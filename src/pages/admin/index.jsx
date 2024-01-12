import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminView from "./AdminView.jsx";
import AdminLogin from "./AdminLogin.jsx";
import CreateNewUser from "./CreateNewUser.jsx";
import ChangePassword from "./ChangePassword.jsx";
import { useDispatch } from "react-redux";
import { addGeneralInfo } from "../../redux-store/actions/user.js";

function Dashboard() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(addGeneralInfo(null))
    },[]);

    return (
        <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="form-view/:form_id" element={<AdminView />} />
            <Route path="create-user" element={<CreateNewUser />} />
            <Route path="manage-password" element={<ChangePassword />} />
        </Routes>
    );
}
export default Dashboard;
