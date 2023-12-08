import React from 'react';
// import 'style.css';
import anthos_logo from '../Assets/anthos_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import profile_img from '../Assets/grey_profile_img.png'


export default function Navbar({transparent}) {
    const navbarStyle={
        background: transparent ? "transparent" :"#ffffff",
        boxShadow:transparent ? "none": "1px 1px 6.5px rgba(0,0,0,0.16)",
    }
    return (
        <>
          {/* <header className={`site-header ${ transparent ? 'red':'pink'}`}> */}
          <header className='site-header' style={navbarStyle }>
            <div className="container">
                <nav class="navbar ">
                    
                        <img src={anthos_logo} alt="" />
                        <div class="navbar-toggler"   >
                            <ul>
                                <li className='user-img'><img src={profile_img}  alt="" /></li>
                                <li className='hamburger'><FontAwesomeIcon icon={faBars} color='black' size='3x'></FontAwesomeIcon></li>
                            </ul>

                        </div>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    
                </nav>
             </div>
            </header>
           
      
        </>
    )
}
