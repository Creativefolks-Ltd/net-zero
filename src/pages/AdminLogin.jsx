import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginFormValidation } from "../helpers/validations/Schema";
import SuccessImg from "../assets/images/Group 9106.png";
import Swal from "sweetalert2";
import { updateAdminDetails } from "../redux-store/actions/admin";
import PasswordInput from "../components/PasswordInput";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false)

  const fetchAdminDetails = () => {
    navigate("/admin-dashboard");
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
      email: "",
      password: "",
    },
    validationSchema: loginFormValidation,
    onSubmit: submitHandler,
  });


  return (
    <>
      <div className="admin-login-container">
        <form onSubmit={formik.handleSubmit}>
          <section className="Personal-information admin-login">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className=" admin-login-heeading">
                    <h1>Admin Login</h1>
                  </div>
                  <div className="row ">
                    <div className="col-lg-12 admin-dashboard">
                      <div className="information-box">
                        <div className="form-div">
                          <input type="text" name="email" id="email" placeholder="Email address" className={`${formik.errors.email && formik.touched.email && "invalidInput"}`} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                          {formik.errors.email && formik.touched.email ? (
                            <span className="input-error-msg">
                              {formik.errors.email}
                            </span>
                          ) : null}
                        </div>
                        <div className="form-div login-pass-filed">
                          <PasswordInput name="password" className={`form-control ${formik.errors.password && formik.touched.password ? "invalidInput" : ""} `} placeholder="Password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.password} showPassword={showPassword} setShowPassword={() => setShowPassword(!showPassword)} />
                          {formik.errors.password &&
                            formik.touched.password ? (
                            <span className="input-error-msg">
                              {formik.errors.password}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <button className="submit-btn " type="submit" >
                      Log in
                    </button>
                    </div>
                
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
export default AdminLogin;
