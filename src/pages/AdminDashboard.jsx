import React from "react";
import form_user from "../assets/images/form_user.svg";


const AdminDashboard = () => {
  return (
    <>
      <form>
        <section className="Personal-information ">
          <div className="container">
            <h1>Admin Dashboard</h1>
            <div className="row admin-dashboard">
              <div class="personal-heading">
                <img src={form_user} alt="" />
                <h2>Personal information</h2>
              </div>
              <div className="col-lg-6">
                <div className="information-box">
                  <div class="form-div">
                    <label htmlFor="text">Your name</label>
                    <input type="text" name="" placeholder="First name" />
                  </div>
                  <div class="form-div">
                    <label htmlFor="email">Your email address</label>
                    <input type="email" name="" placeholder="Email address" />
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="information-box">
                  <div class="form-div">
                    <label htmlFor="text">Last name</label>
                    <input type="text" name="" placeholder="Last name" />
                  </div>
                  <div class="form-div">
                    <label htmlFor="paddword">Your password</label>
                    <input type="password" name="" placeholder="************" />
                  </div>
                </div>
              </div>
              <button class="submit-btn " type="submit">
                Save
              </button>
            </div>
          </div>
        </section>
      </form>

     
        <section className="submissions">
            <div className="container">
                <div className="submissions-bg-color">
            <div className="submissions-header">
            <div class="personal-heading">
                <img src={form_user} alt="" />
                <h2>Submissions</h2>
              </div>
              <div className="submissions-header-btn">
              <button class="submit-btn " type="submit">
              Create new user
              </button>
              <button class="submit-btn " type="submit">
              Upload CSV form
              </button>
              </div>
            </div>
            <div class="information-box">
            <form>
            <div className="submission-form">
           
            <div class="form-div">
                        <label htmlFor="text">Search submitted forms by user email address.</label>
                        <input type="text" name="" placeholder="First name" />
                    </div>
                    <button class="submit-btn " type="submit">
              Upload CSV form
              </button>
            </div>
              </form>
          <table class="customers" style={{borderRadius:'20px'}}>
              <tr style={{borderRadius:'20px'}}>
                <th style={{width:'25%'}}>Form name</th>
                <th style={{width:'50%'}}>User email address</th>
                <th style={{width:'25%'}}></th>
              </tr>
              <tr>
                <td>My form name</td>
                <td>myfullnameexample@emailaddress.co.uk</td>
                <td>View form</td>
              </tr>
              <tr>
                <td>My form name</td>
                <td>myfullnameexample@emailaddress.co.uk</td>
                <td>View form</td>
              </tr>
              <tr>
                <td>My form name</td>
                <td>myfullnameexample@emailaddress.co.uk</td>
                <td>View form</td>
              </tr>
          </table>
            </div>
            </div>  
            </div>
        </section>
      
    </>
  );
};
export default AdminDashboard;
