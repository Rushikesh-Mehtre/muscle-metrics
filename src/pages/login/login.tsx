import React, { useEffect, useState } from 'react';
import "./login.scss"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/features/login/loginSlice';
import { RootState } from '../../store/store';
import Welcome from '../Welcome/Welcome';
import { useNavigate } from 'react-router-dom';
const Login = ()=>{
    console.log("working on login page")
    const [loginData,setLoginData]=useState({
        username:"",
        password:""
    })
    console.log("loginData",loginData)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginData = (value:string,field:string)=>{
        if(field==="username"){

            setLoginData((prevState) => ({
                ...prevState,
                username: value,
            }));
        }else if(field==="password"){
            setLoginData((prevState) => ({
                ...prevState,
                password: value,
            }));  
        }
    }

    const submitHandler = ()=>{
console.log("button clicked !")
dispatch(login())
    };


  const [showWelcomePage,setShowWelcomePage]=useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  console.log("isLoggedIn",isLoggedIn)

  useEffect(()=>{
setTimeout(() => {
  setShowWelcomePage(false)
}, 3000);
  })

  useEffect(()=>{
if(isLoggedIn){
    // navigate to home page
    navigate("/home")
}
  },[isLoggedIn])

    return <div className='login-container'>
        <p className='login-heading'>Login to continue !</p>
        <div className='login-form'>
        <input type="text" onChange={(e)=>handleLoginData(e.target.value,"username")} />
        <input type="password" onChange={(e)=>handleLoginData(e.target.value,"password")} />
        <button onClick={submitHandler}>Submit</button>
        </div>
        {showWelcomePage && 
  <Welcome/> 
}
    </div>
}
export default Login;
