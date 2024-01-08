import React, { useState } from "react";
import Anthos_logo from '../assets/images/anthos_logo.png';
import White_Anthos_logo from '../assets/images/anthos2_logo.png';
import User_Icon from '../assets/images/grey_profile_img.png';
import White_User_Icon from '../assets/images/profile_img.png';
import MenuImage from '../assets/images/bur.svg';
import WhiteMenuImage from '../assets/images/white-bar.svg';
import closeImage from '../assets/images/close.svg';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux-store/actions/auth";
import Swal from "sweetalert2";


const Header = ({ bgTransparent }) => {
    const dispatch = useDispatch()
    const [openNavbar, setOpenNavbar] = useState(false);
    const location = useLocation();

    const homePage = location?.pathname === "/" || location?.pathname === ""
    const authUser = useSelector((state) => state.auth)
    // const navbarStyle = {
    //     background: bgTransparent ? "transparent" : "#ffffff",
    //     boxShadow: bgTransparent ? "none" : "1px 1px 6.5px rgba(0,0,0,0.16)",
    // }

    const logoutHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(userLogout());
                setOpenNavbar(false)
                Swal.fire({
                    title: "Logout!",
                    text: "User logout successfully",
                    icon: "success"
                });
            }
        });

    }

    const navbarHandler = (status) => {
        if (authUser?.userInfo) {
            setOpenNavbar(status)
        }
    }

    return (
        <>
            <header className='site-header' >
                <div className="container">
                    <nav className="navbar ">

                        <Link to="/">
                            <img src={homePage ? White_Anthos_logo : Anthos_logo} alt="" className="logo-img" />
                        </Link>
                        {/* {!authUser && ( */}
                        <div className={`nav-items slide-in ${openNavbar ? "active" : ""}`}>
                            <ul>

                                <li className="nav-item"><Link to="/my-account"> My account</Link></li>
                                <li className="nav-item">Footprint Calculator</li>
                                <li className="nav-item">T&Cs</li>
                                <li className="nav-item emain-div">netzero@good.business</li>
                                <li className="nav-item" onClick={() => logoutHandler()}>Logout</li>
                                <li className="nav-item close-icon" onClick={() => { navbarHandler(false) }}><img src={closeImage} /></li>
                            </ul>
                        </div>
                        {/* )} */}
                        <div className="navbar-toggler">
                            <ul>
                                <li className='user-img'><img src={homePage ? White_User_Icon : User_Icon} alt="" /></li>
                                <li className='hamburger' onClick={() => { navbarHandler(true) }}><img src={homePage ? WhiteMenuImage : MenuImage} alt="" /></li>
                            </ul>

                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>

                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header