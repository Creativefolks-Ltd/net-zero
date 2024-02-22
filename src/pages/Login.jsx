import React, { useState } from 'react'
import login_img from '../assets/images/login_img.png'
import login_img1 from '../assets/images/login_img1.png'
import { userLogin, userSignup } from '../redux-store/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import SuccessImg from "../assets/images/Group 9106.png"
import { Link, useNavigate } from 'react-router-dom';
import SweetAlert from '../components/SweetAlert';
import PasswordInput from '../components/PasswordInput'
import AdminLoginImg from "../assets/images/admin-login.svg"
import { emailRegex, strongPasswordRegex } from '../helpers/validations/Schema'


const signupValidate = values => {
    const errors = {};

    if (!values.first_name?.trim()) {
        errors.first_name = 'First Name field is required';
    }

    if (!values.last_name?.trim()) {
        errors.last_name = 'Last Name field is required';
    }

    if (!values.email?.trim()) {
        errors.email = 'Email Address field is required';
    } else if (!emailRegex.test(values?.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password?.trim()) {
        errors.password = 'Password field is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    } else if (!strongPasswordRegex?.test(values.password)) {
        errors.password = 'Password must include an uppercase letter, a lowercase letter, a number, and a special character';
    }


    if (!values.cpassword?.trim()) {
        errors.cpassword = 'Confirm Password field is required';
    } else if (values.password !== values.cpassword) {
        errors.cpassword = 'Confirm Password not matched';
    }

    return errors;
};

const validate = values => {
    const errors = {};

    if (!values.email?.trim()) {
        errors.email = 'Email Address field is required';
    } else if (!emailRegex.test(values?.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password?.trim()) {
        errors.password = 'Password field is required';
        // } else if (values.password.length < 6) {
        //     errors.password = 'Password must be atleast 6 characters';
    }

    return errors;
};


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginActive, setLoginActive] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showSPassword, setShowSPassword] = useState(false)
    const [showSCPassword, setShowSCPassword] = useState(false)
    const { loading, userInfo, error } = useSelector((state) => state.auth)


    const navigateToNext = () => {
        navigate("/my-account")
    }
    const loginFormik = useFormik({
        initialValues: {
            role_id: 2,
            email: '',
            password: '',
        },
        validate,
        onSubmit: async (values) => {
            if (!values.email || !values.password) {
                return false
            }
            try {
                const response = await dispatch(userLogin(values))
                if (!response?.payload?.error && response?.payload?.data) {
                    navigateToNext();
                } else {
                    Swal.fire({
                        title: "Failed!",
                        text: response?.payload?.response?.data?.errorMsg || "Something went wrong!",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#81c14b",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Failed!",
                    text: "Something went wrong!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#81c14b",
                });
            }
        },
    });
    const signupFormik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            cpassword: '',
            role: "2",
        },

        validate: signupValidate,

        onSubmit: async (values) => {
            if (!values.first_name || !values.last_name || !values.email || !values.password || !values.cpassword) {
                return false
            }
            try {
                const response = await dispatch(userSignup(values));
                if (!response?.payload?.error && response?.payload?.data) {
                    navigateToNext();
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
                            html: errorMessage || "Failed to signup, please try again",
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#81c14b",
                        });
                    }
                }
            } catch (error) {
                Swal.fire({
                    title: "Failed!",
                    text: "Something went wrong!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#81c14b",
                });
            }
        }

    });

    return (
        <>
            <section className="login-form  mt-80 mb-80">
                <div className="container ">
                    <div className="bg-lightgray-color pt-80 pb-80 ">
                        <div className="row">
                            <div className="col-xl-7 col-lg-6">
                                <div className="d-flex justify-content-center align-items-center login-form-div">
                                    <div className="card">
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item text-center" onClick={() => setLoginActive(true)}>
                                                <a className={`nav-link btl ${loginActive && "active"}`} id="pills-home-tab" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true">Sign in</a>
                                            </li>
                                            <li className="nav-item text-center" onClick={() => setLoginActive(false)}>
                                                <a className={`nav-link btr ${!loginActive && "active"}`} id="pills-profile-tab" data-toggle="pill" role="tab" aria-controls="pills-profile" aria-selected="false">Register</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className={`tab-pane fade ${loginActive && "show active"}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                <div className="form-heading">
                                                    <h1 className='mb-5'>Welcome back</h1>
                                                    <p>Sign in to continue </p>
                                                </div>
                                                <div className="form">
                                                    <form onSubmit={loginFormik.handleSubmit}>
                                                        <div className="form-div">
                                                            <input type="text" name="email" className={`form-control ${loginFormik.errors.email && loginFormik.touched.email ? "invalidInput" : ""} `} placeholder="Email Address" onChange={loginFormik.handleChange}
                                                                onBlur={loginFormik.handleBlur} value={loginFormik.values.email} />
                                                            {loginFormik.errors.email && loginFormik.touched.email ? <span className='input-error-msg'>{loginFormik.errors.email}</span> : null}
                                                        </div>
                                                        <div className="form-div login-pass-filed">
                                                            <PasswordInput name="password" className={`form-control ${loginFormik.errors.password && loginFormik.touched.password ? "invalidInput" : ""} `} placeholder="Password" changeHandler={loginFormik.handleChange} blurHandler={loginFormik.handleBlur} value={loginFormik.values.password} showPassword={showPassword} setShowPassword={() => setShowPassword(!showPassword)} />

                                                            {loginFormik.errors.password && loginFormik.touched.password ? <span className='input-error-msg'>{loginFormik.errors.password}</span> : null}
                                                        </div>
                                                        <p><Link to="/forgot-password">Forgot your password?</Link></p>
                                                        <button className="submit-btn " type='submit' >Sign in {loading ? <div className="spinner-border text-primary" role="status">
                                                        </div> : ''}</button>
                                                        <div className='admin-login-icon'>
                                                            <img src={AdminLoginImg} alt="" width={40} height={40} />
                                                            <p><Link to="/admin/login" className='text-decoration-none'> Admin login</Link></p>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className={`tab-pane fade ${!loginActive && "show active"}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                <div className="form ">
                                                    <form onSubmit={signupFormik.handleSubmit}>
                                                        <div className="form-div">
                                                            <input type="text" name="first_name" className={`text-capitalize form-control ${signupFormik.errors.first_name && signupFormik.touched.first_name ? "invalidInput" : ""} `} placeholder="First Name" onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} value={signupFormik.values.first_name} />
                                                            {signupFormik.errors.first_name && signupFormik.touched.first_name ? <span className='input-error-msg'>{signupFormik.errors.first_name}</span> : null}

                                                        </div>
                                                        <div className="form-div">
                                                            <input type="text" name="last_name" className={`text-capitalize form-control ${signupFormik.errors.last_name && signupFormik.touched.last_name ? "invalidInput" : ""} `} placeholder="Last Name" onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} value={signupFormik.values.last_name} />
                                                            {signupFormik.errors.last_name && signupFormik.touched.last_name ? <span className='input-error-msg'>{signupFormik.errors.last_name}</span> : null}
                                                        </div>
                                                        <div className="form-div">
                                                            <input type="text" name="email" className={`form-control ${signupFormik.errors.email && signupFormik.touched.email ? "invalidInput" : ""} `} placeholder="Email Address" onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} value={signupFormik.values.email} />
                                                            {signupFormik.errors.email && signupFormik.touched.email ? <span className='input-error-msg'>{signupFormik.errors.email}</span> : null}
                                                        </div>
                                                        <div className="form-div login-pass-filed">
                                                            <PasswordInput name="password" className={`form-control ${signupFormik.errors.password && signupFormik.touched.password ? "invalidInput" : ""} `} placeholder="Password" changeHandler={signupFormik.handleChange} blurHandler={signupFormik.handleBlur} value={signupFormik.values.password} showPassword={showSPassword} setShowPassword={() => setShowSPassword(!showSPassword)} />
                                                            {signupFormik.errors.password && signupFormik.touched.password ? <span className='input-error-msg'>{signupFormik.errors.password}</span> : null}
                                                        </div>
                                                        <div className="form-div login-pass-filed">
                                                            <PasswordInput name="cpassword" className={`form-control ${signupFormik.errors.cpassword && signupFormik.touched.cpassword ? "invalidInput" : ""} `} placeholder="Confirm Password" changeHandler={signupFormik.handleChange} blurHandler={signupFormik.handleBlur} value={signupFormik.values.cpassword} showPassword={showSCPassword} setShowPassword={() => setShowSCPassword(!showSCPassword)} />
                                                            {signupFormik.errors.cpassword && signupFormik.touched.cpassword ? <span className='input-error-msg'>{signupFormik.errors.cpassword}</span> : null}
                                                        </div>

                                                        <button className="submit-btn" type='submit' >Signup {loading ? <div className="spinner-border text-primary" role="status">
                                                        </div> : ''}</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="login-image-div">
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

export default Login