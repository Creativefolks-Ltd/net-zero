import React, { useEffect, useState } from "react";
import generalImg from "../../assets/images/user.svg";
import houseImg from "../../assets/images/t_house.svg";
import foodImg from "../../assets/images/food.svg";
import carImg from "../../assets/images/t_car.svg";
import financialImg from "../../assets/images/financial .svg";
import { Link, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { homeformIds } from "../../redux-store/actions/user";


const FormTabsView = ({ activeTab, handleActiveTab, setSelectedHome }) => {
  const dispatch = useDispatch()
  // const [activeTab, setActiveTab] = useState(activeTab);
  const [homeActiveTab, setHomeActiveTab] = useState(1);
  const [homeCount, setHomeCount] = useState(1);

  const user = useSelector((state) => state.auth);
  const homeIds = useSelector((state) => state.users?.homeFormIdList) || [];

  const general_information_id = Number(user?.generalInfoId);

  useEffect(() => {
    dispatch(homeformIds(general_information_id))

  }, [general_information_id])

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

  const renderHomes = () => {
    const homes = [];
    for (let i = 1; i <= homeCount; i++) {
      homes.push(
        <li key={i} className={i === 1 ? 'active' : ''} onClick={() => handleHomeTabs(i)}>
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
            {activeTab === "home" && (
              <div class="information-header-nav">
                <ul>
                  {renderHomes()}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FormTabsView;
