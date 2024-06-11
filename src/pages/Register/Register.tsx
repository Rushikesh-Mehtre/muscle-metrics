// src/Register.tsx
import React, { useState } from 'react';
import { app, auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./Register.scss"
import PageHeading from '../../components/PageHeading/PageHeading';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/features/alert/alertSlice';
import { ACCOUNT_CREATED_SUCCESSFULLY } from '../../utils/constants/app.constants';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
const firestore = getFirestore(app)
const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addUserData = async (data: any) => {
  const result = await addDoc(collection(firestore,"users"),data)
  console.log("result",result)
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      dispatch(showAlert(ACCOUNT_CREATED_SUCCESSFULLY))
      return;
    }

    try {
      const userCredential=  await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user",user);
      const userData = {
        email: user.email,
        createdAt: new Date(),
        userName:name,
        userId:user.uid
        // Add more fields as necessary
      };
      await addUserData(userData);
      dispatch(showAlert(ACCOUNT_CREATED_SUCCESSFULLY))
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      // setError((error as Error).message);
      dispatch(showAlert(
      {
        heading:"Error",
        subHeading:(error as Error).message,
        duration:1500
    }))
    }
  };

  const GoToLoginPage = ()=>{
    navigate("/login")
  }
  return (
    <div className='register-container'>
      <h2 className="register-title">Create account</h2>
      <div className='register-form'>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter full name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email ID"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <Button buttonTitle='Register' onClick={handleRegister} size="medium"/>
      </div>
      <p className="already-have-account">
        <span>
          Already have an account?
        </span>
        <span onClick={() => GoToLoginPage()} className='login-label'> Login</span>
      </p>
    
    </div>
  );
};

export default Register;
