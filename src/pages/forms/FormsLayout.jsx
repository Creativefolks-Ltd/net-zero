import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchParticularForm, homeFormDelete, homeformIds } from "../../redux-store/actions/user";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { setCurrentHomeId } from "../../redux-store/reducers/user";
import General from "./General";
import HomeForm from "./Homeform";
import Travel from "./Travel";
import FoodAndShopping from "./FoodAndShopping";
import Financial from "./Financial";
import HomeFormEdit from "./HomeFormEdit";
import generalImg from "../../assets/images/user.svg";
import houseImg from "../../assets/images/t_house.svg";
import foodImg from "../../assets/images/food.svg";
import carImg from "../../assets/images/t_car.svg";
import financialImg from "../../assets/images/financial .svg";
import FinancialView from "../forms-view/FinancialView";
import { decrementHomeCount, setHomeCount } from "../../redux-store/reducers/forms";

const formTabs = [
    { tab: "general", text: "General Information", img: generalImg },
    { tab: "home", text: "Your Home", img: houseImg },
    { tab: "travel", text: "Travel", img: carImg },
    { tab: "food", text: "Food and Shopping", img: foodImg },
    { tab: "financial", text: "Financial assets", img: financialImg }
];

const FormsLayout = () => {
    const dispatch = useDispatch();
    // const [homeCount, setHomeCount] = useState(1);
    const [activeTab, setActiveTab] = useState("general");
    const [isLoading, setIsLoading] = useState(false);
    const [newHome, setNewHome] = useState(false);
    const [selectedHome, setSelectedHome] = useState(1);
    const singleForm = useSelector((state) => state.users.singleForm);
    const homeCount = useSelector((state) => state.forms.homeCount);
    const general_information_id = useSelector((state) => state.auth.generalInfoId);
    const formCompleted = useSelector((state) => state.auth.formCompleted);
    const { home, travel, food, financial, ...general } = singleForm || {};

    useEffect(() => {
        const fetchFormsData = async () => {
            try {
                setIsLoading(true);
                await dispatch(fetchParticularForm(general_information_id));
            } catch (error) {
                console.error("Error fetching form data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (general_information_id) {
            fetchFormsData();
        }

    }, [dispatch, formCompleted, general_information_id]);

    useEffect(() => {
        switch (formCompleted) {
            case 1:
                setActiveTab("home");
                break;
            case 2:
                setActiveTab("travel");
                break;
            case 3:
                setActiveTab("food");
                break;
            case 4:
                setActiveTab("financial");
                break;
            default:
                setActiveTab("general");
        }
    }, [formCompleted]);

    useEffect(() => {
        if (home?.length > 0) {
            let currentIndex = home?.length <= 5 ? 0 : 1;
            if (newHome && homeCount < 5) {
                currentIndex = 1;
                setNewHome(false)
            }
            dispatch(setHomeCount(home?.length + currentIndex));
        }
    }, [home]);

    useEffect(() => {
        if (!selectedHome) {
            setSelectedHome(1);
        }
    }, [activeTab, selectedHome]);    

    const handleActiveTabFunc = (active) => {
        setActiveTab(active);
    };

    const handleHomeTabs = (activeIndex) => {
        setSelectedHome(activeIndex);

        if (home?.length > 0) {
            dispatch(setCurrentHomeId(home[activeIndex - 1]));
        }
    };

    const addHomeHandler = async () => {
        if (homeCount < 5 && homeCount === home?.length) {
            await dispatch(setHomeCount(homeCount + 1));
            setSelectedHome(homeCount + 1)
        }
    };

    const renderHomes = () => {
        return Array.from({ length: homeCount }, (_, i) => {
            const index = i + 1;
            return (
                <li key={index} className={index === selectedHome ? 'active' : ''} onClick={() => handleHomeTabs(index)}>
                    <a>Home {index}</a>
                </li>
            );
        });
    };

    const handleActiveTab = (active) => {
        setActiveTab(active);
    };

    let homeDetails = (home && home?.length > 0 && home[selectedHome - 1]) || {};

    const LocalHomeDelete = async (IsLocalHome) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#81c14b",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                if (!IsLocalHome) {
                    const currentHomeId = homeDetails?.id;
                    if (currentHomeId) {
                        await dispatch(homeFormDelete(currentHomeId));
                    }
                }
                Swal.fire({
                    title: "Deleted!",
                    text: `Home deleted successfully`,
                    icon: "success",
                    confirmButtonColor: "#81c14b",
                });
                setSelectedHome(1);
                dispatch(decrementHomeCount())
                // setHomeCount(homeCount - 1);
                if (!IsLocalHome && homeCount > home?.length) {
                    setNewHome(true);
                }
                if (!IsLocalHome) {
                    await dispatch(fetchParticularForm(general_information_id));
                }
            }
        } catch (error) {
            console.error("Error deleting home:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the home",
                icon: "error",
                confirmButtonColor: "#81c14b",
            });
        }
    };

    return (
        <div className={`main-header bg-${activeTab === "home" ? "home-form" : activeTab === "food" ? "food-shopping" : activeTab}`}>
            <Header bgTransparent={true} />
            <section className="information mt-80 mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="information-header">
                                {formTabs.map(({ tab, text, img }, index) => (
                                    <div key={index} className="col-div">
                                        <div className="information-icon-box">
                                            <div
                                                className={`information-cricle-box ${activeTab === tab ? "active" : ""} ${formCompleted >= index + 1 ? "success" : ""}`}
                                                onClick={() => handleActiveTabFunc(tab)}
                                            >
                                                <img src={img} alt="" />
                                            </div>
                                            <p>{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {activeTab === "home" && !isLoading && (
                                <div className="information-header-nav">
                                    <ul>
                                        {renderHomes()}
                                        {homeCount < 5 && (
                                            <li>
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
            {/* <FormActionTabs activeTab={activeTab} handleActiveTab={handleActiveTab} setSelectedHome={setSelectedHome} homeLength={home?.length} deleteHome={deleteHome} setDeleteHome={setDeleteHome} /> */}
            {isLoading ? (
                <div className="container">
                    <div className="bg-lightgray-color rounded-5">
                        <p className="placeholder-glow form-skeleton mt-5">
                            <span className="placeholder col-12 vh-50 rounded-5"></span>
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {activeTab === "general" && (
                        formCompleted >= 1 ? <General isEdit={true} general={general} /> : <General isEdit={false} />
                    )}
                    {activeTab === "home" && (
                        formCompleted >= 2 && home?.length >= selectedHome ? <HomeFormEdit home={homeDetails} selectedHome={selectedHome} setSelectedHome={setSelectedHome} handleActiveTab={handleActiveTab} LocalHomeDelete={LocalHomeDelete} addHomeHandler={addHomeHandler} /> : <HomeForm selectedHome={selectedHome} LocalHomeDelete={LocalHomeDelete} setSelectedHome={setSelectedHome} handleActiveTab={handleActiveTab} addHomeHandler={addHomeHandler} />
                    )}
                    {activeTab === "travel" && (
                        formCompleted >= 3 ? <Travel isEdit={true} travel={travel} /> : <Travel isEdit={false} />
                    )}
                    {activeTab === "food" && (
                        formCompleted >= 4 ? <FoodAndShopping isEdit={true} food={food} /> : <FoodAndShopping isEdit={false} />
                    )}
                    {activeTab === "financial" && (
                        formCompleted >= 5 ? <FinancialView financial={financial} /> : <Financial />
                    )}
                </>
            )}
            <Footer />
        </div>
    );
};

export default FormsLayout;
