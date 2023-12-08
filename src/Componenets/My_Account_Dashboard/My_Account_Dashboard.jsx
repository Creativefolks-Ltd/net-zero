import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
//import './My_Account_Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faArrowRight, faArrowDown ,faClockRotateLeft} from '@fortawesome/free-solid-svg-icons'
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const My_Account_Dashboard = () => {
   
    return (
        <div className='container'>
            <Navbar />
            <div className="content">
                <div className="header">
                    <p>My account</p>
                </div>
                <div className="main">
                    <div className="left">
                        <div className='left-content'>
                            <span><FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon></span><span>Personal information</span>
                            
                        </div>
                        <div className="left-form">
                            <form >
                                <label htmlFor="Name">Your Name</label><br />
                                <input className='form-inp' type="text" placeholder='your name' /><br /><br />
                                <label htmlFor="Name">Last Name</label><br />
                                <input className='form-inp' type="text" placeholder='last name' /><br /><br />
                                <label htmlFor="Name">Your email address</label><br />
                                <input className='form-inp' type="email" placeholder='email address' /><br /><br />
                                <label htmlFor="Name">Your password</label><br />
                                <input className='form-inp' type="password" placeholder='password' /><br /><br />
                            </form>
                            <button>Save</button>
                        </div>
                    </div>
                    <div className="right">
                        <p>Saved forms</p>
                        <div className="right-form">
                            <Accordion sx={{ bgcolor: "#eff7e7" }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                    <Typography variant='h4' color={'white'} sx={{ color: "#white" }} >1. Latest Form</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: "#f9fcf7" }}>
                                    <Typography variant='h5' color={'white'} sx={{ color: "#000000" }}>
                                        <div className="drop-down">
                                            <div className='upper'>
                                                <span className='span-green'>Form Submitted <FontAwesomeIcon icon={faCheck} color='#81e134' ></FontAwesomeIcon> </span>
                                                <p><span className='download-icon'><FontAwesomeIcon icon={faArrowDown} size='2xs' ></FontAwesomeIcon></span>
                                                    <span className='trash-icon'><FontAwesomeIcon icon={faTrashCan} size='2xs'></FontAwesomeIcon></span></p>
                                            </div>
                                            <div className="lower">
                                                <span>View Form <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion><br />

                            <Accordion sx={{ bgcolor: "#eff7e7" }} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography variant='h4'>2. First Form</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: "#ffffff" }} >
                                    <Typography variant='h5' sx={{ color: "#000000" }}>
                                        <div className="drop-down">
                                            <div className='upper'>
                                                <span className='span-green'>Form Submitted <FontAwesomeIcon icon={faCheck} color='#81e134' ></FontAwesomeIcon> </span>
                                                <p><span className='download-icon'><FontAwesomeIcon icon={faArrowDown} size='2xs' ></FontAwesomeIcon></span>
                                                    <span className='trash-icon'><FontAwesomeIcon icon={faTrashCan} size='2xs'></FontAwesomeIcon></span></p>
                                            </div>
                                            <div className="lower">
                                                <span>View Form <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion><br />

                            <Accordion sx={{ bgcolor: "#fef0e2" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography variant='h4' color={'#000000'}>3. Second Form</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: "#fffaf5" }} >
                                    <Typography variant='h5' color={'#000000'}>
                                        <div className="drop-down">
                                            <div className='upper'>
                                                <span className='span-peech'>Form Pending <FontAwesomeIcon icon={faClockRotateLeft} color='#f4993f' ></FontAwesomeIcon> </span>
                                                <p><span className='download-icon'><FontAwesomeIcon icon={faArrowDown} size='2xs' ></FontAwesomeIcon></span>
                                                    <span className='trash-icon'><FontAwesomeIcon icon={faTrashCan} size='2xs'></FontAwesomeIcon></span></p>
                                            </div>
                                            <div className="lower">
                                                <span>Continue Form <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion><br />

                            <Accordion sx={{ bgcolor: "#fef0e2" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography variant='h4' color={'#000000'}>4. Another Form</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: "#fffaf5" }} >
                                    <Typography variant='h5' color={'#000000'}>
                                        <div className="drop-down">
                                            <div className='upper'>
                                                <span className='span-peech'>Form Pending <FontAwesomeIcon icon={faClockRotateLeft} color='#f4993f' ></FontAwesomeIcon> </span>
                                                <p><span className='download-icon'><FontAwesomeIcon icon={faArrowDown} size='2xs' ></FontAwesomeIcon></span>
                                                    <span className='trash-icon'><FontAwesomeIcon icon={faTrashCan} size='2xs'></FontAwesomeIcon></span></p>
                                            </div>
                                            <div className="lower">
                                                <span>Continue Form <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion><br />
                            <Accordion sx={{ bgcolor: "#eff7e7" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography variant='h4' color={'white'} sx={{ color: "#white" }} >5. Latest Form</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: "#ffffff" }}>
                                    <Typography variant='h5' color={'white'} sx={{ color: "#000000" }}>
                                        <div className="drop-down">
                                            <div className='upper'>
                                                <span className='span-green'>Form Submitted <FontAwesomeIcon icon={faCheck} color='#81e134' ></FontAwesomeIcon> </span>
                                                <p><span className='download-icon'><FontAwesomeIcon icon={faArrowDown} size='2xs' ></FontAwesomeIcon></span>
                                                    <span className='trash-icon'><FontAwesomeIcon icon={faTrashCan} size='2xs'></FontAwesomeIcon></span></p>
                                            </div>
                                            <div className="lower">
                                                <span>View Form <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion><br />
                            <Accordion sx={{ bgcolor: "#eff7e7" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography variant='h4' color={'white'} sx={{ color: "#white" }} >6. Latest Form</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: "#ffffff" }}>
                                    <Typography variant='h5' color={'white'} sx={{ color: "#000000" }}>
                                        <div className="drop-down">
                                            <div className='upper'>
                                                <span className='span-green'>Form Submitted <FontAwesomeIcon icon={faCheck} color='#81e134' ></FontAwesomeIcon> </span>
                                                <p><span className='download-icon'><FontAwesomeIcon icon={faArrowDown} size='2xs' ></FontAwesomeIcon></span>
                                                    <span className='trash-icon'><FontAwesomeIcon icon={faTrashCan} size='2xs'></FontAwesomeIcon></span></p>
                                            </div>
                                            <div className="lower">
                                                <span>View Form <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></span>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion><br />


                        </div>


                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default My_Account_Dashboard
