import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { foodFormSubmit, foodFormUpdate, getCountry } from "../redux-store/actions/user";
import Swal from "sweetalert2";
import { foodFormValidation } from "../helpers/validations/Schema";
import { setFormCompleted } from "../redux-store/reducers/auth";

const FoodAndShopping = ({ isEdit, food }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const [disabled, setDisabled] = useState(false);
  const [completeLater, setCompleteLater] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const endYear = new Date().getFullYear();
  const startYear = endYear - 20;

  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        purchased_new_vehicle: food?.purchased_new_vehicle,
        vehicle_detail: food?.vehicle_detail,
        important_purchases_detail: food?.important_purchases_detail,
        average_pieces_per_quarter: food?.average_pieces_per_quarter,
        pet_type: food?.pet_type,
        pet_detail: food?.pet_detail,
        meat_based_meals_frequency: food?.meat_based_meals_frequency,
        dairy_frequency: food?.dairy_frequency,
        food_purchase_statement: food?.food_purchase_statement,
        planning_this_year: food?.planning_this_year,
        events_details: food?.events_details,
        information_diet_clothes_parter: food?.information_diet_clothes_parter
      })
    }
  }, [food])

  const validateAndFilterFields = (values) => {
    const { purchased_new_vehicle, vehicle_detail, pet_type, pet_detail, planning_this_year, events_details, ...rest } = values;

    const filteredValues = {
      ...rest,
      purchased_new_vehicle,
      vehicle_detail: (purchased_new_vehicle === "Yes") ? vehicle_detail?.trim() : "",
      pet_type,
      pet_detail: (pet_type === "Yes") ? pet_detail?.trim() : "",
      planning_this_year,
      events_details: (planning_this_year === "Yes") ? events_details?.trim() : "",
    };

    return filteredValues;
  };


  const formik = useFormik({

    initialValues: {
      purchased_new_vehicle: "",
      vehicle_detail: "",
      important_purchases_detail: "",
      average_pieces_per_quarter: "",
      pet_type: "",
      pet_detail: "",
      meat_based_meals_frequency: "",
      dairy_frequency: "",
      food_purchase_statement: "",
      planning_this_year: "",
      events_details: "",
      information_diet_clothes_parter: ""
    },

    validationSchema: foodFormValidation,

    onSubmit: submitHandler,
  });

  const navigateToNext = async (e) => {
    if (completeLater) {
      navigate("/my-account")
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  async function submitHandler(values) {

    setDisabled(true);
    const filteredValues = await validateAndFilterFields(values);
    let response;
    if (isEdit) {
      const data = { formValues: filteredValues, form_id: food?.id }
      response = await dispatch(foodFormUpdate(data));
    } else {
      filteredValues.general_information_id = Number(user?.generalInfoId);
      response = await dispatch(foodFormSubmit(filteredValues));
    }
    setDisabled(false)
    if (!response?.payload?.error && response?.payload?.data) {
      setIsSubmitted(true);
      if (!isEdit) {
        dispatch(setFormCompleted(user?.formCompleted + 1))
      }
      navigateToNext()
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
          html: errorMessage || "Failed to form submit, please try again",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        });
      }
    }

  };

  const continueHandler = () => {
    if (isSubmitted) {
      navigateToNext()
    } else {
      Swal.fire({
        title: "Warning!",
        text: "Please save you progress before continuing",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });
    }
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section className="food-shopping top">
          <div className="container">
            <div className="sub-heading">
              <h2>Food and shopping</h2>
            </div>
            <div className="bg-color">
              <div className="card card-par">
                <p>
                  Fields marked with an <span>*</span> are required
                </p>
                <div className="Additional-box food-initial-input-box">
                  <div className="form-label-div">
                    <label htmlFor="purchased_new_vehicle">
                      <strong>1.&nbsp;</strong>Did you purchase a new vehicle this year? This includes cars, boats, or other large machinery.
                      <span>*</span>
                    </label>
                    <div className="col-lg-5">
                      <div className="sub-btn">
                        <input
                          type="radio"
                          id="purchased_new_vehicle_yes"
                          name="purchased_new_vehicle"
                          value="Yes"
                          checked={formik.values.purchased_new_vehicle === "Yes"}
                          onChange={formik.handleChange}
                        />
                        <label htmlFor="purchased_new_vehicle_yes" className={formik.values.purchased_new_vehicle === "Yes" ? "active" : ""}>Yes</label>
                        <input
                          type="radio"
                          id="purchased_new_vehicle_no"
                          name="purchased_new_vehicle"
                          value="No"
                          checked={formik.values.purchased_new_vehicle === "No"}
                          onChange={formik.handleChange}
                        />
                        <label htmlFor="purchased_new_vehicle_no" className={formik.values.purchased_new_vehicle === "No" ? "active" : ""}>
                          No
                        </label>
                      </div>
                      {formik.touched.purchased_new_vehicle && formik.errors.purchased_new_vehicle ? (
                        <span className="input-error-msg">
                          {formik.errors.purchased_new_vehicle}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {formik?.values?.purchased_new_vehicle === "Yes" && (

                    <div className="form-label-div">
                      <label htmlFor="vehicle_detail">
                        <strong>1b.&nbsp;</strong>
                        Please provide details, including the number and type of vehicle or boat purchased.
                        <span>*</span>
                        {/* Please give details of any vehicles purchased in the
                      selected year, such as cars or boats. Please specify the
                      relevant details, such as number and type. You do not need
                      to include second-hand or refurbished vehicles. Please also
                    include vehicles purchased by your household members. */}
                      </label>
                      <textarea
                        rows="6"
                        name={"vehicle_detail"}
                        id={"vehicle_detail"}
                        value={formik.values.vehicle_detail}
                        className={`form-control ${formik.errors.vehicle_detail &&
                          formik.touched.vehicle_detail ? "invalidInput" : ""} `}
                        cols="50"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={1000}
                      ></textarea>
                      {formik.touched.vehicle_detail && formik.errors.vehicle_detail ? (
                        <span className="input-error-msg">
                          {formik.errors.vehicle_detail}
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="food-shopping">
          <div className="container">
            <div className="sub-heading">
              <h2>Additional information</h2>
            </div>
            <div className="bg-color">
              <div className="card">
                <div className="Additional-box">
                  <div className="form-div">
                    <p>
                      This section is optional, however it will allow us to make
                      your carbon footprint more complete and your
                      recommendations more specific.
                    </p>
                    <label htmlFor="important_purchases_detail">
                      <strong>2.&nbsp;</strong>
                      Please give details of any other important purchases made in the selected year, such as TVs, laptops, phones and other electronics, domestic appliances, furniture, and home renovations. Please specify the relevant details, such as number and type. You do not need to include second-hand or refurbished items. You may optionally include items purchased by your household members.
                    </label>
                    <textarea
                      rows="6"
                      name={"important_purchases_detail"}
                      id={"important_purchases_detail"}
                      value={formik.values.important_purchases_detail}
                      className={`form-control`}
                      cols="50"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      maxLength={1000}
                    ></textarea>
                  </div>

                  <div className="form-div">
                    <div className="form-label-div">
                      <label htmlFor="average_pieces_per_quarter">
                        <strong>3.&nbsp;</strong>On average, how many new pieces of
                        clothing do you buy each quarter?
                      </label>
                    </div>
                    <select className="form-control "
                      name={"average_pieces_per_quarter"}
                      id={"average_pieces_per_quarter"}
                      value={formik.values.average_pieces_per_quarter}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}                     >
                      <option value="0">Select option</option>
                      <option value="2">1 - 3</option>
                      <option value="7">4 - 10</option>
                      <option value="15">10 - 20</option>
                      <option value="25">20 - 30</option>
                      <option value="35">30 - 40</option>
                      <option value="45">40 - 50</option>
                      <option value="50">&gt;50</option>
                    </select>
                  </div>
                  <div className="form-div">
                    <div className="form-label-div">
                      <label htmlFor="pet_type">
                        <strong>4.&nbsp;</strong>Do you have any domestic pets or
                        animals??
                      </label>
                    </div>
                    <select className="form-control "
                      name={"pet_type"}
                      id={"pet_type"}
                      value={formik.values.pet_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}  >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {formik.values.pet_type !== "No" && (
                    <div className="form-div">
                      <label htmlFor="pet_detail">
                        <strong>4b.&nbsp;</strong>
                        Please specify, e.g. number, breed
                      </label>
                      <textarea
                        id="pet_detail"
                        name="pet_detail"
                        rows="6"
                        className="form-control"
                        cols="50"
                        value={formik.values.pet_detail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={1000}
                      ></textarea>
                    </div>
                  )}
                  <div className="form-div">
                    <div className="form-label-div">
                      <label htmlFor="meat_based_meals_frequency">
                        <strong>5.&nbsp;</strong>How often does your diet include
                        meat-based meals?
                      </label>
                    </div>

                    <select name="meat_based_meals_frequency" id="meat_based_meals_frequency" className="form-control "
                      value={formik.values.meat_based_meals_frequency}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value="">Select option</option>
                      <option value="Never">Never</option>
                      <option value="Once or Twice">Once or Twice A Week</option>
                      <option value="Most Days">Most Days</option>
                      <option value="Every Day">Every Day</option>
                    </select>
                  </div>

                  <div className="form-div">
                    <div className="form-label-div">
                      <label htmlFor="dairy_frequency">
                        <strong>6.&nbsp;</strong>How often does your diet include
                        dairy?
                      </label>
                    </div>
                    <select className="form-control "
                      name="dairy_frequency" id="dairy_frequency"
                      value={formik.values.dairy_frequency}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value="">Select option</option>
                      <option value="Never">Never</option>
                      <option value="Once or Twice">Once or Twice A Week</option>
                      <option value="Most Days">Most Days</option>
                      <option value="Every Day">Every Day</option>
                    </select>
                  </div>

                  <div className="form-div">
                    <div className="form-label-div">
                      <label htmlFor="food_purchase_statement">
                        <strong>7.&nbsp;</strong>Thinking about the food you buy,
                        which of the following statements applies?
                      </label>
                      <p className="gray-paragraph">
                        (The average household throws away 16% of their
                        purchased food).
                      </p>
                    </div>
                    <select className="form-control"
                      name="food_purchase_statement" id="food_purchase_statement"
                      value={formik.values.food_purchase_statement}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select option</option>
                      <option value="5">We rarely throw away uneaten food (less than 10%)</option>
                      <option value="15">We sometimes throw away uneaten food (10-20%)</option>
                      <option value="25">We often throw away uneaten food (greater than 20%)</option>
                    </select>
                  </div>

                  <div className="form-div">
                    <label htmlFor="information_diet_clothes_parter">
                      <strong>8.&nbsp;</strong>Please enter any information about the
                      diet and clothes purchases of your partner and dependents,
                      where relevant.
                    </label>
                    <ul>
                      <li className="main-li">
                        Please answer in terms of how often they eat meat and
                        dairy, and how many clothes they buy per quarter.{" "}
                      </li>
                      <li className="main-li">
                        If no information is supplied, we will assume the same
                        diet and clothes shopping patterns for other family
                        members.
                      </li>
                    </ul>
                    <textarea
                      className="form-control"
                      rows="6"
                      cols="50"
                      name="information_diet_clothes_parter" id="information_diet_clothes_parter"
                      value={formik.values.information_diet_clothes_parter}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      maxLength={1000}
                    ></textarea>
                  </div>


                  <div className="form-div">
                    <label htmlFor="planning_this_year">
                      <strong>9.&nbsp;</strong>Do you have any plans to host or
                      organise any large events this year or next year?
                    </label>
                    <ul>
                      <li className="main-li">
                        This question only applies for submissions for the
                        latest full calendar year.{" "}
                      </li>
                      <li className="main-li">
                        This is not essential for the calculation of your carbon
                        footprint, but allows us to give you tailored,
                        forward-looking recommendations.
                      </li>
                    </ul>
                    <select
                      className="form-control"
                      name="planning_this_year"
                      id="planning_this_year"
                      value={formik.values.planning_this_year}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {formik.values.planning_this_year !== "No" && (
                    <div className="form-div">
                      <label htmlFor="events_details">
                        <strong>9b.&nbsp;</strong>Please provide more details
                      </label>

                      <textarea
                        className="form-control"
                        rows="6"
                        cols="50"
                        name="events_details" id="events_details"
                        value={formik.values.events_details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={1000}
                      ></textarea>
                    </div>
                  )}
                </div>
                <div className="Additional-bottom-btn">
                  <button className="btn" type='submit' disabled={disabled && completeLater} onClick={() => { setCompleteLater(true) }}>Save & Complete Later {disabled && completeLater ? <div className="spinner-border text-primary" role="status">
                  </div> : ''}</button>
                  <button className="btn" type='submit' disabled={disabled && !completeLater} onClick={() => { setCompleteLater(false) }}>Continue {disabled && !completeLater ? <div className="spinner-border text-primary" role="status">
                  </div> : ''}</button>
                </div>
                {formik.submitCount > 0 && !formik.isValid ? (
                  <span className={`input-error-msg d-flex ${completeLater ? "justify-content-start" : "justify-content-end"}`}>Please fill the required* fields before {completeLater ? "save." : "continuing."}</span>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default FoodAndShopping;
