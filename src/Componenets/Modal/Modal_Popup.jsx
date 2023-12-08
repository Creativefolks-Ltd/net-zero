import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal_Popup.css'

class ModalPopup extends Component {
  state = {
    isOpen: false,
  };

  togglePopup = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Fragment>
        <button className='popup-btn' onClick={this.togglePopup}>Upload CSV File</button>
        <Modal show={this.state.isOpen} onHide={this.togglePopup}>
            <div className="modalcontent">
                <div className="title">
                <button className='popup-btn1' onClick={this.togglePopup}>X</button>
                    <p>Uplaod CSV Form</p>
                </div>
                <div className="sub-div">
                    <p className='modal-p1'>Drag and drop Your CSV form</p>
                    <p className='modal-p2'>Or</p>
                    <div><button>Browse Files</button></div>

                </div>
                <p className='modal-p3'>Your need to assign a form to an existing user.</p>
                <p className='modal-p4'>Please search user by email address .</p>
                <div className="modalfooter">
                    <input type="text" placeholder='Enter user email address' />
                    <p className='modal--p5'><FontAwesomeIcon icon={faXmark} color='#ffffff' size='9lg'></FontAwesomeIcon></p>
                </div>

            </div>
         
        </Modal>
      </Fragment>
    );
  }
}

export default ModalPopup;