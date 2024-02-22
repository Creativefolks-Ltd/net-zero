import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { changePasswordFormValidation } from "../helpers/validations/Schema";
import SuccessImg from "../assets/images/Group 9106.png";
import lock from "../assets/images/lock.svg";
import Swal from "sweetalert2";
import { adminManagePassword } from "../redux-store/actions/admin";
import PasswordInput from "../components/PasswordInput";
import { managePassword } from "../redux-store/actions/user";

const ChangePassword = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)
  const [showOPassword, setShowOPassword] = useState(false)

  const fetchAdminDetails = () => {
    navigate(isAdmin ? "/admin/dashboard" : "/my-account");
  };


  const submitHandler = async (values) => {
    const { isValid, errors } = formik;

    if (isValid) {
      setDisabled(true);
      let response;
      if (isAdmin) {
        response = await dispatch(adminManagePassword(values));
      } else {
        response = await dispatch(managePassword(values));
      }
      setDisabled(false);
      if (!response?.payload?.error && response?.payload?.data) {
        Swal.fire({
          title: "Success!",
          text: "Password updated successfully",
          imageUrl: SuccessImg,
          imageWidth: 100,
          imageHeight: 100,
          showCancelButton: false,
          confirmButtonColor: "#81c14b",
          didClose: fetchAdminDetails,
        });
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
            html: errorMessage || "Failed to update password, please try again",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#81c14b",
          });
        }
      }
    } else {
      console.error('Form is not valid', errors);
    }
  };

  const email = isAdmin ? user?.adminDetails?.email : user?.userInfo?.email;

  const formik = useFormik({
    initialValues: {
      email: email,
      new_password: "",
      reenter_password: "",
      old_password: ""
    },
    validationSchema: changePasswordFormValidation,
    onSubmit: submitHandler,
  });

  return (
    <>
      <div className="admin-login-container">
        <form onSubmit={formik.handleSubmit}>
          <section className="Personal-information manage-password">
            <div className="container">
              <div className="row align-items-center admin-dashboard change-password">
                <div className="col-lg-6">
                  <div className="information-box">
                    <div className="personal-heading">
                      <img src={lock} alt="" />
                      <h2>Manage Password</h2>
                    </div>
                    <div className="form-div login-pass-filed">
                      <label htmlFor="">Old password</label>
                      <PasswordInput name="old_password" className={`form-control ${formik.errors.old_password && formik.touched.old_password ? "invalidInput" : ""} `} placeholder="Old password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.old_password} showPassword={showOPassword} setShowPassword={() => setShowOPassword(!showOPassword)} />
                      {formik.errors.old_password &&
                        formik.touched.old_password ? (
                        <span className="input-error-msg">
                          {formik.errors.old_password}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-div login-pass-filed">
                      <label htmlFor="">Create new password</label>
                      <PasswordInput name="new_password" className={`form-control ${formik.errors.new_password && formik.touched.new_password ? "invalidInput" : ""} `} placeholder="New password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.new_password} showPassword={showPassword} setShowPassword={() => setShowPassword(!showPassword)} />
                      {formik.errors.new_password &&
                        formik.touched.new_password ? (
                        <span className="input-error-msg">
                          {formik.errors.new_password}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-div login-pass-filed">
                      <label htmlFor="">Confirm new password</label>
                      <PasswordInput name="reenter_password" className={`form-control ${formik.errors.reenter_password && formik.touched.reenter_password ? "invalidInput" : ""} `} placeholder="Confirm password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.reenter_password} showPassword={showCPassword} setShowPassword={() => setShowCPassword(!showCPassword)} />
                      {formik.errors.reenter_password &&
                        formik.touched.reenter_password ? (
                        <span className="input-error-msg">
                          {formik.errors.reenter_password}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 offset-lg-2">
                  <button className="submit-btn" type='submit' disabled={disabled} >
                    Save new password {disabled ? <div className="spinner-border text-primary" role="status"></div> : ''}</button>
                  <div className="admin-header-btn">
                    <Link to={isAdmin ? "/admin/dashboard" : "/my-account"} className="btn">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default ChangePassword;
