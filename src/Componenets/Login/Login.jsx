import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import login_img from '../Assets/login_img.png'
import { Formik, useFormik } from 'formik'
import './Login.css'
import { signUpSchema } from '../schema'
import axios from 'axios'
import { Button, Modal } from 'antd';
import Layout from '../Layout/Layout'

const initialValues1 = {
    email: '',
    password: ''
}
// const initialValues2 = {
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     confirm_password: '',
// }

const Login = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalcontent, setmodalcontent] = useState(false);
    const showModal = (content) => {
        setmodalcontent(content)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues1,
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            console.log(" form ki value", values)
        }
    })
    const getformdata = async (event) => {
        event.preventDefault();
        console.log(" login data", { email, password })
        try {
            const apiUrl = 'http://192.168.0.129:8000/api/login';

            const response = await axios.post(apiUrl, { email: email, password: password });

            console.log('Response:', response.data.data.token);
            const token = response.data.data.token

            localStorage.setItem('token', token)

            showModal("Successfully login");
        } catch (error) {

            console.error('Error:', error.message || 'An error occurred during the POST request.');
            // if (error.response && error.response.status === 400) {
            //     // Bad request
            //     toast.error('Bad request. Please check your credentials.');
            // } else {
            //     // Other errors
            //     console.error('Error:', error.message || 'An error occurred during the POST request.');
            // }
            showModal("Please check your Credentials.");
        }
    }

    const getregisterdata = async (event) => {
        event.preventDefault();
        console.log("register form ki value", values)
        try {

            // const token = localStorage.getItem('token');

            // // Set headers in the configuration object, including the token
            // const config = {
            //     headers: {
            //         'Content-Type': 'application/json', // Set your desired content type
            //         'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            //         // Add any other headers as needed
            //     },
            // };

            const apiUrl1 = 'http://192.168.0.129:8000/api/register';
            const response = await axios.post(apiUrl1,
                {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password,
                    role: 2
                })
            console.log("registration ka data", response.data.data)
            alert("Regsitartion has been done")

        }
        catch (error) {
            console.log('Error:', error.message || 'An error occured during the post request.')
        }
    }


    const [activebtn, setactivebtn] = useState('signIn')

    const handlesignInBtn = (e) => {
        console.log("signIn value", e.target.value)
    }

    const handbuttonclick = (buttontype) => {
        setactivebtn(buttontype);
    }


    const [first_name, setfirstname] = useState('');
    const [last_name, setlastname] = useState('');
    const [email2, setemail2] = useState('');
    const [rpassword, setrpassword] = useState('');
    const [confirm_password, setconfirm_password] = useState('');

    return (
        <>
        <Navbar transparent={false}/>
        <section className="welcome-sec">
            <div className='container'>

                <div className='login-content'>
                    <div className='text-outer'>
                        <div className='text-col'>
                            <div className='login-btns'>
                                <button className={`btn1-login ${activebtn === 'signIn' ? 'active' : ''} ` }  onClick={() => handbuttonclick('signIn')}
                                    style={{ color: activebtn === "signIn" ? '#81c134' : '#cad2c5' }}
                                >Sign In</button>&emsp;
                                <button className={`btn2-login ${activebtn === 'register' ? 'active' : ''} ` } onClick={() => handbuttonclick('register')}
                                    style={{ color: activebtn === "register" ? '#81c134' : '#cad2c5' }}
                                >Register</button>
                            </div>


                            {activebtn === "signIn" ? (<>
                                <p className='p1'>Admin port login <a href="#">here</a></p>
                                <p className='p2'>Welcome back</p> 
                                <p className='p3'>Sign in to continue</p>
                                <form className='signInform' onSubmit={getformdata}>
                                    <input type="email" placeholder='Email Address' name='email' value={email} onChange={(e) => setemail(e.target.value)} /> 
                                    <input type="password" placeholder='Password' name='password' value={password} onChange={(e) => setpassword(e.target.value)} />

                                    <span ><p className='p4'>Forgot your password?</p></span>
                                    <button className='formbtn btn' type='submit' onClick={getformdata}>Sign in</button>
                                </form></>) :

                                activebtn === "register" ? (<> <p className='p2'> Register Page</p>
                                    <form className='registerform' onSubmit={handleSubmit}>
                                        <input type="text" placeholder='Enter your first name' name='first_name' value={values.first_name} onChange={handleChange} onBlur={handleBlur} /> 
                                        {errors.first_name && touched.first_name ? (<p style={{ color: 'red', fontSize: '20px' }}>{errors.first_name}</p>) : null}
                                        <input type="text" placeholder='Enter your last name' name='last_name' value={values.last_name} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.last_name && touched.last_name ? (<p style={{ color: 'red', fontSize: '20px' }}>{errors.last_name}</p>) : null}
                                       

                                        <input type="text" placeholder='Enter your email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.email && touched.email ? (<p style={{ color: 'red', fontSize: '20px' }}>{errors.email}</p>) : null}
                                     

                                        <input type="password" placeholder='Enter your password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.password && touched.password ? (<p style={{ color: 'red', fontSize: '20px' }}>{errors.password}</p>) : null}
                                       

                                        <input type="password" placeholder='Enter your password' name='confirm_password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.confirm_password && touched.confirm_password ? (<p style={{ color: 'red', fontSize: '20px' }}>{errors.confirm_password}</p>) : null}
                                       

                                        <span ><p className='p4'>Forgot your password?</p></span>
                                        <button className='formbtn btn' type='submit' onClick={getregisterdata}>Register</button>
                                    </form></>) :

                                    (<>
                                        <p className='p1'>Admin port login <a href="#">here</a></p>
                                        <p className='p2'>Welcome back</p>
                                        <p className='p3'>Sign in to continue</p>
                                        <form className='signInform'>
                                            <input type="text" placeholder='Email Address' name='email' value={email} onChange={(e) => setemail(e.target.value)} />
                                            <input type="password" placeholder='Password' name='password' value={password} onChange={(e) => setpassword(e.target.value)} />

                                            <span ><p className='p4'>Forgot your password?</p></span>
                                            <button className='formbtn btn' type='submit' onClick={()=>getformdata}>Sign in</button>
                                        </form></>)

                            }


                        </div>
                    </div>
                    <div className='login-img'>
                        <img src={login_img} alt="" />
                    </div>
                </div>
            </div>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                style={{}}

            >
                <p>{modalcontent}</p>

            </Modal>
        </section>
        <Footer/>
        </>
    )
}

export default Login
