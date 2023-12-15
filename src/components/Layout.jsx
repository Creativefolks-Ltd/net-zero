import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const Layout = () => {
    const user = useSelector((state) => state.auth);

    const [bgTransparent, setBgTransparent] = useState(false);
    const location = useLocation();
    const pathname = location.pathname.substring(1);
    useEffect(() => {
        const bgTransparentType = location.pathname === "/" ? true : false
        setBgTransparent(bgTransparentType)
    }, [])

    return (
        <div className={"bg-" + pathname}>
            <Header bgTransparent={bgTransparent} />
            <Outlet />
            <Footer />
        </div>
    )
}
export default Layout