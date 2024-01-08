import React from "react";
import btn_arrow from "../assets/images/btn_arrow.svg";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const AdminView = () => {
  const dispatch = useDispatch()

  const formDeleteHandler = async (form_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await dispatch(formDelete(form_id));
        // await dispatch(formlist(userId));
        Swal.fire({
          title: "Deleted!",
          text: "Form deleted successfully",
          icon: "success"
        });
      }
    });
  }

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
                  <a href="#" className="btn">
                    Back
                  </a>
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
                  <button class="btn" type="button" onClick={() => formDeleteHandler()}>
                    Delete form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminView;
