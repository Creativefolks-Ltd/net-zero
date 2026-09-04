import { useState, useRef } from 'react'
import login_img from '../assets/images/login_img.png'
import login_img1 from '../assets/images/login_img1.png'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import SuccessImg from "../assets/images/Group 9106.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { mfaVerifyAccount, mfaResendAccount } from '../redux-store/actions/auth';
import { removeEncryptedId } from '../redux-store/reducers/auth';

const LoginVerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const state = location.state;

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

        const path = state?.path || "/my-account";
        navigate(path, { replace: true })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const OTP = otp.join('')
        if (!OTP || OTP?.length < 6) {
            return false
        }
        try {
            setDisabled(true);

            const values = { challenge_id: state.challenge_id, otp: OTP, remember_device: true }
            const response = await dispatch(mfaVerifyAccount(values));
            if (!response?.payload?.error && response?.payload?.data) {
                dispatch(removeEncryptedId())
                navigateToNext()
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
            const values = { challenge_id: state.challenge_id }
            const response = await dispatch(mfaResendAccount(values))
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
            <section className="login-form login-verify-otp-form mt-80 mb-80">
                <div className="container">
                    <div className="col-lg-7 mx-auto px-5 bg-lightgray-color pt-80 pb-80">
                        <div className="d-flex justify-content-center align-items-center ">
                            <div className="">
                                {/* Heading */}
                                <div className="text-center">
                                    <h3 className="mb-2">
                                        Verify Your Login
                                    </h3>

                                    <p className="mfa-subtitle mb-0">
                                        Enter the verification code sent to your
                                        registered email address to continue.
                                    </p>
                                </div>


                                {/* OTP Form */}
                                <form onSubmit={handleSubmit} className="mt-4">

                                    <label className="mfa-otp-label">
                                        Verification Code
                                    </label>

                                    <div className="otp-container mt-2">
                                        <div
                                            className="otp-inputs"
                                            onPaste={handlePaste}
                                        >
                                            {otp.map((data, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength="1"
                                                    value={data}
                                                    ref={(el) => {
                                                        inputRefs.current[index] = el;
                                                    }}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            e.target,
                                                            index
                                                        )
                                                    }
                                                    onKeyDown={(e) =>
                                                        handleKeyDown(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    aria-label={`OTP digit ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="mfa-otp-hint text-center mt-3 mb-0">
                                        Enter the 6-digit code you received in your
                                        email.
                                    </p>

                                    {/* Resend */}
                                    <div className="mfa-resend mt-3 mb-4 text-center">
                                        <span>
                                            Didn't receive the code?
                                        </span>

                                        <button
                                            type="button"
                                            className="ms-2 btn-link text-green"
                                            onClick={handleResendOtp}
                                            disabled={disabled}
                                        >
                                            Resend Code
                                        </button>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        className="submit-btn px-5"
                                        type="submit"
                                        disabled={disabled}
                                    >
                                        {disabled ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                Verify & Continue
                                                <i className="fa fa-arrow-right ms-2"></i>
                                            </>
                                        )}
                                    </button>

                                </form>

                                {/* Security Footer */}
                                <div className="mfa-secure-text mt-4 text-center">
                                    <i className="fa fa-lock me-2"></i>
                                    Your verification is secure and encrypted.
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginVerifyOtp