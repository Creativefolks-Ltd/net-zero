import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import CountryOptions from "../../components/CountryOptions";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticularForm, getCountry, homeFormDelete, homeformIds } from "../../redux-store/actions/user";
import delete_img from "../../assets/images/delete_img.svg";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import CurrencyOptions from "../../components/CurrencyOptions";

const heatingTypes = ["Electricity", "Oil", "District heating", "Gas", "Wood", "Don't know"];
const additionalPropertyFeatures = ["Swimming Pool", "Sauna", "Solarium", "Hot Tub", "Server Room"]
const home_features = ["Food Waste Collection", "Plastic/Glass/Metal/Paper recycling services provided", "Home Composting", "Don't know"];

const HomeFormView = ({ home, selectedHome, setSelectedHome }) => {
  const location = useLocation()
  const dispatch = useDispatch();
  const details = useSelector((state) => state.users);
  const user = useSelector((state) => state.auth);
  const currentHomeId = useSelector((state) => state.users?.currentHomeId);

  let homeActiveTab = selectedHome;

  let isUserFormView = location?.pathname === "/forms" ? true : false;

  const endYear = new Date().getFullYear();
  const startYear = endYear - 100;

  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  const getWinterTemperature = (temperature) => {
    if (temperature === "< 14°C") {
      return 15;
    } else if (temperature === "14°C - 17°C") {
      return 32;
    } else if (temperature === "18°C - 21°C") {
      return 55;
    } else if (temperature === "> 21°C") {
      return 66;
    } else if (temperature === "Don't know") {
      return 88;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    formik.setValues({
      location: home?.location,
      heating_type: home?.heating_type?.split(','),
      zero_carbon_energy_tariff: home?.zero_carbon_energy_tariff,
      electricity_usage_known: home?.electricity_usage_known,
      electricity_usage_amount: home?.electricity_usage_amount,
      electricity_usage_unit: home?.electricity_usage_unit,
      electricity_usage_amount_currency: home?.electricity_usage_amount_currency,
      electricity_usage_time_period: home?.electricity_usage_time_period,
      electricity_annual_spend: home?.electricity_annual_spend,
      electricity_annual_amount: home?.electricity_annual_amount,
      electricity_annual_unit: home?.electricity_annual_unit,
      electricity_supplier: home?.electricity_supplier,
      on_site_renewable_energy: home?.on_site_renewable_energy,
      on_site_renewable_amount: home?.on_site_renewable_amount,
      on_site_renewable_unit: home?.on_site_renewable_unit,
      natural_gas_usage_known: home?.natural_gas_usage_known,
      natural_gas_usage_amount: home?.natural_gas_usage_amount,
      natural_gas_usage_unit: home?.natural_gas_usage_unit,
      natural_gas_usage_time_period: home?.natural_gas_usage_time_period,
      natural_gas_annual_spend: home?.natural_gas_annual_spend,
      natural_gas_annual_amount: home?.natural_gas_annual_amount,
      natural_gas_annual_unit: home?.natural_gas_annual_unit,
      gas_consumption_offset: home?.gas_consumption_offset,
      oil_usage_known: home?.oil_usage_known,
      oil_usage_amount: home?.oil_usage_amount,
      oil_usage_unit: home?.oil_usage_unit,
      oil_annual_spend: home?.oil_annual_spend,
      oil_annual_amount: home?.oil_annual_amount,
      oil_annual_unit: home?.oil_annual_unit,
      wood_usage_known: home?.wood_usage_known,
      wood_usage_amount: home?.wood_usage_amount,
      wood_usage_unit: home?.wood_usage_unit,
      wood_annual_spend: home?.wood_annual_spend,
      wood_annual_amount: home?.wood_annual_amount,
      wood_annual_unit: home?.wood_annual_unit,
      coal_usage_known: home?.coal_usage_known,
      coal_usage_amount: home?.coal_usage_amount,
      coal_usage_unit: home?.coal_usage_unit,
      coal_annual_spend: home?.coal_annual_spend,
      coal_annual_amount: home?.coal_annual_amount,
      coal_annual_unit: home?.coal_annual_unit,
      other_energy_usage: home?.other_energy_usage,
      other_energy_which_and_amount: home?.other_energy_which_and_amount,
      property_features: home?.property_features,
      house_type: home?.house_type,
      construction_material: home?.construction_material,
      year_built: home?.year_built,
      winter_temperature: getWinterTemperature(home?.winter_temperature),
      additional_property_features: home?.additional_property_features,
      live_in_staff: home?.live_in_staff,
      planned_renovations: home?.planned_renovations,
      significant_land: home?.significant_land,
      land_details: home?.land_details,
      other_details: home?.other_details,
    })
  }, [home])

  const formik = useFormik({
    initialValues: {
      location: home?.location,
      heating_type: home?.heating_type,
      zero_carbon_energy_tariff: home?.zero_carbon_energy_tariff,
      electricity_usage_known: home?.electricity_usage_known,
      electricity_usage_amount: home?.electricity_usage_amount,
      electricity_usage_unit: home?.electricity_usage_unit,
      electricity_usage_amount_currency: home?.electricity_usage_amount_currency,
      electricity_usage_time_period: home?.electricity_usage_time_period,
      electricity_annual_spend: home?.electricity_annual_spend,
      electricity_annual_amount: home?.electricity_annual_amount,
      electricity_annual_unit: home?.electricity_annual_unit,
      electricity_supplier: home?.electricity_supplier,
      on_site_renewable_energy: home?.on_site_renewable_energy,
      on_site_renewable_amount: home?.on_site_renewable_amount,
      on_site_renewable_unit: home?.on_site_renewable_unit,
      natural_gas_usage_known: home?.natural_gas_usage_known,
      natural_gas_usage_amount: home?.natural_gas_usage_amount,
      natural_gas_usage_unit: home?.natural_gas_usage_unit,
      natural_gas_usage_time_period: home?.natural_gas_usage_time_period,
      natural_gas_annual_spend: home?.natural_gas_annual_spend,
      natural_gas_annual_amount: home?.natural_gas_annual_amount,
      natural_gas_annual_unit: home?.natural_gas_annual_unit,
      gas_consumption_offset: home?.gas_consumption_offset,
      oil_usage_known: home?.oil_usage_known,
      oil_usage_amount: home?.oil_usage_amount,
      oil_usage_unit: home?.oil_usage_unit,
      oil_annual_spend: home?.oil_annual_spend,
      oil_annual_amount: home?.oil_annual_amount,
      oil_annual_unit: home?.oil_annual_unit,
      wood_usage_known: home?.wood_usage_known,
      wood_usage_amount: home?.wood_usage_amount,
      wood_usage_unit: home?.wood_usage_unit,
      wood_annual_spend: home?.wood_annual_spend,
      wood_annual_amount: home?.wood_annual_amount,
      wood_annual_unit: home?.wood_annual_unit,
      coal_usage_known: home?.coal_usage_known,
      coal_usage_amount: home?.coal_usage_amount,
      coal_usage_unit: home?.coal_usage_unit,
      coal_annual_spend: home?.coal_annual_spend,
      coal_annual_amount: home?.coal_annual_amount,
      coal_annual_unit: home?.coal_annual_unit,
      other_energy_usage: home?.other_energy_usage,
      other_energy_which_and_amount: home?.other_energy_which_and_amount,
      property_features: home?.property_features,
      house_type: home?.house_type,
      construction_material: home?.construction_material,
      year_built: home?.year_built,
      winter_temperature: home?.winter_temperature,
      additional_property_features: home?.additional_property_features,
      live_in_staff: home?.live_in_staff,
      planned_renovations: home?.planned_renovations,
      significant_land: home?.significant_land,
      land_details: home?.land_details,
      other_details: home?.other_details,
    },
  });

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
        confirmButtonColor: "#81c14b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const general_information_id = user?.generalInfoId;

        await dispatch(homeFormDelete(currentHomeId));
        Swal.fire({
          title: "Deleted!",
          text: `Home deleted successfully`,
          icon: "success",
          confirmButtonColor: "#81c14b",
        });
        setSelectedHome(1)
        await dispatch(homeformIds(general_information_id));
        await dispatch(fetchParticularForm(general_information_id));
      }
    } catch (error) {
      console.error("Error deleting home:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting the home",
        icon: "error",
        confirmButtonColor: "#81c14b",
      });
    }
  };

  const genSlideStyle = (value) => {
    return {
      point: {
        left: `calc(${value * 1}% - ${0.3 * value}px)`,
      },
      range: {
        width: `${value * 1}%`,
      },
    };
  };

  const slideStyle = genSlideStyle(formik.values.winter_temperature);

  return (
    <>
      <form>
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
                        {(homeActiveTab > 1 && isUserFormView) && (
                          <div className="delete-box" onClick={deleteHandler}>
                            <span>Delete this home</span>
                            <img src={delete_img} alt="" />
                          </div>
                        )}
                      </div>

                      <p>
                        Fields marked with an <span>*</span> are required
                      </p>
                      <div className="form ">
                        <div className="row">
                          <div className="form-div">
                            <label htmlFor="location">
                              <strong>1.&nbsp;</strong>Location of home<span>*</span>
                            </label>
                            <select
                              name="location"
                              id="location"
                              className={`form-control `}
                              placeholder="Location of home"
                              readOnly
                              value={formik.values.location}
                              disabled
                            >
                              <option value="">Select option</option>
                              <CountryOptions countries={details?.countries} />
                            </select>

                          </div>
                          <div className="form-div">
                            <div className="form-label-div">
                              <label htmlFor="heating_type">
                                <strong>2.&nbsp;</strong>which forms of energy do you use at your home??
                                <span>*</span>
                              </label>
                              <p>(Select all that apply)</p>
                            </div>
                            <div className="sub-btn">
                              {heatingTypes?.map((type, index) => (
                                <div className="check-input" key={index}>
                                  <input
                                    id={type + "1"}
                                    type="checkbox"
                                    name="heating_type"
                                    value={type}
                                    readOnly
                                    defaultChecked={formik?.values?.heating_type?.includes(type)}
                                  // defaultChecked={formik?.values?.heating_type?.includes("Don't know") ? formik.values?.heating_type?.splice(0, formik?.values?.heating_type?.length, "Don't know") : formik?.values?.heating_type?.includes(type)}
                                  />
                                  <label htmlFor={type + "1"} className={`${home?.heating_type?.includes(type) ? "active" : ""}`}>
                                    {type}
                                  </label>
                                </div>
                              ))}
                            </div>

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
                            className={`form-control`}
                            value={formik.values.zero_carbon_energy_tariff}
                            disabled
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
            {/* Electricity Section */}
            {formik?.values?.zero_carbon_energy_tariff === "No" && formik.values.heating_type.includes("Electricity") && (
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
                                className={`form-control `}
                                value={formik.values.electricity_usage_known}
                                disabled
                              >
                                <option value="">Select option</option>
                                <option value="Yes, for part of the year">Yes, for part of the year</option>
                                <option value="Yes, for the whole year">Yes, for the whole year</option>
                                <option value="No">No</option>
                              </select>


                              {formik.values.electricity_usage_known !== "No" && (<div className="row electricity-row">
                                <div className="col-md-6 electricity-col">
                                  <input
                                    type="text"
                                    placeholder="Amount"
                                    name="electricity_usage_amount"
                                    id="electricity_usage_amount"
                                    className={`form-control `}
                                    onChange={formik.handleChange}
                                    value={formik.values.electricity_usage_amount}
                                    readOnly
                                  />

                                </div>
                                <div className="col-md-6">
                                  <select
                                    type="text"
                                    placeholder="Kwh"
                                    name="electricity_usage_unit"
                                    id="electricity_usage_unit"
                                    className={`form-control  `}
                                    value={formik.values.electricity_usage_unit}
                                    disabled
                                  >
                                    <option value="">Select option</option>
                                    <option value="kWh">kWh</option>
                                    <option value="mWh">mWh</option>
                                    <option value="Billed per year">Billed per year</option>
                                  </select>
                                </div>
                              </div>)}
                            </div>
                            {(formik.values.electricity_usage_known !== "No" && formik.values.electricity_usage_unit === "Billed per year") && (
                              <div className="form-div">
                                <select
                                  type="text"
                                  placeholder="Currency"
                                  name="electricity_usage_amount_currency"
                                  id="electricity_usage_amount_currency"
                                  className={`form-control `}
                                  value={formik.values.electricity_usage_amount_currency}
                                  disabled
                                >
                                  <option value="">Select currency</option>
                                  <CurrencyOptions />
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            )}

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
                                  className={`form-control`}
                                  onChange={formik.handleChange}
                                  value={
                                    formik.values.electricity_usage_time_period
                                  }
                                  readOnly
                                />
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
                                  className={`form-control`}
                                  value={formik.values.electricity_annual_spend}
                                  disabled
                                >
                                  <option value="">Select option</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>

                                {formik.values.electricity_annual_spend !== "No" && (
                                  <div className="row electricity-row">
                                    <div className="col-md-6">
                                      <input
                                        type="text"
                                        placeholder="Amount"
                                        name="electricity_annual_amount"
                                        id="electricity_annual_amount"
                                        className={`form-control`}
                                        onChange={formik.handleChange}
                                        value={formik.values.electricity_annual_amount}
                                        readOnly
                                      />

                                    </div>
                                    <div className="col-md-6">
                                      <select
                                        name="electricity_annual_unit"
                                        id="electricity_annual_unit"
                                        className={`form-control `}
                                        value={formik.values.electricity_annual_unit}
                                        disabled
                                      >
                                        <option value="">Select option</option>
                                        <option value="Dollars">$</option>
                                        <option value="Pounds">£</option>
                                        <option value="Euros">€</option>
                                        <option value="Switzerland Franc">CHF</option>
                                      </select>

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
                                className={`form-control`}
                                onChange={formik.handleChange}
                                value={formik.values.electricity_supplier}
                                readOnly
                              />

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
                                className={`form-control `}
                                value={formik.values.on_site_renewable_energy}
                                disabled
                              >
                                <option value="">Select option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>


                            </div>

                            {formik.values.on_site_renewable_energy !== "No" && (
                              <>
                                <div className="col-md-6 electricity-col">
                                  <div className="form-div">
                                    <input
                                      type="text"
                                      name="on_site_renewable_amount"
                                      id="on_site_renewable_amount"
                                      className={`form-control  `}
                                      placeholder="Amount"
                                      onChange={formik.handleChange}
                                      value={formik.values.on_site_renewable_amount}
                                      readOnly
                                    />

                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-div">
                                    <select
                                      type="text"
                                      name="on_site_renewable_unit"
                                      id="on_site_renewable_unit"
                                      className={`form-control  `}
                                      value={formik.values.on_site_renewable_unit}
                                      disabled
                                    >
                                      <option value={""}>Select option</option>
                                      <option value="percent">%</option>
                                      <option value="kWh">kWh</option>
                                    </select>

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
            {home?.heating_type?.includes("Gas") && (
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
                                className={`form-control`}
                                value={formik.values.natural_gas_usage_known}
                                disabled
                              >
                                <option value="">Select option</option>
                                <option value="Yes, for part of the year">Yes, for part of the year</option>
                                <option value="Yes, for the whole year">Yes, for the whole year</option>
                                <option value="No">No</option>
                              </select>
                              {formik.values.natural_gas_usage_known !== "No" && (<div className="row electricity-row">
                                <div className="col-md-6 electricity-col">
                                  <input
                                    type="text"
                                    placeholder="Amount"
                                    name="natural_gas_usage_amount"
                                    id="natural_gas_usage_amount"
                                    className={`form-control `}
                                    onChange={formik.handleChange}
                                    value={formik.values.natural_gas_usage_amount}
                                    readOnly
                                  />

                                </div>
                                <div className="col-md-6">
                                  <select
                                    type="text"
                                    name="natural_gas_usage_unit"
                                    id="natural_gas_usage_unit"
                                    className={`form-control `}
                                    value={formik.values.natural_gas_usage_unit}
                                    disabled
                                  >
                                    <option value={""}>Select option</option>
                                    <option value="kWh">kWh</option>
                                    <option value="M3">M3</option>
                                    <option value="BTUs">BTUs</option>
                                  </select>

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
                                  className={`form-control `}
                                  onChange={formik.handleChange}
                                  value={
                                    formik.values.natural_gas_usage_time_period
                                  }
                                  readOnly
                                />
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
                                  className={`form-control `}
                                  value={formik.values.natural_gas_annual_spend}
                                  disabled
                                >
                                  <option value="">Select option</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                </select>

                                {formik.values.natural_gas_annual_spend !== "No" && (
                                  <div className="row electricity-row">
                                    <div className="col-md-6">
                                      <input
                                        type="text"
                                        placeholder="Amount"
                                        name="natural_gas_annual_amount"
                                        id="natural_gas_annual_amount"
                                        className={`form-control`}
                                        onChange={formik.handleChange}
                                        value={formik.values.natural_gas_annual_amount}
                                        readOnly
                                      />

                                    </div>
                                    <div className="col-md-6">
                                      <select
                                        name="natural_gas_annual_unit"
                                        id="natural_gas_annual_unit"
                                        className={`form-control `}
                                        value={formik.values.natural_gas_annual_unit}
                                        disabled
                                      >
                                        <option value="">Select option</option>
                                        <option value="Dollars">$</option>
                                        <option value="Pounds">£</option>
                                        <option value="Euros" selected="selected">‎€</option>
                                        <option value="Switzerland Franc">CHF</option>
                                      </select>

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
                                className={`form-control `}
                                value={formik.values.gas_consumption_offset}
                                disabled
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
            )}
            {/* Other energy Section */}
            {(home?.heating_type?.includes("Oil") || home?.heating_type?.includes("District heating") || home?.heating_type?.includes("Wood")) && (
              <div className="bg-lightgray-color mt-80">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="card card-par">
                        <h2>Other energy</h2>

                        <div className="form ">
                          <div className="row">
                            {/* Oil */}
                            {home?.heating_type?.includes("Oil") && (
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
                                    className={`form-control  `}
                                    value={formik.values.oil_usage_known}
                                    disabled
                                  >
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                  {formik.values.oil_usage_known !== "No" && (<div className="row electricity-row">
                                    <div className="col-md-6 electricity-col">
                                      <input
                                        type="text"
                                        placeholder="Amount"
                                        name="oil_usage_amount"
                                        id="oil_usage_amount"
                                        className={`form-control`}
                                        onChange={formik.handleChange}
                                        value={formik.values.oil_usage_amount}
                                        readOnly
                                      />

                                    </div>
                                    <div className="col-md-6">
                                      <select
                                        type="text"
                                        name="oil_usage_unit"
                                        id="oil_usage_unit"
                                        className={`form-control  `}
                                        value={formik.values.oil_usage_unit}
                                        disabled
                                      >
                                        <option value={""}>Select option</option>
                                        <option value="kWh" >kWh</option>
                                        <option value="M3">M3</option>
                                        <option value="BTUs">BTUs</option>
                                        <option value="Tonnes">Tonnes</option>
                                        <option value="Litres">Litres</option>
                                      </select>

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
                                      className={`form-control  `}
                                      value={formik.values.oil_annual_spend}
                                      disabled
                                    >
                                      <option value="">Select option</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {formik.values.oil_annual_spend !== "No" && (
                                      <div className="row electricity-row">
                                        <div className="col-md-6">
                                          <input
                                            type="text"
                                            placeholder="Amount"
                                            name="oil_annual_amount"
                                            id="oil_annual_amount"
                                            className={`form-control`}
                                            onChange={formik.handleChange}
                                            value={formik.values.oil_annual_amount}
                                            readOnly
                                          />

                                        </div>
                                        <div className="col-md-6">
                                          <select
                                            name="oil_annual_unit"
                                            id="oil_annual_unit"
                                            className={`form-control  `}
                                            value={formik.values.oil_annual_unit}
                                            disabled
                                          >
                                            <option value="">Select option</option>
                                            <option value="Dollars">$</option>
                                            <option value="Pounds">£</option>
                                            <option value="Euros">‎€</option>
                                            <option value="Switzerland Franc">CHF</option>
                                          </select>

                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            {/* Wood */}
                            {home?.heating_type?.includes("Wood") && (
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
                                    className={`form-control `}
                                    value={formik.values.wood_usage_known}
                                    disabled
                                  >
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                  {formik.values.wood_usage_known !== "No" && (
                                    <div className="row electricity-row">
                                      <div className="col-md-6 electricity-col">
                                        <input
                                          type="text"
                                          placeholder="Amount"
                                          name="wood_usage_amount"
                                          id="wood_usage_amount"
                                          className={`form-control`}
                                          onChange={formik.handleChange}
                                          value={formik.values.wood_usage_amount}
                                          readOnly
                                        />

                                      </div>
                                      <div className="col-md-6">
                                        <select
                                          name="wood_usage_unit"
                                          id="wood_usage_unit"
                                          className={`form-control `}
                                          value={formik.values.wood_usage_unit}
                                          disabled
                                        >
                                          <option value={""}>Select option</option>
                                          <option value="kWh" >kWh</option>
                                          <option value="M3">M3</option>
                                          <option value="BTUs">BTUs</option>
                                          <option value="Tonnes">Tonnes</option>
                                          <option value="Litres">Litres</option>

                                        </select>

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
                                      className={`form-control  `}
                                      value={formik.values.wood_annual_spend}
                                      disabled
                                    >
                                      <option value="">Select option</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {formik.values.wood_annual_spend !== "No" && (
                                      <div className="row electricity-row">
                                        <div className="col-md-6">
                                          <input
                                            type="text"
                                            placeholder="Amount"
                                            name="wood_annual_amount"
                                            id="wood_annual_amount"
                                            className={`form-control`}
                                            onChange={formik.handleChange}
                                            value={formik.values.wood_annual_amount}
                                            readOnly
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <select
                                            name="wood_annual_unit"
                                            id="wood_annual_unit"
                                            className={`form-control `}
                                            value={formik.values.wood_annual_unit}
                                            disabled
                                          >
                                            <option value="">Select option</option>
                                            <option value="Dollars" >$</option>
                                            <option value="Pounds">£</option>
                                            <option value="Euros">‎€</option>
                                            <option value="Switzerland Franc">CHF</option>
                                          </select>

                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </>)}
                            {/* District heating */}
                            {home?.heating_type?.includes("District heating") && (
                              <>
                                <div className="form-div">
                                  <label htmlFor="coal_usage_known">
                                    <strong>11.&nbsp;</strong>Do you know how much district heating
                                    was used at the home in the selected year?{" "}
                                    <span>*</span>{" "}
                                  </label>

                                  <select
                                    name="coal_usage_known"
                                    id="coal_usage_known"
                                    className={`form-control `}
                                    value={formik.values.coal_usage_known}
                                    disabled
                                  >
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </select>
                                  {formik.values.coal_usage_known !== "No" && (
                                    <div className="row electricity-row">
                                      <div className="col-md-6 electricity-col">
                                        <input
                                          type="text"
                                          placeholder="Amount"
                                          name="coal_usage_amount"
                                          id="coal_usage_amount"
                                          className={`form-control `}
                                          onChange={formik.handleChange}
                                          value={formik.values.coal_usage_amount}
                                          readOnly
                                        />

                                      </div>
                                      <div className="col-md-6">
                                        <select
                                          type="text"
                                          placeholder="Tonnes"
                                          name="coal_usage_unit"
                                          id="coal_usage_unit"
                                          className={`form-control `}
                                          value={formik.values.coal_usage_unit}
                                          disabled
                                        >
                                          <option value="">Select option</option>
                                          <option value="kWh">kWh</option>
                                          <option value="M3">M3</option>
                                          <option value="BTUs">BTUs</option>
                                          <option value="Tonnes">Tonnes</option>
                                          <option value="Litres">Litres</option>
                                        </select>
                                      </div>
                                    </div>)}
                                </div>
                                {formik.values.coal_usage_known === "No" && (
                                  <div className="form-div">
                                    <div className="form-label-div">
                                      <label htmlFor="">
                                        <strong>11b.&nbsp;</strong>Do you know what the annual spend was on district heating at property in the selected year? <span>*</span>{" "}
                                      </label>
                                    </div>
                                    <select
                                      name="coal_annual_spend"
                                      id="coal_annual_spend"
                                      className={`form-control `}
                                      value={formik.values.coal_annual_spend}
                                      disabled
                                    >
                                      <option value="">Select option</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    {formik.values.coal_annual_spend !== "No" && (
                                      <div className="row electricity-row">
                                        <div className="col-md-6">
                                          <input
                                            type="text"
                                            placeholder="Amount"
                                            name="coal_annual_amount"
                                            id="coal_annual_amount"
                                            className={`form-control `}
                                            onChange={formik.handleChange}
                                            value={formik.values.coal_annual_amount}
                                            readOnly
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <select
                                            name="coal_annual_unit"
                                            id="coal_annual_unit"
                                            className={`form-control`}
                                            value={formik.values.coal_annual_unit}
                                            disabled
                                          >
                                            <option value="">Select option</option>
                                            <option value="Dollars">$</option>
                                            <option value="Pounds">£</option>
                                            <option value="Euros">‎€</option>
                                            <option value="Switzerland Franc">CHF</option>
                                          </select>
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
                              className={`form-control`}
                              value={formik.values.other_energy_usage}
                              disabled
                            >
                              <option value="">Select option</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          {formik.values.other_energy_usage !== "No" && (
                            <div className="form-div">
                              <input
                                type="text"
                                placeholder="What energy and the amount used"
                                name="other_energy_which_and_amount"
                                id="other_energy_which_and_amount"
                                className={`form-control`}
                                onChange={formik.handleChange}
                                value={formik.values.other_energy_which_and_amount}
                                readOnly
                              />

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
                                      defaultChecked={home?.property_features}
                                    />
                                    <label htmlFor={type + "2"} className={`${home?.property_features?.includes(type) ? "active" : ""}`}>
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
                              value={formik.values.house_type}
                              disabled
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
                              value={formik.values.construction_material}
                              disabled
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
                              className={`form-control`}
                              value={formik.values.year_built}
                              disabled
                            >
                              <option value="">Select option</option>
                              {years.map((year, index) => (
                                <option key={index} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>

                          </div>
                          <div className="form-div">
                            <div className="form-label-div ">
                              <label htmlFor="winter_temperature">
                                <strong>17.&nbsp;</strong>What temperature was the home
                                kept in the winter?
                              </label>
                              <p>(Use slider below)</p>
                            </div>
                            <div className="range">
                              <span className={`range-value ${formik.values.winter_temperature >= 80 ? "temp_dontKnow" : ""}`} style={slideStyle.range} />
                              <span className="circle" style={slideStyle.point} />
                              <input
                                className={`range-slide `}
                                name="winter_temperature"
                                id="winter_temperature"
                                type="range"
                                // min="1"
                                max="100"
                                value={formik.values.winter_temperature}
                                step="1"
                                // onBlur={formik.handleBlur}
                                // onChange={formik.handleChange}
                                readOnly
                              />
                            </div>
                            <div className="slider-labels">
                              <span className={`${formik.values.winter_temperature >= 1 && formik.values.winter_temperature < 18 ? "active" : ""}`}>{"< 14°C"}</span>
                              <span className={`${formik.values.winter_temperature >= 18 && formik.values.winter_temperature < 40 ? "active" : ""}`}>{"14°C - 17°C"}</span>
                              <span className={`${formik.values.winter_temperature >= 40 && formik.values.winter_temperature < 61 ? "active" : ""}`}>{"18°C - 21°C"}</span >
                              <span className={`${formik.values.winter_temperature >= 61 && formik.values.winter_temperature < 80 ? "active" : ""}`}>{"> 21°C"}</span>
                              <span className={`${formik.values.winter_temperature >= 80 ? "active" : ""}`}>{"Don't know"}</span>
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
                                    defaultChecked={formik.values.additional_property_features?.includes(type)}
                                  />
                                  <label htmlFor={type + "1"} className={`${home?.additional_property_features?.includes(type) ? "active" : ""}`}>
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
                              value={formik.values.live_in_staff}
                              disabled
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
                                  defaultChecked={formik.values.planned_renovations === "Yes"}
                                />
                                <label htmlFor="planned_renovations_yes" className={home?.planned_renovations === "Yes" ? "active" : ""}>Yes</label>
                                <input
                                  type="radio"
                                  id="planned_renovations_no"
                                  name="planned_renovations"
                                  value="No"
                                  defaultChecked={formik.values.planned_renovations === "No"}
                                />
                                <label htmlFor="planned_renovations_no" className={home?.planned_renovations === "No" ? "active" : ""}> No </label>
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
                                  defaultChecked={formik.values.significant_land === "Yes"}
                                />
                                <label htmlFor="significant_land_yes" className={home?.significant_land === "Yes" ? "active" : ""}>Yes</label>
                                <input
                                  type="radio"
                                  id="significant_land_no"
                                  name="significant_land"
                                  value="No"
                                  defaultChecked={formik.values.significant_land === "No"}
                                />
                                <label htmlFor="significant_land_no" className={home?.significant_land === "No" ? "active" : ""}>
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                          {formik?.values?.significant_land === "Yes" && (
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
                                onChange={formik.handleChange}
                                value={formik.values.land_details}
                                cols="50"
                                maxLength={1000}
                                readOnly
                              ></textarea>
                            </div>
                          )}
                          <div className="form-div">
                            <label htmlFor="other_details">
                              <strong>23.&nbsp;</strong>Is there anything else you
                              would like to tell us? For Example, What measures
                              have you taken to improve the sustainability of
                              your home? Have you had any challenges in doing so?
                              Has the building has been developed to meet a
                              particular environmental standard (Passivhaus
                              standards etc) ? Do you use a heat pump?{" "}
                            </label>
                            <textarea
                              id="other_details"
                              name="other_details"
                              rows="6"
                              className={`form-control`}
                              onChange={formik.handleChange}
                              value={formik.values.other_details}
                              cols="50"
                              maxLength={1000}
                              readOnly
                            ></textarea>
                          </div>
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

export default HomeFormView;
