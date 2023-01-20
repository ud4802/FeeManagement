import './App.css';
import Home from './componenets/Home';
import LogIn from './componenets/LogIn';
// import Nav from './componenets/Nav';
import SignUp from './componenets/SignUp';
import {Routes, Route} from 'react-router-dom';
import Layout from './componenets/Layout';
import Nav from './componenets/Nav';
import { useState } from 'react';
import ForgotPassword from './componenets/ForgotPassword';
import PasswordReset from './componenets/ResetPassword';
function App() {
  // const [isLogin, setLogin] = useState(false);

  // const response = (res) => {
  //   setLogin(res);
  // };
  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Layout/>} > 
        <Route exact path="/" element={<LogIn/> }/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/forgotp' element={<ForgotPassword/>} />
        
        <Route path='/resetpwd/:id/:token' element={<PasswordReset/>} />
      </Route>
    </Routes>
    
    </>
  );
}

export default App;
