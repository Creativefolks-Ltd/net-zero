import React from 'react'
// import './Footer.css'
import anthos2_logo from '../Assets/anthos2_logo.png'

const Footer = () => {
    return (
        <footer className='footer-container'>
            <div className="container">
                <div className='footer-upper'>
                    <div className='footer-logo'>
                        <img src={anthos2_logo} alt="" />
                    </div>
                    <div className="footer-subdiv">
                        <p className='footer-p1'>Any Questions?</p>
                        <p className='footer-p2' >Please Contact <br /><a href="#">netzero@good.business</a></p>

                    </div>
                </div>
                <hr />
                <div className='footer-lower'>
                    <div className="footer-content"><p> &#169;Net Zero All Right|Website Design By Creative Folks</p></div>
                    <div className="footer-content"><p>Privacy &nbsp;| &nbsp; Terms & Cookies</p></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
