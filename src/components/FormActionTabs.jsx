import React, { useEffect, useState } from "react";
import generalImg from "../assets/images/user.svg";
import houseImg from "../assets/images/t_house.svg";
import foodImg from "../assets/images/food.svg";
import carImg from "../assets/images/t_car.svg";
import financialImg from "../assets/images/financial .svg";
import Path_img from "../assets/images/Path_img.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { homeformIds } from "../redux-store/actions/user";
import { setCurrentHomeId } from "../redux-store/reducers/user";



const FormActionTabs = ({ selectedTab, homeActiveTab, setHomeActiveTab }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const submittedFormCount = useSelector((state) => state.users?.submittedFormCount);
  const isLoadingHome = useSelector((state) => state.users?.isLoadingHome);

  const homeIds = useSelector((state) => state.users?.homeFormIdList) || [];
  const [homeCount, setHomeCount] = useState(1);

  const [activeTab, setActiveTab] = useState(selectedTab);

  const general_information_id = Number(user?.generalInfoId);

  const showHomeTabs = selectedTab === "home";
  useEffect(() => {
    dispatch(homeformIds(general_information_id))

  }, [general_information_id])

  const addHomeHandler = () => {
    if (homeCount < 5) {
      setHomeCount(prevCount => prevCount + 1);
    }
  };

  const handleHomeTabs = (activeIndex) => {
    setHomeActiveTab(activeIndex);
    if (homeIds?.length > 0) {
      dispatch(setCurrentHomeId(homeIds[activeIndex]))
    }
  }
  useEffect(() => {
    if (homeIds?.length > 0) {
      setHomeCount(homeIds?.length)
    }
  }, [homeIds]);

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
                        }
                         ${submittedFormCount >= 1 ? "success" : ""}
                        `}
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
                        } 
                        ${submittedFormCount >= 2 ? "success" : ""}
                        `}
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
                        }
                        ${submittedFormCount >= 3 ? "success" : ""} 
                        `}
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
                        }
                        ${submittedFormCount >= 4 ? "success" : ""} 
                        `}
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
                        } 
                        ${submittedFormCount == 5 ? "success" : ""} `}
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
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormActionTabs;
