import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

// import './Travel.css'

const Travel = () => {


    const [value3, setValue3] = useState('1');
    const getvalue3Func = (event) => {
        const value = event.target.value;
        console.log("event3 ki value", value)
        setValue3(value)
    }
    const [value6, setValue6] = useState('1')
    const getvalue6Func = (event) => {
        setValue6(event.target.value)
    }

    const [motor, setmotor] = useState(false);
    const openmotorbike = () => {
        setmotor(!motor);
    }
    const [bicyle, setbicycle] = useState(false);
    const openBicyle = () => {
        setbicycle(!bicyle);
    }
    const [passenger, setpassenger] = useState(false);
    const openPassenger = () => {
        setpassenger(!passenger);
    }
    const [train, settrain] = useState(false);
    const openTrain = () => {
        settrain(!train);
    }
    const [privateYacht, setprivateYacht] = useState(false);
    const openPrivateYacht = () => {
        setprivateYacht(!privateYacht);
    }
    const [privateVehicles, setprivateVehicles] = useState(false);
    const openPrivateVehicles = () => {
        setprivateVehicles(!privateVehicles);
    }
    const [helicopter, setHelicopter] = useState(false);
    const openHelicopter = () => {
        setHelicopter(!helicopter);
    }

    const [activeTransport, setActiveTransport] = useState(null);
    const openMotorbike = () => setActiveTransport('Motorbike');

    const generateCarDivs = (value3) => {
        const carDivs = []
        for (let i = 1; 1 < value3; i++) {
            carDivs.push(
                <div key={i} className='cardiv'>
                    <h1>{`Car${i + 1}`}</h1>
                    <span className='flight-span'>Make & Model </span>
                    <br />
                    <div className='flight-sub-inp'>
                        <div className='sub-inp1'>
                            <label htmlFor="">Vehicle Type</label><br />
                            <input type="text" />
                        </div>
                        <div className='sub-inp1'>
                            <label htmlFor="">Kms in selected year</label><br />
                            <input type="text" />
                        </div>
                    </div>
                </div>
            );
            return carDivs;
        }

    }


    return (
        <div className='container'>
            <Navbar />
            <div className="travel-content">
                <div className="sub-head">
                    <div className="header-div">
                        <div className="pic">

                            <FontAwesomeIcon className='pic1' icon={faUser} size='5x' color='#2c2b34'></FontAwesomeIcon><br />
                            <span className='span1'>General</span><br />
                            <span className='span2'>Information</span>
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic2' icon={faHouse} size='5x'></FontAwesomeIcon><br />
                            <span className='span1'>Your Home</span><br />
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic3' icon={faCarSide} size='5x' ></FontAwesomeIcon><br />
                            <span className='span1'>Travel</span><br />
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic4' icon={faUtensils} size='5x' ></FontAwesomeIcon><br />
                            <span className='span1'>Food &</span><br />
                            <span className='span2'>Shopping</span>
                        </div>
                        <div className="pic">
                            <FontAwesomeIcon className='pic5' icon={faPiggyBank} size='5x' ></FontAwesomeIcon><br />
                            <span className='span1'>Finance</span><br />
                            <span className='span2'>& assets</span>
                        </div>
                    </div>
                </div>

                <div className="travel-content1">
                    <h1 className='travel-Ist-h1'>Travel</h1>
                    <span style={{ float: 'right', fontFamily: 'Roboto', fontSize: '28px', fontWeight: 'normal' }}>Fields marked with an <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon> are required</span>
                    <div className='travel-sub-content1'>
                        <p><b>1.</b>How many flights did you take in the selected year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon> </p>
                        <span className='travel-sub-p1'><FontAwesomeIcon icon={faCircle} size='2xs' color='#81c134'></FontAwesomeIcon>&nbsp;
                            Please include all files you took in a personal capacity <br />
                            &nbsp;(e.g not for a business you work for)</span> <br />
                        <span className='travel-sub-p2'><FontAwesomeIcon icon={faCircle} size='2xs' color='#81c134'></FontAwesomeIcon>&nbsp;
                            Include return flight as two flights and use the following guide for length:
                        </span>
                        <p className='travel-subdiv-p3'><br />
                            Short:shorter than 3,000 km or 4 hours <br />
                            Medium:3,000 km to 7,000km or 4 to 10 hours <br />
                            Long:7,000 km to 12,000km or 10 to 14 hours <br />
                        </p>
                        <div className='flight-types'>
                            <div className="type-main">
                                <h1>Short Flight</h1>
                                <div className="inp-label">
                                    <label htmlFor="">Economy</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Business</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">First Class</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Private</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                            </div>
                            <hr className='flight-hr' color='#81c14b' />
                            <div className="type-main">
                                <h1>Medium Flight</h1>
                                <div className="inp-label">
                                    <label htmlFor="">Economy</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Business</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">First Class</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Private</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                            </div>
                            <hr className='flight-hr' />
                            <div className="type-main">
                                <h1>Long Flight</h1>
                                <div className="inp-label">
                                    <label htmlFor="">Economy</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Business</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">First Class</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Private</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                            </div>
                            <hr className='flight-hr' />
                            <div className="type-main">
                                <h1>Short Flight</h1>
                                <div className="inp-label">
                                    <label htmlFor="">Economy</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Business</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='1' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">First Class</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                                <div className="inp-label">
                                    <label htmlFor="">Private</label>
                                    <input className='type-main1' type="number" min="0" max="5" placeholder='0' />
                                </div>
                            </div>

                        </div><br />
                        <div className="flight-inp2-div">
                            <label htmlFor=""><b>2.</b>What proportion of your flights do you offset?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon><span className='inp2-span' >(Estimated % by distance)</span></label><br />
                            <input type="text" />
                        </div><br />

                        <div className="flight-inp2-div">
                            <label htmlFor=""><b>3.</b>How many cars do you use?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'><span>()</span></FontAwesomeIcon></label><br />
                            <select name="" id="" min="0" max="5" placeholder='0' value={value3} onChange={getvalue3Func}>
                                <option value="1">---Select Option---</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select><br /><br />
                            {Array.from({ length: parseInt(value3, 10) }, (_, index) => (
                                <p key={index}><div className='cardiv'>

                                    <div className='flight-sub-inp'>
                                        <h1>{` Car ${index + 1}`}</h1>
                                        <div className='sub-inp1'>
                                            <label htmlFor="">Make & Model</label><br />
                                            <input type="text" />
                                        </div>
                                        <div className='sub-inp1'>
                                            <label htmlFor="">Vehicle Type</label><br />
                                            <input type="text" />
                                        </div>
                                        <div className='sub-inp1' >
                                            <label htmlFor="">Kms in selected year</label><br />
                                            <input type="text" />
                                        </div>
                                    </div>
                                </div></p>
                            ))}

                            <br />

                        </div>
                    </div>
                </div>
                <h1 className='travel-2nd-h1' >Additional Information</h1>

                <div className="travel-content2">
                    <p>This section is optionally,However this section is optional, it will allow us to make your carbon<br />
                        footprint more complete and your recommendations more specific
                    </p>
                    <div className='flight-inp3-div'>
                        <label htmlFor=""> <b>4.</b> How many flights did your partner/children take in the selected year?</label><br />
                        <span className='travel-sub-p1'><FontAwesomeIcon icon={faCircle} size='2xs' color='#81c134'></FontAwesomeIcon>&nbsp;
                            Please include all files you took in a personal capacity <br />
                            &nbsp;(e.g not for a business you work for)</span> <br /><br />
                        <span className='travel-sub-p2'><FontAwesomeIcon icon={faCircle} size='2xs' color='#81c134'></FontAwesomeIcon>&nbsp;
                            Include return flight as two flights and use the following guide for length:
                        </span>
                        <p className='travel-subdiv-p3'><br />
                            Short:shorter than 3,000 km or 4 hours <br />
                            Medium:3,000 km to 7,000km or 4 to 10 hours <br />
                            Long:7,000 km to 12,000km or 10 to 14 hours <br />
                        </p>
                        <div className="flight2-types">

                            <div className="flight-main-row">
                                <h1>Short Flight</h1>
                                <span className='flight-sub-clm'>
                                    <span className='span-label'>Economy</span>
                                    <input type="number"
                                        style={{
                                            width: '110px',
                                            height: '60px'
                                        }} name="" id=""
                                        min="0" max="5" placeholder='0' />
                                </span>

                                <span className='flight-sub-clm'>
                                    <span className='span-label' >Business</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span className='span-label' >First Class</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span className='span-label' >Private</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>

                            </div>
                            <div className="flight-main-row">
                                <h1>Medium Flight</h1>
                                <span className='flight-sub-clm'>
                                    <span>Economy</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>

                                <span className='flight-sub-clm'>
                                    <span>Business</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span>First Class</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span>Private</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>

                            </div>
                            <div className="flight-main-row">
                                <h1 className='flight-main-row-p' >Long Flight</h1>

                                <span className='flight-sub-clm'>
                                    <span>Economy</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>

                                <span className='flight-sub-clm'>
                                    <span>Business</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span>First Class</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span>Private</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                            </div>
                            <div className="flight-main-row">
                                <h1>Extended Flight</h1>
                                <span className='flight-sub-clm'>
                                    <span>Economy</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>

                                <span className='flight-sub-clm'>
                                    <span>Business</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span>First Class</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                                <span className='flight-sub-clm'>
                                    <span>Private</span>
                                    <input type="number" style={{
                                        width: '110px',
                                        height: '60px'
                                    }} name="" id="" min="0" max="5" placeholder='0' />
                                </span>
                            </div><br /><br />
                        </div>
                    </div>
                    <div className="flight-inp2-div">
                        <label htmlFor=""><b>5.</b>What proportion of your flights do you offset?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon><span className='inp2-span' >(Estimated % by distance)</span></label><br />
                        <input type="text" />
                    </div><br />
                    <div className="flight-inp2-div">
                        <label htmlFor=""><b>6.</b>How many cars do you use?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'><span>()</span></FontAwesomeIcon></label><br />
                        <select name="" id="" min="0" max="5" placeholder='0' value={value6} onChange={getvalue6Func} >
                            <option value="1">---Select Option---</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select><br /> <br /><br />
                        {Array.from({ length: parseInt(value6, 10) }, (_, index) => (
                            <p key={index}>
                                <div className='flight-sub-inp'>
                                    <h1>{` Car ${index + 1}`}</h1>
                                    <div className='sub-inp1'>
                                        <label htmlFor="">Make & Model</label><br />
                                        <input type="text" />
                                    </div>
                                    <div className='sub-inp1'>
                                        <label htmlFor="">Vehicle Type</label><br />
                                        <input type="text" />
                                    </div>
                                    <div className='sub-inp1' >
                                        <label htmlFor="">Kms in selected year</label><br />
                                        <input type="text" />
                                    </div>
                                </div>
                            </p>
                        ))}


                    </div><br /><br />
                    <div className="flight-inp2-div">
                        <label htmlFor=""><b>7.</b>Did you use any other form of transport in the selected year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon><span className='inp2-span' >(Select all that apply)</span></label><br /><br />
                        <div className="flight-sub-inp2">

                            <button className={`tranportbtn ${activeTransport === 'Motor' ? 'active' : ''}`} onClick={openmotorbike}>Motorbike</button><br /><br />
                            <button className='tranportbtn' onClick={openBicyle}>Bicycle</button><br /><br />
                            <button className='tranportbtn' onClick={openPassenger}>passenger ferry</button><br /><br />
                            <button className='tranportbtn' onClick={openTrain}>Train</button><br /><br />
                            <button className='tranportbtn' onClick={openPrivateYacht}>Private Yacht</button><br /><br />
                            <button className='tranportbtn' onClick={openPrivateVehicles}>Private hire vehicles</button><br /><br />
                            <button className='tranportbtn' onClick={openHelicopter}>Helicopter</button><br /><br />

                        </div><br /><br />
                        <div className="flight-sub-inp3">
                            {bicyle && (<><div className="flight-subdiv-inp3">
                                <h1 className='subdiv-inp3-span'>Bicycle</h1>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px' }} >My KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Roboto' }} >Notes</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >Partner/Children KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                            </div><br /><br /></>)}
                            {motor && (<><div className="flight-subdiv-inp3">
                                <h1 className='subdiv-inp3-span'>MotorBike</h1>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >My KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Roboto' }} >Notes</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >Partner/Children KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                            </div><br /><br /></>)}
                            {train && (<><div className="flight-subdiv-inp3">
                                <h1 className='subdiv-inp3-span'>Train</h1>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >My KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Roboto' }} >Notes</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >Partner/Children KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                            </div><br /><br /></>)}
                            {passenger && (<><div className="flight-subdiv-inp3">
                                <h1 className='subdiv-inp3-span'>passenger</h1>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >My KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Roboto' }} >Notes</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >Partner/Children KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                            </div><br /><br /></>)}
                            {helicopter && (<><div className="flight-subdiv-inp3">
                                <h1 className='subdiv-inp3-span'>helicopter</h1>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >My KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Roboto' }} >Notes</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >Partner/Children KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                            </div><br /><br /></>)}
                            {privateYacht && (<><div className="flight-subdiv-inp3">
                                <h1 className='subdiv-inp3-span'>privateYacht</h1>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >My KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Roboto' }} >Notes</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >Partner/Children KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                            </div><br /><br /></>)}
                            {privateVehicles && (<><div className="flight-subdiv-inp3">
                                <h1 className='subdiv-inp3-span'>privateVehicles</h1>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >My KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Roboto' }} >Notes</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                                <div className='inp-label1'>
                                    <span style={{ fontSize: '26px', textAlign: 'center' }} >Partner/Children KMs</span>
                                    <input className='sub-inp3' type="text" name="" id="" />
                                </div>
                            </div><br /><br /></>)}

                        </div>
                    </div><br /><br />
                    <div className="flight-inp2-div">
                        <label htmlFor=""><b>8.</b>How many nights did you spend in hotels,rentaks,Airbnb etc that you paid to stay in but do not own in the selected
                            year?Please include stays in Mettingen.</label>
                        <input type="text" />
                    </div><br /><br />
                    <div className="flight-inp2-div">
                        <label htmlFor=""><b>9.</b>Is there any other travel information that you would like to tell us about(e.g family stays in hotel,spend on
                            tranport-related services not otherwise included)? If you use more than three cars, please also add details of distance travelled here.</label>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <br />
                    <div className='content6-btns'>
                        <button className='content6-btns-btn1'>Save</button>
                        <button className='content6-btns-btn2' >Continue</button>
                    </div>

                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Travel
