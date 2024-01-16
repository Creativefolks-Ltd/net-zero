import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { changePasswordFormValidation } from "../../helpers/validations/Schema";
import SuccessImg from "../../assets/images/Group 9106.png";
import lock from "../../assets/images/lock.svg";
import Swal from "sweetalert2";
import { updateAdminDetails } from "../../redux-store/actions/admin";
import PasswordInput from "../../components/PasswordInput";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)
  const [showOPassword, setShowOPassword] = useState(false)

  const fetchAdminDetails = () => {
    navigate("/admin/dashboard");
  };


  const submitHandler = async (values) => {
    const { isValid, errors } = formik;

    if (isValid) {
      setDisabled(true);
      const user_id = Number(user?.userInfo?.user_id);
      const response = await dispatch(updateAdminDetails({ data: values, user_id }));
      setDisabled(false);
      if (!response?.payload?.error && response?.payload?.data) {
        Swal.fire({
          title: "Success!",
          text: "Admin login successfully",
          imageUrl: SuccessImg,
          imageWidth: 100,
          imageHeight: 100,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          didClose: fetchAdminDetails,
        });
      } else {
        const errorMsg = response?.payload?.response?.data?.errorMsg;
        if (errorMsg) {
          const errorMessages = Object.values(errorMsg).flatMap(messages => messages);
          if (errorMessages.length > 0) {
            const errorMessage = errorMessages.join("\n");
            Swal.fire({
              title: "Failed!",
              html: errorMessage || "Failed to login, please try again",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
            });
          }
        }
      }
    } else {
      console.error('Form is not valid', errors);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
      opassword: ""
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
                    <div class="personal-heading">
                      <img src={lock} alt="" />
                      <h2>Manage Password</h2>
                    </div>
                    <div className="form-div login-pass-filed">
                      <label htmlFor="">Old password</label>
                      <PasswordInput name="opassword" className={`form-control ${formik.errors.opassword && formik.touched.opassword ? "invalidInput" : ""} `} placeholder="Old password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.opassword} showPassword={showOPassword} setShowPassword={() => setShowOPassword(!showOPassword)} />
                      {formik.errors.opassword &&
                        formik.touched.opassword ? (
                        <span className="input-error-msg">
                          {formik.errors.opassword}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-div login-pass-filed">
                      <label htmlFor="">Create new password</label>
                      <PasswordInput name="password" className={`form-control ${formik.errors.password && formik.touched.password ? "invalidInput" : ""} `} placeholder="New password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.password} showPassword={showPassword} setShowPassword={() => setShowPassword(!showPassword)} />
                      {formik.errors.password &&
                        formik.touched.password ? (
                        <span className="input-error-msg">
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>
                    <div className="form-div login-pass-filed">
                      <label htmlFor="">Confirm new password</label>
                      <PasswordInput name="cpassword" className={`form-control ${formik.errors.cpassword && formik.touched.cpassword ? "invalidInput" : ""} `} placeholder="Confirm password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.cpassword} showPassword={showCPassword} setShowPassword={() => setShowCPassword(!showCPassword)} />
                      {formik.errors.cpassword &&
                        formik.touched.cpassword ? (
                        <span className="input-error-msg">
                          {formik.errors.cpassword}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 offset-lg-2">
                  <button className="submit-btn" type='submit' disabled={disabled} >
                    Save new password {disabled ? <div className="spinner-border text-primary" role="status"></div> : ''}</button>
                  <div class="admin-header-btn">
                    <Link to="/admin/dashboard" className="btn">
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
