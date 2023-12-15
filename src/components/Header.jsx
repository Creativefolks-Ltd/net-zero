import React from "react";
import Anthos_logo from '../assets/images/anthos_logo.png';
import User_Icon from '../assets/images/grey_profile_img.png';
import MenuImage from '../assets/images/bur.svg';
import { Link } from "react-router-dom";


const Header = ({ bgTransparent }) => {

    const navbarStyle = {
        background: bgTransparent ? "transparent" : "#ffffff",
        boxShadow: bgTransparent ? "none" : "1px 1px 6.5px rgba(0,0,0,0.16)",
    }

    return (
        <>
            <header className='site-header' style={navbarStyle}>
                <div className="container">
                    <nav className="navbar ">

                        <Link to="/">
                            <img src={Anthos_logo} alt="" className="logo-img" />
                        </Link>
                        <div className="navbar-toggler"   >
                            <ul>
                                <li className='user-img'><img src={User_Icon} alt="" /></li>
                                <li className='hamburger'><img src={MenuImage} alt="" /></li>
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