import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router';
import axios from "axios";
import { useEffect, useState, Fragment, useReducer } from "react";
import { useParams } from "react-router-dom";

function VerifyUser() {
  const navigate = useNavigate();
  const param = useParams();
  const [user, setUser] = useState([]);
  const url = `http://localhost:3500/adminverify/${param.id}`;
  const url1 = `http://localhost:3500/adminverify/${param.id}/verify`;


  const verifyUrl = async () => {
    try {
      const u = await axios.post(url);
      setUser(u);
      // console.log(u);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(() => {
  //   // let isActive = true;  
  //   verifyUrl();
  //   // setUser([]);
  //   // return () => {
  //   //   isActive = false;
  //   // };

  // },[]);

  //   window.addEventListener("beforeunload", (event) => {
  //     verifyUrl();
  //     console.log("API call before page reload");
  // });

  // window.addEventListener("unload", (event) => {
  //     verifyUrl();
  //     console.log("API call after page reload");
  // });


  const verifyUser = async () => {
    try {
      const u = await axios.post(url1);
      // setUser(u);
      // console.log(u);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    setUser([]);
  }
  return (

    <>

      <section>
        <h2>...User Details...</h2>
        <button onClick={verifyUrl}>UserDetail</button>

        {/* {user ? (<><h3>{user.data.username}</h3></>):(<><h3>no user</h3></>)} */}
        {/* <h3>{user.data.username}</h3>
       */}

        {user.data ? (<>
          <h3>{user.data.username}</h3>
          <h3>{user.data.email}</h3></>) : ("")}



        <div className='align'>
          <Button variant='outline-success' onClick={verifyUser}>Verify</Button>
          &nbsp;
          &nbsp;
          &nbsp;
          {/* <Button type='button' className='btn btn-outline-danger'>Cancel</Button> */}
          <Button variant='outline-danger' onClick={() => navigate("/verifyuser")}>Cancel</Button>
        </div>
      </section>







    </>
  )

}

export default VerifyUser