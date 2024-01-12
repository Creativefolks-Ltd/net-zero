import React, { useState } from "react";
import generalImg from "../assets/images/user.svg";
import houseImg from "../assets/images/t_house.svg";
import foodImg from "../assets/images/food.svg";
import carImg from "../assets/images/t_car.svg";
import financialImg from "../assets/images/financial .svg";
import Path_img from "../assets/images/Path_img.png";
import { Link, useLocation } from "react-router-dom";



const FormActionTabs = ({ selectedTab, homeActiveTab, setHomeActiveTab }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(selectedTab);
  const [homeCount, setHomeCount] = useState(1);
  const showHomeTabs = selectedTab === "home";
  


  const addHomeHandler = () => {
    if (homeCount < 5) {
      setHomeCount(prevCount => prevCount + 1);
    }
  };

  const handleHomeTabs = (activeTab) => { setHomeActiveTab(activeTab) }

  const renderHomes = () => {
    const homes = [];
    for (let i = 1; i <= homeCount; i++) {
      homes.push(
        <li key={i} className={i === homeActiveTab ? 'active' : ''} onClick={() => handleHomeTabs(i)}>
          <a>Home {i}</a>
        </li>
      );
    }
    return homes;
  };


  


  return (
    <section className="information mt-80 mb-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="information-header">
              <div className="col-div">
                <div className="information-icon-box">
                  <Link to="/general">
                    <div
                      className={`information-cricle-box ${activeTab === "general" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("general")}
                    >
                      <img src={generalImg} alt="" />
                    </div>
                  </Link>
                  <p>General Information</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <Link to="/home-form">
                    <div
                      className={`information-cricle-box ${activeTab === "home" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("home")}
                    >
                      <img src={houseImg} alt="" />
                    </div>
                  </Link>
                  <p>Your Home</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <Link to="/travel">
                    <div
                      className={`information-cricle-box ${activeTab === "travel" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("travel")}
                    >
                      <img src={carImg} alt="" />
                    </div>
                  </Link>
                  <p>Travel</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <Link to="/food-shopping">
                    <div
                      className={`information-cricle-box ${activeTab === "food" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("food")}
                    >
                      <img src={foodImg} alt="" />
                    </div>
                  </Link>
                  <p>Food and Shopping</p>
                </div>
              </div>
              <div className="col-div">
                <div className="information-icon-box">
                  <Link to="/financial">
                    <div
                      className={`information-cricle-box ${activeTab === "financial" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("financial")}
                    >
                      <img src={financialImg} alt="" />
                    </div>
                  </Link>
                  <p>Financial assets</p>
                </div>
              </div>
            </div>
            {showHomeTabs && (

              <div class="information-header-nav">
                <ul>
                  {renderHomes()}
                  {homeCount < 5 && (
                    <li >
                      <a onClick={addHomeHandler}>
                        Add <br /> home +
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormActionTabs;
