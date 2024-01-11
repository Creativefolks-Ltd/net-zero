import React, { useEffect } from "react";
import btn_arrow from "../assets/images/btn_arrow.svg";
import edit_img from "../assets/images/edit_img.svg";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchParticularForm, formDelete } from "../redux-store/actions/admin";

const AdminView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form_id } = useParams()

  const decodedFormId = atob(form_id);

  useEffect(() => {
    if (decodedFormId) {
      dispatch(fetchParticularForm(decodedFormId))
    }
  }, [decodedFormId])


  const navigateToNext = (e) => {
    navigate("/admin-dashboard")
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
      const errorMessages = Object.values(errorMsg).flatMap((messages) => messages);

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
                  <Link to="/admin-dashboard" className="btn">
                    Back
                  </Link>
                </div>
              </div>
              <div className="admin-view-content">
                <div className="admin-text">
                  <p>First name</p>
                  <p>Last name</p>
                  <p>Email address</p>
                  <p>Calendar year</p>
                </div>
                <div className="admin-text-btn">
                  <button class="btn" type="button">
                    Download PDF
                  </button>
                  <button class="btn" type="button">
                    Assign to different user
                  </button>
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
              <div className="full-form-div">
                <h2>Full form</h2>
              </div>
            </div>
            <div class="admin-header-btn">
              <Link to="/admin-dashboard" className="btn">
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
