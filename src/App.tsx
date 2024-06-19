/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { STRING_CONSTANTS, WARMUP_STRETCHING_ALERT } from './utils/constants/app.constants';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import Navbar from './components/Navbar/Navbar';
import { hideAlert, showAlert } from './store/features/alert/alertSlice';
import Alert from './components/Alert/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Loader from './components/Loader/Loader';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { login, logout } from './store/features/login/loginSlice';
import { onAuthStateChanged } from 'firebase/auth';
import {userDataObj} from "./App.d"


function App() {


  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const userId = useSelector((state: RootState) => state.login.userId);
  const isAlertVisible = useSelector((state: RootState) => state.alert.isAlertVisible);
  const isLoaderVisible =
    useSelector((state: RootState) => state.loader.isLoaderVisible);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    if (!isLoggedIn) {
      // redirect to login page if user is NOT logged in
      navigate("/login");
      dispatch(hideAlert());
    } else {
      navigate('/home')
    }

  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        dispatch(showAlert(WARMUP_STRETCHING_ALERT))
      }, 5000);
    }
  }, [isLoggedIn])

  const fetchUsersData = async () => {
    
    if(isLoggedIn){
      const querySnapshot = await getDocs(collection(db, "users"));
      const data : userDataObj[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const currentUserData = data.filter((item)=>item.userId === userId);
      dispatch(login({ userDocId: currentUserData[0].id ,userName:currentUserData[0].userName}));
    }

  }

  useEffect(() => {
    fetchUsersData();
  }, [isLoggedIn])

  useEffect(()=>{
onAuthStateChanged(auth, (user)=>{
  if(user){
    // user is logged in 
  }else{
    // user is logged out
    dispatch(logout());
  }
})
  },[])

  return (
    <>
      <div className="App">
        {isLoggedIn && <Navbar />}
        {isAlertVisible && <Alert />}
        {isLoaderVisible && <Loader />}
        <Outlet />
      </div>
      <p className='not-supported-device'>
        <span>    <FontAwesomeIcon icon={faTriangleExclamation} className='warning-icon' /> </span>
        <span> {STRING_CONSTANTS.ONLY_FOR_MOBILE_LABEL}</span>
      </p>
    </>
  );
}

export default App;
