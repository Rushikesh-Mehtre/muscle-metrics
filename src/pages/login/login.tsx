import React, { useState } from 'react';
import './login.scss';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/features/alert/alertSlice';
import { FEATURE_WILL_BE_ADDED_SOON } from '../../utils/constants/app.constants';
import { login } from '../../store/features/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

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
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerUserHandler = ()=>{
    console.log("into registerUserHandler")
    // dispatch(showAlert(FEATURE_WILL_BE_ADDED_SOON))
  }

  const loginHandler = ()=>{
    dispatch(login());
    navigate("/home");
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
        <span onClick={()=>registerUserHandler()} className='register-label'> Register</span>
      </p>
    </div>
  );
};

export default Login;