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

const Homepage = () => {
    return (
        <>
        <Navbar transparent={true}/>
        <div className='container'>
            <div className='homepage-f'>
                <div className='homepage-navbar'>
                    {/* <nav className="navbar">
                        <span><img src={anthos_logo} alt="" /></span>
                        <ul>
                            <li> <img src={profile_img} alt="" /></li>
                            <li><FontAwesomeIcon icon={faBars} size='4x' color='white'></FontAwesomeIcon></li>

                        </ul>

                    </nav> */}
                    <div className="homepage-content">
                        <div className='para1'>
                            <p>The Anthos</p>
                            <p>Net Zero Project</p>
                        </div>
                        <div className="para2">
                            <p>Created to provied an ongoing</p>
                            <p style={{ lineHeight: '15px' }} >service to help all family members</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage-s">
                <div className='homepage-s-p1'><p>The Future of Sustainability</p></div>
                <div className='homepage-s-p2'><p>Your personal carbon footprint calculator</p></div>
                <div className="homepage-s-content">
                    <div className="homepage-s-img">
                        <img src={anthos_bulb} alt="" />
                    </div>
                    <div className="homepage-s-para">
                        <img src={s_text} alt="" />
                        {/* <p>
                            <span>Understand the shape and size if your carbon footprint. </span>
                            <br/>
                            <span> Connect with an advisory service to discuss and explore
                                the opportunities or carbin reduction.</span>
                            <span> Understand the shape and size if your carbon footprint.</span>
                            <span> Select from a choice of carbon offsets to compensate for
                                emission and become carbon neutral.</span>
                            <span>Repeat the process on an annual basis and track progress
                                through time</span>
                        </p> */}
                        <div><Link to="/loginpage"><button className='homepage-s-btn'>Calculate your footprint</button></Link></div>
                    </div>
                </div>
                

            </div>
            <div className="homepage-t">
                <div className='homepage-t-left' >
                    <div className='homepage-t-p1'><p>How to complete the form</p></div>
                    <div className='homepage-t-p2'><p>Form Essentails</p></div>
                    <div className='homepage-t-p3'>
                        {/* <img src={t_text} alt="" /> */}
                        <p>The first step is to provode the information through the  tailored form ,related to your home,travel,<br />
                            shopping and assets. Information is encrypted and held on <span>secure server*</span> and the form should <br />
                            take no more than 15 minutes to complete.On each page there are some sections are <br />
                            required and others that are optional. The optinal sections are for activities that we expect aren't<br />
                            the biggest source of emissions or which take more time to complete. However, adding this<br />
                            information will give you more accurate carbon footprint and more tailored recommendations.
                        </p>
                    </div>
                    <div className="homepage-t-p4">
                        <div className='homepage-t-img1'>
                            <img src={t_house} alt="" />
                            <p>Your resdidential <br />
                                energy consumption<br />
                                (electricity/natural gas/<br />
                                hitting oil,anyother)</p>
                        </div>
                        <div className='homepage-t-img1'>
                            <img src={t_plan} alt="" />
                            <p>Your air travel use<br />
                                (number of flights/<br />
                                distance travelled)</p>
                        </div>
                        <div className='homepage-t-img1'>
                            <img src={t_car} alt="" />
                            <p>Your road travel use<br />
                                (vehicle informatioon/<br />
                                distance travelled)</p>
                        </div>
                    </div>
                    <div className="homepage-t-p6">
                        <div>
                            {/* <img src={t_text2} alt="" /> */}
                            <p>You can save your responses if you are not able to complete the form, and return to it later. Once<br />
                                you have submitted the informatioon the net zero team will respond with the initial result and <br />
                                suggected action , and invitations and arrnage a consultation for discuss</p>
                            <p>The tool has been built by Google Businessa and its principles of Greenhouse Gas
                                Protocol.It has <br /> been developed specially for Anthos and give family members a tailored and
                                personal service , <br /> and making it stand out from the many carbon calculators available online</p>
                        </div>
                    </div>
                    <div className="homepage-t-btn">
                        <Link to="/loginpage"><button>Calculate your footprint</button></Link>
                    </div>

                </div>
                <div className="homepage-t-right">
                    <div className='t-img'><img src={david} alt="" /></div>
                </div>
            </div>
            <div className="homepage-fth">
                <div className='homepage-fth-p1'><p>Protecting your data</p></div>
                <div className='homepage-fth-p2'>

                    <p>All of your  response in this survey will be encrypted in this TLS and only access by the Net Zero team for<br />
                        the purpose of calculating your footprint and provode recommendation to reduce it. You can find more <br />
                        information in Good Business' Policy here.the tool met the high data security requirements for <br />
                        penetartion testing in March 2022.
                        the penetration
                    </p></div>
                <div className='homepage-t-content'>
                    <div className="content-left"><img src={security_fth} alt="" /></div>
                    <div className="content-right">
                        {/* <img src={fth_text} alt="" /> */}
                        <p>Lorem ipsum dolor sit amet qui consectetur, adipisicing<br/> elit. Neque error aspernatur amet hic veniam iure ut<br/> repudiandae minima error deleniti tempore diam<br/> 
                        libero ratione nam  fugit! Placeat, qui justo.
                        </p>
                        <p>
                        Sadipscing ipsum dolor sit amet consectetur tempor <br/> invidut Perspiciatis possimus ui fuga quod laudantium sed <br/> diam porro! Quibusdam ea, doloribus quo cumque duo<br/> doloar's, soluta quo  praesentium eum libero eos!no <br/> asperiores eius corrupti beatae nquis veniam et<br/>cumque beatae nobis  odio justo.
                        </p>
                    </div>

                </div>
            </div>
            
        </div>
    <Footer/>
     </>
    )
}

export default Homepage
