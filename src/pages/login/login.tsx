import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// css
import './login.scss';

// redux store
import { showAlert } from '../../store/features/alert/alertSlice';
import { login } from '../../store/features/login/loginSlice';
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';

// constants
import { ACCOUNT_DOES_NOT_EXIST, INVALID_CREDENTIALS } from '../../utils/constants/app.constants';

//components
import Button from '../../components/Button/Button';

// firebase
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

// icons
import { HiMiniEye } from "react-icons/hi2";
import { HiEyeOff } from "react-icons/hi";


const Login: React.FC = () => {

  // state variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // ui methods
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const GoToRegisterPage = () => {
    navigate("/register")
  }

  const loginHandler = async () => {
    dispatch(showLoader());

    try {
      const loginUserCredentials = await signInWithEmailAndPassword(auth, emailId, password);
      dispatch(hideLoader());
      const user = loginUserCredentials.user;
      dispatch(login({ userId: user.uid }));
      navigate("/home");
      // Handle successful login, e.g., redirect to another page
    } catch (error: any) {
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
          <label htmlFor="emailId" className="login-label">Email ID</label>
          <input
            type="text"
            id="emailId"
            className="login-input"
            value={emailId}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">Password</label>
          <input
            type={hidePassword ? "password" : "text"}
            id="password"
            className="login-input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className='hide-show-icons'>
            {
              hidePassword ?
                <HiMiniEye className='icon' onClick={() => setHidePassword(false)} title='Show password' /> : <HiEyeOff  className='icon' onClick={() => setHidePassword(true)} title='Hide password' />
            }
          </span>
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