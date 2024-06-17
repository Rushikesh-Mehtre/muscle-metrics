/* eslint-disable react-hooks/exhaustive-deps */

import React, {  useEffect, useState } from 'react';
import "./Dropdown.scss"
import {DropdownProps} from "./Dropdown.d"
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/features/alert/alertSlice';
import { PLEASE_SAVE_DATA_BEFORE_PROCEEDING } from '../../utils/constants/app.constants';
const Dropdown = (props:DropdownProps) => {
  const dispatch = useDispatch();
  const { labelHeading,options,optionSelectHandler,dataAddedToServer ,singleEntryPresent,value} = props
  const handleChange = (event:any) => {
    if(!dataAddedToServer && singleEntryPresent){
      dispatch(showAlert(PLEASE_SAVE_DATA_BEFORE_PROCEEDING));
      return;
    }else{
      setSelectedValue(event.target.value)
      optionSelectHandler(event.target.value);
      }
  };
  const [selectedValue,setSelectedValue]=useState("");
  useEffect(()=>{
    if(value){
      setSelectedValue(value)
      }
  },[value])
  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown" >
        {labelHeading && labelHeading}
      </label>
      <select
        id="dropdown"
        name="dropdown"
        onChange={handleChange}
        value={selectedValue}
        
      >
        <option value="" disabled>--Select--</option>
        {options.map((option, index) => (
          <option key={index} value={option.title}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;