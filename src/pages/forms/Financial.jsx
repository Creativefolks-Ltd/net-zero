import React, { useState } from "react";
import { finanicialFormSubmit } from "../../redux-store/actions/user";
import SuccessImg from "../../assets/images/Group 9106.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generalInfo, setFormCompleted } from "../../redux-store/reducers/auth";
import { CompletePreviousForms } from "../../helpers/CompletePreviousForms";
import { setHomeCount } from "../../redux-store/reducers/forms";
import { userFormReset } from "../../redux-store/reducers/user";

const Financial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);
    let values = { general_information_id: user?.generalInfoId, form_status: "Submit" }

    const response = await dispatch(finanicialFormSubmit(values));
    setDisabled(false)

    if (!response?.payload?.error && response?.payload?.data) {
      Swal.fire({
        title: "Your form has been submitted successfully",
        text: "The Carbon Tracker team will begin the calculation of your carbon footprint and will get back to you shortly with the results or to request additional information..",
        imageUrl: SuccessImg,
        imageWidth: 100,
        imageHeight: 100,
        showCancelButton: true,
        confirmButtonColor: "#81C14B",
        cancelButtonColor: "#fff",
        buttonsStyling: true,
        confirmButtonText: "View saved forms",
        cancelButtonText: "Start new form",
        customClass: {
          popup: "submit-container-popup",
          title: "custom-title",
          cancelButton: 'custom-cancel-button',
          confirmButton: 'custom-confirm-button',
          actions: "action-button-box"
        }

      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate("/my-account");
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          navigate("/forms");
          await dispatch(generalInfo(null))
          await dispatch(setFormCompleted(0))
          await dispatch(userFormReset());
          await dispatch(setHomeCount(1))
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      });
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
          confirmButtonColor: "#81c14b",
        });
      }
    }
  };

  return (
    <>
      <section className="investments">
        <div className="container">
          <div className="sub-heading">
            <h2>Financial assets</h2>
          </div>
          <div className=" bg-color">
            <div className="card">
              <h3>Anthos investments</h3>
              <p>
                The carbon footprint of your Anthos investments (the family
                investment funds managed by Anthos Private Wealth Management) will
                be automatically included in your report. You therefore do not
                need to provide any details about your Anthos investments.
              </p>
              <p>
                Please contact your Client Advisor/Investment Specialist to
                discuss the carbon footprint of your Anthos investments. In case
                you have any investments managed outside Anthos Private Wealth
                Management and want to include these in the discussion, please
                have these details to hand.
              </p>
              <div className="form">
                <form>
                  {user?.formCompleted >= 4 ? (<button className="submit-btn" type='submit' disabled={disabled} onClick={(e) => submitHandler(e)}>Submit {disabled ? <div className="spinner-border text-primary" role="status">
                  </div> : ''}</button>) : (
                    <button className="btn" type='button' onClick={() => { CompletePreviousForms() }}>Submit </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Financial;
