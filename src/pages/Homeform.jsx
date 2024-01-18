import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import FormActionTabs from "../components/FormActionTabs";
import CountryOptions from "../components/CountryOptions";
import { useDispatch, useSelector } from "react-redux";
import { getCountry, homeFormDelete, homeFormSubmit, homeformIds } from "../redux-store/actions/user";
import { homeFormvalidation } from "../helpers/validations/Schema";
import delete_img from "../assets/images/delete_img.svg";
import Swal from "sweetalert2";
import SuccessImg from "../assets/images/Group 9106.png";
import { useNavigate } from "react-router-dom";
import CurrencyOptions from "../components/CurrencyOptions";

// import homeimage from "../assets/images/home-img.png"
const heatingTypes = ["Electricity", "Oil", "Coal", "Gas", "Wood", "Don't know"];
const additionalPropertyFeatures = ["Swimming Pool", "Sauna", "Solarium", "Hot Tub", "Server Room"]
const home_features = ["Food Waste Collection", "Plastic/Glass/Metal/Paper recycling services provided", "Home Composting", "Don't know"];

const Homeform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector((state) => state.users);
  const user = useSelector((state) => state.auth);
  const currentHomeId = useSelector((state) => state.users?.currentHomeId);

  const [disabled, setDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [homeActiveTab, setHomeActiveTab] = useState(1);

  const endYear = new Date().getFullYear();
  const startYear = endYear - 100;

  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  const handleFormActiveFunc = (active, home_id) => {
    setHomeActiveTab(active)
  }

  const getWinterTemperature = (temprature) => {
    switch (temprature) {
      case 1: {
        return "< 14%"
      }
      case 2: {
        return "14% - 17%"
      }
      case 3: {
        return "18% - 21%"
      }
      case 4: {
        return "> 21%"
      }
      case 5: {
        return "Don't know"
      }
      default:
        return ""
    }
  }

  const validateAndFilterFields = (values) => {
    const {
      heating_type,
      property_features,
      additional_property_features,
      winter_temperature,
      ...rest
    } = values;

    const general_information_id = Number(user?.generalInfoId);
    const filteredValues = {
      ...rest,
      heating_type: heating_type?.toString(),
      property_features: property_features?.toString(),
      additional_property_features: additional_property_features?.toString(),
      winter_temperature: getWinterTemperature(),
      general_information_id,
    };
    return filteredValues;
  };

  const formik = useFormik({

    initialValues: {
      location: "",
      heating_type: ["Electricity", "Oil", "Coal", "Gas", "Wood"],
      zero_carbon_energy_tariff: "",
      electricity_usage_known: "",
      electricity_usage_amount: "",
      electricity_usage_unit: "",
      electricity_usage_time_period: "",
      electricity_annual_spend: "",
      electricity_annual_amount: null,
      electricity_annual_unit: "",
      electricity_supplier: "",
      on_site_renewable_energy: "",
      on_site_renewable_amount: null,
      on_site_renewable_unit: "",
      natural_gas_usage_known: "",
      natural_gas_usage_amount: null,
      natural_gas_usage_unit: "",
      natural_gas_usage_time_period: "",
      natural_gas_annual_spend: "",
      natural_gas_annual_amount: null,
      natural_gas_annual_unit: "",
      gas_consumption_offset: "",
      oil_usage_known: "",
      oil_usage_amount: null,
      oil_usage_unit: "",
      oil_annual_spend: "",
      oil_annual_amount: null,
      oil_annual_unit: "",
      wood_usage_known: "",
      wood_usage_amount: null,
      wood_usage_unit: "",
      wood_annual_spend: "",
      wood_annual_amount: null,
      wood_annual_unit: "",
      coal_usage_known: "",
      coal_usage_amount: null,
      coal_usage_unit: "",
      coal_annual_spend: "",
      coal_annual_amount: null,
      coal_annual_unit: "",
      other_energy_usage: "",
      other_energy_which_and_amount: "",
      property_features: "",
      house_type: "",
      construction_material: "",
      year_built: "",
      winter_temperature: "",
      additional_property_features: "",
      live_in_staff: "",
      planned_renovations: "",
      significant_land: "",
      land_details: "",
      other_details: "",
    },

    validate: homeFormvalidation,
    onSubmit: submitHandler,
  });

  const navigateToNext = async (e) => {
    navigate("/travel")
  }

  async function submitHandler(values) {
    const { isValid, errors } = formik;
    if (isValid) {
      setDisabled(true);

      const filteredValues = await validateAndFilterFields(values);
      const response = await dispatch(homeFormSubmit(filteredValues));
      setDisabled(false)
      if (!response?.payload?.error && response?.payload?.data) {
        setIsSubmitted(true)
        navigateToNext()
        // Swal.fire({
        //   title: "Success!",
        //   text: "Form submitted successfully",
        //   imageUrl: SuccessImg,
        //   imageWidth: 100,
        //   imageHeight: 100,
        //   showCancelButton: false,
        //   confirmButtonColor: "#3085d6",
        //   didClose: navigateToNext
        //   //   cancelButtonColor: "#d33",
        //   // }).then((result) => {
        //   //   if (result.isConfirmed) {
        //   //     navigate("/travel")
        //   //   }
        // });
      } else {
        const errorMsg = response?.payload?.response?.data?.errorMsg;
        if (errorMsg) {
          const errorMessages = Object.values(errorMsg).flatMap(messages => messages);
          if (errorMessages.length > 0) {
            const errorMessage = errorMessages.join("\n");
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
    } else {
      console.error('Form is not valid', errors);
    }
  };

  const deleteHandler = async () => {
    try {
      if (currentHomeId === null) {
        return false
      }
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
        const general_information_id = Number(user?.generalInfoId);

        await dispatch(homeFormDelete(currentHomeId));
        dispatch(homeformIds(general_information_id));
        Swal.fire({
          title: "Deleted!",
          text: "Home deleted successfully",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting home:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the home",
        icon: "error",
      });
    }
  };


  const genSlideStyle = (value) => {
    return {
      point: {
        left: `calc(${value * 20}% - ${5 + 3 * value}px)`,
      },
      range: {
        width: `${value * 20}%`,
      },
    };
  };

  const slideStyle = genSlideStyle(formik.values.winter_temperature);

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
      <FormActionTabs selectedTab={"home"} homeActiveTab={homeActiveTab} setHomeActiveTab={handleFormActiveFunc} />
      <form onSubmit={formik.handleSubmit}>

        <section className="general-form mt-80 mb-80">
          <div className="container ">
            <div className="bg-lightgray-color">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="card card-par">
                      <div className=" home-title-div">
                        <div className="home-title">
                          <h2>Home {homeActiveTab}</h2>
                        </div>
                        {homeActiveTab > 1 && (
                          <div className="delete-box" onClick={deleteHandler}>
                            <span>Delete this home</span>
                            <img src={delete_img} alt="" />
                          </div>
                        )}
                      </div>

                      <p>
                        Fields marked with an <span>*</span> are required
                      </p>
                      <div className="form">
                        <div className="row">
                          <div className="form-div">
                            <label htmlFor="location">
                              <strong>1.&nbsp;</strong>Location of home<span>*</span>
                            </label>
                            <select
                              name="location"
                              id="location"
                              className={`form-control ${formik.errors.location &&
                                formik.touched.location &&
                                "invalidInput"
                                }`}
                              placeholder="Location of home"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.location}
                            >
                              <option value="">Select option</option>
                              <CountryOptions countries={details?.countries} />
                            </select>
                            {formik.errors.location &&
                              formik.touched.location ? (
                              <span className="input-error-msg">
                                {formik.errors.location}
                              </span>
                            ) : null}
                          </div>
                          <div className="form-div">
                            <div className="form-label-div">
                              <label htmlFor="heating_type">
                                <strong>2.&nbsp;</strong>How is the home heated?
                                <span>*</span>
                              </label>
                              <p>(Select all that apply)</p>
                            </div>
                            <div className="sub-btn">
                              {heatingTypes.map((type, index) => (
                                <div className="check-input" key={index}>
                                  <input
                                    id={type + "1"}
                                    type="checkbox"
                                    name="heating_type"
                                    value={type}
                                    checked={formik.values.heating_type.includes("Don't know") ? formik.values?.heating_type?.splice(0, formik?.values?.heating_type?.length, "Don't know") : formik.values.heating_type.includes(type)}
                                    onChange={formik.handleChange}
                                  />
                                  <label htmlFor={type + "1"} className={`${formik.values.heating_type.includes(type) ? "active" : ""}`}>
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {formik.errors.heating_type ? (
                              <span className="input-error-msg">
                                {formik.errors.heating_type}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-div">
                          <div className="form-label-div">
                            <label htmlFor="zero_carbon_energy_tariff">
                              <strong>3.&nbsp;</strong>Was your electricity supplied
                              under a zero-carbon energy tariff? <span>*</span>{" "}
                            </label>
                            <p>
                              (100% electricity generated from wind, water,
                              solar, nuclear)
                            </p>
                          </div>
                          <select
                            name="zero_carbon_energy_tariff"
                            id="zero_carbon_energy_tariff"
                            className={`form-control ${formik.errors.zero_carbon_energy_tariff &&
                              formik.touched.zero_carbon_energy_tariff
                              ? "invalidInput"
                              : ""
                              } `}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.zero_carbon_energy_tariff}
                          >
                            <option value="">Select option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          {formik.errors.zero_carbon_energy_tariff &&
                            formik.touched.zero_carbon_energy_tariff ? (
                            <span className="input-error-msg">
                              {formik.errors.zero_carbon_energy_tariff}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Electricity Section */}
            {formik.values.heating_type.includes("Electricity") && (
              <div className="bg-lightgray-color mt-80">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="card card-par">
                        <h2>Electricity</h2>

                        <div className="form ">
                          <div className="row">
                            <div className="form-div">

                              <label htmlFor="electricity_usage_known">
                                <strong>4.&nbsp;</strong>Do you know how much
                                electricity was used at the home in the selected
                                year?<span>*</span>
                              </label>
                              <select
                                name="electricity_usage_known"
                                id="electricity_usage_known"
                                className={`form-control ${formik.errors.electricity_usage_known &&
                                  formik.touched.electricity_usage_known
                                  ? "invalidInput"
                                  : ""
                                  } `}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.electricity_usage_known}
                              >
                                <option value="">Select option</option>
                                <option value="Yes, for part of the year">Yes, for part of the year</option>
                                <option value="Yes, for the whole year">Yes, for the whole year</option>
                                <option value="No">No</option>
                              </select>

                              {formik.errors.electricity_usage_known &&
                                formik.touched.electricity_usage_known ? (
                                <span className="input-error-msg">
                                  {formik.errors.electricity_usage_known}
                                </span>
                              ) : null}

                              {formik.values.electricity_usage_known !== "No" && (<div className="row electricity-row">
                                <div className="col-md-6 electricity-col">
                                  <input
                                    type="text"
                                    placeholder="Amount"
                                    name="electricity_usage_amount"
                                    id="electricity_usage_amount"
                                    className={`form-control ${formik.errors.electricity_usage_amount &&
                                      formik.touched.electricity_usage_amount
                                      ? "invalidInput"
                                      : ""
                                      } `}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.electricity_usage_amount}
                                  />
                                  {formik.errors.electricity_usage_amount &&
                                    formik.touched.electricity_usage_amount ? (
                                    <span className="input-error-msg">
                                      {formik.errors.electricity_usage_amount}
                                    </span>
                                  ) : null}
                                </div>
                                <div className="col-md-6">
                                  <select
                                    type="text"
                                    placeholder="Kwh"
                                    name="electricity_usage_unit"
                                    id="electricity_usage_unit"
                                    className={`form-control ${formik.errors.electricity_usage_unit &&
                                      formik.touched.electricity_usage_unit
                                      ? "invalidInput"
                                      : ""
                                      } `}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.electricity_usage_unit}
                                  >
                                    <option value="">Select option</option>
                                    <option value="kWh">kWh</option>
                                    <option value="mWh">mWh</option>
                                    {/* <option value="Billed per year">Billed per year</option> */}
                                  </select>
                                  {formik.errors.electricity_usage_unit &&
                                    formik.touched.electricity_usage_unit ? (
                                    <span className="input-error-msg">
                                      {formik.errors.electricity_usage_unit}
                                    </span>
                                  ) : null}
                                </div>
                              </div>)}
                            </div>
                            {/* {(formik.values.electricity_usage_known !== "No" && formik.values.electricity_usage_unit === "Billed per year") && (
                              <div className="form-div">
                                <select
                                  type="text"
                                  placeholder="Currency"
                                  name="electricity_usage_amount_currency"
                                  id="electricity_usage_amount_currency"
                                  className={`form-control ${formik.errors.electricity_usage_amount_currency &&
                                    formik.touched.electricity_usage_amount_currency
                                    ? "invalidInput"
                                    : ""
                                    } `}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                value={formik.values.electricity_usage_amount_currency}
                                >
                                  <option value="">Select currency</option>
                                  <CurrencyOptions />
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            )} */}

                            {(formik.values.electricity_usage_known === "" || formik.values.electricity_usage_known === "Yes, for part of the year") && (
                              <div className="form-div">
                                <div className="form-label-div">
                                  <label htmlFor="electricity_usage_time_period">
                                    <strong>4b.&nbsp;</strong>Please specify the time
                                    period for which you have electricity bills{" "}
                                    <span>*</span>{" "}
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  placeholder="2023-2024"
                                  name="electricity_usage_time_period"
                                  id="electricity_usage_time_period"
                                  className={`form-control ${formik.errors.electricity_usage_time_period &&
                                    formik.touched.electricity_usage_time_period
                                    ? "invalidInput"
                                    : ""
                                    } `}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={
                                    formik.values.electricity_usage_time_period
                                  }
                                />
                                {formik.errors.electricity_usage_time_period &&
                                  formik.touched.electricity_usage_time_period ? (
                                  <span className="input-error-msg">
                                    {formik.errors.electricity_usage_time_period}
                                  </span>
                                ) : null}
                              </div>
                            )}

                            {formik.values.electricity_usage_known === "No" && (
                              <div className="form-div">
                                <div className="form-label-div">
                                  <label htmlFor="electricity_annual_spend">
                                    <strong>4b.&nbsp;</strong>Do you know what the annual spend was for electricity in the selected year? <span>*</span>{" "}
                                  </label>
                                  <p>
                                    (100% electricity generated from wind, water,
                                    solar, nuclear)
                                  </p>
                                </div>
                                <select
                                  name="electricity_annual_spend"
                                  id="electricity_annual_spend"
                                  className={`form-control ${formik.errors.electricity_annual_spend &&
                                    formik.touched.electricity_annual_spend
                                    ? "invalidInput"
                                    : ""
                                    } `}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.electricity_annual_spend}
                                >
                                  <option value="">Select option</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                                {formik.errors.electricity_annual_spend &&
                                  formik.touched.electricity_annual_spend ? (
                                  <span className="input-error-msg">
                                    {formik.errors.electricity_annual_spend}
                                  </span>
                                ) : null}
                                {formik.values.electricity_annual_spend !== "No" && (
                                  <div className="row electricity-row">
                                    <div className="col-md-6">
                                      <input
                                        type="text"
                                        placeholder="Amount"
                                        name="electricity_annual_amount"
                                        id="electricity_annual_amount"
                                        className={`form-control ${formik.errors.electricity_annual_amount &&
                                          formik.touched.electricity_annual_amount
                                          ? "invalidInput"
                                          : ""
                                          } `}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.electricity_annual_amount}
                                      />
                                      {formik.errors.electricity_annual_amount &&
                                        formik.touched.electricity_annual_amount ? (
                                        <span className="input-error-msg">
                                          {formik.errors.electricity_annual_amount}
                                        </span>
                                      ) : null}
                                    </div>
                                    <div className="col-md-6">
                                      <select
                                        name="electricity_annual_unit"
                                        id="electricity_annual_unit"
                                        className={`form-control ${formik.errors.electricity_annual_unit &&
                                          formik.touched.electricity_annual_unit
                                          ? "invalidInput"
                                          : ""
                                          } `}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.electricity_annual_unit}
                                      >
                                        <option value="">Select option</option>
                                        <option value="Dollars">$</option>
                                        <option value="Pounds">£</option>
                                        <option value="Euros">€</option>
                                        <option value="Switzerland Franc">CHF</option>
                                      </select>
                                      {formik.errors.electricity_annual_unit &&
                                        formik.touched.electricity_annual_unit ? (
                                        <span className="input-error-msg">
                                          {formik.errors.electricity_annual_unit}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="form-div">
                              <div className="form-label-div">
                                <label htmlFor="electricity_supplier">
                                  <strong>5.&nbsp;</strong>Who was your electricity
                                  supplier? <span>*</span>{" "}
                                </label>
                                <p>
                                  (100% electricity generated from wind, water,
                                  solar, nuclear)
                                </p>
                              </div>
                              <input
                                type="text"
                                placeholder=""
                                name="electricity_supplier"
                                id="electricity_supplier"
                                className={`form-control ${formik.errors.electricity_supplier &&
                                  formik.touched.electricity_supplier
                                  ? "invalidInput"
                                  : ""
                                  } `}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.electricity_supplier}
                              />
                              {formik.errors.electricity_supplier &&
                                formik.touched.electricity_supplier ? (
                                <span className="input-error-msg">
                                  {formik.errors.electricity_supplier}
                                </span>
                              ) : null}
                            </div>
                            <div className="form-div">
                              <div className="form-label-div">
                                <label htmlFor="on_site_renewable_energy">
                                  <strong>6.&nbsp;</strong>Do you know if any of the
                                  property's electricity was generated from onsite
                                  renewable sources?<span>*</span>
                                </label>
                                <p>(wind turbines, solar panel etc)</p>
                              </div>
                              <select
                                name="on_site_renewable_energy"
                                id="on_site_renewable_energy"
                                className={`form-control ${formik.errors.on_site_renewable_energy &&
                                  formik.touched.on_site_renewable_energy
                                  ? "invalidInput"
                                  : ""
                                  } `}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.on_site_renewable_energy}
                              >
                                <option value="">Select option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>

                              {formik.errors.on_site_renewable_energy &&
                                formik.touched.on_site_renewable_energy ? (
                                <span className="input-error-msg">
                                  {formik.errors.on_site_renewable_energy}
                                </span>
                              ) : null}
                            </div>

                            {formik.values.on_site_renewable_energy !== "No" && (
                              <>
                                <div className="col-md-6 electricity-col">
                                  <div className="form-div">
                                    <input
                                      type="text"
                                      name="on_site_renewable_amount"
                                      id="on_site_renewable_amount"
                                      className={`form-control ${formik.errors.on_site_renewable_amount &&
                                        formik.touched.on_site_renewable_amount
                                        ? "invalidInput"
                                        : ""
                                        } `}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      placeholder="Amount"
                                      value={formik.values.on_site_renewable_amount}
                                    />
                                    {formik.errors.on_site_renewable_amount &&
                                      formik.touched.on_site_renewable_amount ? (
                                      <span className="input-error-msg">
                                        {formik.errors.on_site_renewable_amount}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-div">
                                    <select
                                      type="text"
                                      name="on_site_renewable_unit"
                                      id="on_site_renewable_unit"
                                      className={`form-control ${formik.errors.on_site_renewable_unit &&
                                        formik.touched.on_site_renewable_unit
                                        ? "invalidInput"
                                        : ""
                                        } `}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.on_site_renewable_unit}
                                    >
                                      <option value={""}>Select option</option>
                                      <option value="percent">%</option>
                                      <option value="kWh">kWh</option>
                                    </select>
                                    {formik.errors.on_site_renewable_unit &&
                                      formik.touched.on_site_renewable_unit ? (
                                      <span className="input-error-msg">
                                        {formik.errors.on_site_renewable_unit}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Gas Section */}
            {formik.values.heating_type.includes("Gas") && (
              <div className="bg-lightgray-color mt-80">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="card card-par">
                        <h2>Gas</h2>
                        <div className="form ">
                          <div className="row">
                            <div className="form-div">
                              <div className="form-label-div">
                                <label htmlFor="natural_gas_usage_known">
                                  <strong>7.&nbsp;</strong>Do you know how much natural
                                  gas was used at the home in the selected year?
                                  <span>*</span>
                                </label>
                                <p>(mains supply)</p>
                              </div>
                              <select
                                name="natural_gas_usage_known"
                                id="natural_gas_usage_known"
                                className={`form-control ${formik.errors.natural_gas_usage_known &&
                                  formik.touched.natural_gas_usage_known
                                  ? "invalidInput"
                                  : ""
                                  } `}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.natural_gas_usage_known}
                              >
                                <option value="">Select option</option>
                                <option value="Yes, for part of the year">Yes, for part of the year</option>
                                <option value="Yes, for the whole year">Yes, for the whole year</option>
                                <option value="No">No</option>
                              </select>
                              {formik.errors.natural_gas_usage_known &&
                                formik.touched.natural_gas_usage_known ? (
                                <span className="input-error-msg">
                                  {formik.errors.natural_gas_usage_known}
                                </span>
                              ) : null}
                              {formik.values.natural_gas_usage_known !== "No" && (<div className="row electricity-row">
                                <div className="col-md-6 electricity-col">
                                  <input
                                    type="text"
                                    placeholder="Amount"
                                    name="natural_gas_usage_amount"
                                    id="natural_gas_usage_amount"
                                    className={`form-control ${formik.errors.natural_gas_usage_amount &&
                                      formik.touched.natural_gas_usage_amount
                                      ? "invalidInput"
                                      : ""
                                      } `}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.natural_gas_usage_amount}
                                  />
                                  {formik.errors.natural_gas_usage_amount &&
                                    formik.touched.natural_gas_usage_amount ? (
                                    <span className="input-error-msg">
                                      {formik.errors.natural_gas_usage_amount}
                                    </span>
                                  ) : null}
                                </div>
                                <div className="col-md-6">
                                  <select
                                    type="text"
                                    name="natural_gas_usage_unit"
                                    id="natural_gas_usage_unit"
                                    className={`form-control ${formik.errors.natural_gas_usage_unit &&
                                      formik.touched.natural_gas_usage_unit
                                      ? "invalidInput"
                                      : ""
                                      } `}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.natural_gas_usage_unit}
                                  >
                                    <option value={""}>Select option</option>
                                    <option value="kWh">kWh</option>
                                    <option value="M3">M3</option>
                                    <option value="BTUs">BTUs</option>
                                  </select>
                                  {formik.errors.natural_gas_usage_unit &&
                                    formik.touched.natural_gas_usage_unit ? (
                                    <span className="input-error-msg">
                                      {formik.errors.natural_gas_usage_unit}
                                    </span>
                                  ) : null}
                                </div>
                              </div>)}
                            </div>

                            {(formik.values.natural_gas_usage_known === "" || formik.values.natural_gas_usage_known === "Yes, for part of the year") && (
                              <div className="form-div">
                                <div className="form-label-div">
                                  <label htmlFor="natural_gas_usage_time_period">
                                    <strong>7b.&nbsp;</strong>Please specify the time
                                    period for which you have gas bills{" "}
                                    <span>*</span>{" "}
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  placeholder="2023-2024"
                                  name="natural_gas_usage_time_period"
                                  id="natural_gas_usage_time_period"
                                  className={`form-control ${formik.errors.natural_gas_usage_time_period &&
                                    formik.touched.natural_gas_usage_time_period
                                    ? "invalidInput"
                                    : ""
                                    } `}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={
                                    formik.values.natural_gas_usage_time_period
                                  }
                                />
                                {formik.errors.natural_gas_usage_time_period &&
                                  formik.touched.natural_gas_usage_time_period ? (
                                  <span className="input-error-msg">
                                    {formik.errors.natural_gas_usage_time_period}
                                  </span>
                                ) : null}
                              </div>
                            )}

                            {formik.values.natural_gas_usage_known === "No" && (
                              <div className="form-div">
                                <div className="form-label-div">
                                  <label htmlFor="">
                                    <strong>7b.&nbsp;</strong>Do you know what the annual spend was on gas at property in the selected year? <span>*</span>{" "}
                                  </label>
                                </div>
                                <select
                                  name="natural_gas_annual_spend"
                                  id="natural_gas_annual_spend"
                                  className={`form-control ${formik.errors.natural_gas_annual_spend &&
                                    formik.touched.natural_gas_annual_spend
                                    ? "invalidInput"
                                    : ""
                                    } `}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.natural_gas_annual_spend}
                                >
                                  <option value="">Select option</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>
                                {formik.errors.natural_gas_annual_spend &&
                                  formik.touched.natural_gas_annual_spend ? (
                                  <span className="input-error-msg">
                                    {formik.errors.natural_gas_annual_spend}
                                  </span>
                                ) : null}
                                {formik.values.natural_gas_annual_spend !== "No" && (
                                  <div className="row electricity-row">
                                    <div className="col-md-6">
                                      <input
                                        type="text"
                                        placeholder="Amount"
                                        name="natural_gas_annual_amount"
                                        id="natural_gas_annual_amount"
                                        className={`form-control ${formik.errors.natural_gas_annual_amount &&
                                          formik.touched.natural_gas_annual_amount
                                          ? "invalidInput"
                                          : ""
                                          } `}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.natural_gas_annual_amount}
                                      />
                                      {formik.errors.natural_gas_annual_amount &&
                                        formik.touched.natural_gas_annual_amount ? (
                                        <span className="input-error-msg">
                                          {formik.errors.natural_gas_annual_amount}
                                        </span>
                                      ) : null}
                                    </div>
                                    <div className="col-md-6">
                                      <select
                                        name="natural_gas_annual_unit"
                                        id="natural_gas_annual_unit"
                                        className={`form-control ${formik.errors.natural_gas_annual_unit &&
                                          formik.touched.natural_gas_annual_unit
                                          ? "invalidInput"
                                          : ""
                                          } `}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.natural_gas_annual_unit}
                                      >
                                        <option value="">Select option</option>
                                        <option value="Dollars">$</option>
                                        <option value="Pounds">£</option>
                                        <option value="Euros" selected="selected">‎€</option>
                                        <option value="Switzerland Franc">CHF</option>
                                      </select>
                                      {formik.errors.natural_gas_annual_unit &&
                                        formik.touched.natural_gas_annual_unit ? (
                                        <span className="input-error-msg">
                                          {formik.errors.natural_gas_annual_unit}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="form-div">
                              <div className="form-label-div">
                                <label htmlFor="gas_consumption_offset">
                                  <strong>8.&nbsp;</strong>Has your gas consumption been
                                  offset by your supplier?<span>*</span>
                                </label>
                                <p>(wind turbines, solar panel etc)</p>
                              </div>
                              <select
                                name="gas_consumption_offset"
                                id="gas_consumption_offset"
                                className={`form-control ${formik.errors.gas_consumption_offset &&
                                  formik.touched.gas_consumption_offset
                                  ? "invalidInput"
                                  : ""
                                  } `}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.gas_consumption_offset}
                              >
                                <option value="">Select option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {formik.errors.gas_consumption_offset &&
                                formik.touched.gas_consumption_offset ? (
                                <span className="input-error-msg">
                                  {formik.errors.gas_consumption_offset}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Other energy Section */}
            {(formik.values.heating_type.includes("Oil") || formik.values.heating_type.includes("Coal") || formik.values.heating_type.includes("Wood")) && (
              <div className="bg-lightgray-color mt-80">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="card card-par">
                        <h2>Other energy</h2>

                        <div className="form ">
                          <div className="row">
                            {/* Oil */}
                            {formik.values.heating_type.includes("Oil") && (
                              <>
                                <div className="form-div">
                                  <div className="form-label-div">
                                    <label htmlFor="oil_usage_known">
                                      <strong>9.&nbsp;</strong>Do you know how much oil was
                                      used at the home last year?<span>*</span>
                                    </label>
                                    <p>(mains supply)</p>
                                  </div>
                                  <select
                                    name="oil_usage_known"
                                    id="oil_usage_known"
                                    className={`form-control ${formik.errors.oil_usage_known &&
                                      formik.touched.oil_usage_known
                                      ? "invalidInput"
                                      : ""
                                      } `}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.oil_usage_known}
                                  >
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                  {formik.errors.oil_usage_known &&
                                    formik.touched.oil_usage_known ? (
                                    <span className="input-error-msg">
                                      {formik.errors.oil_usage_known}
                                    </span>
                                  ) : null}
                                  {formik.values.oil_usage_known !== "No" && (<div className="row electricity-row">
                                    <div className="col-md-6 electricity-col">
                                      <input
                                        type="text"
                                        placeholder="Amount"
                                        name="oil_usage_amount"
                                        id="oil_usage_amount"
                                        className={`form-control ${formik.errors.oil_usage_amount &&
                                          formik.touched.oil_usage_amount
                                          ? "invalidInput"
                                          : ""
                                          } `}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.oil_usage_amount}
                                      />
                                      {formik.errors.oil_usage_amount &&
                                        formik.touched.oil_usage_amount ? (
                                        <span className="input-error-msg">
                                          {formik.errors.oil_usage_amount}
                                        </span>
                                      ) : null}
                                    </div>
                                    <div className="col-md-6">
                                      <select
                                        type="text"
                                        name="oil_usage_unit"
                                        id="oil_usage_unit"
                                        className={`form-control ${formik.errors.oil_usage_unit &&
                                          formik.touched.oil_usage_unit
                                          ? "invalidInput"
                                          : ""
                                          } `}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.oil_usage_unit}
                                      >
                                        <option value={""}>Select option</option>
                                        <option value="kWh" >kWh</option>
                                        <option value="M3">M3</option>
                                        <option value="BTUs">BTUs</option>
                                        <option value="Tonnes">Tonnes</option>
                                        <option value="Litres">Litres</option>
                                      </select>
                                      {formik.errors.oil_usage_unit &&
                                        formik.touched.oil_usage_unit ? (
                                        <span className="input-error-msg">
                                          {formik.errors.oil_usage_unit}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>)}
                                </div>
                                {formik.values.oil_usage_known === "No" && (
                                  <div className="form-div">
                                    <div className="form-label-div">
                                      <label htmlFor="">
                                        <strong>9b.&nbsp;</strong>Do you know what the annual spend was on oil at property in the selected year? <span>*</span>{" "}
                                      </label>
                                    </div>
                                    <select
                                      name="oil_annual_spend"
                                      id="oil_annual_spend"
                                      className={`form-control ${formik.errors.oil_annual_spend &&
                                        formik.touched.oil_annual_spend
                                        ? "invalidInput"
                                        : ""
                                        } `}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.oil_annual_spend}
                                    >
                                      <option value="">Select option</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {formik.errors.oil_annual_spend &&
                                      formik.touched.oil_annual_spend ? (
                                      <span className="input-error-msg">
                                        {formik.errors.oil_annual_spend}
                                      </span>
                                    ) : null}
                                    {formik.values.oil_annual_spend !== "No" && (
                                      <div className="row electricity-row">
                                        <div className="col-md-6">
                                          <input
                                            type="text"
                                            placeholder="Amount"
                                            name="oil_annual_amount"
                                            id="oil_annual_amount"
                                            className={`form-control ${formik.errors.oil_annual_amount &&
                                              formik.touched.oil_annual_amount
                                              ? "invalidInput"
                                              : ""
                                              } `}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.oil_annual_amount}
                                          />
                                          {formik.errors.oil_annual_amount &&
                                            formik.touched.oil_annual_amount ? (
                                            <span className="input-error-msg">
                                              {formik.errors.oil_annual_amount}
                                            </span>
                                          ) : null}
                                        </div>
                                        <div className="col-md-6">
                                          <select
                                            name="oil_annual_unit"
                                            id="oil_annual_unit"
                                            className={`form-control ${formik.errors.oil_annual_unit &&
                                              formik.touched.oil_annual_unit
                                              ? "invalidInput"
                                              : ""
                                              } `}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.oil_annual_unit}
                                          >
                                            <option value="">Select option</option>
                                            <option value="Dollars">$</option>
                                            <option value="Pounds">£</option>
                                            <option value="Euros">‎€</option>
                                            <option value="Switzerland Franc">CHF</option>
                                          </select>
                                          {formik.errors.oil_annual_unit &&
                                            formik.touched.oil_annual_unit ? (
                                            <span className="input-error-msg">
                                              {formik.errors.oil_annual_unit}
                                            </span>
                                          ) : null}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            {/* Wood */}
                            {formik.values.heating_type.includes("Wood") && (
                              <>
                                <div className="form-div">
                                  <label htmlFor="wood_usage_known">
                                    <strong>10.&nbsp;</strong>Do you know how much wood
                                    was used at the home in the selected year?{" "}
                                    <span>*</span>{" "}
                                  </label>

                                  <select
                                    name="wood_usage_known"
                                    id="wood_usage_known"
                                    className={`form-control ${formik.errors.wood_usage_known &&
                                      formik.touched.wood_usage_known
                                      ? "invalidInput"
                                      : ""
                                      } `}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.wood_usage_known}
                                  >
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                  {formik.errors.wood_usage_known &&
                                    formik.touched.wood_usage_known ? (
                                    <span className="input-error-msg">
                                      {formik.errors.wood_usage_known}
                                    </span>
                                  ) : null}
                                  {formik.values.wood_usage_known !== "No" && (
                                    <div className="row electricity-row">
                                      <div className="col-md-6 electricity-col">
                                        <input
                                          type="text"
                                          placeholder="Amount"
                                          name="wood_usage_amount"
                                          id="wood_usage_amount"
                                          className={`form-control ${formik.errors.wood_usage_amount &&
                                            formik.touched.wood_usage_amount
                                            ? "invalidInput"
                                            : ""
                                            } `}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.wood_usage_amount}
                                        />
                                        {formik.errors.wood_usage_amount &&
                                          formik.touched.wood_usage_amount ? (
                                          <span className="input-error-msg">
                                            {formik.errors.wood_usage_amount}
                                          </span>
                                        ) : null}
                                      </div>
                                      <div className="col-md-6">
                                        <select
                                          name="wood_usage_unit"
                                          id="wood_usage_unit"
                                          className={`form-control ${formik.errors.wood_usage_unit &&
                                            formik.touched.wood_usage_unit
                                            ? "invalidInput"
                                            : ""
                                            } `}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.wood_usage_unit}
                                        >
                                          <option value={""}>Select option</option>
                                          <option value="kWh" >kWh</option>
                                          <option value="M3">M3</option>
                                          <option value="BTUs">BTUs</option>
                                          <option value="Tonnes">Tonnes</option>
                                          <option value="Litres">Litres</option>

                                        </select>
                                        {formik.errors.wood_usage_unit &&
                                          formik.touched.wood_usage_unit ? (
                                          <span className="input-error-msg">
                                            {formik.errors.wood_usage_unit}
                                          </span>
                                        ) : null}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {formik.values.wood_usage_known === "No" && (
                                  <div className="form-div">
                                    <div className="form-label-div">
                                      <label htmlFor="">
                                        <strong>10b.&nbsp;</strong>Do you know what the annual spend was on wood at property in the selected year? <span>*</span>{" "}
                                      </label>
                                    </div>
                                    <select
                                      name="wood_annual_spend"
                                      id="wood_annual_spend"
                                      className={`form-control ${formik.errors.wood_annual_spend &&
                                        formik.touched.wood_annual_spend
                                        ? "invalidInput"
                                        : ""
                                        } `}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.wood_annual_spend}
                                    >
                                      <option value="">Select option</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {formik.errors.wood_annual_spend &&
                                      formik.touched.wood_annual_spend ? (
                                      <span className="input-error-msg">
                                        {formik.errors.wood_annual_spend}
                                      </span>
                                    ) : null}
                                    {formik.values.wood_annual_spend !== "No" && (
                                      <div className="row electricity-row">
                                        <div className="col-md-6">
                                          <input
                                            type="text"
                                            placeholder="Amount"
                                            name="wood_annual_amount"
                                            id="wood_annual_amount"
                                            className={`form-control ${formik.errors.wood_annual_amount &&
                                              formik.touched.wood_annual_amount
                                              ? "invalidInput"
                                              : ""
                                              } `}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.wood_annual_amount}
                                          />
                                          {formik.errors.wood_annual_amount &&
                                            formik.touched.wood_annual_amount ? (
                                            <span className="input-error-msg">
                                              {formik.errors.wood_annual_amount}
                                            </span>
                                          ) : null}
                                        </div>
                                        <div className="col-md-6">
                                          <select
                                            name="wood_annual_unit"
                                            id="wood_annual_unit"
                                            className={`form-control ${formik.errors.wood_annual_unit &&
                                              formik.touched.wood_annual_unit
                                              ? "invalidInput"
                                              : ""
                                              } `}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.wood_annual_unit}
                                          >
                                            <option value="">Select option</option>
                                            <option value="Dollars" >$</option>
                                            <option value="Pounds">£</option>
                                            <option value="Euros">‎€</option>
                                            <option value="Switzerland Franc">CHF</option>
                                          </select>
                                          {formik.errors.wood_annual_unit &&
                                            formik.touched.wood_annual_unit ? (
                                            <span className="input-error-msg">
                                              {formik.errors.wood_annual_unit}
                                            </span>
                                          ) : null}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>)}
                            {/* Coal */}
                            {formik.values.heating_type.includes("Coal") && (
                              <>
                                <div className="form-div">
                                  <label htmlFor="coal_usage_known">
                                    <strong>11.&nbsp;</strong>Do you know how much coal
                                    was used at the home in the selected year?{" "}
                                    <span>*</span>{" "}
                                  </label>

                                  <select
                                    name="coal_usage_known"
                                    id="coal_usage_known"
                                    className={`form-control ${formik.errors.coal_usage_known &&
                                      formik.touched.coal_usage_known
                                      ? "invalidInput"
                                      : ""
                                      } `}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.coal_usage_known}
                                  >
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                  {formik.errors.coal_usage_known &&
                                    formik.touched.coal_usage_known ? (
                                    <span className="input-error-msg">
                                      {formik.errors.coal_usage_known}
                                    </span>
                                  ) : null}
                                  {formik.values.coal_usage_known !== "No" && (
                                    <div className="row electricity-row">
                                      <div className="col-md-6 electricity-col">
                                        <input
                                          type="text"
                                          placeholder="Amount"
                                          name="coal_usage_amount"
                                          id="coal_usage_amount"
                                          className={`form-control ${formik.errors.coal_usage_amount &&
                                            formik.touched.coal_usage_amount
                                            ? "invalidInput"
                                            : ""
                                            } `}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.coal_usage_amount}
                                        />
                                        {formik.errors.coal_usage_amount &&
                                          formik.touched.coal_usage_amount ? (
                                          <span className="input-error-msg">
                                            {formik.errors.coal_usage_amount}
                                          </span>
                                        ) : null}
                                      </div>
                                      <div className="col-md-6">
                                        <select
                                          type="text"
                                          placeholder="Tonnes"
                                          name="coal_usage_unit"
                                          id="coal_usage_unit"
                                          className={`form-control ${formik.errors.coal_usage_unit &&
                                            formik.touched.coal_usage_unit
                                            ? "invalidInput"
                                            : ""
                                            } `}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.coal_usage_unit}
                                        >
                                          <option value="">Select option</option>
                                          <option value="kWh">kWh</option>
                                          <option value="M3">M3</option>
                                          <option value="BTUs">BTUs</option>
                                          <option value="Tonnes">Tonnes</option>
                                          <option value="Litres">Litres</option>
                                        </select>
                                        {formik.errors.coal_usage_unit &&
                                          formik.touched.coal_usage_unit ? (
                                          <span className="input-error-msg">
                                            {formik.errors.coal_usage_unit}
                                          </span>
                                        ) : null}
                                      </div>
                                    </div>)}
                                </div>
                                {formik.values.coal_usage_known === "No" && (
                                  <div className="form-div">
                                    <div className="form-label-div">
                                      <label htmlFor="">
                                        <strong>11b.&nbsp;</strong>Do you know what the annual spend was on coal at property in the selected year? <span>*</span>{" "}
                                      </label>
                                    </div>
                                    <select
                                      name="coal_annual_spend"
                                      id="coal_annual_spend"
                                      className={`form-control ${formik.errors.coal_annual_spend &&
                                        formik.touched.coal_annual_spend
                                        ? "invalidInput"
                                        : ""
                                        } `}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.coal_annual_spend}
                                    >
                                      <option value="">Select option</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {formik.errors.coal_annual_spend &&
                                      formik.touched.coal_annual_spend ? (
                                      <span className="input-error-msg">
                                        {formik.errors.coal_annual_spend}
                                      </span>
                                    ) : null}
                                    {formik.values.coal_annual_spend !== "No" && (
                                      <div className="row electricity-row">
                                        <div className="col-md-6">
                                          <input
                                            type="text"
                                            placeholder="Amount"
                                            name="coal_annual_amount"
                                            id="coal_annual_amount"
                                            className={`form-control ${formik.errors.coal_annual_amount &&
                                              formik.touched.coal_annual_amount
                                              ? "invalidInput"
                                              : ""
                                              } `}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.coal_annual_amount}
                                          />
                                          {formik.errors.coal_annual_amount &&
                                            formik.touched.coal_annual_amount ? (
                                            <span className="input-error-msg">
                                              {formik.errors.coal_annual_amount}
                                            </span>
                                          ) : null}
                                        </div>
                                        <div className="col-md-6">
                                          <select
                                            name="coal_annual_unit"
                                            id="coal_annual_unit"
                                            className={`form-control ${formik.errors.coal_annual_unit &&
                                              formik.touched.coal_annual_unit
                                              ? "invalidInput"
                                              : ""
                                              } `}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.coal_annual_unit}
                                          >
                                            <option value="">Select option</option>
                                            <option value="Dollars">$</option>
                                            <option value="Pounds">£</option>
                                            <option value="Euros">‎€</option>
                                            <option value="Switzerland Franc">CHF</option>
                                          </select>
                                          {formik.errors.coal_annual_unit &&
                                            formik.touched.coal_annual_unit ? (
                                            <span className="input-error-msg">
                                              {formik.errors.coal_annual_unit}
                                            </span>
                                          ) : null}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          <div className="form-div">
                            <label htmlFor="other_energy_usage">
                              <strong>12.&nbsp;</strong>Other than for heating, was
                              there any other energy used at the property{" "}
                              <span>*</span>{" "}
                            </label>
                            <select
                              name="other_energy_usage"
                              id="other_energy_usage"
                              className={`form-control ${formik.errors.other_energy_usage &&
                                formik.touched.other_energy_usage
                                ? "invalidInput"
                                : ""
                                } `}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.other_energy_usage}
                            >
                              <option value="">Select option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                            {formik.errors.other_energy_usage &&
                              formik.touched.other_energy_usage ? (
                              <span className="input-error-msg">
                                {formik.errors.other_energy_usage}
                              </span>
                            ) : null}
                          </div>
                          {formik.values.other_energy_usage !== "No" && (
                            <div className="form-div">
                              <input
                                type="text"
                                placeholder="What energy and the amount used"
                                name="other_energy_which_and_amount"
                                id="other_energy_which_and_amount"
                                className={`form-control ${formik.errors.other_energy_which_and_amount &&
                                  formik.touched.other_energy_which_and_amount
                                  ? "invalidInput"
                                  : ""
                                  } `}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.other_energy_which_and_amount}
                              />
                              {formik.errors.other_energy_which_and_amount &&
                                formik.touched.other_energy_which_and_amount ? (
                                <span className="input-error-msg">
                                  {formik.errors.other_energy_which_and_amount}
                                </span>
                              ) : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Additional information Section */}
            <div className="sub-heading mt-80">
              <h2>Additional Information</h2>
            </div>
            <div className="bg-lightgray-color additional-box-div-main">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="card">
                      <div className="form ">
                        <div className="row">
                          <div className="Additional-box title-p">
                            <p>
                              This section is optional, however it will allow us
                              to make your carbon footprint more complete and
                              your recommendations more specific.
                            </p>
                          </div>
                          <div className="col-lg-7 additional-form-outer">
                            <div className="form-div">
                              <div className="form-label-div">
                                <label htmlFor="property_features">
                                  <strong>13.&nbsp;</strong>Does the property have any
                                  of the folllowing?
                                </label>
                                <p>(mains supply)</p>
                              </div>
                              <div className="sub-btn">
                                {home_features.map((type, index) => (
                                  <div className="check-input" key={index}>
                                    <input
                                      id={type + "2"}
                                      type="checkbox"
                                      name="property_features"
                                      value={type}
                                      checked={formik.values.property_features.includes("Don't know") ? formik.values?.property_features?.splice(0, formik?.values?.property_features?.length, "Don't know") : formik.values.property_features.includes(type)}
                                      onChange={formik.handleChange}
                                    />
                                    <label htmlFor={type + "2"} className={`${formik.values.property_features.includes(type) ? "active" : ""}`}>
                                      {type}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="form-div">
                            <label htmlFor="house_type">
                              <strong>14.&nbsp;</strong>What kind of house do you
                              live in?{" "}
                            </label>
                            <select
                              name="house_type"
                              id="house_type"
                              className={`form-control`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.house_type}
                            >
                              <option value="">Select option</option>
                              <option value="Detached">Detached</option>
                              <option value="Semi Detached">Semi Detached</option>
                              <option value="Terrace">Terrace</option>
                              <option value="Flat  Apartment">Flat / Apartment</option>
                              <option value="Other">Other</option>
                              <option value="Dont Know">Don't Know</option>
                            </select>
                          </div>
                          <div className="form-div">
                            <label htmlFor="construction_material">
                              <strong>15.&nbsp;</strong>What is the primary
                              construction material?{" "}
                            </label>
                            <select
                              name="construction_material"
                              id="construction_material"
                              className={`form-control`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.construction_material}
                            >
                              <option value="">Select option</option>
                              <option value="Brick">Brick</option>
                              <option value="Stone">Stone</option>
                              <option value="Wood">Wood</option>
                              <option value="Other">Other</option>
                              <option value="Dont Know">Don't Know</option>
                            </select>
                          </div>
                          <div className="form-div">
                            <label htmlFor="year_built">
                              <strong>16.&nbsp;</strong>When was it built?{" "}
                            </label>
                            <select
                              name="year_built"
                              id="year_built"
                              className={`form-control ${formik.errors.year_built &&
                                formik.touched.year_built
                                ? "invalidInput"
                                : ""
                                } `}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.year_built}
                            >
                              <option value="">Select option</option>
                              {years.map((year, index) => (
                                <option key={index} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            {formik.errors.year_built &&
                              formik.touched.year_built ? (
                              <span className="input-error-msg">
                                {formik.errors.year_built}
                              </span>
                            ) : null}
                          </div>
                          <div className="form-div">
                            <div className="form-label-div ">
                              <label htmlFor="winter_temperature">
                                <strong>17.&nbsp;</strong>What temprature was the home
                                kept in the winter?
                              </label>
                              <p>(Use slider below)</p>
                            </div>
                            <div className="range">
                              <span className={`range-value ${formik.values.winter_temperature > 4 ? "temp_dontKnow" : ""}`} style={slideStyle.range} />
                              <span className="circle" style={slideStyle.point} />
                              <input
                                className={`range-slide `}
                                name="winter_temperature"
                                id="winter_temperature"
                                type="range"
                                // min="1"
                                max="5"
                                value={formik.values.winter_temperature}
                                step="1"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                              />
                            </div>
                            <div className="slider-labels">
                              <span>{"< 14%"}</span>
                              <span>{"14% - 17%"}</span>
                              <span>{"18% - 21%"}</span>
                              <span>{"> 21%"}</span>
                              <span>{"Don't know"}</span>
                            </div>
                          </div>
                          <div className="form-div ">
                            <label htmlFor="additional_property_features">
                              <strong>18.&nbsp;</strong>Does the property have any of
                              the following?{" "}
                            </label>
                            <div className="sub-btn">
                              {additionalPropertyFeatures.map((type, index) => (
                                <div className="check-input" key={index}>
                                  <input
                                    id={type + "1"}
                                    type="checkbox"
                                    name="additional_property_features"
                                    value={type}
                                    checked={formik.values.additional_property_features.includes(type)}
                                    onChange={formik.handleChange}
                                  />
                                  <label htmlFor={type + "1"} className={`${formik.values.additional_property_features.includes(type) ? "active" : ""}`}>
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="form-div">
                            <label htmlFor="live_in_staff">
                              <strong>19.&nbsp;</strong>Does the property have any
                              live-in staff?{" "}
                            </label>
                            <select
                              name="live_in_staff"
                              id="live_in_staff"
                              className={`form-control`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.live_in_staff}
                            >
                              <option value="">Select option</option>
                              {Array(20)
                                .fill()
                                .map((opt, index) => (
                                  <option value={index} key={"opt" + index}>
                                    {index}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="form-div">
                            <label htmlFor="other_dependants">
                              <strong>20.&nbsp;</strong>Do you have any renovations
                              planned this year or next year?{" "}
                            </label>
                            <div className="col-lg-5">
                              <div className="sub-btn">
                                <input
                                  type="radio"
                                  id="planned_renovations_yes"
                                  name="planned_renovations"
                                  value="Yes"
                                  checked={formik.values.planned_renovations === "Yes"}
                                  onChange={formik.handleChange}
                                />
                                <label htmlFor="planned_renovations_yes" className={formik.values.planned_renovations === "Yes" ? "active" : ""}>Yes</label>
                                <input
                                  type="radio"
                                  id="planned_renovations_no"
                                  name="planned_renovations"
                                  value="No"
                                  checked={formik.values.planned_renovations === "No"}
                                  onChange={formik.handleChange}
                                />
                                <label htmlFor="planned_renovations_no" className={formik.values.planned_renovations === "No" ? "active" : ""}> No </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-div">
                            <label htmlFor="other_dependants">
                              <strong>21.&nbsp;</strong>Does the property have any
                              significant land attached?{" "}
                            </label>
                            <div className="col-lg-5">
                              <div className="sub-btn">
                                <input
                                  type="radio"
                                  id="significant_land_yes"
                                  name="significant_land"
                                  value="Yes"
                                  checked={formik.values.significant_land === "Yes"}
                                  onChange={formik.handleChange}
                                />
                                <label htmlFor="significant_land_yes" className={formik.values.significant_land === "Yes" ? "active" : ""}>Yes</label>
                                <input
                                  type="radio"
                                  id="significant_land_no"
                                  name="significant_land"
                                  value="No"
                                  checked={formik.values.significant_land === "No"}
                                  onChange={formik.handleChange}
                                />
                                <label htmlFor="significant_land_no" className={formik.values.significant_land === "No" ? "active" : ""}>
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-div">
                            <label htmlFor="land_details">
                              <strong>22.&nbsp;</strong>Please provide some details
                              on the land, and any livestock?{" "}
                            </label>
                            <textarea
                              id="land_details"
                              name="land_details"
                              rows="6"
                              className={`form-control`}
                              value={formik.values.land_details}
                              onChange={formik.handleChange}
                              cols="50"
                              maxLength={1000}
                            ></textarea>
                          </div>
                          <div className="form-div">
                            <label htmlFor="other_details">
                              <strong>23.&nbsp;</strong>Is there anything else you
                              would like to tell us? For Example, What measures
                              have you taken to improve the sustainability of
                              you home? Have you had any challenges in doing so?
                              Has the building has been developed to meet a
                              particular environmental standard (Passivhaus
                              standards etc) ? Do you use a heat pump?{" "}
                            </label>
                            <textarea
                              id="other_details"
                              name="other_details"
                              rows="6"
                              className={`form-control`}
                              value={formik.values.other_details}
                              onChange={formik.handleChange}
                              cols="50"
                              maxLength={1000}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-box-btn">
                    <div className="Additional-box">
                      <div className="Additional-bottom-btn">
                        <button className="btn" type='submit' disabled={disabled} >Continue {disabled ? <div className="spinner-border text-primary" role="status">
                        </div> : ''}</button>
                        {/* <button className="btn" type='button' disabled={disabled} onClick={(e) => submitHandler(e)} >Save progress {disabled ? <div className="spinner-border text-primary" role="status">
                        </div> : ''}</button> */}
                        {/* <button className="btn" type="button" onClick={continueHandler}>
                          Continue
                        </button> */}
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
