import React from "react";
import FormActionTabs from "../components/FormActionTabs";
import travel_img from "../assets/images/travel_img.png";

const Travel = () => {
  return (
    <>
      <FormActionTabs selectedTab={"travel"}/>
      <form>
        <section className="economy-table">
          <div className="container">
          <div className="sub-heading">
            <h2>Travel</h2>
            </div>
            <div className=" bg-color">
              <div className="card card-par">
                <p>
                  Fields marked with an <span>*</span> are required
                </p>
                <div class="form-div">
                  <label for="www">
                    <strong>1.</strong>How many flights did you take in the
                    selected year?<span>*</span>
                  </label>
                  <ul>
                    <li class="main-li">
                      Please include all flights you took in a personal capacity
                      (i.e. not for a business you work for).{" "}
                    </li>
                    <li class="main-li">
                      Include return flights as two flights and use the
                      following guide for length:​
                      <ul class="inner-li">
                        <li>
                          Short flights: shorter than 3,000 km or 4 hours​
                        </li>
                        <li>
                          Medium flights: 3,000 to 7,000 km or 4 to 10 hours​
                        </li>
                        <li>
                          Long flights: 7,000 to 12,000 km or 10 to 14 hours
                        </li>
                        <li>
                          Extended flights: longer than 12,000 km or 14 hours
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="economy-row-main">
                  <div className="economy-row">
                    <div className="label-block">Short Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="economy-row">
                    <div className="label-block">Medium Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="economy-row">
                    <div className="label-block">Long Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="economy-row">
                    <div className="label-block">Extended Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-div">
                  <label for="www">
                    <strong>2.</strong>What proportion of your flights do you
                    offset ?<span>*</span>
                    <p>(estimated % by distance)</p>
                  </label>
                  <input
                    type="text"
                    name="www"
                    id="www"
                    class="form-control undefined"
                    placeholder=""
                    value=""
                  />
                </div>

                <div className="form-div">
                  <div class="form-label-div">
                    <label htmlFor="other_dependants">
                      <strong>3. </strong> How many cars do you use ?
                      <span>*</span>
                    </label>
                  </div>
                  <select className="form-control ">
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="modal-row-main">
                  <div className="modal-row">
                    <div className="modal-label-block">Car 1</div>
                    <div className="modal-input-block">
                      <div className="modal-input-row">
                        <div class="modal-input-col">
                          <label>Make & Model</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Make & Model</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>KMs in selected year</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-row">
                    <div className="modal-label-block">Car 2</div>
                    <div className="modal-input-block">
                      <div className="modal-input-row">
                        <div class="modal-input-col">
                          <label>Make & Model</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Vehicle Type</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>KMs in selected year</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="economy-table economy-table-tow">
          <div className="container">
          <div className="sub-heading">
            <h2>Additional information</h2>
            </div>
            <div className=" bg-color">
              <div className="card">
                <div class="form-div">
                  <label for="www">
                    <strong>4.</strong> How many flights did your
                    partner/children take in the selected year?
                  </label>
                  <ul>
                    <li class="main-li">
                      For private flights, please only include any additional
                      private flights taken by family members that you were not
                      on. If multiple family members were on the same flight,
                      this is considered one flight.{" "}
                    </li>
                    <li class="main-li">
                      Include return flights as two flights and use the
                      following guide for length:​​
                      <ul class="inner-li">
                        <li>
                          Short flights: shorter than 3,000 km or 4 hours​
                        </li>
                        <li>
                          Medium flights: 3,000 to 7,000 km or 4 to 10 hours​
                        </li>
                        <li>
                          Long flights: 7,000 to 12,000 km or 10 to 14 hours
                        </li>
                        <li>
                          Extended flights: longer than 12,000 km or 14 hours
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="economy-row-main">
                  <div className="economy-row">
                    <div className="label-block">Short Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="economy-row">
                    <div className="label-block">Medium Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="economy-row">
                    <div className="label-block">Long Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="economy-row">
                    <div className="label-block">Extended Flights</div>
                    <div className="input-block">
                      <div className="input-row">
                        <div class="input-col">
                          <label>Economy</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Business</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>First Class</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                        <div class="input-col">
                          <label>Private</label>{" "}
                          <input type="text" placeholder="00" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-div">
                  <label for="www">
                    <strong>5.</strong>What proportion of these flights did you
                    offset?
                    <p>(estimated % by distance)</p>
                  </label>
                  <input
                    type="text"
                    name="www"
                    id="www"
                    class="form-control undefined"
                    placeholder=""
                    value=""
                  />
                </div>

                <div className="form-div">
                  <div class="form-label-div">
                    <label htmlFor="other_dependants">
                      <strong>6. </strong> How many additional vehicles used by
                      your partner/children?
                    </label>
                  </div>
                  <select className="form-control ">
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="modal-row-main">
                  <div className="modal-row">
                    <div className="modal-label-block">Car 1</div>
                    <div className="modal-input-block">
                      <div className="modal-input-row">
                        <div class="modal-input-col">
                          <label>Make & Model</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Make & Model</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>KMs in selected year</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-row">
                    <div className="modal-label-block">Car 2</div>
                    <div className="modal-input-block">
                      <div className="modal-input-row">
                        <div class="modal-input-col">
                          <label>Make & Model</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Vehicle Type</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>KMs in selected year</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/********checkbox********/}

                <div class="checkbox-btn">
                  <div className="form-div">
                    <div class="form-label-div">
                      <label htmlFor="other_dependants">
                        <strong>7. </strong> Did you use any other form of
                        transport in the selected year?
                      </label>
                    </div>
                    <div className="sub-btn">
                      <div class="check-input">
                        <input type="checkbox" name="" />
                        <label>Motorbike</label>
                      </div>
                      <div class="check-input">
                        <input type="checkbox" name="" />
                        <label>Bicycle</label>
                      </div>

                      <div class="check-input">
                        <input type="checkbox" name="" />
                        <label>Passenger Ferry</label>
                      </div>
                      <div class="check-input">
                        <input type="checkbox" name="" />
                        <label>Train</label>
                      </div>

                      <div class="check-input">
                        <input type="checkbox" name="" />
                        <label>Private Yacht</label>
                      </div>
                      <div class="check-input">
                        <input type="checkbox" name="" />
                        <label>
                          Private hire vehicles (taxis, transfers, limos, etc)
                        </label>
                      </div>
                      <div class="check-input">
                        <input type="checkbox" name="" />
                        <label>Helicopter</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-row-main">
                  <div className="modal-row">
                    <div className="modal-label-block">Motorbike</div>
                    <div className="modal-input-block">
                      <div className="modal-input-row">
                        <div class="modal-input-col">
                          <label>My KMs</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Notes</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Partner/children KMs</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-row">
                    <div className="modal-label-block">Train</div>
                    <div className="modal-input-block">
                      <div className="modal-input-row">
                        <div class="modal-input-col">
                          <label>My KMs</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Notes</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Partner/children KMs</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-row">
                    <div className="modal-label-block">Private hire</div>
                    <div className="modal-input-block">
                      <div className="modal-input-row">
                        <div class="modal-input-col">
                          <label>My KMs</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Notes</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                        <div class="modal-input-col">
                          <label>Partner/children KMs</label>{" "}
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Additional-box">
                  <div class="form-div">
                    <label for="www">
                      <strong>5. </strong>
                      How many nights did you spend in hotels, rentals, Airbnb,
                      etc that you paid to stay in but do not own in the
                      selected year? Please include stays in Mettingen.
                    </label>
                    <input
                      type="text"
                      name="www"
                      id="www"
                      class="form-control undefined"
                      placeholder=""
                      value=""
                    />
                  </div>
                  <label htmlFor="forest_or_farmland_details">
                    <strong>9.</strong>
                    Is there any other travel information that you would like to
                    tell us about (e.g. family stays in hotels, spend on
                    transport-related services not otherwise included)? If you
                    use more than three cars, please also add details of
                    distance traveled here.
                  </label>
                  <textarea
                    id="forest_or_farmland_details"
                    name="forest_or_farmland_details"
                    rows="6"
                    className="form-control"
                    cols="50"
                  ></textarea>

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
          </div>
        </section>
      </form>
    </>
  );
};

export default Travel;
