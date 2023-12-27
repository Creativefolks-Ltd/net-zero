import React from "react";
import food_img from "../assets/images/food_img.png";
import FormActionTabs from "../components/FormActionTabs";

const FoodAndShopping = () => {
  return (
    <>
      <FormActionTabs  selectedTab={"food"}/>
      <form>
        <section class="food-shopping top">
          <div className="container">
          <div className="sub-heading">
            <h2>Food and shopping</h2>
            </div>
            <div className="bg-color">
              <div className="card card-par">
                <p>
                  Fields marked with an <span>*</span> are required
                </p>
                <div className="Additional-box">
                  <label htmlFor="forest_or_farmland_details">
                    <strong>1.</strong>
                    Please give details of any vehicles purchased in the
                    selected year, such as cars or boats. Please specify the
                    relevant details, such as number and type. You do not need
                    to include second-hand or refurbished vehicles. Please also
                    include vehicles purchased by your household members.
                    <span>*</span>
                  </label>
                  <textarea
                    id="forest_or_farmland_details"
                    name="forest_or_farmland_details"
                    rows="6"
                    className="form-control"
                    cols="50"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="food-shopping">
          <div className="container">
          <div className="sub-heading">
            <h2>Additional information</h2>
            </div>
            <div className="bg-color">
              <div className="card">
                <div className="Additional-box">
                  <div className="form-div">
                    <p>
                      This section is optional, however it will allow us to make
                      your carbon footprint more complete and your
                      recommendations more specific.
                    </p>
                    <label htmlFor="forest_or_farmland_details">
                      <strong>2.</strong>
                      Please give details of any vehicles purchased in the
                      selected year, such as cars or boats. Please specify the
                      relevant details, such as number and type. You do not need
                      to include second-hand or refurbished vehicles. Please
                      also include vehicles purchased by your household members.
                    </label>
                    <textarea
                      id="forest_or_farmland_details"
                      name="forest_or_farmland_details"
                      rows="6"
                      className="form-control"
                      cols="50"
                    ></textarea>
                  </div>

                  <div className="form-div">
                    <div class="form-label-div">
                      <label htmlFor="other_dependants">
                        <strong>3. </strong> On average, how many new pieces of
                        clothing do you buy each quarter?
                      </label>
                    </div>
                    <select className="form-control ">
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="form-div">
                    <div class="form-label-div">
                      <label htmlFor="other_dependants">
                        <strong>4. </strong> Do you have any domestic pets or
                        animals??
                      </label>
                    </div>
                    <select className="form-control ">
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="form-div">
                    <label htmlFor="forest_or_farmland_details">
                      <strong>4b.</strong>
                      Please specify, e.g. number, breed
                    </label>
                    <textarea
                      id="forest_or_farmland_details"
                      name="forest_or_farmland_details"
                      rows="6"
                      className="form-control"
                      cols="50"
                    ></textarea>
                  </div>

                  <div className="form-div">
                    <div class="form-label-div">
                      <label htmlFor="other_dependants">
                        <strong>5. </strong> How often does your diet include
                        meat-based meals?
                      </label>
                    </div>
                    <select className="form-control ">
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="form-div">
                    <div class="form-label-div">
                      <label htmlFor="other_dependants">
                        <strong>6. </strong> How often does your diet include
                        dairy?
                      </label>
                    </div>
                    <select className="form-control ">
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="form-div">
                    <div class="form-label-div">
                      <label htmlFor="other_dependants">
                        <strong>7. </strong> Thinking about the food you buy,
                        which of the following statements applies?
                        <p>
                          (The average household throws away 16% of their
                          purchased food).
                        </p>
                      </label>
                    </div>
                    <select className="form-control ">
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div class="form-div">
                    <label for="www">
                      <strong>8.</strong>Please enter any information about the
                      diet and clothes purchases of your partner and dependents,
                      where relevant.
                    </label>
                    <ul>
                      <li class="main-li">
                        Please answer in terms of how often they eat meat and
                        dairy, and how many clothes they buy per quarter.{" "}
                      </li>
                      <li class="main-li">
                        If no information is supplied, we will assume the same
                        diet and clothes shopping patterns for other family
                        members.
                      </li>
                    </ul>
                    <textarea
                      id="forest_or_farmland_details"
                      name="forest_or_farmland_details"
                      rows="6"
                      className="form-control"
                      cols="50"
                    ></textarea>
                  </div>
                  

                  <div class="form-div">
                    <label for="www">
                      <strong>9.</strong>Do you have any plans to host or
                      organise any large events this year or next year?
                    </label>
                    <ul>
                      <li class="main-li">
                        This question only applies for submissions for the
                        latest full calendar year.{" "}
                      </li>
                      <li class="main-li">
                        This is not essential for the calculation of your carbon
                        footprint, but allows us to give you tailored,
                        forward-looking recommendations.
                      </li>
                    </ul>
                    <select className="form-control ">
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div class="form-div">
                    <label for="www">
                      <strong>9b. </strong>Please provide more details
                    </label>
                    
                    <textarea
                      id="forest_or_farmland_details"
                      name="forest_or_farmland_details"
                      rows="6"
                      className="form-control"
                      cols="50"
                    ></textarea>
                  </div>
                  
                </div>
                 <div className="Additional-bottom-btn">
                    <button className="btn" type="submit">
                      Save progress
                    </button>
                    <button className="btn" type="button">
                      Continue
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default FoodAndShopping;
