import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import SuccessImg from "../assets/images/Group 9106.png";
import { Link, useNavigate } from "react-router-dom";
import { formvalidation } from "../helpers/validations/Schema";
import { generalFormSubmit, getCountry } from "../redux-store/actions/user";
import CountryOptions from "../components/CountryOptions";
import FormActionTabs from "../components/FormActionTabs";
import { setFormCompleted } from "../redux-store/reducers/auth";

const General = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [activeTab, setActiveTab] = useState("general")
    const [disabled, setDisabled] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
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

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            emailConfirmation: "",
            year_of_birth: undefined,
            country_of_residence: "",
            num_of_homes: "",
            first_home_country: "",
            second_home_country: "",
            third_home_country: "",
            fourth_home_country: "",
            fifth_home_country: "",
            living_with_partner: "",
            num_of_children_under_18: undefined,
            other_dependants: "",
            other_dependants_details: "",
            forest_or_farmland_details: "",
        },

        validationSchema: formvalidation,
        onSubmit: handleSubmit
    });

    const validateAndFilterFields = (values) => {
        const {
            first_home_country,
            second_home_country,
            third_home_country,
            fourth_home_country,
            fifth_home_country,
            num_of_homes,
            other_dependants,
            other_dependants_details,
            year_of_birth,
            num_of_children_under_18,
            first_name,
            last_name,
            email,
            emailConfirmation,
            forest_or_farmland_details,
            ...rest
        } = values;

        const user_id = Number(user.userInfo.user_id);
        const filteredValues = {
            ...rest,
            ...(num_of_homes >= 1 ? { first_home_country } : {}),
            ...(num_of_homes >= 2 ? { second_home_country } : {}),
            ...(num_of_homes >= 3 ? { third_home_country } : {}),
            ...(num_of_homes >= 4 ? { fourth_home_country } : {}),
            ...(num_of_homes >= 5 ? { fifth_home_country } : {}),
            ...(other_dependants === "Yes" ? { other_dependants_details: other_dependants_details?.trim() } : {}),
            ...(emailConfirmation && {}),
            other_dependants: other_dependants?.trim(),
            num_of_homes: Number(num_of_homes),
            year_of_birth: Number(year_of_birth),
            num_of_children_under_18: Number(num_of_children_under_18),
            user_id,
            first_name: first_name?.trim(),
            last_name: last_name?.trim(),
            email: email?.trim(),
            forest_or_farmland_details: forest_or_farmland_details?.trim()
        };
        return filteredValues;
    };


    const navigateToNext = async (e) => {
        navigate("/home-form")
    }
    async function handleSubmit(values) {
        try {
            setDisabled(true)
            const filteredValues = await validateAndFilterFields(values);
            const response = await dispatch(generalFormSubmit(filteredValues));
            setDisabled(false)
            if (!response?.payload?.error && response?.payload?.data) {
                setIsSubmitted(true)
                dispatch(setFormCompleted(user?.formCompleted + 1))
                navigateToNext()
                // Swal.fire({
                //     title: "Success!",
                //     text: "Form submitted successfully",
                //     imageUrl: SuccessImg,
                //     imageWidth: 100,
                //     imageHeight: 100,
                //     showCancelButton: false,
                //     confirmButtonColor: "#3085d6",
                //     cancelButtonColor: "#d33",
                //     didClose: navigateToNext
                // });
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
        } catch (error) {
            setDisabled(false);
            Swal.fire({
                title: "Failed!",
                text: "Something went wrong, please check the form.",
                icon: "error",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            });
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

    return (
        <>
            <FormActionTabs selectedTab={"general"} />
            <form onSubmit={formik.handleSubmit}>
                <section className="general-form mt-80 mb-80">
                    <div className="container ">
                        <div className="sub-heading">
                            <h2>General information</h2>
                        </div>
                        <div className="bg-lightgray-color">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="card card-par">
                                            <p>
                                                {" "}
                                                Fields marked with an <span>*</span> are required
                                            </p>
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
                                                                className={`text-capitalize form-control ${formik.errors.first_name &&
                                                                    formik.touched.first_name &&
                                                                    "invalidInput"
                                                                    }`}
                                                                placeholder="First Name"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.first_name}
                                                            />
                                                            {formik.errors.first_name &&
                                                                formik.touched.first_name ? (
                                                                <span className="input-error-msg">
                                                                    {formik.errors.first_name}
                                                                </span>
                                                            ) : null}
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
                                                                className={`text-capitalize form-control ${formik.errors.last_name &&
                                                                    formik.touched.last_name &&
                                                                    "invalidInput"
                                                                    }`}
                                                                placeholder="Last Name"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.last_name}
                                                            />
                                                            {formik.errors.last_name &&
                                                                formik.touched.last_name ? (
                                                                <span className="input-error-msg">
                                                                    {formik.errors.last_name}
                                                                </span>
                                                            ) : null}
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
                                                        className={`form-control ${formik.errors.email &&
                                                            formik.touched.email &&
                                                            "invalidInput"
                                                            }`}
                                                        placeholder="Email"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                    />
                                                    {formik.errors.email && formik.touched.email ? (
                                                        <span className="input-error-msg">
                                                            {formik.errors.email}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div className="form-div">
                                                    <label htmlFor="emailConfirmation">
                                                        <strong>3.&nbsp;</strong>Email Confirmation<span>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="emailConfirmation"
                                                        id="emailConfirmation"
                                                        className={`form-control ${formik.errors.emailConfirmation &&
                                                            formik.touched.emailConfirmation &&
                                                            "invalidInput"
                                                            }`}
                                                        placeholder="Email Confirmation"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.emailConfirmation}
                                                    />
                                                    {formik.errors.emailConfirmation &&
                                                        formik.touched.emailConfirmation ? (
                                                        <span className="input-error-msg">
                                                            {formik.errors.emailConfirmation}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div className="form-div">
                                                    <label htmlFor="year_of_birth">
                                                        <strong>4.&nbsp;</strong>Year you are submitting data for<span>*</span>
                                                    </label>
                                                    <select
                                                        name="year_of_birth"
                                                        id="year_of_birth"
                                                        className={`form-control ${formik.errors.year_of_birth &&
                                                            formik.touched.year_of_birth
                                                            ? "invalidInput"
                                                            : ""
                                                            }`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.year_of_birth}
                                                    >
                                                        <option value="">Select option</option>
                                                        {years.map((year, index) => (
                                                            <option key={index} value={year}>
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {formik.errors.year_of_birth &&
                                                        formik.touched.year_of_birth ? (
                                                        <span className="input-error-msg">
                                                            {formik.errors.year_of_birth}
                                                        </span>
                                                    ) : null}
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
                                                                className={`form-control ${formik.errors.country_of_residence &&
                                                                    formik.touched.country_of_residence
                                                                    ? "invalidInput"
                                                                    : ""
                                                                    }`}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.country_of_residence}
                                                            >
                                                                <option value="">Select option</option>
                                                                <CountryOptions countries={details?.countries} />
                                                            </select>
                                                            {formik.errors.country_of_residence &&
                                                                formik.touched.country_of_residence ? (
                                                                <span className="input-error-msg">
                                                                    {formik.errors.country_of_residence}
                                                                </span>
                                                            ) : null}
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
                                                                className={`form-control ${formik.errors.num_of_homes &&
                                                                    formik.touched.num_of_homes
                                                                    ? "invalidInput"
                                                                    : ""
                                                                    }`}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.num_of_homes}
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
                                                            {formik.errors.num_of_homes &&
                                                                formik.touched.num_of_homes ? (
                                                                <span className="input-error-msg">
                                                                    {formik.errors.num_of_homes}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    {Array(Number(formik?.values?.num_of_homes))
                                                        .fill()
                                                        .map((opt, index) => (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="form-div">
                                                                    <label htmlFor={`${counts[index]?.toLowerCase()}_home_country`}                                                                    >
                                                                        <strong>6{alphabets[index]?.toLowerCase()}.&nbsp;</strong>{counts[index]} home country <span>*</span>
                                                                    </label>
                                                                    <select
                                                                        type="text"
                                                                        name={`${counts[
                                                                            index
                                                                        ]?.toLowerCase()}_home_country`}
                                                                        id={`${counts[
                                                                            index
                                                                        ]?.toLowerCase()}_home_country`}
                                                                        className={`form-control ${formik.errors[
                                                                            `${counts[
                                                                                index
                                                                            ]?.toLowerCase()}_home_country`
                                                                        ] &&
                                                                            formik.touched[
                                                                            `${counts[
                                                                                index
                                                                            ]?.toLowerCase()}_home_country`
                                                                            ]
                                                                            ? "invalidInput"
                                                                            : ""
                                                                            } `}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={
                                                                            formik.values[
                                                                            `${counts[
                                                                                index
                                                                            ]?.toLowerCase()}_home_country`
                                                                            ]
                                                                        }
                                                                    >
                                                                        <option value="">Select option</option>
                                                                        <CountryOptions countries={details?.countries} />
                                                                    </select>
                                                                    {formik.errors[
                                                                        `${counts[
                                                                            index
                                                                        ]?.toLowerCase()}_home_country`
                                                                    ] &&
                                                                        formik.touched[
                                                                        `${counts[
                                                                            index
                                                                        ]?.toLowerCase()}_home_country`
                                                                        ] && (
                                                                            <span className="input-error-msg">
                                                                                {
                                                                                    formik.errors[
                                                                                    `${counts[
                                                                                        index
                                                                                    ]?.toLowerCase()}_home_country`
                                                                                    ]
                                                                                }
                                                                            </span>
                                                                        )}
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
                                                                    onChange={formik.handleChange}
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
                                                                    onChange={formik.handleChange}
                                                                />
                                                                <label htmlFor="living_with_partner_no"
                                                                    className={`${formik.values.living_with_partner === 'No' ? "active" : ""}`}
                                                                >No</label>
                                                            </div>
                                                            {formik.errors.living_with_partner && formik.touched.living_with_partner && (
                                                                <span className="input-error-msg">{formik.errors.living_with_partner}</span>
                                                            )}
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
                                                        className={`form-control ${formik.errors.num_of_children_under_18 &&
                                                            formik.touched.num_of_children_under_18
                                                            ? "invalidInput"
                                                            : ""
                                                            } `}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.num_of_children_under_18}
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
                                                    {formik.errors.num_of_children_under_18 &&
                                                        formik.touched.num_of_children_under_18 ? (
                                                        <span className="input-error-msg">
                                                            {formik.errors.num_of_children_under_18}
                                                        </span>
                                                    ) : null}
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
                                                        className={`form-control ${formik.errors.other_dependants &&
                                                            formik.touched.other_dependants
                                                            ? "invalidInput"
                                                            : ""
                                                            } `}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.other_dependants}
                                                    >
                                                        <option value="">Select option</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                    {formik.errors.other_dependants &&
                                                        formik.touched.other_dependants ? (
                                                        <span className="input-error-msg">
                                                            {formik.errors.other_dependants}
                                                        </span>
                                                    ) : null}
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
                                                            className={`form-control ${formik.errors.other_dependants_details &&
                                                                formik.touched.other_dependants_details
                                                                ? "invalidInput"
                                                                : ""
                                                                } `}
                                                            placeholder=""
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.other_dependants_details}
                                                        />
                                                        {formik.errors.other_dependants_details &&
                                                            formik.touched.other_dependants_details ? (
                                                            <span className="input-error-msg">
                                                                {formik.errors.other_dependants_details}
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
                    </div>
                </section>

                <section className="Additional mb-80">
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
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                maxLength={1000}
                                                value={formik.values.forest_or_farmland_details}
                                            ></textarea>
                                            {/* {formik.errors.forest_or_farmland_details &&
                                                formik.touched.forest_or_farmland_details ? (
                                                <span className="input-error-msg">
                                                    {formik.errors.forest_or_farmland_details}
                                                </span>
                                            ) : null} */}
                                            <div className="Additional-bottom-btn">
                                                <button className="btn" type='submit' disabled={disabled} >Continue {disabled ? <div className="spinner-border text-primary" role="status">
                                                </div> : ''}</button>
                                                <Link to="/my-account" ><button className="btn" type='button'>Save & Complete Later</button></Link>
                                                {/* <button className="btn" type='submit' disabled={disabled} >Save progress {disabled ? <div className="spinner-border text-primary" role="status">
                                                </div> : ''}</button>
                                                <button className="btn" type="button" onClick={continueHandler}>
                                                Continue
                                            </button> */}
                                            </div>
                                            {formik.submitCount > 0 && !formik.isValid ? (
                                                <span className="input-error-msg d-flex text-left">Please fix the form errors before continuing.</span>
                                            ) : null}
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

export default General;
