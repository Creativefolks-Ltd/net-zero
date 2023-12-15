import React from "react";
import footerLogoImg from '../assets/images/logo-footer.svg'
import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="footer-container">
            <div className="container">
                <div className="footer-upper">
                    <div className="footer-logo">
                        <Link to="/">
                            <img src={footerLogoImg} alt="" />
                        </Link>
                    </div>
                    <div className="footer-box">
                        <h2>Any questions?</h2>
                        <p>Please contact</p>
                        <a href="#">netzero@good.business</a>
                    </div>
                </div>
                <hr />
                <div className="footer-lower">
                    <div className="footer-content"><p> &#169; {year} Net Zero All Right|Website Design By Creative Folks</p></div>
                    <div className="footer-content"><p>Privacy &nbsp;| &nbsp; Terms & Cookies</p></div>
                </div>
            </div>
        </footer>

    )
}

export default Footer