import React, { useEffect, useState } from "react";
import form_user from "../assets/images/form_user.svg";
import delete2_img from "../assets/images/delete2_img.svg";
import share_img from "../assets/images/download-img.svg";
import tick_img from "../assets/images/tick_img.svg";
import arrow_img from "../assets/images/arrow_img.svg";
import pending_img from "../assets/images/pending_img.svg";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  formlist,
  updateUserDetails,
  getUserDetails,
  formDelete,
  addGeneralInfo,
  downloadPdf,
} from "../redux-store/actions/user";
import SuccessImg from "../assets/images/Group 9106.png";
import Swal from "sweetalert2";
import { ordinalNumbers } from "../helpers/ordinalNumber";
import Pagination from "../components/Pagination";
import { userFormValidation } from "../helpers/validations/Schema";
import moment from "moment";
import { setFormCompleted } from "../redux-store/reducers/auth";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const formList = useSelector((state) => state.users.formList);
  const isLoading = useSelector((state) => state.users.isLoading);
  const [disabled, setDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const serialNo = (currentPage - 1) * itemsPerPage;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formList?.slice(indexOfFirstItem, indexOfLastItem);

  const userId = user?.userInfo?.user_id;

  const endYear = new Date().getFullYear();
  const startYear = endYear - 20;

  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  useEffect(() => {
    dispatch(formlist(userId));
    dispatch(addGeneralInfo(null));
    dispatch(addGeneralInfo(0));
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: user?.userInfo?.first_name,
      last_name: user?.userInfo?.last_name,
      email: user?.userInfo?.email,
    },

    validationSchema: userFormValidation,

    onSubmit: (values) => {},
  });

  const UpdateUserDetails = async (e) => {
    dispatch(getUserDetails(userId));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { values, isValid, errors } = formik;
    formik.handleSubmit();

    if (isValid) {
      setDisabled(true);
      const user_id = Number(user?.userInfo?.user_id);

      const response = await dispatch(
        updateUserDetails({ data: values, user_id })
      );
      setDisabled(false);
      if (!response?.payload?.error && response?.payload?.data) {
        Swal.fire({
          title: "Success!",
          text: "Profile Information saved successfully",
          imageUrl: SuccessImg,
          imageWidth: 100,
          imageHeight: 100,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          didClose: UpdateUserDetails,
        });
      } else {
        const errorMsg = response?.payload?.response?.data?.errorMsg;
        if (errorMsg) {
          const errorMessages = Object.values(errorMsg).flatMap(
            (messages) => messages
          );
          if (errorMessages.length > 0) {
            const errorMessage = errorMessages.join("\n");
            Swal.fire({
              title: "Failed!",
              html:
                errorMessage ||
                "Failed to saved profile Information, please try again",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
            });
          }
        }
      }
    } else {
      console.error("Form is not valid", errors);
    }
  };

  const formDeleteHandler = async (form_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteForm(form_id);
      }
    } catch (error) {
      console.error("Error during delete confirmation:", error);
    }
  };

  const deleteForm = async (form_id) => {
    try {
      const response = await dispatch(formDelete(form_id));

      if (response?.payload?.data) {
        handleSuccessfulDelete();
      } else {
        handleFailedDelete(response);
      }
    } catch (error) {
      console.error("Error during form deletion:", error);
    }
  };

  const handleSuccessfulDelete = async () => {
    await Swal.fire({
      title: "Deleted!",
      text: "Form deleted successfully",
      icon: "success",
    });
    dispatch(formlist(userId));
  };

  const handleFailedDelete = (response) => {
    const errorMsg = response?.payload?.response?.data?.errorMsg;
    if (errorMsg) {
      const errorMessages = Object.values(errorMsg).flatMap(
        (messages) => messages
      );

      if (errorMessages.length > 0) {
        const errorMessage = errorMessages.join("\n");
        Swal.fire({
          title: "Failed!",
          html: errorMessage || "Failed to delete form, please try again",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        });
      }
    }
  };

  const formSwitch = (form) => {
    const completedFormCount = form.total_forms;
    const formId = form.id;
    switch (completedFormCount) {
      case 1: {
        return "/home-form";
      }
      case 2: {
        return "/travel";
      }
      case 3: {
        return "/food-shopping";
      }
      case 4: {
        return "/financial";
      }
      case 5: {
        return "/financial";
      }
      default:
        return "/general";
    }
  };
  const navigateToNext = (form) => {
    dispatch(addGeneralInfo(form.id));
    dispatch(setFormCompleted(form.total_forms));
  };

  const downloadHandler = async (formId) => {
    try {
      const response = await dispatch(downloadPdf(formId));
      if (response?.payload?.data?.access_url) {
        const link = document.createElement("a");
        link.href = response?.payload?.data?.access_url;
        link.download = "filename.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.log(err, "///////err/////");
    }
  };

  return (
    <>
      <section className="Personal-information myaccount-container">
        <div className="container">
          <h1>My account</h1>
          <div className="row">
            <div className="col-lg-12">
            <form>
                  <div className="information-box">
                  
                  <div className="row justify-content-between">
                    <div class="personal-heading">
                      <img src={form_user} alt="" />
                      <h2>Personal information</h2>
                    </div>
                <div className="col-lg-6 col-md-6">
                      <div class="form-div">
                        <label htmlFor="first_name">Your name</label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          className={`${
                            formik.errors.first_name &&
                            formik.touched.first_name &&
                            "invalidInput"
                          }`}
                          placeholder="First name"
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.first_name &&
                        formik.touched.first_name ? (
                          <span className="input-error-msg">
                            {formik.errors.first_name}
                          </span>
                        ) : null}
                      </div>
                      
                      <div class="form-div">
                        <label htmlFor="email">Your email address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`${
                            formik.errors.email &&
                            formik.touched.email &&
                            "invalidInput"
                          }`}
                          placeholder="Email address"
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
                      
                      {/* <div class="form-div">
                                        <label htmlFor="password">Your password</label>
                                        <input type="password" id="password" name="password" className={`${formik.errors.password &&
                                            formik.touched.password && "invalidInput"}`} placeholder="************" value={formik?.values?.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.errors.password &&
                                            formik.touched.password ? (
                                            <span className="input-error-msg">
                                                {formik.errors.password}
                                            </span>
                                        ) : null}
                                    </div> */}
                     
                    
                  </div>
                  <div className="col-lg-6 col-md-6">
                <div class="form-div">
                        <label htmlFor="last_name">Last name</label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          className={`${
                            formik.errors.last_name &&
                            formik.touched.last_name &&
                            "invalidInput"
                          }`}
                          placeholder="Last name"
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.last_name && formik.touched.last_name ? (
                          <span className="input-error-msg">
                            {formik.errors.last_name}
                          </span>
                        ) : null}
                      </div>
                      <Link to="/manage-password" className="account-link">
                        Manage your password
                      </Link>
                </div>
                </div>
                <button
                        className="submit-btn"
                        type="submit"
                        disabled={disabled}
                        onClick={(e) => submitHandler(e)}
                      >
                        Save{" "}
                        {disabled ? (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          ></div>
                        ) : (
                          ""
                        )}
                      </button>
              </div>
              </form>
            </div>
          </div>

          <div className="row justify-content-between saved-form-div">
            <div className="col-lg-6 col-md-6 pending-div">
              <h2>Pending forms </h2>

              <div class="accordion" id="regularAccordionRobots">
                {/* <div class="accordion-item">
                                    <h2 id="regularHeadingFirst" class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#regularCollapseFirst" aria-expanded="true" aria-controls="regularCollapseFirst">
                                            1.Latest form
                                        </button>
                                    </h2>
                                    <div id="regularCollapseFirst" class="accordion-collapse collapse show" aria-labelledby="regularHeadingFirst" data-bs-parent="#regularAccordionRobots">
                                        <div class="accordion-body">
                                            <div className="accordion-content">
                                                <div className="title-accodion">
                                                    <span>Form submitted</span>
                                                    <a href="#">View form</a>
                                                </div>
                                                <div className="accordion-img">
                                                    <img src={share_img} alt="" />
                                                    <img src={delete2_img} alt="" />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div> */}
                {isLoading ? (
                  <div className="text-center">loading...</div>
                ) : currentItems?.length > 0 ? (
                  currentItems?.map((form, index) => (
                    <div
                      className={
                        "accordion-item " +
                        form?.form_status?.toLowerCase() +
                        "-form"
                      }
                      key={index}
                    >
                      <h2
                        class="accordion-header"
                        id={`regularHeading${index + 1}`}
                      >
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#regularCollapse${index + 1}`}
                          aria-expanded="false"
                          aria-controls={`regularCollapse${index + 1}`}
                        >
                          {/* {serialNo + index + 1}.{ordinalNumbers[serialNo + index]} form */}
                          <td>
                            {form?.first_name}{" "}
                            {form?.created_at
                              ? "(" +
                                moment(form?.created_at).format("DD/MM/YYYY") +
                                ")"
                              : ""}
                          </td>
                        </button>
                      </h2>
                      <div
                        id={`regularCollapse${index + 1}`}
                        class="accordion-collapse collapse"
                        aria-labelledby={`regularHeading${index + 1}`}
                        data-bs-parent="#regularAccordionRobots"
                      >
                        <div class="accordion-body">
                          <div className="accordion-content">
                            <div className="title-accodion">
                              <span>
                                Form{" "}
                                {form?.form_status === "Complete"
                                  ? "submitted"
                                  : form?.form_status?.toLowerCase()}
                              </span>
                              {form?.form_status === "Pending" ? (
                                <Link
                                  to={formSwitch(form)}
                                  onClick={() => navigateToNext(form)}
                                >
                                  Complete form
                                </Link>
                              ) : (
                                <a href="#">View form</a>
                              )}
                            </div>
                            <div className="accordion-img table-img">
                              <img
                                src={share_img}
                                alt=""
                                onClick={() => downloadHandler(form.id)}
                              />
                              <img
                                src={delete2_img}
                                alt=""
                                onClick={() => formDeleteHandler(form.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">Data not found</div>
                )}
              </div>

              {/* {!isLoading && formList?.length > 0 && (
                <Pagination
                  dataLength={formList?.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )} */}
            </div>
            <div className="col-lg-6 col-md-6 submitted-div">
              <h2>Submitted forms</h2>

              <div class="accordion" id="regularAccordionRobots">
                {/* <div class="accordion-item">
                                    <h2 id="regularHeadingFirst" class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#regularCollapseFirst" aria-expanded="true" aria-controls="regularCollapseFirst">
                                            1.Latest form
                                        </button>
                                    </h2>
                                    <div id="regularCollapseFirst" class="accordion-collapse collapse show" aria-labelledby="regularHeadingFirst" data-bs-parent="#regularAccordionRobots">
                                        <div class="accordion-body">
                                            <div className="accordion-content">
                                                <div className="title-accodion">
                                                    <span>Form submitted</span>
                                                    <a href="#">View form</a>
                                                </div>
                                                <div className="accordion-img">
                                                    <img src={share_img} alt="" />
                                                    <img src={delete2_img} alt="" />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div> */}
                {isLoading ? (
                  <div className="text-center">loading...</div>
                ) : currentItems?.length > 0 ? (
                  currentItems?.map((form, index) => (
                    <div
                      className={
                        "accordion-item " +
                        form?.form_status?.toLowerCase() +
                        "-form"
                      }
                      key={index}
                    >
                      <h2
                        class="accordion-header"
                        id={`regularHeading${index + 1}`}
                      >
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#regularCollapse${index + 1}`}
                          aria-expanded="false"
                          aria-controls={`regularCollapse${index + 1}`}
                        >
                          {/* {serialNo + index + 1}.{ordinalNumbers[serialNo + index]} form */}
                          <td>
                            {form?.first_name}{" "}
                            {form?.created_at
                              ? "(" +
                                moment(form?.created_at).format("DD/MM/YYYY") +
                                ")"
                              : ""}
                          </td>
                        </button>
                      </h2>
                      <div
                        id={`regularCollapse${index + 1}`}
                        class="accordion-collapse collapse"
                        aria-labelledby={`regularHeading${index + 1}`}
                        data-bs-parent="#regularAccordionRobots"
                      >
                        <div class="accordion-body">
                          <div className="accordion-content">
                            <div className="title-accodion">
                              <span>
                                Form{" "}
                                {form?.form_status === "Complete"
                                  ? "submitted"
                                  : form?.form_status?.toLowerCase()}
                              </span>
                              {form?.form_status === "Pending" ? (
                                <Link
                                  to={formSwitch(form)}
                                  onClick={() => navigateToNext(form)}
                                >
                                  Complete form
                                </Link>
                              ) : (
                                <a href="#">View form</a>
                              )}
                            </div>
                            <div className="accordion-img table-img">
                              <img
                                src={share_img}
                                alt=""
                                onClick={() => downloadHandler(form.id)}
                              />
                              <img
                                src={delete2_img}
                                alt=""
                                onClick={() => formDeleteHandler(form.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">Data not found</div>
                )}
              </div>

              {/* {!isLoading && formList?.length > 0 && (
                <Pagination
                  dataLength={formList?.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MyAccount;
