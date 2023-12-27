import React from "react";
import form_user from "../assets/images/form_user.svg";
import delete2_img from "../assets/images/delete2_img.svg";
import share_img from "../assets/images/share_img.svg";
import tick_img from "../assets/images/tick_img.svg";
import arrow_img from "../assets/images/arrow_img.svg";




const MyAccount = ()=>{

return(
    <>
    <section className="Personal-information">
        <div className="container">
            <h1>My account</h1>
            <div className="row">
                <div className="col-lg-6">
                  <div className="information-box">
                    <div class="personal-heading">
                    <img src={form_user} alt="" />
                    <h2>Personal information</h2>
                    </div>
                    <form>
                    <div class="form-div">
                        <label htmlFor="text">Your name</label>
                        <input type="text" name="" placeholder="First name" />
                    </div>
                    <div class="form-div">
                        <label htmlFor="text">Last name</label>
                        <input type="text" name="" placeholder="Last name" />
                    </div>
                    <div class="form-div">
                        <label htmlFor="email">Your email address</label>
                        <input type="email" name="" placeholder="Email address" />
                    </div>
                    <div class="form-div">
                        <label htmlFor="paddword">Your password</label>
                        <input type="password" name="" placeholder="************" />
                    </div>
                    <button class="submit-btn " type="submit">Save</button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6">

                    <h2>Accordions</h2>

                    <div class="accordion" id="regularAccordionRobots">

                    <div class="accordion-item">
                        <h2 id="regularHeadingFirst" class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#regularCollapseFirst" aria-expanded="true" aria-controls="regularCollapseFirst">
                        1.Latest form 
                        </button>
                        </h2>
                        <div id="regularCollapseFirst" class="accordion-collapse collapse show" aria-labelledby="regularHeadingFirst" data-bs-parent="#regularAccordionRobots">
                        <div class="accordion-body">
                           <div className="accordion-content">
                               <div className="title-accodion">
                                   <span>Form submitted</span>
                                   <a href="#">View form</a>
                               </div>
                               <div className="accordion-img">
                                  <img src={share_img} alt="" />
                                  <img src={delete2_img} alt="" />
                               </div>
                           </div>
               

                        </div>
                        </div>
                    </div>

                    <div class="accordion-item"> 
                        <h2 class="accordion-header" id="regularHeadingSecond">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#regularCollapseSecond" aria-expanded="false" aria-controls="regularCollapseSecond">
                            The Social Impact of Collective Artificial Intelligence
                        </button>
                        </h2>
                        <div id="regularCollapseSecond" class="accordion-collapse collapse" aria-labelledby="regularHeadingSecond" data-bs-parent="#regularAccordionRobots">
                        <div class="accordion-body">
                            Throughout history, robots have both embraced and rejected the act of working with other robots in a collective. While science has shown that collective artificial intelligence helps both intellectual and technological development, it has also shown that some robots really want to just be and think by themselves. How do we harness the benefits of both while avoiding the downfall of each?
                        </div>
                        </div>
                    </div>

                    </div>

                </div>
            </div>
        </div>

    </section>
    </>
)
}
export default MyAccount