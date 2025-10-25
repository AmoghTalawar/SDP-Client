import React, { useState } from 'react'
import './Navbar.scss'
import { useNavigate } from "react-router-dom";
import logo from "../../assets/sdm-logo.png"

function Navbar(props) {
  const navigate = useNavigate();

  const changeLogin = () => {
    navigate("/login");
  }

  const handleClick = (e) => {

    const currentClass = document.getElementsByClassName('naving');
    for (let i = 0; i < currentClass.length; i++) {
      currentClass[i].classList.remove('active');
    }
    currentClass[e].classList.add('active');
  }



  return (
    <div className='navbar-div'>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <h2 style={{ color: "var(--red)", fontWeight: "600", textDecoration: "underline" }}>ℍ𝕆ℙ𝔼 ℝ𝔼ℂ𝕆𝕍𝔼ℝ𝕐 ℂ𝔼ℕ𝕋𝔼ℝ</h2>
          {/* <a className="navbar-brand" href="/#"><img src={logo} alt="" /></a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
            <a className="nav-link naving active" aria-current="page" onClick={() => {navigate('/menu'); handleClick(0)}}>Menu</a>
          </li> */}
              <li className="nav-item">
                <a className="nav-link naving active" onClick={() => { navigate('/about'); handleClick(0); }}>About</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link naving" onClick={() => handleClick(1)}>Contact</a>
              </li> */}
              {/* <li className="nav-item">
            <a className="nav-link naving" onClick={() => {handleClick(3)}}>Contact</a>
          </li> */}

            </ul>
            <button className="btn btn-register" type="submit" onClick={changeLogin}>Login</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
