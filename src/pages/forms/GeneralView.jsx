import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { getCountry } from "../../redux-store/actions/user";
import CountryOptions from "../../components/CountryOptions";

const GeneralView = ({ general }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const details = useSelector((state) => state.users);

    const counts = ["First", "Second", "Third", "Fourth", "Fifth"];
    const alphabets = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

    const endYear = new Date().getFullYear();
    const startYear = endYear - 100;

    const years = [];

    for (let year = endYear; year >= startYear; year--) {
        years.push(year);
    }

    useEffect(() => {
        dispatch(getCountry())
    }, [])

    useEffect(() => {
        formik.setValues({
            first_name: general?.first_name || "",
            last_name: general?.last_name || "",
            email: general?.email || "",
            year_of_birth: general?.year_of_birth || "",
            country_of_residence: general?.country_of_residence || "",
            num_of_homes: general?.num_of_homes || "",
            first_home_country: general?.first_home_country || "",
            second_home_country: general?.second_home_country || "",
            third_home_country: general?.third_home_country || "",
            fourth_home_country: general?.fourth_home_country || "",
            fifth_home_country: general?.fifth_home_country || "",
            living_with_partner: general?.living_with_partner || "",
            num_of_children_under_18: general?.num_of_children_under_18 || undefined,
            other_dependants: general?.other_dependants || "",
            other_dependants_details: general?.other_dependants_details || "",
            forest_or_farmland_details: general?.forest_or_farmland_details || "",
        });
    }, [general]);

    const formik = useFormik({
        initialValues: {
            first_name: general?.first_name,
            last_name: general?.last_name,
            email: general?.email,
            year_of_birth: general?.year_of_birth,
            country_of_residence: general?.country_of_residence,
            num_of_homes: general?.num_of_homes || "",
            first_home_country: general?.first_home_country || "",
            second_home_country: general?.second_home_country || "",
            third_home_country: general?.third_home_country || "",
            fourth_home_country: general?.fourth_home_country || "",
            fifth_home_country: general?.fifth_home_country || "",
            living_with_partner: general?.living_with_partner || "",
            num_of_children_under_18: general?.num_of_children_under_18,
            other_dependants: general?.other_dependants || "",
            other_dependants_details: general?.other_dependants_details || "",
            forest_or_farmland_details: general?.forest_or_farmland_details || "",
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <section className="general-form  mb-80 ">
                    <div className="container ">
                        <div className="sub-heading">
                            <h2>General information</h2>
                        </div>
                        <div className="bg-lightgray-color">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="card card-par">
                                            <div className="form ">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-div">
                                                            <label htmlFor="first_name">
                                                                <strong>1.&nbsp;</strong>Name<span>*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="first_name"
                                                                id="first_name"
                                                                className={`text-capitalize form-control`}
                                                                placeholder="First Name"
                                                                defaultValue={formik?.values?.first_name}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-div">
                                                            <label htmlFor="last_name" className="last-name">
                                                                Fields marked with an * are required
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="last_name"
                                                                id="last_name"
                                                                className={`text-capitalize form-control `}
                                                                placeholder="Last Name"
                                                                readOnly
                                                                defaultValue={formik.values.last_name}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-div">
                                                    <label htmlFor="email">
                                                        <strong>2.&nbsp;</strong>Email<span>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        className={`form-control`}
                                                        placeholder="Email"
                                                        defaultValue={formik.values.email}
                                                        readOnly
                                                    />
                                                </div>

                                                <div className="form-div">
                                                    <label htmlFor="year_of_birth">
                                                        <strong>4.&nbsp;</strong>Year you are submitting data for<span>*</span>
                                                    </label>
                                                    <select
                                                        name="year_of_birth"
                                                        id="year_of_birth"
                                                        className={`form-control`}
                                                        readOnly
                                                        defaultValue={formik.values.year_of_birth}
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
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-div">
                                                            <label htmlFor="country_of_residence">
                                                                <strong>5.&nbsp;</strong>Country of primary residence<span>*</span>
                                                            </label>
                                                            <select
                                                                name="country_of_residence"
                                                                id="country_of_residence"
                                                                className={`form-control`}
                                                                readOnly
                                                                defaultValue={formik.values.country_of_residence}
                                                                disabled
                                                            >
                                                                <option value="">Select option</option>
                                                                <CountryOptions countries={details?.countries} />
                                                            </select>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-div">
                                                            <label htmlFor="num_of_homes">
                                                                <strong>6.&nbsp;</strong>How many homes do you own?<span>*</span>
                                                            </label>
                                                            <select
                                                                name="num_of_homes"
                                                                id="num_of_homes"
                                                                className={`form-control`}
                                                                defaultValue={formik.values.num_of_homes}
                                                                readOnly
                                                                disabled
                                                            >
                                                                <option value={""}>Select Option</option>
                                                                {Array(5)
                                                                    .fill()
                                                                    .map((opt, index) => (
                                                                        <option
                                                                            value={index + 1}
                                                                            key={"opt" + index}
                                                                        >
                                                                            {" "}
                                                                            {index + 1}{" "}
                                                                        </option>
                                                                    ))}
                                                            </select>

                                                        </div>
                                                    </div>
                                                    {Array(Number(formik?.values?.num_of_homes))
                                                        .fill()
                                                        .map((opt, index) => (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-div">
                                                                    <label htmlFor={`${counts[index]?.toLowerCase()}_home_country`}                                                                    >
                                                                        <strong>6{alphabets[index]?.toLowerCase()}.&nbsp;</strong>  {counts[index]} home country <span>*</span>
                                                                    </label>
                                                                    <select
                                                                        type="text"
                                                                        name={`${counts[
                                                                            index
                                                                        ]?.toLowerCase()}_home_country`}
                                                                        id={`${counts[
                                                                            index
                                                                        ]?.toLowerCase()}_home_country`}
                                                                        className={`form-control  `}
                                                                        value={
                                                                            formik.values[
                                                                            `${counts[
                                                                                index
                                                                            ]?.toLowerCase()}_home_country`
                                                                            ]
                                                                        }
                                                                        readOnly
                                                                        disabled
                                                                    >
                                                                        <option value="">Select option</option>
                                                                        <CountryOptions countries={details?.countries} />
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        ))}

                                                    <div className="col-md-5">
                                                        <div className="form-div">
                                                            <label htmlFor="living_with_partner">
                                                                <strong>7.&nbsp;</strong>Do you live with a partner?<span>*</span>
                                                            </label>
                                                            <div className="sub-btn">
                                                                <input
                                                                    type="radio"
                                                                    id="living_with_partner_yes"
                                                                    name="living_with_partner"
                                                                    value="Yes"
                                                                    checked={formik.values.living_with_partner === 'Yes'}
                                                                    readOnly
                                                                />
                                                                <label htmlFor="living_with_partner_yes"
                                                                    className={`${formik.values.living_with_partner === 'Yes' ? "active" : ""}`}
                                                                >Yes</label>
                                                                <input
                                                                    type="radio"
                                                                    id="living_with_partner_no"
                                                                    name="living_with_partner"
                                                                    value="No"
                                                                    checked={formik.values.living_with_partner === 'No'}
                                                                    readOnly
                                                                />
                                                                <label htmlFor="living_with_partner_no"
                                                                    className={`${formik.values.living_with_partner === 'No' ? "active" : ""}`}
                                                                >No</label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-div">
                                                    <div class="form-label-div">
                                                        <label htmlFor="homeCount">
                                                            <strong>8.&nbsp;</strong>How many children under 18 living with you?
                                                            <span>*</span>{" "}
                                                        </label>
                                                        <p>(As of 31st December of selected year)</p>
                                                    </div>
                                                    <select
                                                        name="num_of_children_under_18"
                                                        id="num_of_children_under_18"
                                                        className={`form-control `}
                                                        defaultValue={formik.values.num_of_children_under_18}
                                                        readOnly
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
                                                    <div class="form-label-div">
                                                        <label htmlFor="other_dependants">
                                                            <strong>9.&nbsp;</strong>Do you have any other dependants who live with you
                                                            all of the time or most of the time?<span>*</span>{" "}

                                                        </label>
                                                        <p>(grand-parents etc)</p>
                                                    </div>
                                                    <select
                                                        name="other_dependants"
                                                        id="other_dependants"
                                                        className={`form-control`}
                                                        defaultValue={formik.values.other_dependants}
                                                        readOnly
                                                        disabled
                                                    >
                                                        <option value="">Select option</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>

                                                </div>

                                                {formik.values.other_dependants === "Yes" && (
                                                    <div className="form-div">
                                                        <label htmlFor="other_dependants_details">
                                                            <strong>9a.&nbsp;</strong>Please specify <span>*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="other_dependants_details"
                                                            id="other_dependants_details"
                                                            className={`form-control`}
                                                            placeholder=""
                                                            readOnly
                                                            defaultValue={formik.values.other_dependants_details}
                                                        />

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="Additional mb-80 ">
                    <div className="container">
                        <div className="sub-heading">
                            <h2>Additional information</h2>
                        </div>
                        <div className="bg-lightgray-color">
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="Additional-box">
                                            <p>
                                                This section is optional, however it will allow us to
                                                make your carbon footprint more complete and your
                                                recommendations more specific.
                                            </p>
                                            <label htmlFor="forest_or_farmland_details">
                                                <strong>10.&nbsp;</strong>Other than domestic property, do you own any forest,
                                                farmland or other not attached to one of your
                                                properties? If so, please advise size and location.
                                            </label>
                                            <textarea
                                                id="forest_or_farmland_details"
                                                name="forest_or_farmland_details"
                                                rows="6"
                                                className={`form-control `}
                                                cols="50"
                                                maxLength={1000}
                                                defaultValue={formik.values.forest_or_farmland_details}
                                            ></textarea>
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

export default GeneralView;
