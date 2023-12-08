import React, { useState } from 'react'
// import './General_info.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { CountryRegionData } from 'react-country-region-selector'
import Select from 'react-select';
import { Formik, useFormik } from 'formik'
import { signUpSchema } from '../schema'

const initialValues={
fname:'',
lname:'',
email:'',
confirm_email:'',
year:'',
selectedCountry:'',
homes:'',
second_home:'',
third_home:'',
btn1:'',
btn2:'',
no_of_child:'',
input_9:'',
textarea:'',
}

const General_info = () => {

  const {values,errors,touched,handleBlur,handleChange,handleSubmit}= useFormik({
    initialValues:initialValues,
    validationSchema:signUpSchema,
    onSubmit:(values)=>{
      alert();
      console.log("general form value",values)
    }
    
  })
  

  // validation
  const emailhandle=(event)=>{
    const emailvalue=event.target.value;
    const emailreg="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  }

  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };
  const countryOptions = CountryRegionData.map((country) => ({
    value: country[0],
    label: country[0],
  }));
  const [isActive,setisActive]=useState(false);
  const handleClick=() =>{
    setisActive(!isActive)
  }
  const [value9,setValue9]=useState();
  const getvalue9Func=(event)=>{
    const value = event.target.value;
    setValue9(value)
    console.log("event9 ki value",value9)
  }
  const onSubmit=(input)=>{
    console.log("general form data",input)
  }

  return (
    <div className='container'>

      <Navbar />
      <div className="general-content">
        <div className="sub-head">
          <div className="header-div">
            <div className="pic">

              <FontAwesomeIcon className={`pic1 ${isActive? 'active':''} `} onClick={handleClick} icon={faUser} size='5x' color='#2c2b34'></FontAwesomeIcon><br />
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

        <h1 className='gen-h1'>General Information</h1>
          <form onSubmit={handleSubmit}>
        <div className="sub-content1">
          <p className='p1' >Fields marked with an <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon> are required</p>
            <label htmlFor="">1.Name <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon></label><br />
            <div className="content1-inp1-name">
              <div>
              <input className='content1-inp1' type="text" placeholder='First Name' name='fname' value={values.fname} onChange={handleChange} onBlur={handleBlur} /><br />
              {errors.fname && touched.fname ? (<p style={{color:'red' ,fontSize:'22px'}} > {errors.fname}</p>):null}
              {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, necessitatibus.</p> */}
              </div>
             <div>
               <input className='content1-inp1' type="text" placeholder='Last Name' name='lname' value={values.lname} onChange={handleChange} onBlur={handleBlur} /><br />
              { errors.lname &&  touched.lname ? (<p className='form-error' style={{color:'red' ,fontSize:'22px'}}>{errors.lname}</p>) :null}
              {/* <p>Lorem ipsum, dolor sit amet  cumque sit quasi laudantium alias! In, quisquam quibusdam.</p> */}
             </div>
            </div><br />
            
            <div className="content1-inp1">
            <label htmlFor="">2.Email <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon></label><br /><br />
            
              <input className='inp-text' type="text" placeholder='Email address' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} /><br />
              { errors.email &&  touched.email ? (<p className='form-error' style={{color:'red' ,fontSize:'22px'}}>{errors.email}</p>) :null}
            </div><br />

            <div className="content1-inp1">
            <label htmlFor="">3.Email Confirmation <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon></label><br />
              <input className='inp-text' type="text" placeholder='Re-enter you email address' name='confirm_email' value={values.confirm_email} onChange={handleChange} onBlur={handleBlur} /><br />
              { errors.confirm_email &&  touched.confirm_email ? (<p className='form-error' style={{color:'red' ,fontSize:'22px'}} >{errors.confirm_email}</p>) :null}
            </div><br />
            <div className="content1-inp1">
            <label htmlFor="">4.Year <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon></label><br />
              <input className='inp-text' type="date" name='year' value={values.year} onChange={handleChange} onBlur={handleBlur}  placeholder='Please enter the calendar year you woud like to input information for' /><br />
              {errors.year && touched.year ? (<p style={{color:'red' ,fontSize:'22px'}}>{errors.year}</p>) :null}
            </div><br /><br />
            <div className="inp1">
              <div className="subinp">
                <label htmlFor="">5.Country of primary residence</label>
                <Select className='select1'
                  id="country"
                  options={countryOptions}
                  name='selectedCountry'
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  onBlur={handleBlur}
                /> <br />
              {errors.selectedCountry && touched.selectedCountry ? (<p style={{color:'red' ,fontSize:'22px',marginTop:'100px'}}>{errors.selectedCountry} Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, nulla!
              </p>) :null}
              {/* <p style={{color:'red' ,fontSize:'22px',marginTop:'100px'}}>   jhuifhnejkrgc</p> */}
              </div>

              <div className="subinp">
                <label htmlFor="">6.How many homes do you own?</label><br />
                <select className='select2' name='homes' value={values.homes} onChange={handleChange} onBlur={handleBlur}>
                  <option value="1">--select--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {errors.homes && touched.homes ? (<p style={{color:'red' ,fontSize:'22px'}} >{errors.homes}</p>):null}
              </div>
            </div><br /><br />
            <div className="inp1">
              <div className="subinp">
                <label htmlFor="">6b.Second home country?</label>
                <Select className='select3'
                  id="country"
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                />
              </div>
              <div className="subinp">
                <label htmlFor="">6c.Third home country?</label>
                <Select className='select4'
                  id="country"
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleChange}
                />
              </div>
            </div><br /><br />
            <label htmlFor="">7.Do you live with your partner ?`  <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon></label><br />
            <div className="inp1">
              <div className="inp-btnss">

                <button className='inp-btn' value={values.btn1} onChange={handleChange} onBlur={handleBlur} >YES</button>
                <button className='inp-btn' value={values.btn2} onChange={handleChange} onBlur={handleBlur} >NO</button>
              </div>
            </div><br /><br />
            <label htmlFor="">8.How many children under 18 living with you? <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon></label><br />
            <div className="content1-inp1">
              <select className='select5' name='no_of_child' value={values.no_of_child} onChange={handleChange} onBlur={handleBlur} >
                <option value="1">--select--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select><br />
              {errors.no_of_child && touched.no_of_child ? (<p style={{color:'red' ,fontSize:'22px'}} >{errors.no_of_child}</p>):null}
            </div>
            <br /><br />
            <div className="content1-inp1">
            <label htmlFor=""><b>9</b>.Do you have any other dependants who live with you all the time or most of the time? <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon><span className='gen-span'>(grand-parents etc)</span></label><br />
              <select className='select5' name='input_9' value={values.input_9} onChange={handleChange} onBlur={handleBlur}>
                <option value="">--select--</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select><br />
              {errors.input_9 && touched.input_9 ? (<p style={{color:'red' ,fontSize:'22px'}} >{errors.input_9}</p>):null}

            </div>
            <br />
           {values.input_9 ==="Yes" ? (<><label htmlFor=""><b>9b</b>.Please specify? <FontAwesomeIcon icon={faAsterisk} size='2xs' color='red'></FontAwesomeIcon></label><br />
            <div className="inp1">
              <select className='select5'>
                <option value="1">--select--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <br /></>):null}

        </div>
        
        <h1 className='gen-h2'>Additional information</h1>
        <div className="sub-content2">
          <p className='sub-content2-p1'>This section is optionally,However this section is optional, it will allow <br /> us to make your carbon footprint
          more complete and your <br />recommendations more specific
          </p>
          <label htmlFor=""><b>10</b>.Other than domestic property do you own any forest , farmland or other <br /> not attached to one of your property?
          if so ,please advise size or location </label><br /><br />
          <textarea className='sub-content2-textarea' name='textarea' value={values.textarea} onChange={handleChange} onBlur={handleBlur}></textarea><br /> 
          { errors.textarea && touched.textarea ? (<p  style={{color:'red' ,fontSize:'22px'}} >{errors.textarea}</p>):null} <br />
          
          <br />
          <div className="sub-content2-btns">
          <button type='submit' className='sub-content2-btn1'>Save</button>
          <button className='sub-content2-btn2'>Continue</button>
        </div>
        
        </div>
        
            </form>
       
      </div>
    
      <Footer />
    </div>
  )
}

export default General_info
