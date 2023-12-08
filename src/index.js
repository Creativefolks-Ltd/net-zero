import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from './Componenets/Homepage/Homepage';
import Layout from './Componenets/Layout/Layout';
import Login from './Componenets/Login/Login'; 
import My_Account_Dashboard from './Componenets/My_Account_Dashboard/My_Account_Dashboard';
// import 'react-modal/styles.css';
import "./index.css"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Admin_Dashboard from './Componenets/Admin_Dashboard/Admin_Dashboard';
import UploadFormWindow from './Componenets/UploadFormWindow/UploadFormWindow';
import AdminViewForm from './Componenets/AdminViewForm/AdminViewForm';
import Modal from './Componenets/Modal/Modal_Popup';
import General_info from './Componenets/General_Info/General_info';
import YourHome from './Componenets/YourHome/YourHome';
import Travel from './Componenets/Travel/Travel';
import Food from './Componenets/Food/Food';
import Finance from './Componenets/Finance/Finance';
import Confirmation_page from './Componenets/Confirmation_page/Confirmation_page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Homepage />} />
      <Route path='/loginpage' element={<Login />} />
      <Route path='/my_acc_dashboard' element={<My_Account_Dashboard />} />
      <Route path='/admin_dashboard' element={<Admin_Dashboard/>}/>
      <Route path ="/uploadformwindow" element={<UploadFormWindow/>}/>
      <Route path ="/admin_view_form" element={<AdminViewForm/>}/>
      <Route path="/moda_l" element={<Modal/>}/>
      <Route path="/general_info" element={<General_info/>} />
      <Route path="/your-home" element={<YourHome/>} />
      <Route path="/travel" element={<Travel/>}/>
      <Route path="/food" element={<Food/>} />
      <Route path="/finance" element={<Finance/>} />
      <Route path="/confirm" element={<Confirmation_page/>} />
    </Route> 
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
