import React, { useState, Fragment } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
// import './Admin_Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import ModalPopup from '../Modal/Modal_Popup'
// import { Schema } from 'yup'
// import { Formik,useFormik } from 'formik'
// import { signUpSchema } from '../schema'


const Admin_Dashboard = () => {

//    const {errors,touched,handleChange,handleBlur,handleSubmit}= useFormik({
//         initialValues:initialValues,
//         validationSchema:signUpSchema,
//         onSubmit:(input)=>{
//             console.log("adminformValue",input)
//         }
//     })
  
    return (
        <div className='container'>
            <Navbar />
            <div className="content">
                <div className="inner-data">
                    <p className='content-p'>Admin Dashboard</p>

                    <div className="upper-div">

                        <div className="head">
                            <p><FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon></p>
                            <p>Personal Information</p>
                        </div>
                        <div className="form">
                            <form>
                                <div className='inp1'>
                                    <span><label htmlFor="">User's Name</label> <br />
                                        <input type="text" placeholder='First Name' /></span>

                                    <span>
                                        <label htmlFor="">Last Name</label><br />
                                        <input type="text" placeholder='Last Name'  /></span>
                                </div>

                                <div className='inp2'>
                                    <span> <label htmlFor="">Email Address</label><br />
                                        <input type="text" placeholder='Email Address'  /></span>

                                    <span><label htmlFor="">Password</label><br />
                                        <input type="password" placeholder='Password'  /></span>
                                </div>

                                <button>Submit</button>
                            </form>

                        </div>
                    </div>
                    <div className="lower-div">
                        <div className="lower-head">
                            <span><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon> Submissions</span>
                            <span> <button className='lower-btn1'>Create New User</button>{<ModalPopup />}
                            </span>

                        </div>


                        <p className='lower-p'>Search submitted forms by user email address</p>
                        <span className='lower-inp'><input type="text" /><button>Search</button></span>
                        <table className='table'>
                            <tr>
                                <th>Form Name</th>
                                <th>User email address</th>
                                <th>Action</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                                <tr>
                                    <td>My Form Name</td>
                                    <td>myformnameexample@emailaddress.com</td>
                                    <td>View Form <FontAwesomeIcon icon={faArrowRight}>
                                    </FontAwesomeIcon> <FontAwesomeIcon icon={faArrowUpRightFromSquare} ></FontAwesomeIcon></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default Admin_Dashboard
