import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchParticularForm, formDelete } from "../../redux-store/actions/admin";
import HomeFormView from "../forms/HomeFormView";
import GeneralView from "../forms/GeneralView";
import TravelView from "../forms/TravelView";
import FoodAndShoppingView from "../forms/FoodAndShoppingView";
import FormActionTabs from "../forms/FormActionTabs";
import { downloadPdf } from "../../redux-store/actions/user";

const AdminView = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form_id } = useParams()
  const singleForm = useSelector((state) => state.admin.singleForm)
  const decodedFormId = atob(form_id);
  const [activeTab, setActiveTab] = useState("general");
  const [selectedHome, setSelectedHome] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const locationOfFile = location.pathname;
  const split1 = locationOfFile?.split('/');
  const adminPath = split1[1];

  const handleActiveTab = (active) => {
    setActiveTab(active)
  }

  useEffect(() => {
    if (decodedFormId) {
      dispatch(fetchParticularForm(decodedFormId))
    }
  }, [decodedFormId])


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

  const {
    home,
    travel,
    food,
    financial,
    ...general
  } = singleForm;

  const downloadHandler = async () => {
    try {
      setDisabled(true)
      const response = await dispatch(downloadPdf(decodedFormId));
      if (response?.payload?.data?.access_url) {
        const link = document.createElement('a');
        link.href = response?.payload?.data?.access_url;
        link.download = 'filename.pdf';
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setDisabled(false)
    } catch (err) {
      setDisabled(false)
      console.log(err, "///////err/////");
    }
  };

  return (
    <>
      <section className="admin-view">
        <div className="container">
          <div className="admin-view-bg-color">
            <div class="card">
              <div className="admin-view-header">
                <div class="sub-heading">
                  <h2>Form name</h2>
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
                  <p>Calendar year: { }</p>
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

                  {adminPath === "admin" ? (<button class="btn" type="button">
                    Assign to different user
                  </button>) : null}

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
        </div>
      </section>
      <section className="full-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="full-form-div py-0 bg-secondary">
                <FormActionTabs activeTab={activeTab} handleActiveTab={handleActiveTab} setSelectedHome={setSelectedHome} />
                {activeTab === "general" && (<GeneralView general={general} />)}
                {activeTab === "home" && (<HomeFormView home={home[selectedHome - 1]} />)}
                {activeTab === "travel" && (<TravelView travel={travel} />)}
                {activeTab === "food" && (<FoodAndShoppingView food={food} />)}
                {/* <HomeFormView financial={financial} /> */}
              </div>
            </div>
            <div class="admin-header-btn">
              <Link to="/admin/dashboard" className="btn">
                Back
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminView;
