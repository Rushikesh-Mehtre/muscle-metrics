import React from 'react';
import './App.css';
import { STRING_CONSTANTS } from './utils/constants/app.constants';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
  <div className="App">
    <Outlet/>

  </div>
<p className='not-supported-device'>{STRING_CONSTANTS.ONLY_FOR_MOBILE_LABEL}</p>
    </>
  );
}

export default App;
