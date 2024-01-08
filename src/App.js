import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./assets/css/styles.css"
import General from "./pages/General";
import Homeform from "./pages/Homeform";
import ProtectedRoute from "./routes/ProtectedRoute";
import Travel from "./pages/Travel";
import FoodAndShopping from "./pages/FoodAndShopping";
import Financial from "./pages/Financial";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyAccount from "./pages/MyAccount";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminView from "./pages/AdminView.jsx";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/general" element={<ProtectedRoute><General /></ProtectedRoute>} /> */}
          <Route path="/general" element={<General />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/home-form" element={<Homeform />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/food-shopping" element={<FoodAndShopping />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-view" element={<AdminView />} />


        </Route>
      </Routes>
    </div>
  );
}
export default App;
