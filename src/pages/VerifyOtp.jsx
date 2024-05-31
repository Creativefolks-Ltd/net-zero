import React, { useState, useEffect, useRef } from 'react'
import login_img from '../assets/images/login_img.png'
import login_img1 from '../assets/images/login_img1.png'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import SuccessImg from "../assets/images/Group 9106.png"
import { useNavigate } from 'react-router-dom';
import { resendVerificationOtp, verifyAccount } from '../redux-store/actions/auth';
import { removeEncryptedId } from '../redux-store/reducers/auth';

const VerifyOtp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.auth.encryptedId)
    const [disabled, setDisabled] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').split('');
        if (pasteData.length === 6) {
            setOtp(pasteData);
            inputRefs.current[5].focus();
        }
        e.preventDefault();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const navigateToNext = async (e) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navigate("/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const OTP = otp.join('')
        if (!OTP || OTP?.length < 6) {
            return false
        }
        try {
            setDisabled(true)

            const values = { user_id: userId, otp: OTP }
            const response = await dispatch(verifyAccount(values));
            if (!response?.payload?.error && response?.payload?.data) {
                dispatch(removeEncryptedId())
                Swal.fire({
                    title: "Success!",
                    text: "Thank you for verifying your account.",
                    imageUrl: SuccessImg,
                    imageWidth: 100,
                    imageHeight: 100,
                    confirmButtonColor: "#81c14b",
                    confirmButtonText: "Login",
                    didClose: navigateToNext
                })
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: response?.payload?.response?.data?.errorMsg || "Something went wrong!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#81c14b",
                    confirmButtonText: "Ok"
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
        finally {
            setDisabled(false)
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await dispatch(resendVerificationOtp(userId))
            if (!response?.payload?.error && response?.payload?.data) {
                Swal.fire({
                    title: 'OTP Sent!',
                    text: 'A new OTP has been sent to your registered email address. Please check your inbox and enter the OTP to proceed.',
                    imageUrl: SuccessImg,
                    imageWidth: 100,
                    imageHeight: 100,
                    confirmButtonColor: '#81c14b',
                });
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: response?.payload?.response?.data?.errorMsg || "Something went wrong!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#81c14b",
                    confirmButtonText: "Ok"
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
        finally {
            setDisabled(false)
        }

    };

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
                                                <a className={`nav-link btl active`} id="pills-home-tab" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true">Verify OTP
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className={`tab-pane fade show active `} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="otp-container">
                                                        <div className="otp-inputs" onPaste={handlePaste}>
                                                            {otp.map((data, index) => (
                                                                <input
                                                                    key={index}
                                                                    type="text"
                                                                    maxLength="1"
                                                                    value={data}
                                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                                    onChange={(e) => handleChange(e.target, index)}
                                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 mb-4 d-flex justify-content-center'>
                                                        <span>OTP not received?</span>
                                                        <a className='ms-3 text-green cursor-pointer' onClick={handleResendOtp} >
                                                            Resend
                                                        </a>
                                                    </div>

                                                    <button className="submit-btn" type='submit' disabled={disabled} >Submit {disabled ? <div className="spinner-border text-primary" role="status">
                                                    </div> : ''}</button>
                                                </form>
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

export default VerifyOtp