// import React from 'react'
import { useRef,useState,useEffect,useContext } from "react" ;
import AuthContext from "../context/AuthProvider";
import {Navigate, useNavigate } from 'react-router-dom';
// import { TextField } from '@react-ui-org/react-ui';
import axios from '../api/axios';
import AddStudents from "./AddStudents";
// import Button from 'react-bootstrap/Button';
import { TextField } from '@mui/material'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const LOGIN_URL = '/auth';

function LogIn() {
    const { setAuth } = useContext(AuthContext);
    const userRef= useRef();
    const errRef = useRef();

    const[user, setUser] = useState('');
    const[pwd, setPwd] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState('');

    useEffect(() => {
        userRef.current.focus();
    },[]);

    useEffect(() => {
        setErrMsg('');
    },[user,pwd]); 

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(user,pwd);

        try {
            // <AddStudents user={user}/>
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user,pwd}),{
                    headers: {'Content-Type': 'application/json'},
                    withCredentials : true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user,pwd,roles,accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
            localStorage.setItem("auth",true);
        
        } catch (err) {
            if(!err?.response){
                setErrMsg('No Server Response');
            }
            else if(err.response?.status === 400){
                setErrMsg('Missing username or Passwrod');
            }
            else if(err.response?.status === 401){
                setErrMsg('Unauthorized');
            }
            else{
                setErrMsg('LogIn Failed');
            }
            errRef.current.focus();
        }
        // setUser('');
        // setPwd('');
        // setSuccess(true);
        
    }

  return (
    <>
        {success ? (
            
           <Navigate replace to="/home"/>
        ) : (
        <>
            <h1 class="display-3">Login As a Co-ordinator</h1>
        <br/>
        <br/>
        
    <section className="login-page">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>


      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>

        
        <div className="form-group">
        <label htmlFor="username">Username :</label>
        <input
            type="text"
            className="form-control"
            id="username"
            ref={userRef}
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
        <p><small>
            <span className="line">

            <a href="/forgotp">Forgot Password?</a>
            </span>
            </small>
        </p>
        </div>
        <div className="align">
        <Button variant="outline-dark" type="submit">LogIn</Button>
      </div>
      </form>
      <p>
       <small> Don't have an Account?
        
        <span className="line">
          
          <a href="/signup">Sign Up</a>
        </span>
        </small>
      </p>
    </section>
      
    
    </>
    )}
    </>
  )
}

export default LogIn