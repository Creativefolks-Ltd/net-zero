import React, { useEffect, useState } from "react";
import generalImg from "../../assets/images/user.svg";
import houseImg from "../../assets/images/t_house.svg";
import foodImg from "../../assets/images/food.svg";
import carImg from "../../assets/images/t_car.svg";
import financialImg from "../../assets/images/financial .svg";
import { Link, } from "react-router-dom";


const FormActionTabs = ({ activeTab, handleActiveTab }) => {

  const handleActiveTabFunc = (active) => {
    handleActiveTab(active)
  }
  return (
    <section className="information mt-80 mb-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="information-header">
              <div className="col-div">
                <div className="information-icon-box">

                  <div
                    className={`information-cricle-box ${activeTab === "general" ? "active" : ""
                      }
                         
                        `}
                    onClick={() => handleActiveTabFunc("general")}
                  >
                    <img src={generalImg} alt="" />
                  </div>
                  <p>General Information</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <div
                    className={`information-cricle-box ${activeTab === "home" ? "active" : ""
                      } 
                        `}
                    onClick={() => handleActiveTabFunc("home")}
                  >
                    <img src={houseImg} alt="" />
                  </div>
                  <p>Your Home</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <div
                    className={`information-cricle-box ${activeTab === "travel" ? "active" : ""
                      }
                        `}
                    onClick={() => handleActiveTabFunc("travel")}
                  >
                    <img src={carImg} alt="" />
                  </div>
                  <p>Travel</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <div
                    className={`information-cricle-box ${activeTab === "food" ? "active" : ""
                      }
                        `}
                    onClick={() => handleActiveTabFunc("food")}
                  >
                    <img src={foodImg} alt="" />
                  </div>
                  <p>Food and Shopping</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <div
                    className={`information-cricle-box ${activeTab === "financial" ? "active" : ""
                      }  `}
                    onClick={() => handleActiveTabFunc("financial")}
                  >
                    <img src={financialImg} alt="" />
                  </div>
                  <p>Financial assets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormActionTabs;
