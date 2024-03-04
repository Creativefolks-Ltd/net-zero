import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./assets/css/styles.css"
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyAccount from "./pages/MyAccount";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import ScrollToTop from "./components/ScrollToTop.jsx";
import Dashboard from "./pages/admin";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import UserChangePassword from "./pages/UserChangePassword.jsx";
import AdminView from "./pages/admin/AdminView.jsx";
import FormsLayout from "./pages/forms/FormsLayout.jsx";
import { useDispatch } from "react-redux";
import { addGeneralInfo } from "./redux-store/actions/user.js";
import { setFormCompleted } from "./redux-store/reducers/auth.js";
import { singleFormReset } from "./redux-store/reducers/admin.js";
import PageNotFound from "./pages/PageNotFound.jsx";
import { userFormReset } from "./redux-store/reducers/user.js";
import { setHomeCount } from "./redux-store/reducers/forms.js";
import CookieConsent from "react-cookie-consent";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const formsSectionOpened = (location.pathname === "/forms" || location.pathname?.includes("/form-view")) ? true : false;
  const homeSectionOpened = location.pathname === "/" || location.pathname === "";

  const resetFormStates = async () => {
    await dispatch(addGeneralInfo(null))
    await dispatch(setFormCompleted(0))
    await dispatch(singleFormReset());
    await dispatch(userFormReset());
    await dispatch(setHomeCount(1));
  }

  useEffect(() => {
    if (!formsSectionOpened || homeSectionOpened) {
      resetFormStates()
    }
  }, [formsSectionOpened, homeSectionOpened])

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/my-account" element={<ProtectedRoute ><MyAccount /></ProtectedRoute >} />
          <Route path="/form-view/:form_id" element={<ProtectedRoute><AdminView /></ProtectedRoute>} />
          <Route path="/manage-password" element={<ProtectedRoute ><UserChangePassword /></ProtectedRoute >} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Route>
        <Route path="/forms" element={<ProtectedRoute><FormsLayout /></ProtectedRoute>} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <CookieConsent
        location="bottom"
        buttonText="Agree"
        declineButtonText="Decline"
        cookieName="carbon-tracker-cookie"
        enableDeclineButton
        buttonClasses="cookie-accept-btn"
        expires={150}
      >
        We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic.
      </CookieConsent>
    </div>
  );
}
export default App;
