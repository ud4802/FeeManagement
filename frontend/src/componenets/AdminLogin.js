// import { Button } from "antd";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState, useRef, useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

function AdminLogin() {
  const [success, setSuccess] = useState();
  const { setAdmin, admin } = useContext(AuthContext);
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    try {
      
      const response = await axios.post("/adminlogin", {
        user, pwd
      });
      console.log(response);
      const refreshToken = response?.data?.refreshToken;
      localStorage.setItem("admin", true);
      setAdmin({ user, refreshToken });
      console.log(admin);
      
      setSuccess(true);

    }
    catch (err) {
      setSuccess(false);
      if (!err?.response) {
        setErrMsg('No Server Response');
      }
      else if (err.response?.status === 400) {
        setErrMsg('Unauthorized');
      }
      else {
        setErrMsg('LogIn Failed');
      }
      errRef.current.focus();

    }

    // if (user==process.env.ADMIN && pwd==process.env.PWD) {
    //   setAdmin(true);
    //   console.log(admin);
    //   localStorage.setItem("admin", true);
    //   setSuccess(true);
    // }
    // else if(user=='' && pwd=='')
    // {
    //   setErrMsg('Missing username or Passwrod'); 
    // }
    // else{
    //     setErrMsg('Unauthorized');
    //     errRef.current.focus();
    // }
  };

  return (
    // <div>
    <>
      {success ? (
        <Navigate replace to="/adminhome" />
      ) : (
        <>

          <h1 class="display-3">Login As a ADMIN</h1>
          <br />
          <br />
          <br />
          <br />
          <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username :</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  // ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />

                <label htmlFor="pasword">Password :</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <div className="align">
                  <Button variant="outline-dark" type="submit">
                    LogIn
                  </Button>
                </div>
              </div>
            </form>
            {/* </div> */}
          </section>
        </>
      )}
    </>
  );
}

export default AdminLogin;
