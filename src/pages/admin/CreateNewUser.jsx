import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createUserFormValidation } from "../../helpers/validations/Schema";
import SuccessImg from "../../assets/images/Group 9106.png";
import Swal from "sweetalert2";
import { createNewUser } from "../../redux-store/actions/admin";
import PasswordInput from "../../components/PasswordInput";
import UserSVG from "../../assets/images/form_user.svg";


const CreateNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.auth);

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
            html: errorMessage || "Failed to create new user, please try again",
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
      <div className="admin-login-container p-4 mb-80">
        <div className="container d-flex align-items-center justify-content-between mt-5 mb-2">
          <div>
            <h2 className="mb-1 fw-semibold">Create New User</h2>
            <p className="text-muted mb-0">
              Add a new user to your administration panel.
            </p>
          </div>

          <Link
            to="/admin/users"
            className="btn btn-outline-dark px-4"
          >
            ← Back
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="row admin-dashboard">
              <div className="personal-heading">
                <img src={UserSVG} alt="" />
                <h2>Personal Information</h2>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="information-box">
                    <div className="row">
                      <div className="form-div col-sm-6">
                        <label className="mb-2" htmlFor="first_name">First Name</label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          placeholder="First name"
                          className={`border text-capitalize ${formik.errors.first_name && formik.touched.first_name && "invalidInput"}`}
                          value={formik.values.first_name}
                          onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.first_name && formik.touched.first_name ? (
                          <span className="input-error-msg">
                            {formik.errors.first_name}
                          </span>
                        ) : null}
                      </div>
                      <div className="form-div col-sm-6">
                        <label className="mb-2" htmlFor="last_name">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          placeholder="Last name"
                          className={`border text-capitalize ${formik.errors.last_name && formik.touched.last_name && "invalidInput"}`}
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur} />
                        {formik.errors.last_name && formik.touched.last_name ? (
                          <span className="input-error-msg">
                            {formik.errors.last_name}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-div">
                      <label className="mb-2" htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email address"
                        className={`border ${formik.errors.email && formik.touched.email && "invalidInput"}`}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <span className="input-error-msg">
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>

                    <div className="form-div password-field">
                      <label className="mb-2" htmlFor="first_name">Password</label>
                      <PasswordInput
                        name="password"
                        placeholder="Password"
                        className={`border form-control ${formik.errors.password && formik.touched.password ? "invalidInput" : ""} `}
                        changeHandler={formik.handleChange}
                        blurHandler={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <span className="input-error-msg">
                          {formik.errors.password}
                        </span>
                      ) : null}

                    </div>
                    <div className="form-div password-field">
                      <label className="mb-2" htmlFor="cpassword">Confirm Password</label>
                      <PasswordInput
                        name="cpassword"
                        className={`border form-control ${formik.errors.cpassword && formik.touched.cpassword ? "invalidInput" : ""} `}
                        placeholder="Confirm Password"
                        changeHandler={formik.handleChange}
                        blurHandler={formik.handleBlur}
                        value={formik.values.cpassword}
                      />
                      {formik.errors.cpassword && formik.touched.cpassword ? (
                        <span className='input-error-msg'>
                          {formik.errors.cpassword}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-div ">
                    <label className="mb-2" htmlFor="role">Role</label>
                    <select
                      name="role"
                      id="role"
                      className={`border form-control`}
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="2">User</option>
                      <option value="1">Admin</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link
                      to="/admin/dashboard"
                      className="btn-secondary "
                    >
                      Cancel
                    </Link>

                    <div>


                      <button className="submit-btn" type='submit' disabled={disabled}>
                        {disabled ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            />
                            Saving...
                          </>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateNewUser;
