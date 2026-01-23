import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const FinancialView = () => {

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
                Please contact your Client Advisor/Investment Specialist to discuss the carbon footprint of your Anthos investments. In case you have any investments managed outside Anthos Private Wealth Management and want to include these in your discussions with your client advisor or investment specialist, please have these details to hand
              </p>
              <div className="form">
                <form>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FinancialView;
