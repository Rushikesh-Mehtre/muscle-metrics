import React, { useState } from 'react';
import './login.scss';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/features/alert/alertSlice';
import { ACCOUNT_DOES_NOT_EXIST, INVALID_CREDENTIALS} from '../../utils/constants/app.constants';
import { login } from '../../store/features/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { app, auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import {  getFirestore } from 'firebase/firestore';
const firestore = getFirestore(app);

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GoToRegisterPage = () => {
    navigate("/register")
  }

  const loginHandler = async () => {
    dispatch(showLoader());

    try {
      const loginUserCredentials = await signInWithEmailAndPassword(auth, username, password);
      dispatch(hideLoader());
      const user = loginUserCredentials.user;
      console.log("user",user)
        dispatch(login({userId:user.uid}));
        navigate("/home");
      // Handle successful login, e.g., redirect to another page
    } catch (error:any) {
      dispatch(hideLoader());
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        dispatch(showAlert(INVALID_CREDENTIALS))
      } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
        dispatch(showAlert(ACCOUNT_DOES_NOT_EXIST))
      } else {
        dispatch(showAlert({
          heading: "Error",
          subHeading: (error as Error).message,
          duration: 1500
        }))
      }
    }
  }


  return (
    <div className="login-container">
      <h2 className="login-title">Login to continue</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="username" className="login-label">Username</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Button buttonTitle='Login' onClick={loginHandler} size="medium" />
      </form>
      <p className="login-register-link">
        <span>

          Don't have an account?
        </span>
        <span onClick={() => GoToRegisterPage()} className='register-label'> Register</span>
      </p>
    </div>
  );
};

export default Login;