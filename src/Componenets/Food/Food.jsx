import React, { useState } from 'react'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
// import './Food.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Food = () => {

    const [value9 ,setValue9]=useState('')
    const getvalueFunc=(event)=>{
        const value =event.target.value;
        console.log("eventfood9 ki value",value)
        setValue9(value)
    }

    const [value4 ,setValue4]=useState('')
    const getvalue4func=(event)=>{
        const value=event.target.value;
        console.log("eventfood4",value)
        setValue4(value)
    }

    return (
        <div className='container'>
            <Navbar />
            <div className="food-content">
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

                <div className="food-p1"> <p>Food and shopping</p></div>
                <div className="food-content1">
                    <span style={{ float: 'right', fontFamily: 'Roboto', fontSize: '28px', fontWeight: 'normal' }}>Fields marked with an <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon> are required</span>
                    <br /><br /><br />
                    <label className='food-label' htmlFor=""><b>1.</b>Please give details of any vehicles purchased in the selected year, such as cars or boats.
                        Please specify the relevant details, such as number and type.You dont need to add second-hand or refurbished vehicle.Please also include vehicle
                        purchased by you household memebers.<FontAwesomeIcon icon={faAsterisk} color='red' size='2xs'></FontAwesomeIcon>
                    </label><br /><br />
                    <textarea className='food-textarea' name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="food-p1"> <p>Additional Information</p></div>
                <div className="food-content2">

                    <p className='food-content-note'>This section is optionally,However this section is optional, it will allow us to make your carbon
                        footprint more complete and your recommendations more specific</p><br /><br />

                    <label className='food-label' htmlFor=""><b>1.</b>Please give details of any of other purchased made in the selected year, such as TVs,laptops,phones
                        other electronics devices ,domestice appliances,furniture and home renovations.Please specify the relevant details, such as number and type.You
                        dont need to add second-hand or refurbished vehicle.You may optionally include items purchased by you household memebers.<FontAwesomeIcon icon={faAsterisk} color='red' size='2xs'></FontAwesomeIcon>
                    </label><br /><br />
                    <textarea className='food-textarea' name="" id="" cols="30" rows="10"></textarea>
                    <br /><br />
                    <label className='food-label' htmlFor=""><b>3.</b>On average how many new pieces of clothes do you buy each quarter?</label><br />
                    <select className='food-select' name="" id="">
                        <option value="">---Select option---</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select><br /><br />
                    <br /><br />
                    <label className='food-label' htmlFor=""><b>4.</b>Do you have any domestic pets or animal?</label><br />
                    <select className='food-select' name="" id="" value={value4} onChange={getvalue4func}>
                        <option value="">---Select option---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br /><br />
                    {value4==="Yes" && 
                    (<><label className='food-label' htmlFor=""><b>4b.</b>Please specify, e.g number,breed?</label><br />
                    <textarea className='food-textarea' name="" id="" cols="30" rows="10"></textarea><br /><br />
                    <br /><br /></>)}
                    <label className='food-label' htmlFor=""><b>5.</b>How often does your diet include meat-based meals?</label><br />
                    <select className='food-select' name="" id="">
                        <option value="">---Select option---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br /><br />
                    <br /><br />
                    <label className='food-label' htmlFor=""><b>6.</b>How often does your diet include dairy?</label><br />
                    <select className='food-select' name="" id="">
                        <option value="">---Select option---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br /><br />
                    <br /><br />
                    <label className='food-label' htmlFor=""><b>7.</b>Thinking about the food you buy,Which of the following statements applies?
                        <span className='food-span'>(The average household throws aways 16% og their purchased food ).</span></label><br />
                    <select className='food-select' name="" id="">
                        <option value="">---Select option---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br /><br />
                    <br /><br />
                    <label className='food-label' htmlFor=""><b>8.</b>Please enter any information about  diet and clothes purchases of your
                        partners and dependants, where relevant  .                     ?
                    </label><br />
                    <p className='food-para'><FontAwesomeIcon icon={faCircle} color='#81c134' size='2xs'></FontAwesomeIcon> Please answer in terms of how often they eat meat and dairy , and how many clothes
                        they buy per quarter.</p><br />
                    <p className='food-para'><FontAwesomeIcon icon={faCircle} color='#81c134' size='2xs'></FontAwesomeIcon> This is not essential for the calculation of your carbon footprint, but allow us to
                        give you tailored,forward-looking recommendations</p><br />
                    <textarea className='food-textarea' name="" id="" cols="30" rows="10"></textarea><br /><br />
                    <br /><br />

                    <label className='food-label' htmlFor=""><b>9.</b>Do you have any plans to host and organise any large events this year or large year?
                    </label><br />
                    <p className='food-para'><FontAwesomeIcon icon={faCircle} color='#81c134' size='2xs'></FontAwesomeIcon>&nbsp;This question only apply for the submissions for the latest full calendar year.
                        they buy per quarter.</p>
                    <p className='food-para'><FontAwesomeIcon icon={faCircle} color='#81c134' size='2xs'></FontAwesomeIcon>&nbsp;This is not essential for the calculation of your carbon footprint, but allow us to
                        give you tailored,forward-looking recommendations</p><br />
                    <select className='food-select' name="" id="" value={value9} onChange={getvalueFunc}>
                        <option value="">---Select option---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select><br /><br />

                    {value9==="Yes" && (<><label className='food-label' htmlFor=""><b>9b.</b>Please enter any information about  diet and clothes purchases of your
                        partners and dependants, where relevant?
                    </label><br />
                    <textarea className='food-textarea' name="" id="" cols="30" rows="10"></textarea><br /><br /></>)}

                    <div className='content6-btns'>
                        <button className='content6-btns-btn1'>Save Progress</button>
                        <button className='content6-btns-btn2' >Continue</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Food
