import React, { useEffect, useState } from "react";
import GeneralView from "./forms/GeneralView";
import HomeFormView from "./forms/HomeFormView";
import TravelView from "./forms/TravelView";
import FoodAndShoppingView from "./forms/FoodAndShoppingView";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticularForm } from "../redux-store/actions/user";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FormActionTabs from "./forms/FormActionTabs";
import FinancialView from "./forms/FinancialView";
import General from "./General";
import HomeForm from "./Homeform";
import Travel from "./Travel";
import FoodAndShopping from "./FoodAndShopping";
import Financial from "./Financial";
import Swal from "sweetalert2";

const FormsLayout = () => {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("general");
    const [selectedHome, setSelectedHome] = useState(1);
    const [deleteHome, setDeleteHome] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const singleForm = useSelector((state) => state.users.singleForm)
    const general_information_id = useSelector((state) => state.auth.generalInfoId)
    const formCompleted = useSelector((state) => state.auth.formCompleted)

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

    const handleActiveTab = (active) => {
        setActiveTab(active)
    }

    let homeDetails = (home && home?.length > 0 && home[selectedHome - 1]) || {};
    
    const LocalHomeDelete = async (activeId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                await setDeleteHome(true)
                await setSelectedHome(1)
                Swal.fire({
                    title: "Deleted!",
                    text: `Home deleted successfully`,
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error deleting home:", error);
        }
    }

    return (
        <div className={`main-header bg-${activeTab === "home" ? "home-form" : activeTab === "food" ? "food-shopping" : activeTab}`}>
            <Header bgTransparent={true} />
            <FormActionTabs activeTab={activeTab} handleActiveTab={handleActiveTab} setSelectedHome={setSelectedHome} homeLength={home?.length} deleteHome={deleteHome} setDeleteHome={setDeleteHome} />
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
                        formCompleted >= 1 ? <GeneralView general={general} /> : <General />
                    )}
                    {activeTab === "home" && (
                        formCompleted >= 2 && home?.length >= selectedHome ? <HomeFormView home={homeDetails} selectedHome={selectedHome} setSelectedHome={setSelectedHome} /> : <HomeForm selectedHome={selectedHome} LocalHomeDelete={LocalHomeDelete} setSelectedHome={setSelectedHome} handleActiveTab={handleActiveTab} />
                    )}
                    {activeTab === "travel" && (
                        formCompleted >= 3 ? <TravelView travel={travel} /> : <Travel />
                    )}
                    {activeTab === "food" && (
                        formCompleted >= 4 ? <FoodAndShoppingView food={food} /> : <FoodAndShopping />
                    )}
                    {activeTab === "financial" && (
                        formCompleted >= 5 ? <FinancialView financial={financial} /> : <Financial />
                    )}
                </>
            )}
            <Footer />
        </div>
    )
}

export default FormsLayout
