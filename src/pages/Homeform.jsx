import React from "react";
import { Formik } from "formik";
// import homeimage from "../assets/images/home-img.png"

const Homeform = () => {
  return (
    <>
      <form>
        <section className="general-form mt-80 mb-80">
          <div className="container ">
            <h1>General information</h1>
            <div className="bg-lightgray-color">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="card card-par">
                      <p>
                        Fields marked with an <span>*</span> are required
                      </p>
                      <div className="form ">
                        <div className="row">
                          <div className="form-div">
                            <label htmlFor="first_name">
                              <strong>1.</strong> Location of home<span>*</span>
                            </label>
                            <input
                              type="text"
                              name="first_name"
                              id="first_name"
                              className="form-control"
                              placeholder="First Name"
                            />
                          </div>

                          <div class="sub-checkbox">
                            <input
                              id="checkbox-1"
                              class="checkbox-custom"
                              name="checkbox-1"
                              type="checkbox"
                            />
                            <label
                              for="checkbox-1"
                              class="checkbox-custom-label"
                            >
                              First Choice
                            </label>
                          </div>
                        </div>
                        <div className="form-div">
                          <label htmlFor="other_dependants">
                            <strong>9. </strong> Was your electricity supplied
                            under a zero-carbon energy tariff? <span>*</span>{" "}
                            <p>
                              (100% electricity generated from wind, water,
                              solar, nuclear)
                            </p>
                          </label>
                          <select
                            name="other_dependants"
                            id="other_dependants"
                            className="form-control"
                          >
                            <option value="">Select option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Homeform;
