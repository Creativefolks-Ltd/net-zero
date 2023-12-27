import React from "react";
import finance_img from "../assets/images/finance_img.png";
import FormActionTabs from "../components/FormActionTabs";

const Financial = () => {
  return (
    <>
      <FormActionTabs selectedTab={"financial"} />
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
            <div class="form">
            <form>
            <button class="submit-btn " type="submit">submit </button>
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
