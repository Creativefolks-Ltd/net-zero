import React, { useEffect, useState, } from "react";
import form_user from "../assets/images/form_user.svg";
import delete2_img from "../assets/images/delete2_img.svg";
import share_img from "../assets/images/share_img.svg";
import tick_img from "../assets/images/tick_img.svg";
import arrow_img from "../assets/images/arrow_img.svg";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { foodFormSubmit, getCountry, formlist, updateUserDetails, getUserDetails, formDelete } from "../redux-store/actions/user";
import SuccessImg from "../assets/images/Group 9106.png";
import Swal from "sweetalert2";
import { ordinalNumbers } from "../helpers/ordinalNumber";


const MyAccount = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    const formList = useSelector((state) => state.users.formList);
    const isLoading = useSelector((state) => state.users.isLoading);
    const [disabled, setDisabled] = useState(false);

    const userId = user?.userInfo?.user_id

    const endYear = new Date().getFullYear();
    const startYear = endYear - 20;

    const years = [];

    for (let year = endYear; year >= startYear; year--) {
        years.push(year);
    }

    useEffect(() => {
        dispatch(getCountry());
        dispatch(formlist(userId));
        dispatch(getUserDetails(userId));
    }, []);

    const formik = useFormik({

        initialValues: {
            first_name: user?.userInfo?.first_name,
            last_name: user?.userInfo?.last_name,
            email: user?.userInfo?.email,
            password: user?.userInfo?.password,
        },

        // validationSchema: foodFormValidation,

        onSubmit: (values) => { },
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        const { values, isValid, errors } = formik;
        formik.handleSubmit();

        if (isValid) {
            setDisabled(true);
            const user_id = Number(user?.userInfo?.user_id);

            const response = await dispatch(updateUserDetails({ data: values, user_id }));
            setDisabled(false)
            if (!response?.payload?.error && response?.payload?.data) {
                Swal.fire({
                    title: "Success!",
                    text: "Profile Information saved successfully",
                    imageUrl: SuccessImg,
                    imageWidth: 100,
                    imageHeight: 100,
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                }).then((result) => {
                    if (result.isConfirmed) {
                    }
                });
            } else {
                const errorMsg = response?.payload?.response?.data?.errorMsg;
                if (errorMsg) {
                    const errorMessages = Object.values(errorMsg).flatMap(messages => messages);
                    if (errorMessages.length > 0) {
                        const errorMessage = errorMessages.join("\n");
                        Swal.fire({
                            title: "Failed!",
                            html: errorMessage || "Failed to saved profile Information, please try again",
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
                Swal.fire({
                    title: "Deleted!",
                    text: "Form deleted successfully",
                    icon: "success"
                });
                await dispatch(formDelete(form_id))
                dispatch(formlist(userId));
            }
        });
    }


    return (
        <>
            <section className="Personal-information">
                <div className="container">
                    <h1>My account</h1>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="information-box">
                                <div class="personal-heading">
                                    <img src={form_user} alt="" />
                                    <h2>Personal information</h2>
                                </div>
                                <form>
                                    <div class="form-div">
                                        <label htmlFor="first_name">Your name</label>
                                        <input type="text" id="first_name" name="first_name" placeholder="First name" value={formik.values.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    </div>
                                    <div class="form-div">
                                        <label htmlFor="last_name">Last name</label>
                                        <input type="text" id="last_name" name="last_name" placeholder="Last name" value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    </div>
                                    <div class="form-div">
                                        <label htmlFor="email">Your email address</label>
                                        <input type="email" id="email" name="email" placeholder="Email address" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    </div>
                                    <div class="form-div">
                                        <label htmlFor="password">Your password</label>
                                        <input type="password" id="password" name="password" placeholder="************" value={formik?.values?.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    </div>
                                    <button className="submit-btn" type='submit' disabled={disabled} onClick={(e) => submitHandler(e)} >Save {disabled ? <div className="spinner-border text-primary" role="status">
                                    </div> : ''}</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">

                            <h2>Saved forms</h2>

                            <div class="accordion" id="regularAccordionRobots">

                                {/* <div class="accordion-item">
                                    <h2 id="regularHeadingFirst" class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#regularCollapseFirst" aria-expanded="true" aria-controls="regularCollapseFirst">
                                            1.Latest form
                                        </button>
                                    </h2>
                                    <div id="regularCollapseFirst" class="accordion-collapse collapse show" aria-labelledby="regularHeadingFirst" data-bs-parent="#regularAccordionRobots">
                                        <div class="accordion-body">
                                            <div className="accordion-content">
                                                <div className="title-accodion">
                                                    <span>Form submitted</span>
                                                    <a href="#">View form</a>
                                                </div>
                                                <div className="accordion-img">
                                                    <img src={share_img} alt="" />
                                                    <img src={delete2_img} alt="" />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div> */}
                                {isLoading ? (<div className="text-center">loading...</div>) :
                                    formList?.length > 0 ? formList?.map((form, index) => (
                                        <div className={"accordion-item " + form?.form_status?.toLowerCase() + "-form"} key={index}>
                                            <h2 class="accordion-header" id={`regularHeading${index + 1}`}>
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#regularCollapse${index + 1}`} aria-expanded="false" aria-controls={`regularCollapse${index + 1}`} >
                                                    {index + 1}.{ordinalNumbers[index]} form
                                                </button>
                                            </h2>
                                            <div id={`regularCollapse${index + 1}`} class="accordion-collapse collapse" aria-labelledby={`regularHeading${index + 1}`} data-bs-parent="#regularAccordionRobots">
                                                <div class="accordion-body">
                                                    <div className="accordion-content">
                                                        <div className="title-accodion">
                                                            <span>Form {form?.form_status === "Complete" ? "submitted" : form?.form_status?.toLowerCase()}</span>
                                                            <a href="#">View form</a>
                                                        </div>
                                                        <div className="accordion-img">
                                                            <img src={share_img} alt="" />
                                                            <img src={delete2_img} alt="" onClick={() => formDeleteHandler(form.id)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (<div className="text-center">Data not found</div>)}


                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default MyAccount