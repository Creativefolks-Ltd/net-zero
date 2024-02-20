import React, { useEffect, useState } from "react";
import { travelformvalidation } from "../../helpers/validations/Schema";
import { useFormik } from "formik";
import { travelFormSubmit, travelFormUpdate } from "../../redux-store/actions/user";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setFormCompleted } from "../../redux-store/reducers/auth";

const Travel = ({ isEdit, travel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const [disabled, setDisabled] = useState(false);
  const [completeLater, setCompleteLater] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const vehicalTypes = ["Motorbike", "Bicycle", "Passenger Ferry", "Train", "Private Yacht", "Private hire vehicles (taxis, transfers, limos, etc)", "Helicopter"];

  const flightStandards = ["Economy", "Business", "First Class", "Private"];

  const flightTypes = ["Short Flights", "Medium Flights", "Long Flights", "Extended Flights"];

  const flights = {
    short_flights: { economy: '', business: '', firstClass: '', private: '' },
    medium_flights: { economy: '', business: '', firstClass: '', private: '' },
    long_flights: { economy: '', business: '', firstClass: '', private: '' },
    extended_flights: { economy: '', business: '', firstClass: '', private: '' },
  };
  const flights2 = {
    partner_children_short_flights: { economy: '', business: '', firstClass: '', private: '' },
    partner_children_medium_flights: { economy: '', business: '', firstClass: '', private: '' },
    partner_children_long_flights: { economy: '', business: '', firstClass: '', private: '' },
    partner_children_extended_flights: { economy: '', business: '', firstClass: '', private: '' },
  }

  useEffect(() => {
    if (isEdit) {
      formik.setValues({
        short_flights: travel?.short_flights !== undefined ? JSON.parse(travel?.short_flights) : {},
        medium_flights: travel?.medium_flights !== undefined ? JSON.parse(travel?.medium_flights) : {},
        long_flights: travel?.long_flights !== undefined ? JSON.parse(travel?.long_flights) : {},
        extended_flights: travel?.extended_flights !== undefined ? JSON.parse(travel?.extended_flights) : {},
        proportion_offset_flights: travel?.proportion_offset_flights ?? null,
        how_many_cars: travel?.how_many_cars,
        cars_detail: travel?.cars_detail ? JSON.parse(travel?.cars_detail) : [],
        partner_children_short_flights: travel?.partner_children_short_flights !== undefined ? JSON.parse(travel?.partner_children_short_flights) : {},
        partner_children_medium_flights: travel?.partner_children_medium_flights !== undefined ? JSON.parse(travel?.partner_children_medium_flights) : {},
        partner_children_long_flights: travel?.partner_children_long_flights !== undefined ? JSON.parse(travel?.partner_children_long_flights) : {},
        partner_children_extended_flights: travel?.partner_children_extended_flights !== undefined ? JSON.parse(travel?.partner_children_extended_flights) : {},
        partner_offset_flights: travel?.partner_offset_flights ?? null,
        additional_vehicles_by_partner_children: travel?.additional_vehicles_by_partner_children ?? null,
        additional_vehicles_by_partner_detail: travel?.additional_vehicles_by_partner_detail !== undefined ? JSON.parse(travel?.additional_vehicles_by_partner_detail) : [],
        transport_selected_year: travel?.transport_selected_year !== undefined ? travel?.transport_selected_year?.split(',') : [], //"car,bike.name" //string,
        transport_selected_year_details: travel?.transport_selected_year_details !== undefined && travel?.transport_selected_year_details !== null ? JSON.parse(travel?.transport_selected_year_details) : [],
        hotel_nights: travel?.hotel_nights ?? null,
        other_travel_info: travel?.other_travel_info ?? ""
      })
    }
  }, [travel])


  const formik = useFormik({
    initialValues: {
      short_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      medium_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      long_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      extended_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      proportion_offset_flights: null,
      how_many_cars: null,
      cars_detail: [],
      partner_children_short_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      partner_children_medium_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      partner_children_long_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      partner_children_extended_flights: { economy: 0, business: 0, firstClass: 0, private: 0 },
      partner_offset_flights: null,
      additional_vehicles_by_partner_children: null,
      additional_vehicles_by_partner_detail: [],
      transport_selected_year: [], //"car,bike.name" //string,
      transport_selected_year_details: [],
      hotel_nights: null,
      other_travel_info: ""
    },

    validationSchema: travelformvalidation,

    onSubmit: submitHandler
  });

  const validateAndFilterFields = (values) => {
    const {
      proportion_offset_flights,
      how_many_cars,
      cars_detail,
      partner_offset_flights,
      additional_vehicles_by_partner_children,
      additional_vehicles_by_partner_detail,
      transport_selected_year,
      transport_selected_year_details,
      hotel_nights,
      ...rest
    } = values;

    const filteredValues = {
      ...rest,
      proportion_offset_flights: parseFloat(proportion_offset_flights),
      how_many_cars: Number(how_many_cars),
      cars_detail: cars_detail?.slice(0, Number(how_many_cars)),
      partner_offset_flights: Number(partner_offset_flights),
      additional_vehicles_by_partner_children: Number(additional_vehicles_by_partner_children),
      additional_vehicles_by_partner_detail: additional_vehicles_by_partner_detail?.slice(0, Number(additional_vehicles_by_partner_children)),
      transport_selected_year: transport_selected_year?.toString(),
      transport_selected_year_details: transport_selected_year_details?.slice(0, Number(transport_selected_year?.length)),
      hotel_nights: Number(hotel_nights),
    };

    return filteredValues;
  };

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
    if (formik.isValid) {
      setDisabled(true)
      let response;
      let filteredValues = await validateAndFilterFields(values);

      if (isEdit) {
        const data = { formValues: filteredValues, form_id: travel?.id }
        response = await dispatch(travelFormUpdate(data));
      } else {
        filteredValues.general_information_id = Number(user?.generalInfoId);
        response = await dispatch(travelFormSubmit(filteredValues));
      }
      setDisabled(false);
      if (!response?.payload?.error && response?.payload?.data) {
        setIsSubmitted(true);
        if (!isEdit) {
          dispatch(setFormCompleted(user?.formCompleted + 1))
        }
        navigateToNext()
      } else {
        setDisabled(false)
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
    }
  }

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

  const handleCheckboxChange = (event, type) => {
    const { checked } = event.target;
    let updatedTransportSelectedYear = formik.values?.transport_selected_year !== undefined ? [...formik.values?.transport_selected_year] : [];
    let updatedTransportDetails = formik.values?.transport_selected_year_details !== undefined ? [...formik.values?.transport_selected_year_details] : [];

    if (checked && !updatedTransportSelectedYear?.includes(type)) {
      updatedTransportSelectedYear.push(type);
      updatedTransportDetails.push({
        type,
        kms: '',
        notes: '',
        kmsInSelectedYear: '',
      });
    } else {
      const index = updatedTransportSelectedYear.indexOf(type);
      if (index !== -1) {
        updatedTransportSelectedYear.splice(index, 1);
        updatedTransportDetails.splice(index, 1);
      }
    }

    formik.setValues({
      ...formik.values,
      transport_selected_year: updatedTransportSelectedYear,
      transport_selected_year_details: updatedTransportDetails,
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section className="economy-table">
          <div className="container">
            <div className="sub-heading">
              <h2>Travel</h2>
            </div>
            <div className=" bg-color">
              <div className="card card-par">
                <p>
                  Fields marked with an <span>*</span> are required
                </p>
                <div className="form-div">
                  <label htmlFor="www">
                    <strong>1.&nbsp;</strong>How many flights did you take in the
                    selected year?<span>*</span>
                  </label>
                  <ul>
                    <li className="main-li">
                      Please include all flights you took in a personal capacity (i.e. not for a business you work for).{" "}
                    </li>
                    <li className="main-li">
                      Include return flights as two flights and use the
                      following guide for length:
                      <ul className="inner-li">
                        <li>
                          Short flights: shorter than 3,000 km or 4 hours
                        </li>
                        <li>
                          Medium flights: 3,000 to 7,000 km or 4 to 10 hours
                        </li>
                        <li>
                          Long flights: 7,000 to 12,000 km or 10 to 14 hours
                        </li>
                        <li>
                          Extended flights: longer than 12,000 km or 14 hours
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="economy-row-main">
                  {Object.keys(flights).map((flightType, index) => (
                    <div key={index} className="economy-row">
                      <div className="label-block">{flightTypes[index]}</div>
                      <div className="input-block">
                        <div className="input-row">
                          {Object.keys(flights[flightType]).map((classType, i) => (
                            <div className="input-col" key={`${classType}-${i}`}>
                              <label className="text-nowrap">{flightStandards[i]}</label>
                              <input
                                type="text"
                                placeholder="00"
                                name={`${flightType}.${classType}`}
                                value={formik.values[flightType][classType]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.errors[flightType]?.[classType] &&
                                  formik.touched[flightType]?.[classType] ? "invalidInput" : ""}
                              />
                              {formik.errors[flightType]?.[classType] &&
                                formik.touched[flightType]?.[classType] && (
                                  <span className="input-error-msg">
                                    {formik.errors[flightType][classType]}
                                  </span>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-div">
                  <div className="form-label-div">
                    <label htmlFor="proportion_offset_flights">
                      <strong>2.&nbsp;</strong>What proportion of your flights do you
                      offset ?<span>*</span>
                    </label>
                    <p>(estimated % by distance)</p>
                  </div>
                  <input
                    type="text"
                    id="proportion_offset_flights"
                    className={`form-control ${formik.errors.proportion_offset_flights &&
                      formik.touched.proportion_offset_flights
                      ? "invalidInput"
                      : ""
                      } `}
                    name={`proportion_offset_flights`}
                    value={formik.values.proportion_offset_flights}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.proportion_offset_flights &&
                    formik.touched.proportion_offset_flights && (
                      <span className="input-error-msg">
                        {formik.errors.proportion_offset_flights}
                      </span>
                    )}
                </div>

                <div className="form-div">
                  <div className="form-label-div">
                    <label htmlFor="how_many_cars">
                      <strong>3.&nbsp;</strong>How many cars do you use ?
                      <span>*</span>
                    </label>
                  </div>
                  <select
                    name={`how_many_cars`}
                    id={`how_many_cars`}
                    className={`form-control ${formik.errors.how_many_cars &&
                      formik.touched.how_many_cars
                      ? "invalidInput"
                      : ""
                      } `}
                    value={formik.values.how_many_cars}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <option value="">Select option</option>
                    {Array(10)
                      .fill()
                      .map((opt, index) => (
                        <option
                          value={index}
                          key={"opt" + index}
                        >
                          {index}
                        </option>
                      ))}

                  </select>
                  {formik.errors.how_many_cars &&
                    formik.touched.how_many_cars && (
                      <span className="input-error-msg">
                        {formik.errors.how_many_cars}
                      </span>
                    )}
                </div>
                {formik.values?.how_many_cars > 0 && (
                  <div className="modal-row-main">
                    {Array(Number(formik.values?.how_many_cars))
                      .fill()
                      .map((opt, index) => (
                        <div className="modal-row" key={index}>
                          <div className="modal-label-block">Car {index + 1}</div>
                          <div className="modal-input-block">
                            <div className="modal-input-row">
                              <div className="modal-input-col">
                                <label>Make & Model</label>{" "}
                                <input
                                  type="text"
                                  placeholder=""
                                  name={`cars_detail.${index}.makeAndModel`}
                                  value={formik.values.cars_detail[index]?.makeAndModel || ''}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.errors.cars_detail?.[index]?.makeAndModel &&
                                  formik.touched.cars_detail?.[index]?.makeAndModel && (
                                    <span className="input-error-msg">
                                      {formik.errors.cars_detail[index].makeAndModel}
                                    </span>
                                  )}
                              </div>
                              <div className="modal-input-col">
                                <label>Vehical Type</label>{" "}
                                <select
                                  name={`cars_detail.${index}.vehicalType`}
                                  className="form-control"
                                  value={formik.values.cars_detail[index]?.vehicalType || ''}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option value="">Select option</option>
                                  <option value="Petrol">Petrol</option>
                                  <option value="Diesel">Diesel</option>
                                  <option value="Electric">Electric</option>
                                  <option value="hybrid">Hybrid</option>
                                  <option value="hydrogen">Hydrogen</option>
                                </select>
                                {formik.errors.cars_detail?.[index]?.vehicalType &&
                                  formik.touched.cars_detail?.[index]?.vehicalType && (
                                    <span className="input-error-msg">
                                      {formik.errors.cars_detail[index].vehicalType}
                                    </span>
                                  )}
                              </div>
                              <div className="modal-input-col">
                                <label>kms in selected year</label>{" "}
                                <input
                                  type="text"
                                  placeholder=""
                                  name={`cars_detail.${index}.kmsInSelectedYear`}
                                  value={formik.values.cars_detail[index]?.kmsInSelectedYear || ''}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.errors.cars_detail?.[index]?.kmsInSelectedYear &&
                                  formik.touched.cars_detail?.[index]?.kmsInSelectedYear && (
                                    <span className="input-error-msg">
                                      {formik.errors.cars_detail[index].kmsInSelectedYear}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="economy-table economy-table-tow">
          <div className="container">
            <div className="sub-heading">
              <h2>Additional information</h2>
            </div>
            <div className=" bg-color">
              <div className="card">
                <div className="form-div">
                  <label htmlFor="www">
                    <strong>4.&nbsp;</strong>How many flights did your
                    partner/children take in the selected year?
                  </label>
                  <ul>
                    <li className="main-li">
                      For private flights, please only include any additional
                      private flights taken by family members that you were not
                      on. If multiple family members were on the same flight,
                      this is considered one flight.{" "}
                    </li>
                    <li className="main-li">
                      Include return flights as two flights and use the
                      following guide for length:
                      <ul className="inner-li">
                        <li>
                          Short flights: shorter than 3,000 km or 4 hours
                        </li>
                        <li>
                          Medium flights: 3,000 to 7,000 km or 4 to 10 hours
                        </li>
                        <li>
                          Long flights: 7,000 to 12,000 km or 10 to 14 hours
                        </li>
                        <li>
                          Extended flights: longer than 12,000 km or 14 hours
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="economy-row-main">
                  {Object.keys(flights2).map((flightType, index) => (
                    <div key={index} className="economy-row">
                      <div className="label-block">{flightTypes[index]}</div>
                      <div className="input-block">
                        <div className="input-row">
                          {Object.keys(flights2[flightType]).map((classType, i) => (
                            <div className="input-col" key={`${classType}-${i}`}>
                              <label className="text-nowrap">{flightStandards[i]}</label>
                              <input
                                type="text"
                                placeholder="00"
                                name={`${flightType}.${classType}`}
                                value={formik.values[flightType][classType]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors[flightType]?.[classType] &&
                                formik.touched[flightType]?.[classType] && (
                                  <span className="input-error-msg">
                                    {formik.errors[flightType][classType]}
                                  </span>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-div">
                  <div className="form-label-div">
                    <label htmlFor="partner_offset_flights">
                      <strong>5.&nbsp;</strong>What proportion of these flights did you
                      offset?
                    </label>
                    <p>(estimated % by distance)</p>
                  </div>
                  <input
                    type="text"
                    name="partner_offset_flights"
                    id="partner_offset_flights"
                    className="form-control undefined"
                    value={formik.values.partner_offset_flights}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                  />
                  {formik.errors.partner_offset_flights &&
                    formik.touchederrors.partner_offset_flights && (
                      <span className="input-error-msg">
                        {formik.errors.partner_offset_flights}
                      </span>
                    )}
                </div>

                <div className="form-div">
                  <div className="form-label-div">
                    <label htmlFor="other_dependants">
                      <strong>6.&nbsp;</strong>How many additional vehicles used by
                      your partner/children?
                    </label>
                  </div>
                  <select className="form-control"
                    name={`additional_vehicles_by_partner_children`}
                    value={formik.values.additional_vehicles_by_partner_children}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}>
                    <option value="">Select option</option>
                    {Array(10)
                      .fill()
                      .map((opt, index) => (
                        <option
                          value={index}
                          key={"opt" + index}
                        >
                          {index}
                        </option>
                      ))}

                  </select>
                </div>
                {formik.values.additional_vehicles_by_partner_children > 0 && (
                  <div className="modal-row-main">
                    {formik.values?.additional_vehicles_by_partner_children &&
                      Array(Number(formik.values?.additional_vehicles_by_partner_children))
                        .fill()
                        .map((opt, index) => (
                          <div className="modal-row" key={index}>
                            <div className="modal-label-block">Car {index + 1}</div>
                            <div className="modal-input-block">
                              <div className="modal-input-row">
                                <div className="modal-input-col">
                                  <label>Make & Model</label>{" "}
                                  <input
                                    type="text"
                                    placeholder=""
                                    name={`additional_vehicles_by_partner_detail.${index}.makeAndModel`}
                                    value={formik.values.additional_vehicles_by_partner_detail[index]?.makeAndModel || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.additional_vehicles_by_partner_detail?.[index]?.makeAndModel &&
                                    formik.touched.additional_vehicles_by_partner_detail?.[index]?.makeAndModel && (
                                      <span className="input-error-msg">
                                        {formik.errors.additional_vehicles_by_partner_detail[index].makeAndModel}
                                      </span>
                                    )}
                                </div>
                                <div className="modal-input-col">
                                  <label>Vehical Type</label>{" "}
                                  <select
                                    className="form-control"
                                    name={`additional_vehicles_by_partner_detail.${index}.vehicalType`}
                                    value={formik.values.additional_vehicles_by_partner_detail[index]?.vehicalType || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  >
                                    <option value="">Select option</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="hydrogen">Hydrogen</option>
                                  </select>
                                  {formik.errors.additional_vehicles_by_partner_detail?.[index]?.vehicalType &&
                                    formik.touched.additional_vehicles_by_partner_detail?.[index]?.vehicalType && (
                                      <span className="input-error-msg">
                                        {formik.errors.additional_vehicles_by_partner_detail[index].vehicalType}
                                      </span>
                                    )}
                                </div>
                                <div className="modal-input-col">
                                  <label>kms in selected year</label>{" "}
                                  <input
                                    type="text"
                                    placeholder=""
                                    name={`additional_vehicles_by_partner_detail.${index}.kmsInSelectedYear`}
                                    value={formik.values.additional_vehicles_by_partner_detail[index]?.kmsInSelectedYear || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  {formik.errors.additional_vehicles_by_partner_detail?.[index]?.kmsInSelectedYear &&
                                    formik.touched.additional_vehicles_by_partner_detail?.[index]?.kmsInSelectedYear && (
                                      <span className="input-error-msg">
                                        {formik.errors.additional_vehicles_by_partner_detail[index].kmsInSelectedYear}
                                      </span>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>)}

                {/********checkbox********/}

                <div className="checkbox-btn">
                  <div className="form-div">
                    <div className="form-label-div">
                      <label htmlFor="other_dependants">
                        <strong>7.&nbsp;</strong>Did you use any other form of
                        transport in the selected year?
                      </label>
                    </div>
                    <div className="sub-btn">
                      {vehicalTypes?.map((type, index) => (
                        <div className="check-input" key={index}>
                          <input
                            id={type + "1"}
                            type="checkbox"
                            name="transport_selected_year"
                            value={type}
                            checked={formik.values?.transport_selected_year?.includes(type)}
                            // onChange={formik.handleChange}
                            onChange={(event) => handleCheckboxChange(event, type)}
                          />
                          <label htmlFor={type + "1"} className={`${formik.values?.transport_selected_year?.includes(type) ? "active" : ""}`}>
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {formik.values?.transport_selected_year !== undefined && formik.values?.transport_selected_year?.length > 0 && (
                  <div className="modal-row-main">
                    {formik.values?.transport_selected_year?.map((item, index) => (
                      <div className="modal-row" key={index}>
                        <div className="modal-label-block">{item}</div>
                        <div className="modal-input-block">
                          <div className="modal-input-row">
                            <div className="modal-input-col">
                              <label>My kms</label>{" "}
                              <input type="text" placeholder=""
                                name={`transport_selected_year_details.${index}.kms`}
                                value={formik.values.transport_selected_year_details[index]?.kms || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            </div>
                            <div className="modal-input-col">
                              <label>Notes</label>{" "}
                              <input type="text" placeholder=""
                                name={`transport_selected_year_details.${index}.notes`}
                                value={formik.values.transport_selected_year_details[index]?.notes || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            </div>
                            <div className="modal-input-col">
                              <label>Partner/children kms</label>{" "}
                              <input type="text" placeholder=""
                                name={`transport_selected_year_details.${index}.kmsInSelectedYear`}
                                value={formik.values.transport_selected_year_details[index]?.kmsInSelectedYear || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="Additional-box">
                  <div className="form-div">
                    <label htmlFor="hotel_nights">
                      <strong>8.&nbsp;</strong>
                      How many nights did you spend in hotels, rentals, Airbnb,
                      etc that you paid to stay in but do not own in the
                      selected year? Please include stays in Mettingen.
                    </label>
                    <input
                      type="text"
                      name="hotel_nights"
                      id="hotel_nights"
                      className="form-control undefined"
                      value={formik.values.hotel_nights}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <label htmlFor="other_travel_info">
                    <strong>9.&nbsp;</strong>
                    Is there any other travel information that you would like to
                    tell us about (e.g. family stays in hotels, spend on
                    transport-related services not otherwise included)? If you
                    use more than three cars, please also add details of
                    distance traveled here.
                  </label>
                  <textarea
                    id="other_travel_info"
                    name="other_travel_info"
                    rows="6"
                    className="form-control"
                    cols="50"
                    value={formik.values.other_travel_info}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
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
          </div>
        </section>
      </form>
    </>
  );
};

export default Travel;
