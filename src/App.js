import './App.css';
import Home from './componenets/Home';
import LogIn from './componenets/LogIn';
// import Nav from './componenets/Nav';
import SignUp from './componenets/SignUp';
import {Routes, Route} from 'react-router-dom';
import Layout from './componenets/Layout';
import Nav from './componenets/Nav';

// import { useState } from 'react';
import ForgotPassword from './componenets/ForgotPassword';
import PasswordReset from './componenets/ResetPassword';
import AddStudents from './componenets/AddStudents';
import ViewStudents from './componenets/ViewStudents';
import NotifyStudents from './componenets/NotifyStudents';
// import Nav2 from './componenets/Nav2';
import LoginOption from './componenets/LoginOption';
import AdminLogin from './componenets/AdminLogin';
import VerifyUser from './componenets/VerifyUser';
// import { StyledInputClearButtonIconWrapper } from '@nextui-org/react/types/input/input.styles';
function App() {
  // const [isLogin, setLogin] = useState(false);

  // const response = (res) => {
  //   setLogin(res);
  // };
  const loggedInUser = localStorage.getItem("auth");
  return (
    <>
    <Nav/>
    {/* <sidebar/> */}
  
    
    {/* {loggedInUser ? (   <Nav2/>) : (<Nav/> )} */}
    <Routes>
      <Route path='/' element={<Layout/>} > 
        <Route path='/' element={<LoginOption/>}/>

        <Route path='/adminLogin' element={<AdminLogin/>}/>

        <Route exact path="/login" element={<LogIn/> }/>
        <Route path='/signup' element={<SignUp/>} />
       
        <Route path='/home' element={<Home/>} />
        <Route path='/forgotp' element={<ForgotPassword/>} />
        <Route path='/adminverify/:id' element={<VerifyUser/>}/>

        <Route path='/password-reset/:id/:token' element={<PasswordReset/>} />
        <Route path='/home/addstudents' element={<AddStudents/>}/>
        <Route path='/home/viewstudents' element={<ViewStudents/>}/>
        <Route path='/home/notifystudents' element={<NotifyStudents/>}/>
      </Route>
    </Routes>
    
    </>
  );
}

export default App;
