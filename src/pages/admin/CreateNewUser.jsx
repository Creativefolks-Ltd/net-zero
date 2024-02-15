import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createUserFormValidation } from "../../helpers/validations/Schema";
import SuccessImg from "../../assets/images/Group 9106.png";
import Swal from "sweetalert2";
import { createNewUser } from "../../redux-store/actions/admin";
import PasswordInput from "../../components/PasswordInput";

const CreateNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const fetchAdminDetails = () => {
    navigate("/admin/dashboard");
  };

  const submitHandler = async (values) => {
    const { isValid, errors } = formik;
    if (isValid) {
      setDisabled(true);
      const response = await dispatch(createNewUser(values));
      setDisabled(false);
      if (!response?.payload?.error && response?.payload?.data) {
        let roleType = (values?.role === "1") ? "Admin" : "User";
        Swal.fire({
          title: "Success!",
          text: `${roleType} created successfully`,
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
            html: errorMessage || "Failed to create new user, please try again",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
      }
    } else {
      console.error('Form is not valid', errors);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      cpassword: '',
      role: "2",
    },
    validationSchema: createUserFormValidation,
    onSubmit: submitHandler,
  });

  return (
    <>
      <div className="admin-login-container">
        <form onSubmit={formik.handleSubmit}>
          <section className="Personal-information create-user">
            <div className="container">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <div className="">
                    <h1>Create New User</h1>
                  </div>
                  <div className="row ">
                    <div className="col-lg-12 admin-dashboard">
                      <div className="information-box">
                        <div className="form-div">
                          <input type="text" name="first_name" id="first_name" placeholder="First name" className={`text-capitalize ${formik.errors.first_name && formik.touched.first_name && "invalidInput"}`} value={formik.values.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                          {formik.errors.first_name && formik.touched.first_name ? (
                            <span className="input-error-msg">
                              {formik.errors.first_name}
                            </span>
                          ) : null}
                        </div>
                        <div className="form-div">
                          <input type="text" name="last_name" id="last_name" placeholder="Last name" className={`text-capitalize ${formik.errors.last_name && formik.touched.last_name && "invalidInput"}`} value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                          {formik.errors.last_name && formik.touched.last_name ? (
                            <span className="input-error-msg">
                              {formik.errors.last_name}
                            </span>
                          ) : null}
                        </div>
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
                        <div className="form-div login-pass-filed">
                          <PasswordInput name="cpassword" className={`form-control ${formik.errors.cpassword && formik.touched.cpassword ? "invalidInput" : ""} `} placeholder="Confirm Password" changeHandler={formik.handleChange} blurHandler={formik.handleBlur} value={formik.values.cpassword} showPassword={showCPassword} setShowPassword={() => setShowCPassword(!showCPassword)} />
                          {formik.errors.cpassword && formik.touched.cpassword ? <span className='input-error-msg'>{formik.errors.cpassword}</span> : null}
                        </div>
                      </div>
                      <div className="form-div login-pass-filed">
                        <select name="role" id="role" className={`form-control`} value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                          <option value="2">User</option>
                          <option value="1">Admin</option>
                        </select>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div class="admin-header-btn">
                          <Link to={"/admin/dashboard"} className="btn">
                            Back
                          </Link>
                        </div>
                        <div>
                          <button className="submit-btn" type='submit' disabled={disabled} >
                            Save {disabled ? <div className="spinner-border text-primary" role="status"></div> : ''}</button>
                        </div>
                      </div>
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
export default CreateNewUser;
