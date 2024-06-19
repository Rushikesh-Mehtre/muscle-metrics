/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
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
      optionSelectHandler(event.target.value);
      }
  };
  return (
    <div className="dropdown-container">
    {labelHeading &&  <label htmlFor="dropdown" >
        {labelHeading}
      </label>}
      <select
        id="dropdown"
        name="dropdown"
        onChange={handleChange}
        value={value}
        
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