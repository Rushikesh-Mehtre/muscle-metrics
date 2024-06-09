import React, { useEffect } from 'react';
import './App.css';
import { STRING_CONSTANTS, WARMUP_STRETCHING_ALERT } from './utils/constants/app.constants';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import Navbar from './components/Navbar/Navbar';
import { hideAlert, showAlert } from './store/features/alert/alertSlice';
import Alert from './components/Alert/Alert';
import Footer from './components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const isAlertVisible = useSelector((state: RootState) => state.alert.isAlertVisible);
  console.log("isAlertVisible", isAlertVisible)
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

  return (
    <>
      <div className="App">
        {isLoggedIn && <Navbar />}
        {isAlertVisible && <Alert />}
        <Outlet />
        {isLoggedIn && <Footer />}
      </div>
      <p className='not-supported-device'>
        <span>    <FontAwesomeIcon icon={faTriangleExclamation} className='warning-icon' /> </span>
        <span> {STRING_CONSTANTS.ONLY_FOR_MOBILE_LABEL}</span>
      </p>
    </>
  );
}

export default App;
