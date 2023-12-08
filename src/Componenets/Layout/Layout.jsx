import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Login from '../Login/Login'

const Layout = () => {
  return (
    <div>
      {/* <div className='navbar'>
        <ul>
          <li> <NavLink to="/homepage">homepage</NavLink></li>
          <li> <NavLink to="/loginpage">loginpage</NavLink></li>
          <li><NavLink to="/my_acc_dashboard">Account Dashboard</NavLink></li>
          <li><NavLink to="/admin_dashboard">Admin Dashboard</NavLink></li>
          <li><NavLink to="/uploadformwindow">Upload Form Window</NavLink></li>
          <li><NavLink to="/admin_view_form">Admin View Form</NavLink></li>
          <li><NavLink to="/moda_l">Modal</NavLink></li>
          <li><NavLink to="/General_info">General Info</NavLink></li>
          <li><NavLink to="/your-home">YourHome</NavLink></li>  
          <li><NavLink to="/travel">Travel</NavLink></li>
          <li><NavLink to="/food">Food</NavLink></li>
          <li><NavLink to="/finance">Finance</NavLink></li>
          <li><NavLink to="/confirm">Confirm</NavLink></li>

        </ul>
      </div>
      <main>
        <Outlet></Outlet>
      </main> */}

   <Navbar/>
   <div className="content">
    <Outlet></Outlet>
   </div>
   <Footer/>
    </div>
  )
}

export default Layout
