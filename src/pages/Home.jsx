import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux-store/actions/auth";
import backgroundImage from "../assets/images/home_img1.png"
import planeImage from "../assets/images/t_plan.svg"
import houseImage from "../assets/images/t_house.svg"
import bulbImage from "../assets/images/blub.png"
import carImage from "../assets/images/t_car.svg"
import travelImage from "../assets/images/travel.png"
import travel2Image from "../assets/images/travel2.png"
import securityImage from "../assets/images/security.png"
import { Link } from "react-router-dom";

const Home = () => {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
    };

    return (
        <>
            <section className="home-banner bgCover" >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div class="home-banner-content">
                            <h1>The Anthos Net Zero Project</h1>
                            <div className="P_Lead">
                                <p>Created to provied an ongoing service to help all family members</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className='home-banner bgCover' style={containerStyle}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1>The Anthos<br></br> Net Zero Project</h1>
                            <p>Created to provied an ongoing <br /> service to help all family members</p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* <!--------------------- personal-carbon -----------------------> */}

            <section className="personal-carbon bg-lightgray-color pt-80 pb-80">
                <div className="container">
                    <div className="carbon-top">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-2">
                                <div className="title-block">
                                    <div className='sub-title'>The Future of Sustainability</div>
                                    <h2>
                                        Your personal carbon footprint calculator
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carbon-contant">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="img-col">
                                    <img src={bulbImage} />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                                <div className="carbon-box">
                                    <div className="text-col">
                                        <div className="text-scroll">
                                            <div className="p-box">
                                                <p>Understand the shape and size of your carbon footprint.</p>
                                                <p>Connect with an advisory service to discuss and explore opportunities for carbon reduction.</p>
                                                <p>Understand the shape and size of your carbon footprint</p>
                                                <p>Select from a choice of carbon offsets to compensate for emissions and become carbon neutral.</p>
                                                <p>Repeat the process on an annual basis and track progress through time.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/general" className="btn">Calculate your footprint</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="Form-essentials pt-80 pb-80 ">
                <div className="container">
                    <div className="row Form-essentials-main-row">
                        <div className="col-lg-9 col-md-8">
                            <div className="form-content">
                                <div className="title-block">
                                    <div class='sub-title'>How to complete the form</div>
                                    <h2> Form essentials</h2>
                                </div>
                                <p>The first step is to provide information through the tailored form, relating to your home, travel, shopping and assets. Information is encrypted and held on a <span>secure server*</span> and the form should take no more than 15 minutes to complete. On each page there are some sections that are required and others that are optional. The optional sections are for activities that we expect aren’t the biggest sources of emissions or which taken more time to complete. However, adding this information will give you a more accurate carbon footprint and more tailored recommendations.</p>
                                <span>To make the process quicker and easier, gather the following details before starting:</span>
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-12 text-align-center">
                                        <div className="icon-box">
                                            <div className="cricle-box">
                                                <img src={houseImage} alt="" />
                                            </div>
                                            <p>Your residential energy consumption (electricity, natural gas, heating oil, any others)</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-6">
                                        <div className="icon-box">
                                            <div className="cricle-box">
                                                <img src={planeImage} alt="" />
                                            </div>
                                            <p>Your air travel use (number of flights/distance travelled)</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-6">
                                        <div className="icon-box">
                                            <div className="cricle-box">
                                                <img src={carImage} alt="" />
                                            </div>
                                            <p>Your road travel use (vehicle information/distance travelled)</p>
                                        </div>
                                    </div>
                                </div>
                                <p>You can save your responses if you are not able to complete the form, and return to it later. Once you have submitted the information, the net zero team will respond with initial results and suggested actions, and an invitation to arrange a consultation to discuss.</p>
                                <p>The tool has been built by Good Business and is based on the principles of the Greenhouse Gas Protocol. It has been developed specifically for Anthos and gives family members a tailored and personal service, making it stand out from the many carbon calculators available online.</p>
                                <Link to="/general" className="btn">Calculate your footprint</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 Form-col-div">
                            <div className="Form-col-img">
                                <img src={travelImage} alt="" />
                            </div>
                            <div className="Form-col-travel">
                                <img src={travel2Image} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!------------Protecting----------> */}

            <section className="Protecting  bg-lightgray-color pt-80 pb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="title-block">
                                <h2>Protecting your data</h2>
                                <p>All of your responses in this survey will be encrypted with TLS and only accessed by the Net-Zero team for the purposes of calculating your footprint and providing recommendations to reduce it. You can find more information in Good Business’ privacy policy here. The tool met the high data security requirements for penetration testing in March 2022.</p>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-5 col-md-5">
                            <div className="Protecting-div">
                                <img src={securityImage} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 offset-lg-1 offset-md-1 Protecting-content">
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing
                                elitr, sed diam nonumy eirmod tempor invidunt ut
                                labore et dolore magna aliquyam erat, sed diam
                                voluptua. At vero eos et accusam et justo.
                            </p>
                            <p>Sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam erat, sed
                                diam voluptua. At vero eos et accusam et justo duo
                                dolores et ea rebum. Stet clita kasd gubergren, no
                                sea takimata sanctus est Lorem ipsum dolor et
                                accusam et dolores justo.</p>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )

}

export default Home;