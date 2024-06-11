import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import "./Alert.scss"
import { hideAlert } from '../../store/features/alert/alertSlice';
const Alert = () => {

    // variables
    const dispatch = useDispatch();
    const alertData = useSelector((state: RootState) => state.alert);
    const {heading,subHeading,type="message",duration}= alertData;

    // use effect blocks
    useEffect(()=>{
      setTimeout(() => {
        dispatch(hideAlert());
      }, duration);
    },[])

  return (
    <div className={`alert-container ${type}`}>
        <p className='heading'>{heading}</p>
        <p className='sub-heading'>{subHeading}</p>
    </div>
  )
}

export default Alert