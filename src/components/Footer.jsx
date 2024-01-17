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

                        {/* <div className="footer-content-privacy"><p>Privacy &nbsp;| &nbsp; Terms & Cookies</p></div> */}
                        <div className="footer-content-privacy"><Link to={"/privacy-policy"}><p>Privacy<br></br>Terms & Cookies</p></Link></div>

                    </div>

                    <div className="footer-box">
                        <h2>Any questions?</h2>
                        <p>Please contact</p>
                        <a href="#">netzero@good.business</a>
                    </div>


                </div>
                <div className="footer-lower">
                    <div className="footer-content"><p> &#169; {year} Net Zero All Rights | Website Design By CREATIVEFOLKS</p></div>
                    <div className="footer-content-two"><p> &#169; {year} Net Zero All Rights<br></br>Website Design By CREATIVEFOLKS</p></div>
                    <div className="footer-content-div"><p><Link to={"/privacy-policy"}> Privacy&nbsp;|&nbsp;Terms & Cookies</Link></p></div>
                </div>
            </div>
        </footer>

    )
}

export default Footer