import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGeneralInfo } from "../redux-store/actions/user";
import { setFormCompleted } from "../redux-store/reducers/auth";


const Layout = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);
    const adminPageShow = useSelector((state) => state.admin.adminPageShow);

    const [bgTransparent, setBgTransparent] = useState(false);

    const pathname = location.pathname === "/" ? "home" : location.pathname.substring(1);

    // const formsSectionOpened = (location.pathname === "/general" || location.pathname === "/home-form" || location.pathname === "/travel" || location.pathname === "/food-shopping" || location.pathname === "/financial") ? true : false
    const formsSectionOpened = (location.pathname === "/forms" ? true : false)

    useEffect(() => {
        const bgTransparentType = location.pathname === "/" ? true : false
        setBgTransparent(bgTransparentType)
    }, [])


    const resetFormStates = () => {
        dispatch(addGeneralInfo(null))
        dispatch(setFormCompleted(0))
    }

    useEffect(() => {
        if (!formsSectionOpened) {
            resetFormStates()
        }
    }, [formsSectionOpened])


    return (
        <div className={"main-header bg-" + pathname}>
            {!adminPageShow && (
                <Header bgTransparent={bgTransparent} />
            )}
            <Outlet />
            {!adminPageShow && (
                <Footer />)}
        </div>
    )
}
export default Layout