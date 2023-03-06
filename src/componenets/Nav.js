import React from "react";
// import { ReactComponent as Logo } from './logo.svg';
import img5 from "../DDU.png";
import { Navigate, useNavigate } from "react-router-dom";
// import $ from 'jquery';

function Nav() {
  const nav = useNavigate();
  const handleLogout = () => {
  
    localStorage.clear();
    nav('/');
  }

  // useEffect(() => {
  //   // use jquery here if you must, this way the component is loaded 
  //   // and the dom matches whats in react (or should)
  //   $('.nav-item').on('click', function() {
  //     $('.active-link').removeClass('active-link');
  //     $(this).addClass('active-link');
  //   });
  // }, []);


  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark" fixed="top">
        <a href="/home">
          <img src={img5} alt="ErroImage" style={{"width" : 85 + '%' }}></img>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end navbar-container"
          id="navbarNav"
        >
          <ul className="navbar-nav ">
          <li className="nav-item active-link">
              <a className="nav-link active" href="/home">
                Home
              </a>
              <div class="underline"></div>
            </li>
            <li className="nav-item ">
              <a className="nav-link active" href="/home/addstudents">
                Add Students
              </a>
              <div class="underline"></div>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/home/viewstudents">
                Edit & Remainder
              </a>
              <div class="underline"></div>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/home/notifystudents">
                View Response
              </a>
              <div class="underline"></div>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/" onClick={handleLogout}>
                LogOut
              </a>
              <div class="underline"></div>
            </li>
            {/* <li className="nav-item">
            <button type="primary" onClick={handleLogout}>LogOut</button> 
            
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
