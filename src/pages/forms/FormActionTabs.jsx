import React, { useEffect, useState } from "react";
import generalImg from "../../assets/images/user.svg";
import houseImg from "../../assets/images/t_house.svg";
import foodImg from "../../assets/images/food.svg";
import carImg from "../../assets/images/t_car.svg";
import financialImg from "../../assets/images/financial .svg";
import { Link, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { homeformIds } from "../../redux-store/actions/user";


const FormActionTabs = ({ activeTab, handleActiveTab, setSelectedHome, homeLength }) => {
  const dispatch = useDispatch()
  // const [activeTab, setActiveTab] = useState(activeTab);
  const [homeActiveTab, setHomeActiveTab] = useState(1);
  const [homeCount, setHomeCount] = useState(homeLength || 1);

  const user = useSelector((state) => state.auth);
  const homeIds = useSelector((state) => state.users?.homeFormIdList) || [];
  const submittedFormCount = useSelector((state) => state.users?.submittedFormCount);
  const general_information_id = Number(user?.generalInfoId);
  const formCompleted = Number(user?.formCompleted);

  useEffect(() => {
    dispatch(homeformIds(general_information_id))
  }, [general_information_id, activeTab])

  const handleActiveTabFunc = (active) => {
    handleActiveTab(active)
  }

  useEffect(() => {
    if (homeIds?.length > 0) {
      setHomeCount(homeIds?.length)
    }
  }, [homeIds]);

  const handleHomeTabs = (activeIndex) => {
    setHomeActiveTab(activeIndex);
    setSelectedHome(activeIndex)
  }
  const addHomeHandler = () => {
    if (homeCount < 5) {
      setHomeCount(prevCount => prevCount + 1);
    }
  };

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
                  <div
                    className={`information-cricle-box ${activeTab === "general" ? "active" : ""} ${submittedFormCount >= 1 ? "success" : ""} `} onClick={() => handleActiveTabFunc("general")}
                  >
                    <img src={generalImg} alt="" />
                  </div>
                  <p>General Information</p>
                </div>
              </div>
              <div className="col-div">
                {formCompleted >= 1 ? (
                  <div className="information-icon-box">
                    <div
                      className={`information-cricle-box ${activeTab === "home" ? "active" : ""
                        } 
                        ${submittedFormCount >= 2 ? "success" : ""}
                        `}
                      onClick={() => handleActiveTabFunc("home")}
                    >
                      <img src={houseImg} alt="" />
                    </div>
                    <p>Your Home</p>
                  </div>
                ) : (
                  <div className="information-icon-box">
                    <div className={`information-cricle-box`}                    >
                      <img src={houseImg} alt="" />
                    </div>
                    <p>Your Home</p>
                  </div>
                )}
              </div>
              <div className="col-div">
                {formCompleted >= 2 ? (
                  <div className="information-icon-box">
                    <div
                      className={`information-cricle-box ${activeTab === "travel" ? "active" : ""
                        }
                        ${submittedFormCount >= 3 ? "success" : ""}
                        `}
                      onClick={() => handleActiveTabFunc("travel")}
                    >
                      <img src={carImg} alt="" />
                    </div>
                    <p>Travel</p>
                  </div>
                ) : (
                  <div className="information-icon-box">
                    <div className={`information-cricle-box`}                    >
                      <img src={carImg} alt="" />
                    </div>
                    <p>Travel</p>
                  </div>
                )}
              </div>
              <div className="col-div">
                {formCompleted >= 3 ? (
                  <div className="information-icon-box">
                    <div
                      className={`information-cricle-box ${activeTab === "food" ? "active" : ""
                        }
                        ${submittedFormCount >= 4 ? "success" : ""}
                        `}
                      onClick={() => handleActiveTabFunc("food")}
                    >
                      <img src={foodImg} alt="" />
                    </div>
                    <p>Food and Shopping</p>
                  </div>
                ) : (
                  <div className="information-icon-box">
                    <div className={`information-cricle-box`}                    >
                      <img src={foodImg} alt="" />
                    </div>
                    <p>Food and Shopping</p>
                  </div>
                )}
              </div>
              <div className="col-div">
                {formCompleted >= 4 ? (
                  <div className="information-icon-box">
                    <div
                      className={`information-cricle-box ${activeTab === "financial" ? "active" : ""
                        }
                        ${submittedFormCount >= 5 ? "success" : ""}  `}

                      onClick={() => handleActiveTabFunc("financial")}
                    >
                      <img src={financialImg} alt="" />
                    </div>
                    <p>Financial assets</p>
                  </div>
                ) : (
                  <div className="information-icon-box">
                    <div className={`information-cricle-box`}                    >
                      <img src={financialImg} alt="" />
                    </div>
                    <p>Financial assets</p>
                  </div>
                )}
              </div>
            </div>
            {activeTab === "home" && (
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
