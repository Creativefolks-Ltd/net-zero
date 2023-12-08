import React, { useState } from 'react'
// import './YourHome.css'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import { CountryRegionData } from 'react-country-region-selector'
import { Slider } from 'antd';
import { Formik, useFormik } from 'formik'
const formatter = (value) => `${value}%`;


const initialValues ={
    inp1:'',
    inp2:'',
    inp3:'',
    inp4:'',
    inp5:'',
    inp6:'',
    inp7:'',
    inp8:'',
    inp9:'',
    inp10:'',
    inp11:'',
    inp12:'',
    inp13:'',
    inp14:'',
    inp15:'',
    inp16:'',
    inp17:'',
    inp18:'',
    inp19:'',
    inp20:'',
    inp21:'',
    inp22:'',
}

const YourHome = () => {



    const [selectedCountry, setSelectedCountry] = useState(null);
    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };
    const countryOptions = CountryRegionData.map((country) => ({
        value: country[0],
        label: country[0],
    }));

    const [value4, setValue4] = useState('');

    const getvalueFunc = (event) => {
        const value = event.target.value
        setValue4(value)
        console.log("event ki value", event.target.value)
    }

    const [value4b, setValue4b] = useState('')
    const getvalue4b = (event) => {
        const value = event.target.value
        console.log("event2 ki value", value)
        setValue4b(value)
    }

    const [value6, setValue6] = useState('')
    const getvalue6Func = (event) => {
        const value = event.target.value
        setValue6(value)
        console.log("event6 ki value", value)
    }

    const [value7, setValue7] = useState();
    const getvalue7Func = (event) => {
        const value = event.target.value;
        console.log("event7 ki value", value)
        setValue7(value)
    }
    const [value9, setValue9] = useState();
    const getvalue9Func = (event) => {
        const value = event.target.value;
        console.log("event9 ki value", value)
        setValue9(value)
    }
    const [value10, setValue10] = useState();
    const getvalue10Func = (event) => {
        const value = event.target.value;
        console.log("event10 ki value", value)
        setValue10(value)
    }
    const [value11, setValue11] = useState();
    const getvalue11Func = (event) => {
        const value = event.target.value;
        console.log("event11 ki value", value)
        setValue11(value)
    }

    const  {errors,touched,handleChange,handleBlur,handleSubmit}=useFormik({
        initialValues:initialValues,
        onSubmit:(input)=>{
            console.log("your home page data",input)
        }
        
    })

    const formatter = (value) => {
        return `${value}`;
      };
    return (
        <div className='container'>
            <Navbar />
            <div className="home-content">
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
                <form onSubmit={handleSubmit}>
                <div className="home-content1">
                    <div className="head1">
                        <p className='home-content1-p1' >Home 2</p>

                        <div >
                            <button className='home-head-rightinp'>Delete this home</button>
                            <span className='home-icon1'><FontAwesomeIcon className='home-icontrash' icon={faTrash} size='2x' ></FontAwesomeIcon></span>
                        </div>
                    </div>
                    <span className='home-content1-p2'>Fields marked with an <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon> are required</span>
                    <form>
                        <label className='home-form-label' htmlFor=""><b>1</b>.Location of home</label>
                        <Select
                            className='home-content1-select'
                            id="country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={handleCountryChange}>

                        </Select><br /><br />
                        <label className='home-form-label' htmlFor=""><b>2</b>.How is the home heated?</label><FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        <div className='home-content1-inp'>
                            <input className='input1' type="button" value="Electricity" />
                            <input className='input1' type="button" value="Oil" />
                            <input className='input1' type="button" value="Coal" />
                            <input className='input1' type="button" value="abc" />
                            <input className='input1' type="button" value="Wood" />
                            <input className='input1' type="button" value="Don't Know" />
                        </div><br /><br />
                        <label className='home-form-label' htmlFor=""><b>3</b>.Was your electricity supplied under zero-carbon energy tariff?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon><br />
                            <span className='label-span'>(100% electricity generated from wind,water,solar,nuclear)</span></label><br /><br />
                        <input className='form-input' type="text" />
                    </form>
                </div>
                <div className="home-content2">
                    <p className='home-content2-p1'>Electricity</p>
                    <form >
                        <label className='home-form-label' htmlFor=""><b>4</b>.Do you know how much electricity was used at home in the selected year?</label><FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon><br />
                        <select name="" id="" className='home-content2-select' value={value4} onChange={getvalueFunc}>
                            <option value="">Select option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>

                        </select><br /><br />
                        {value4 === "Yes" ? (<span className='content2-span'><input className='input1' type="text" placeholder='Amount' />
                            <input className='input1' type="text" placeholder='KWh' /></span>) : null} <br /><br />

                        {value4 === "Yes" ? (<><label className='home-form-label' htmlFor=""><b>4b</b>.Please specify the time period for which you have electricity bills?</label><FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon><br />
                            <input type="text" className='input2' /><br /><br /></>) :

                            (<><label className='home-form-label' htmlFor=""><b>4b</b>.Do you know what the annual spend was for electricity in the selected year?</label><FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon><br />
                                <select name="" id="" className='home-content2-select' value={value4b} onChange={getvalue4b}>
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>

                                </select><br /><br /></>)}

                        {value4b === "Yes" ? (<><span className='content2-span2'>
                            <input className='content2-input2' type="text" value="Amount" />
                            <select className='content2-select2' name="" id="">
                                <option value="1">tonnes</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </span><br /><br /></>) : null}
                        <br />
                        <label className='home-form-label' htmlFor=""><b>5</b>.Who was your elecricity supplier?</label><FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon><br />
                        <select name="" id="" className='home-content2-select'>
                            <option value="">Select option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select><br /><br />
                        <label className='home-form-label' htmlFor=""><b>6</b>.Do you know any of the property's electricity was generated from onsite <br />
                            renewable sources?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                            <span className='label-span'>(wind turbines,solar panels etc)</span>
                        </label><br />
                        <select name="" id="" className='home-content2-select' value={value6} onChange={getvalue6Func}>
                            <option value="">Select option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select><br /><br />
                        {value6 === "Yes" ? (<><span className='content2-span'><input className='input1' type="text" placeholder='Amount' /><input className='input1' type="text" placeholder='KWh' /></span><br /><br /></>) : null}
                        <br /><br />
                    </form>

                </div>
                <div className="home-content3">
                    <p className="home-content3-p1">Gas</p>

                    <form >
                        <label htmlFor=""><b>7</b>.Do you know how much natural gas was used at the home in the  <br />selected year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                            <span className='content3span1'>(mains supply)</span></label><br /><br />
                        <select className='home-content3-select1' value={value7} onChange={getvalue7Func}>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select><br /><br />

                        {value7 === "Yes" ? (<><div className='home-content3-span1'><input className='home-content3-inp1' type="text" value="Amount" /><input className='home-content3-inp2' type="text" value="kwh" /></div>
                            <br /><br />
                            <label htmlFor=""><b>7b</b> .Please specify the time period for which you have gas bills?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                            </label><br /><br />
                            <select className='home-content3-select1' >
                                <option value="1">Select Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select><br /><br /><br /><br /> </>) :

                            (<><label htmlFor=""><b>7b.</b>Do you know what the annual spend was for electricity in the selected year ?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                            </label><br /><br />
                                <input type="text" className='input2' /><br /><br />
                                <span className='content2-span'><input className='input1' type="text" placeholder='Amount' />
                                    <input className='input1' type="text" placeholder='KWh' /></span><br /></>)}


                        <label htmlFor=""><b>8</b>.Has your gas consumption been offset by your supplier ?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                            <span className='content3span1'>(mains supply)</span></label><br /><br />
                        <select className='home-content3-select1' name="" id="">
                            <option value="1">Select Option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </form>
                </div>
                <div className="home-content4">
                    <p className='home-content4-p1'>Other Energy</p>
                    <form >
                        <label htmlFor=""><b>9.</b>.Do you know how much oil was used at the home last year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <select className='home-content3-select1' value={value9} onChange={getvalue9Func}>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select><br /><br />
                        {value9 === "Yes" ? (<><span className='content2-span'><input className='input1' type="text" placeholder='Amount' />
                            <input className='input1' type="text" placeholder='KWh' /></span><br /></>) :
                            (<>
                                <label htmlFor=""><b>9b.</b>Do you know what the annual spend was for oil in the selected year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                                </label><br /><br />
                                <select className='home-content3-select1' >
                                    <option value="1">Select Option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select><br /><br /><br /><br /> </>)

                        }

                        <label htmlFor=""><b>10.</b>.Do you know how much wood was used at the home last year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <select className='home-content3-select1' value={value10} onChange={getvalue10Func}>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select><br /><br />
                        {value10 === "Yes" ? (<><span className='content2-span'><input className='input1' type="text" placeholder='Amount' />
                            <input className='input1' type="text" placeholder='KWh' /></span><br /></>) :
                            (<>
                                <label htmlFor=""><b>10b.</b>Do you know what the annual spend was for wood in the selected year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                                </label><br /><br />
                                <select className='home-content3-select1' >
                                    <option value="1">Select Option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select><br /><br /><br /><br /> </>)

                        }

                        <label htmlFor=""><b>11.</b>Do you know how much coal was used at the home last year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <select className='home-content3-select1' value={value11} onChange={getvalue11Func}>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select><br /><br />

                        {value11 === "Yes" ? (<><span className='content2-span'><input className='input1' type="text" placeholder='Amount' />
                            <input className='input1' type="text" placeholder='KWh' /></span><br /></>) :
                            (<>
                                <label htmlFor=""><b>11b.</b>Do you know what the annual spend was for coal in the selected year?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                                </label><br /><br />
                                <select className='home-content3-select1' >
                                    <option value="1">Select Option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select><br /><br /><br /><br /> </>)

                        }


                        <label htmlFor=""><b>12</b>.Other than for heating ,wasthere any other energy used at the <br /> property ?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon>
                        </label><br /><br />
                        <select className='home-content3-select1' name="" id="">
                            <option value="1">Select Option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select><br /><br />
                        <span className='content4-span4'><input className='content4-input4' type="text" value="Amount" />
                            <select className='content4-select4' name="" id="">
                                <option value="1">tonnes</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select></span><br /><br />

                    </form>
                </div>
                <div className="home-content5">
                    <h1>Additional Information</h1>
                    <p className='home-content5-p1'>This section is optionally,However this section is optional, it will <br />allow us to make your carbon
                        footprint more complete and your <br /> recommendations more specific</p>

                    <form >
                        <label htmlFor=""><b>13</b>What does the property have any of the following?<span>(Select all that apply)</span>
                        </label><br /><br />

                        <div className='content5-inp1-div'>
                            <input className='content5-inp1' type="text" value="Food Waste Collection" />
                            <input className='content5-inp1' type="text" value="Home Composing" />
                            <input className='content5-inp1' type="text" value="Plastic/Glass/Metal/Paper 
                            recycling services provided" />
                            <input className='content5-inp1' type="text" value="Don't Know" />
                        </div>
                        <br /><br />

                        <label htmlFor=""><b>14</b>.What kind of house do you live in?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <select className='home-content3-select1' name="" id="">
                            <option value="1">Select Option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select><br /><br />
                        <label htmlFor=""><b>15</b>.What is the primary construction material?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <select className='home-content3-select1' name="" id="">
                            <option value="1">Select Option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select><br /><br />
                        <label htmlFor=""><b>16</b>.When was it built?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <select className='home-content3-select1' name="" id="">
                            <option value="1">Select Option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select><br /><br />
                        <label htmlFor=""><b>17</b>.What temperature was the hme kept in winter?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                            <span className='content3span1'>(Use slider below) </span></label><br /><br />

                            <>
                            <Slider 
                             style={{
                               
                                border: '70px', // Set the desired height
                                margin: '10px 0', // Add margin as needed
                                // Add additional custom styles here
                              }}
                                tooltip={{
                                    formatter,
                                }}
                            />
                            <Slider
                                tooltip={{
                                    formatter: null,
                                }}
                            />
                        </>

                        <br /> <br />
                        <label htmlFor=""><b>18</b>.Does the property have any of the following?<span>Select all that apply</span> <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <div className='content5-inp2-div'>
                            <input className='content5-inp2' type="text" value="Swimming Pool" />
                            <input className='content5-inp2' type="text" value="Sauna" />
                            <input className='content5-inp2' type="text" value="Hot Tub" />
                            <input className='content5-inp2' type="text" value="Solarium" />
                            <input className='content5-inp2' type="text" value="Server room" />
                        </div>
                        <br /><br />
                        <label htmlFor=""><b>19</b>.Does the property have any live-in staff?
                        </label><br /><br />
                        <select className='home-content3-select1' name="" id="">
                            <option value="1">Select Option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <br /><br />

                        <label htmlFor=""><b>20</b>.Do you have any rennovations planned this year or next year ?<FontAwesomeIcon icon={faAsterisk} size='2xs' color='red' margi></FontAwesomeIcon>
                        </label><br /><br />
                        <div className='content5-inp3-div'>
                            <input className='content5-inp3' type="text" value="YES" />
                            <input className='content5-inp3' type="text" value="NO" />

                        </div><br /><br />

                        <label htmlFor=""><b>21</b>.Does the property have any significant land attached?
                            <span className='content3span1'>(Use slider below)</span></label><br /><br />
                        <div className='content5-inp3-div'>
                            <input className='content5-inp3' type="text" value="YES" />
                            <input className='content5-inp3' type="text" value="NO" />

                        </div><br /><br />

                        <label htmlFor=""><b>22</b>.Please provide some details on the land and any livestock.</label><br /><br />
                        <textarea className='content5-textarea1' name="" id="" cols="30" rows="10"></textarea><br /><br />

                        <label style={{ letterSpacing: '-1px' }} htmlFor=""><b>23</b>.Is there anything else you would like to teel us?For example, what <br />
                            measures you have taken to imporove the sustainability of your home?Have <br />
                            you had any challenge in doing so?Has the building has been develped to <br />
                            meet a particular environment standard (Passivhaus standards etc)? do you <br /> use heat pump?
                        </label><br /><br />
                        <textarea className='content5-textarea2' name="" id="" cols="30" rows="10"></textarea>
                        <br /><br />
                    </form>
                    <div className='content6-btns'>
                        <button className='content6-btns-btn1'>Save</button>
                        <button className='content6-btns-btn2' >Continue</button>
                        
                    </div>
                </div>
                    </form>

            </div>
            <Footer />
        </div>
    )
}

export default YourHome
