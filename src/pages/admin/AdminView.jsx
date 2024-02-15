import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { downloadPdf, adminFetchParticularForm, formDelete, updateFormName, getUserList, assignToNewUser } from "../../redux-store/actions/admin";
import HomeFormView from "../forms/HomeFormView";
import GeneralView from "../forms/GeneralView";
import TravelView from "../forms/TravelView";
import FoodAndShoppingView from "../forms/FoodAndShoppingView";
import SuccessImg from "../../assets/images/Group 9106.png";

import FormTabsView from "../forms/FormTabsView";
import FinancialView from "../forms/FinancialView";
import moment from "moment";
import { useFormik } from "formik";
import { setFormName } from "../../redux-store/reducers/auth";
import { fetchParticularForm } from "../../redux-store/actions/user";

const validate = values => {
  const errors = {};
  if (!values.form_name?.trim()) {
    errors.form_name = 'Form name field is required';
  }
  return errors;
};

const validate2 = values => {
  const errors = {};
  if (!values.user_id?.trim()) {
    errors.user_id = 'Please select one option';
  }
  return errors;
};

const AdminView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form_id } = useParams()
  const adminSingleForm = useSelector((state) => state.admin.singleForm)
  const assignUserList = useSelector((state) => state.admin.assignUserList)
  const singleForm = useSelector((state) => state.users.singleForm)
  const localFormName = useSelector((state) => state.auth.formName);
  const decodedFormId = atob(form_id);
  const [activeTab, setActiveTab] = useState("general");
  const [openModal, setOpenModal] = useState("");
  const [selectedHome, setSelectedHome] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = useRef(null);
  const locationOfFile = location.pathname;
  const split1 = locationOfFile?.split('/');
  const adminPath = split1[1];

  let { home, travel, food, financial, ...general } = {};

  if (adminPath === "admin") {
    ({ home, travel, food, financial, ...general } = adminSingleForm || {});
  } else {
    ({ home, travel, food, financial, ...general } = singleForm || {});
  }


  const homeDetails = (home && home?.length > 0 && home[selectedHome - 1]) || {};

  const handleActiveTab = (active) => {
    setActiveTab(active)
  }

  useEffect(() => {
    if (decodedFormId) {
      const getFormDetails = async () => {
        setLoading(true)
        if (adminPath === "admin") {
          await dispatch(adminFetchParticularForm(decodedFormId))
        } else {
          await dispatch(fetchParticularForm(decodedFormId))
        }
        setLoading(false)
      }
      getFormDetails()
    }
  }, [decodedFormId])

  useEffect(() => {
    if (general?.user_id === null) {
      const fetchUserList = async () => {
        await dispatch(getUserList())
      }
      fetchUserList()
    }
  }, [general?.user_id])

  const navigateToNext = (e) => {
    navigate("/admin/dashboard")
  }

  const handleDeleteConfirmation = async () => {
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
        await deleteForm();
      }
    } catch (error) {
      console.error("Error during delete confirmation:", error);
    }
  };

  const deleteForm = async () => {
    try {
      const response = await dispatch(formDelete(decodedFormId));

      if (response?.payload?.data) {
        handleSuccessfulDelete();
      } else {
        handleFailedDelete(response);
      }
    } catch (error) {
      console.error("Error during form deletion:", error);
    }
  };

  const handleSuccessfulDelete = () => {
    Swal.fire({
      title: "Deleted!",
      text: "Form deleted successfully",
      icon: "success",
    });
    navigateToNext();
  };

  const handleFailedDelete = (response) => {
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
        html: errorMessage || "Failed to delete form, please try again",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });
    }
  };

  const downloadHandler = async () => {
    try {
      setDisabled(true)
      const response = await dispatch(downloadPdf(decodedFormId));
      if (response?.payload) {
        const blob = new Blob([response.payload], { type: 'application/pdf' });

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const formattedTime = currentDate.toTimeString().split(' ')[0].replace(/:/g, '');
        const fileName = `net_zero_${formattedDate}_${formattedTime}.pdf`;

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;
        downloadLink.click();
      }
      setDisabled(false)
    } catch (error) {
      setDisabled(false)
      console.error('Error downloading PDF:', error.message);
    }
  };

  useEffect(() => {
    dispatch(setFormName(general?.form_name?.form_name))
    formik.setValues({
      form_name: general?.form_name?.form_name,
      id: general?.id
    })

    return (() => {
      dispatch(setFormName(null))
    })
  }, [adminSingleForm])

  const formik = useFormik({
    initialValues: {
      form_name: localFormName
    },

    validate: validate,

    onSubmit: async (values) => {
      if (!values?.form_name?.trim()) {
        return false
      }
      try {
        setDisabled(true)
        const response = await dispatch(updateFormName(values));
        setDisabled(false)
        if (!response?.payload?.error && response?.payload?.data) {
          Swal.fire({
            title: "Success!",
            text: "Form name updated successfully",
            imageUrl: SuccessImg,
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
          });
          dispatch(setFormName(values?.form_name))
          closeModal.current.click();
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
              html: errorMessage || "Failed to updated form name, please try again",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Failed!",
          text: "Something went wrong",
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

  const formik2 = useFormik({
    initialValues: {
      user_id: "",
      form_id: decodedFormId
    },

    validate: validate2,

    onSubmit: async (values) => {
      try {
        setDisabled(true)
        const response = await dispatch(assignToNewUser(values));
        setDisabled(false)
        if (!response?.payload?.error && response?.payload?.data) {
          Swal.fire({
            title: "Success!",
            text: "User assigned successfully",
            imageUrl: SuccessImg,
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
          });
          closeModal.current.click();
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
              html: errorMessage || "Failed to user assign, please try again",
              icon: "error",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Failed!",
          text: "Something went wrong",
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
      {adminPath === "admin" && (
        <section className="admin-view">
          <div className="container">
            {loading ? (
              <>
                <p className="placeholder-glow">
                  <span className="placeholder col-12 vh-30 "></span>
                </p>
              </>
            ) : (
              <div className="admin-view-bg-color">
                <div class="card">
                  <div className="admin-view-header">
                    <div class="sub-heading" >
                      <h2 data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setOpenModal("CHANGE_FORM_NAME")}>{localFormName || general?.form_name?.form_name}</h2>
                    </div>
                    <div class="admin-header-btn">
                      <Link to="/admin/dashboard" className="btn">
                        Back
                      </Link>
                    </div>
                  </div>
                  <div className="admin-view-content">
                    <div className="admin-text">
                      <p>First name: {general?.first_name}</p>
                      <p>Last name: {general?.last_name}</p>
                      <p>Email address: {general?.email}</p>
                      <p>Calendar year: {moment(general?.created_at).format("DD/MM/YYYY")}</p>
                    </div>
                    <div className="admin-text-btn">
                      <button class="btn" type="button" onClick={downloadHandler} disabled={disabled}>
                        Download PDF
                        {disabled ? (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          ></div>
                        ) : (
                          ""
                        )}
                      </button>
                      {general?.user_id === null ? (
                        <button class="btn" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setOpenModal("ASSIGN_TO_USER")}>
                          Assign to different user
                        </button>
                      ) : (
                        <button class="btn" type="button" >
                          Assign to different user
                        </button>
                      )}

                      <button
                        class="btn"
                        type="button"
                        onClick={(e) => handleDeleteConfirmation(e)}
                      >
                        Delete form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>)}

      <section className={`full-form ${adminPath !== "admin" ? "mt-80" : ""}`}>
        <div className="container">
          {loading ? (
            <p className="placeholder-glow form-skeleton">
              <div className="text-center">
                Loading...
              </div>
              <span className="placeholder col-12 vh-50"></span>
            </p>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="full-form-div py-0 bg-secondary">
                  <FormTabsView activeTab={activeTab} handleActiveTab={handleActiveTab} setSelectedHome={setSelectedHome} homeLength={home?.length} />
                  {activeTab === "general" && (<GeneralView general={general} />)}
                  {activeTab === "home" && (<HomeFormView home={homeDetails} />)}
                  {activeTab === "travel" && (<TravelView travel={travel} />)}
                  {activeTab === "food" && (<FoodAndShoppingView food={food} />)}
                  {activeTab === "financial" && (<FinancialView financial={financial} />)}
                </div>
              </div>
              {adminPath === "admin" && (
                <div class="admin-header-btn">
                  <Link to="/admin/dashboard" className="btn">
                    Back
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {/* Modal popup */}
      < div class="modal fade form-name-container" id="exampleModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="close-btn-box d-flex justify-content-end">
              <button type="button" class="" data-bs-dismiss="modal" aria-label="Close" ref={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="43.167" height="43.167" viewBox="0 0 43.167 43.167">
                  <g id="np_menu_1166835_000000" transform="translate(-17.882 -18.556)">
                    <path id="Path_24" data-name="Path 24" d="M64.076,21.563H14.033a2.733,2.733,0,1,1,0-5.466H64.149a2.733,2.733,0,1,1-.073,5.466Z" transform="translate(25.139 -0.817) rotate(45)" fill="#2c2b34" />
                    <path id="Path_25" data-name="Path 25" d="M52.776,0H2.733a2.733,2.733,0,1,0,0,5.466H52.849A2.733,2.733,0,1,0,52.776,0Z" transform="translate(61.049 22.421) rotate(135)" fill="#2c2b34" />
                  </g>
                </svg>
              </button>
            </div>
            <div class="modal-headers d-flex justify-content-center ">
              <h1 class="modal-title fs-2" id="exampleModalLabel mt-5">{(openModal === "ASSIGN_TO_USER") ? "Assign to different user" : "Change form name"}</h1>
            </div>
            <div class="modal-body form-name-box">
              {openModal === "ASSIGN_TO_USER" ? (
                <div className="assign-to-user-box">
                  <form onSubmit={formik2.handleSubmit}>
                    <div className="form-div">
                      <label htmlFor="user_id" className="mb-1">User's name</label>
                      <select name="user_id" className={`form-control ${formik2.errors.user_id && formik2.touched.user_id ? "invalidInput" : ""} `} onChange={formik2.handleChange} onBlur={formik2.handleBlur} value={formik2.values.user_id} >
                        <option>Select option</option>
                        {assignUserList !== null && assignUserList?.length > 0 && assignUserList?.map((user, index) => ((
                          <option value={user?.id} key={"user" + index}>{`${user?.first_name} ${user?.last_name}`}</option>
                        )))}
                      </select>
                      {formik2.errors.user_id && formik2.touched.user_id ? <span className='input-error-msg'>{formik2.errors.user_id}</span> : null}
                    </div>
                    <button className="submit-btn" type='submit' disabled={disabled}>Save {disabled ? <div className="spinner-border text-primary" role="status">
                    </div> : ''}</button>

                  </form>
                </div>
              ) : (
                <div className="change-form-name-box">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-div">
                      <label htmlFor="form_name" className="mb-1">Form name</label>
                      <input type="text" name="form_name" className={`form-control ${formik.errors.form_name && formik.touched.form_name ? "invalidInput" : ""} `} placeholder="Form  name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.form_name} />
                      {formik.errors.form_name && formik.touched.form_name ? <span className='input-error-msg'>{formik.errors.form_name}</span> : null}
                    </div>
                    <button className="submit-btn" type='submit' disabled={disabled}>Save {disabled ? <div className="spinner-border text-primary" role="status">
                    </div> : ''}</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};
export default AdminView;
