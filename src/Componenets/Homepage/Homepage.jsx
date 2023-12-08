import React from 'react'
import anthos_logo from '../Assets/anthos2_logo.png';
import profile_img from '../Assets/profile_img.png'
import david from '../Assets/david.png'
import Layout from '../Layout/Layout';
// import './Homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import anthos_bulb from '../Assets/anthos_bulb.png'
import s_text from '../Assets/s_text.png'
import t_house from '../Assets/t_house.svg'
import t_plan from '../Assets/t_plan.svg'
import t_car from '../Assets/t_car.svg'
import security_fth from '../Assets/Security_fth.png'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import imageUrl from "../Assets/home_img1.png"
const Homepage = () => {
    const containerStyle = {
        backgroundImage: `url(${imageUrl})`,
       
    };

    return (
        <>
        <Navbar transparent={true}/>

        <section className='home-banner' style={containerStyle}>
            {/* <img src={imageUrl} alt="" /> */}
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h1>The Anthos<br></br> Net Zero Project</h1>
                        <p>Created to provied an ongoing <br/> service to help all family members</p>
                    </div>
                </div>
            </div>
        </section>

        <section className='personal-carbon'>
            <div className="container">
                <div className="carbon-top">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-2">
                            <div className="title-block">
                                <h2>
                                    <span className='sub-title'>The Future of Sustainability</span>
                                    Your personal carbon footprint calculator
                                </h2>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="carbon-contant">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="img-col">
                                <img src={anthos_bulb} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="text-col">
                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                <b>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</b>
                                <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets </p>
                                <p>containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>


        <section className='form-assential'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="title-block">
                            <h2>
                                <span className='sub-title'>How to complete the form</span>
                                Form essentials
                            </h2>
                        </div>
                        <div className="text-col">
                            <p>The first step is to provide information through the tailored form, relating to your home, travel, shopping and assets. Information is encrypted and held on a secure server* and the form should take no more than 15 minutes to complete. On each page there are some sections that are required and others that are optional. The optional sections are for activities that we expect aren’t the biggest sources of emissions or which taken more time to complete. However, adding this information will give you a more accurate carbon footprint and more tailored recommendations.  </p>
                            <p>To make the process quicker and easier, gather the following details before starting:</p>
                        </div>
                        <div className="icon-with-contant">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="icon">
                                        <img src={t_house} alt="" />
                                    </div>
                                    <div className="text">
                                        <p>Your resdidential energy consumptio (electricity/natural gas hitting oil,anyother)</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="icon">
                                        <img src={t_plan} alt="" />
                                    </div>
                                    <div className="text">
                                        <p>Your air travel use (number of flights/distance travelled)</p>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="icon">
                                        <img src={t_car} alt="" />
                                    </div>
                                    <div className="text">
                                        <p>Your road travel use (vehicle information/ distance travelled)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-col">
                            <p>You can save your responses if you are not able to complete the form, and return to it later. Once you have submitted the information, the net zero team will respond with initial results and suggested actions, and an invitation to arrange a consultation to discuss.</p>
                             <p>The tool has been built by Good Business and is based on the principles of the Greenhouse Gas Protocol. It has been developed specifically for Anthos and gives family members a tailored and personal service, making it stand out from the many carbon calculators available online.</p>

                             <Link to="/loginpage"><button className='homepage-s-btn btn'>Calculate your footprint</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className='protecting-data'>
            <div className="container">
                <div className="data-top">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Protecting your data</h2>
                            <p>All of your responses in this survey will be encrypted with TLS and only accessed by the Net-Zero team for the purposes of calculating your footprint and providing recommendations to reduce it. You can find more information in Good Business’ privacy policy here. The tool met the high data security requirements for penetration testing in March 2022.</p>
                        </div>
                    </div>
                </div>

                <div className="data-bottom">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="img-col">
                                <img src={security_fth} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="text-col">
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo. Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p> 
                                    <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor et accusam et dolores justo.</p>
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo. Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p> 
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>

    <Footer/>
     </>
    )
}

export default Homepage
