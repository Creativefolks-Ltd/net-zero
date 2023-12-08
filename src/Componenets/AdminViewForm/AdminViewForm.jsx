import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
// import './AdminViewForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const AdminViewForm = () => {
    
    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <div className="inner-content1">
                    <div className="inner-left">
                       <p>Form Name</p>
                       <form >
                            <label htmlFor="">First Name</label><br />
                            {/* <input type="text" placeholder='Enter your first name' /><br /> */}
                            <label htmlFor="">Last Name</label><br />
                            {/* <input type="text" placeholder='Enter your last name' /><br /> */}
                            <label htmlFor="">Enail Address</label><br />
                            {/* <input type="text" placeholder='Enter your email'/><br /> */}
                            <label htmlFor="">Password</label><br />
                            {/* <input type="text" placeholder='Enter your password' /> */}
                            
                       </form>
                    </div> 
                    <div className="inner-right">
                        <button className='inner-right-btn'> <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back</button>
                        <div className="btns">
                            <button style={{background:'#81c134',color:'#ffffff'}} >Download Pdf</button>
                            <button style={{background:'#ffffff',color:'#000000'}} >Assign to different user</button>
                            <button style={{background:'#ffffff',color:'#000000'}} >Delete Form</button>
                        </div>
                    </div>
                </div>
                <div className="inner-content2">
                    
                    <div className="content2-para">
                    <p style={{fontSize:'61px',fontFamily:'Halcom',textAlign:'center'}} >Full Form</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminViewForm
