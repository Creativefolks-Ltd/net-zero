import React, { useEffect, useState } from "react";
import GeneralView from "./forms/GeneralView";
import HomeFormView from "./forms/HomeFormView";
import TravelView from "./forms/TravelView";
import FoodAndShoppingView from "./forms/FoodAndShoppingView";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticularForm } from "../redux-store/actions/admin";
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
    const singleForm = useSelector((state) => state.admin.singleForm)
    const general_information_id = useSelector((state) => state.auth.generalInfoId)
    const formCompleted = useSelector((state) => state.auth.formCompleted)

    const { home, travel, food, financial, ...general } = singleForm || {};

    useEffect(() => {
        // if (general_information_id) {
        dispatch(fetchParticularForm(general_information_id));
        // }
    }, [general_information_id, activeTab])

    useEffect(() => {
        if (formCompleted === 1) {
            setActiveTab("home")
        } else if (formCompleted === 2) {
            setActiveTab("travel")
        } else if (formCompleted === 3) {
            setActiveTab("food")
        } else if (formCompleted === 4) {
            setActiveTab("financial")
        } else {
            setActiveTab("general")
        }
    }, [formCompleted])

    const handleActiveTab = (active) => {
        setActiveTab(active)
    }

    const homeDetails = (home && home?.length > 0 && home[selectedHome - 1]) || {};

    const LocalHomeDelete = async (activeId) => {
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
                text: "Home deleted successfully",
                icon: "success",
            });
        }
    }

    return (
        <div className={`main-header bg-${activeTab === "home" ? "home-form" : activeTab === "food" ? "food-shopping" : activeTab}`}>
            <Header bgTransparent={true} />
            <FormActionTabs activeTab={activeTab} handleActiveTab={handleActiveTab} setSelectedHome={setSelectedHome} homeLength={home?.length} deleteHome={deleteHome} setDeleteHome={setDeleteHome} />
            {activeTab === "general" && (
                formCompleted >= 1 ? <GeneralView general={general} /> : <General />
            )}
            {activeTab === "home" && (
                formCompleted >= 2 && home?.length >= selectedHome ? <HomeFormView home={homeDetails} selectedHome={selectedHome} /> : <HomeForm selectedHome={selectedHome} LocalHomeDelete={LocalHomeDelete} setSelectedHome={setSelectedHome}/>
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
            <Footer />
        </div>
    )
}

export default FormsLayout
