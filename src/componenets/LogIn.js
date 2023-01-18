// import React from 'react'
import { useRef,useState,useEffect,useContext } from "react" ;
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios';
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
            <section>
                <h1>You are Logged in..!</h1>
                <br/>
                <p>
                    <a href="#">Home</a>
                </p>
            </section>
        ) : (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      {/* aria-live will show error message on screen immideately as soon as error occurs. */}

      <h1>Log In</h1>
      <img src=""></img>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username :</label>
        <input
            type="text"
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
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            />

        <button>LogIn</button>
      </form>
    </section>
        )}
    </>
  )
}

export default LogIn