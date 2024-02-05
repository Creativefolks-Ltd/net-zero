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
import { setUserEmail } from '../redux-store/reducers/auth'
import { emailRegex } from '../helpers/validations/Schema'

const validate = values => {
    const errors = {};

    if (!values.email?.trim()) {
        errors.email = 'Email Address field is required';
    } else if (!emailRegex.test(values?.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [disabled, setDisabled] = useState(false)

    const { loading } = useSelector((state) => state.auth);

    const baseUrl = (window?.location?.origin + "/reset-password") || 'https://net-zero-inky.vercel.app/reset-password';

    const navigateToNext = async (e) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navigate("/")
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            role: "2",
            base_url: baseUrl
        },

        validate: validate,

        onSubmit: async (values) => {
            if (!values?.email?.trim()) {
                return false
            }
            try {
                setDisabled(true)
                const response = await dispatch(forgetPassword(values));
                if (!response?.payload?.error && response?.payload?.data) {
                    dispatch(setUserEmail(values?.email))
                    Swal.fire({
                        title: "Success!",
                        text: "We've just sent you an email with instructions to reset your password. Please check your registered email inbox.",
                        imageUrl: SuccessImg,
                        imageWidth: 100,
                        imageHeight: 100,
                        confirmButtonColor: "#3085d6",
                        didClose: navigateToNext
                    })
                } else {
                    const errorMsg = response?.payload?.response?.data?.errorMsg;
                    if (errorMsg) {
                        let errorMessage = "";
                        if (Array.isArray(errorMsg) || typeof errorMsg === 'object') {
                            const errorMessages = Object.values(errorMsg).flatMap(messages => messages);
                            errorMessage = Array.isArray(errorMessages) && errorMessages.length > 0
                                ? errorMessages.join("\n")
                                : "";
                        } else {
                            errorMessage = errorMsg?.toString() || "";
                        }
                        Swal.fire({
                            title: "Failed!",
                            html: errorMessage || "Failed to send reset password email. Please verify your email address and try again. For assistance, contact support.",
                            icon: "error",
                            confirmButtonColor: "#3085d6",
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    title: "Failed!",
                    text: "Something went wrong!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                });
            }
            finally {
                setDisabled(false)
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
                                                        <button className="submit-btn" type='submit' disabled={disabled}>Submit {disabled ? <div className="spinner-border text-primary" role="status">
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