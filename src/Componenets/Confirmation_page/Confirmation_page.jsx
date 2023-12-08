import React from 'react'
import './Confirmation_page.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Formik, useFormik } from 'formik'
import { signUpSchema } from '../schema'


const initialValues={
    name:'',
    email:'',
    password:'',
    confirm_password:''
}
const Confirmation_page = () => {

    const {values,errors,handleBlur,handleChange,handleSubmit,touched}=useFormik({
        initialValues:initialValues,
        validationSchema:signUpSchema,
        onSubmit:(value,action)=>{
           console.log("confrimation form data",value)
           action.resetForm();
        }
    })

    return (
        <div className='container'>
            <Navbar />
            <div className="confirm-content">
                <div className="inner-content">
                    <h1>Your Form has been <br />
                        submitted successfully</h1>
                    <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi sapiente in,
                         aperiam magni ipsum tenetur mollitia! Unde id consequuntur doloremque nemo 
                         reiciendis nostrum, maxime architecto, autem, veritatis odio sunt enim.
                    </h3>
                    
                    <div className="confirm-btn">
                    <button className='confirm-btn1'>Start new form</button><br />
                    <button className='confirm-btn2'>Start new form</button>
                    </div>
                   
                </div>
                {/* <div className="contentinner-2nd">
                   <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">name</label><br />
                        <input type="text" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur}/><br />
                        { errors.name && touched.name? (<p className='form-error' style={{color:'red',fontSize:'22px'}} >{errors.name}</p>) :null }
                    </div><br />
                    <div>
                        <label htmlFor="">email</label><br />
                        <input type="text" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} /><br />
                        { errors.email && touched.email? (<p className='form-error'style={{color:'red' ,fontSize:'22px'}} >{errors.email}</p>) :null }
                    </div><br />
                    <div>
                        <label htmlFor="">password</label><br />
                        <input type="text" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} /><br />
                        { errors.password && touched.password? (<p className='form-error' style={{color:'red' ,fontSize:'22px'}} >{errors.password}</p>) :null }
                    </div><br />
                    <div>
                        <label htmlFor="">confirm password</label><br />
                        <input type="text" name='confirm_password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} /><br />
                        { errors.confirm_password && touched.confirm_password? (<p className='form-error' style={{color:'red',fontSize:'22px'}}>{errors.confirm_password}</p>) :null }
                    </div><br />

                    <button>submit</button>
                   </form>
                   
                </div> */}
            </div>
            <Footer />
        </div>
    )
}

export default Confirmation_page
