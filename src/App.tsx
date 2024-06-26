/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './App.css';

// constants
import { STRING_CONSTANTS, WARMUP_STRETCHING_ALERT } from './utils/constants/app.constants';

// components
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import Alert from './components/Alert/Alert';

// redux store - state and actions

import { RootState } from './store/store';
import { hideAlert, showAlert } from './store/features/alert/alertSlice';
import { login, logout } from './store/features/login/loginSlice';

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

// firebase
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// types
import { userDataObj } from "./App.d"


function App() {


  // state variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const userId = useSelector((state: RootState) => state.login.userId);
  const isAlertVisible = useSelector((state: RootState) => state.alert.isAlertVisible);
  const isLoaderVisible =
    useSelector((state: RootState) => state.loader.isLoaderVisible);


  // ui methods
  const fetchUsersData = async () => {
    if (isLoggedIn) {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data: userDataObj[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const currentUserData = data.filter((item) => item.userId === userId);
      dispatch(login({ userDocId: currentUserData[0]?.id, userName: currentUserData[0].userName }));
    }

  }

  // use effect blocks
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

  useEffect(() => {
    fetchUsersData();
  }, [isLoggedIn])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is logged in 
      } else {
        // user is logged out
        dispatch(logout());
      }
    })
  }, [])

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
