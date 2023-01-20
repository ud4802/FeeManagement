import React from 'react'
// import { ReactComponent as Logo } from './logo.svg';
function Nav() {
  return (
    <nav class="navbar navbar-expand-sm navbar-dark">
  {/* <a className="navbar-brand" href="#">Student Fees Management System</a> */}
  <img src="https://www.ddu.ac.in/images/logo.png" alt='ErroImage'></img>
  {/* <h1 className="navbar-brand">Student Fees Management System</h1> */}
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul class="navbar-nav ">
      <li class="nav-item ">
        <a class="nav-link" href="/">LogIn </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/signup">SignIn</a>
      </li>
    </ul>
  </div>
</nav>
  )
}

export default Nav