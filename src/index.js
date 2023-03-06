import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav2 from './componenets/Nav2';
import Nav from './componenets/Nav';
const root = ReactDOM.createRoot(document.getElementById('root'));
const loggedInUser = localStorage.getItem("auth");

root.render(
 
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <Route path="/" element={<App/>}/> */}
      
   
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
