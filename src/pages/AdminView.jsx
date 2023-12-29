import React from "react";
import btn_arrow from "../assets/images/btn_arrow.svg";

const AdminView = () => {
  return(
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
                  <button class="btn" type="submit">
                    Download PDF
                  </button>
                  <button class="btn" type="submit">
                    Assign to different user
                  </button>
                  <button class="btn" type="submit">
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
