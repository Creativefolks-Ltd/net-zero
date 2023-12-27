import React, { useState } from 'react'
import login_img from '../assets/images/login_img.png'
import login_img1 from '../assets/images/login_img1.png'
import { forgetPassword } from '../redux-store/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import SuccessImg from "../assets/images/Group 9106.png"
import { useNavigate } from 'react-router-dom';
import SweetAlert from '../components/SweetAlert';

const validate = values => {
    const errors = {};
    if (!values.email?.trim()) {
        errors.email = 'Email Address field is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const formik = useFormik({
        initialValues: {
            email: '',
            role: "2",
        },

        validate: validate,

        onSubmit: async (values) => {
            if (!values.email) {
                return false
            }
            try {
                const requestData = {
                    email: values.email,
                    base_url: baseUrl
                }
                const response = await dispatch(forgetPassword(values));
                if (!response?.payload?.error && response?.payload?.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "User login successfully",
                        imageUrl: SuccessImg,
                        imageWidth: 100,
                        imageHeight: 100,
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",

                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/")
                        }
                    });
                } else {
                    const errorMsg = response?.payload?.response?.data?.errorMsg;
                    if (errorMsg) {
                        const errorMessages = Object.values(errorMsg).flatMap(messages => messages);
                        if (errorMessages.length > 0) {
                            const errorMessage = errorMessages.join("\n");
                            Swal.fire({
                                title: "Failed!",
                                html: errorMessage,
                                icon: "error",
                                showCancelButton: false,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                            });
                        }
                    }
                }
            } catch (error) {
                Swal.fire({
                    title: "Failed!",
                    text: "Something went wrong!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                });
            }
        }

    });

    return (
        <>
            <section className="login-form  mt-80 mb-80">
                <div className="container ">
                    <div className="bg-lightgray-color pt-80 pb-80 login-form-inner-bg">
                        <div className="row">
                            <div className="col-xl-7 col-lg-6">
                                <div className="d-flex justify-content-center align-items-center login-form-div">
                                    <div className="card">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item text-center" >
                                                <a className={`nav-link btl active`} id="pills-home-tab" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true">Forgot Password</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className={`tab-pane fade show active `} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                <div className="form ">
                                                    <form onSubmit={formik.handleSubmit}>
                                                        <div className="form-div">
                                                            <input type="text" name="email" className={`form-control ${formik.errors.email && formik.touched.email ? "invalidInput" : ""} `} placeholder="Email Address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                                            {formik.errors.email && formik.touched.email ? <span className='input-error-msg'>{formik.errors.email}</span> : null}
                                                        </div>
                                                        <button className="submit-btn" type='submit' >Submit {loading ? <div className="spinner-border text-primary" role="status">
                                                        </div> : ''}</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="login-form-inner-bg-div">
                                <div className="login-img">
                                    <img src={login_img} alt="" />
                                </div>
                                <div className="login-img-two">
                                    <img src={login_img1} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </section >

        </>
    )
}

export default ForgotPassword