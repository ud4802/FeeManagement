// import { Button } from "antd";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import { Navigate } from "react-router";

function AdminLogin() {
  const [success, setSuccess] = useState();

  const handleSubmit = () => {
    setSuccess(true);
  };

  return (
    // <div>
    <>
      {/* {success ? (
        // <Navigate replace to="/home"/>
      ) : ( */}
       <h1 class="display-3">Login As a ADMIN</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <section>
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
                // onChange={(e) => setUser(e.target.value)}
                // value={user}
                required
              />

              <label htmlFor="pasword">Password :</label>
              <input
                type="password"
                id="password"
                className="form-control"
                // onChange={(e) => setPwd(e.target.value)}
                // value={pwd}
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
      {/* )} */}
    </>
  );
}

export default AdminLogin;
