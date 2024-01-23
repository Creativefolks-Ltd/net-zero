import React, { useState, useEffect, useRef } from "react";
import form_user from "../../assets/images/form_user.svg";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import arrowImg from "../../assets/images/arrow_img.svg"
import share_img from "../../assets/images/download-img.svg";
import missions_img from "../../assets/images/missions_img.svg";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userFormValidation } from "../../helpers/validations/Schema";
import { downloadPdf, formlist } from "../../redux-store/actions/user";
import SuccessImg from "../../assets/images/Group 9106.png";
import Swal from "sweetalert2";
import { ordinalNumbers } from "../../helpers/ordinalNumber";
import { getAdminDetails, getAllForms, updateAdminDetails } from "../../redux-store/actions/admin";
import moment from "moment";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth);
  const formDetails = useSelector((state) => state.admin);
  const isLoading = formDetails.isLoading;
  const allForms = formDetails?.getAllForms?.list;
  const resultcount = formDetails?.getAllForms?.count;
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchByEmail, setSearchByEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const serialNo = (currentPage - 1) * itemsPerPage;
  const userId = admin?.adminDetails?.user_id

  useEffect(() => {
    fetchAdminDetails()
  }, []);

  useEffect(() => {
    const params = { itemsPerPage: itemsPerPage, pageNumber: currentPage, query: searchQuery }
    dispatch(getAllForms(params));
  }, [currentPage, searchQuery]);

  const searchFilter = (e) => {
    setSearchQuery(searchByEmail)
    setCurrentPage(1)
  }

  const formik = useFormik({
    initialValues: {
      first_name: admin?.adminDetails?.first_name,
      last_name: admin?.adminDetails?.last_name,
      email: admin?.adminDetails?.email,
    },
    validationSchema: userFormValidation,
    onSubmit: (values) => { },
  });

  const fetchAdminDetails = async (e) => {
    dispatch(getAdminDetails(userId));
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    const { values, isValid, errors } = formik;
    formik.handleSubmit();

    if (isValid) {
      setDisabled(true);
      const user_id = Number(admin?.userInfo?.user_id);

      const response = await dispatch(updateAdminDetails({ data: values, user_id }));
      setDisabled(false)
      if (!response?.payload?.error && response?.payload?.data) {
        Swal.fire({
          title: "Success!",
          text: "Profile Information saved successfully",
          imageUrl: SuccessImg,
          imageWidth: 100,
          imageHeight: 100,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          didClose: fetchAdminDetails()
        });
      } else {
        const errorMsg = response?.payload?.response?.data?.errorMsg;
        if (errorMsg) {
          let errorMessage = "";
          if (Array.isArray(errorMsg) || typeof errorMsg === 'object') {
            const errorMessages = Object.values(errorMsg).flatMap(messages => messages);
            errorMessage = Array.isArray(errorMessages) && errorMessages.length > 0
              ? errorMessages.join("\n")
              : "";
          } else {
            errorMessage = errorMsg?.toString() || "";
          }
          Swal.fire({
            title: "Failed!",
            html: errorMessage || "Failed to saved profile Information, please try again",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          });
        }
      }
    } else {
      console.error('Form is not valid', errors);
    }
  };


  const handleFileUpload = () => {
    const files = fileInputRef.current.files;
    setLoading(true);
    console.log(files)
    if (files.length > 0) {
      const uploadedFile = files[0];
      setSelectedFile(uploadedFile);
      setTimeout(() => {
        setLoading(false);
        console.log('File processed:', uploadedFile.name);
      }, 1500);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    console.log(droppedFiles)
    if (droppedFiles.length > 0) {
      setSelectedFile(droppedFiles[0]);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log('File processed:', droppedFiles[0].name);
      }, 1500);
    }
  };

  const downloadHandler = async (formId) => {
    try {
      const response = await dispatch(downloadPdf(formId));
      if (response?.payload?.data?.access_url) {
        const link = document.createElement('a');
        link.href = response?.payload?.data?.access_url;
        link.download = 'filename.pdf';
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.log(err, "///////err/////");
    }
  };

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
                    <label htmlFor="first_name">Your name</label>
                    <input type="text" name="first_name" placeholder="First name" className={`${formik.errors.first_name && formik.touched.first_name && "invalidInput"}`} value={formik.values.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.first_name && formik.touched.first_name ? (
                      <span className="input-error-msg">
                        {formik.errors.first_name}
                      </span>
                    ) : null}
                  </div>
                  <div class="form-div">
                    <label htmlFor="email">Your email address</label>
                    <input type="email" name="email" id="email" placeholder="Email address" className={`${formik.errors.email && formik.touched.email && "invalidInput"}`} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? (
                      <span className="input-error-msg">
                        {formik.errors.email}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="information-box">
                  <div class="form-div">
                    <label htmlFor="last_name">Last name</label>
                    <input type="text" name="last_name" id="last_name" className={`${formik.errors.last_name && formik.touched.last_name && "invalidInput"}`} placeholder="Last name" value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.last_name && formik.touched.last_name ? (
                      <span className="input-error-msg">
                        {formik.errors.last_name}
                      </span>
                    ) : null}
                  </div>
                  <div className="manage-password-link-box">
                    <Link to="/manage-password" className="account-link">
                      Manage your password
                    </Link>
                  </div>
                </div>
              </div>
              <button class="submit-btn " type="button" onClick={(e) => submitHandler(e)}>
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
                <img src={missions_img} alt="" />
                <h2>Submissions</h2>
              </div>
              <div className="submissions-header-btn">
                <button class="submit-btn " type="button">
                  <Link to={"/admin/create-user"}>
                    Create new user
                  </Link>
                </button>
                <button class="submit-btn " type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Upload CSV form
                </button>
              </div>
            </div>
            <div class="information-box">
              <form>
                <div className="submission-form">

                  <div class="form-div">
                    <label htmlFor="searchByEmail">Search submitted forms by user email address.</label>
                    <input type="text" name="searchByEmail" value={searchByEmail} id="searchByEmail" placeholder="Email" onChange={(e) => setSearchByEmail(e.target.value)} />
                  </div>
                  <button class="submit-btn " type="button" onClick={(e) => searchFilter(e)}>
                    Submit
                  </button>
                </div>
              </form>


              <table class="customers" style={{ borderRadius: '20px' }}>
                <thead className="table-header">
                  <tr style={{ borderRadius: '20px' }}>
                    <th style={{ width: '25%' }}>Form name</th>
                    <th style={{ width: '50%' }}>User email address</th>
                    <th style={{ width: '25%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (<tr className="text-center"><td colSpan={4}>loading...</td></tr>) :
                    allForms?.length > 0 ? allForms?.map((form, index) => (
                      <tr key={index}>
                        {/* <td>{ordinalNumbers[serialNo + index]} form</td> */}
                        <td>{form?.first_name} {form?.created_at ? "(" + moment(form?.created_at).format("DD/MM/YYYY") + ")" : ""}</td>
                        <td>{form.email}</td>
                        <td className="d-flex justify-content-between table-td">
                          <div className="d-flex justify-content-between align-items-center table-text">
                            <p> <Link to={`/admin/form-view/${btoa(form?.id?.toString())}`}>
                              View form <img src={arrowImg} />
                            </Link> </p>
                          </div>
                          <div class="table-img"> <img src={share_img} width={36} height={44} onClick={() => downloadHandler(form.id)} /></div>
                        </td>
                      </tr>
                    )) : (<tr className="text-center"><td colSpan={4}>Data not found</td></tr>)}
                </tbody>
              </table>

              {!isLoading && resultcount > 0 && (<Pagination dataLength={resultcount} itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />)}

            </div>
          </div>
        </div>

        {/* Modal popup */}
        <div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" >
            <div class="modal-content">
              <div class="close-btn-box d-flex justify-content-end">
                <button type="button" class="" data-bs-dismiss="modal" aria-label="Close">
                  <svg xmlns="http://www.w3.org/2000/svg" width="43.167" height="43.167" viewBox="0 0 43.167 43.167">
                    <g id="np_menu_1166835_000000" transform="translate(-17.882 -18.556)">
                      <path id="Path_24" data-name="Path 24" d="M64.076,21.563H14.033a2.733,2.733,0,1,1,0-5.466H64.149a2.733,2.733,0,1,1-.073,5.466Z" transform="translate(25.139 -0.817) rotate(45)" fill="#2c2b34" />
                      <path id="Path_25" data-name="Path 25" d="M52.776,0H2.733a2.733,2.733,0,1,0,0,5.466H52.849A2.733,2.733,0,1,0,52.776,0Z" transform="translate(61.049 22.421) rotate(135)" fill="#2c2b34" />
                    </g>
                  </svg>
                </button>
              </div>
              <div class="modal-headers d-flex justify-content-center ">
                <h1 class="modal-title fs-5" id="exampleModalLabel mt-5">Upload CSV form</h1>
              </div>
              <div class="modal-body">
                <div class="upload-box" onDragOver={handleDragOver}
                  onDrop={handleDrop}>
                  <input type="file" name="" id="uploadCsv" ref={fileInputRef} style={{ visibility: "hidden" }} onChange={handleFileUpload} />
                  {loading ? <div className="spinner">Loading...</div> : (
                    <>
                      <label htmlFor="uploadCsv">{selectedFile ? selectedFile.name : 'Drag & drop your CSV file'} </label>
                      {!selectedFile && (
                        <><br /> or
                          <br />
                          <label className="btn btn-primary" htmlFor="uploadCsv">
                            Browse files
                          </label>
                        </>
                      )}
                    </>)}
                </div>
              </div>
              <div class="">
                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                {/* <button type="button" class="btn btn-primary">Upload</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};
export default AdminDashboard;
