import React from 'react'
// import './Finance.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCircle } from '@fortawesome/free-solid-svg-icons'

const Finance = () => {
    return (
        <div className='container'>
            <Navbar />
            <div className="finance-content">
                <div className="sub-head">
                    <div className="header-div">
                        <div className="pic">

                            <FontAwesomeIcon className='pic1' icon={faUser} size='5x' color='#2c2b34'></FontAwesomeIcon><br />
                            <span className='span1'>General</span><br />
                            <span className='span2'>Information</span>
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic2' icon={faHouse} size='5x'></FontAwesomeIcon><br />
                            <span className='span1'>Your Home</span><br />
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic3' icon={faCarSide} size='5x' ></FontAwesomeIcon><br />
                            <span className='span1'>Travel</span><br />
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic4' icon={faUtensils} size='5x' ></FontAwesomeIcon><br />
                            <span className='span1'>Food &</span><br />
                            <span className='span2'>Shopping</span>
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic5' icon={faPiggyBank} size='5x' ></FontAwesomeIcon><br />
                            <span className='span1'>Finance</span><br />
                            <span className='span2'>& assets</span>
                        </div>
                    </div>
                </div>
                <div className='finance-p'><p>Financial Assets</p></div>
                <div className="finance-content1">
                    <p className='finance-content1-p1'>Anthos Investments</p>
                    <div><p className='finance-content1-p2'>The carbon footprint of your anthos investments (the family investment
                     funds managed by Anthos Wealth Management)will be automatically included in your report.you do no tneed to 
                     provide any details about your Anthos investments</p></div><br />

                    <div><p className='finance-content1-p3'>Please contact your Client advisor/investment specialist to discuss the carbon footprint
                    of Anthos investments.In case you have any investment managed outside Anthos Private Wealth Management and want to include these in 
                    the discussion,please have these details to hand </p></div>

                    <button className='finance-button'>Submit</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Finance
