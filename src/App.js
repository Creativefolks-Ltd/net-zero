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
import '../node_modules/font-awesome/css/font-awesome.min.css';
import ScrollToTop from "./components/ScrollToTop.jsx";
import Dashboard from "./pages/admin";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/general" element={<ProtectedRoute ><General /></ProtectedRoute >} />
          <Route path="/home-form" element={<ProtectedRoute ><Homeform /></ProtectedRoute >} />
          <Route path="/travel" element={<ProtectedRoute ><Travel /></ProtectedRoute >} />
          <Route path="/food-shopping" element={<ProtectedRoute ><FoodAndShopping /></ProtectedRoute >} />
          <Route path="/financial" element={<ProtectedRoute ><Financial /></ProtectedRoute >} />
          <Route path="/my-account" element={<ProtectedRoute ><MyAccount /></ProtectedRoute >} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
