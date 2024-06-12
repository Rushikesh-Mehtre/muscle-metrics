/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import "./Dropdown.scss"
import {DropdownProps} from "./Dropdown.d"
const Dropdown = (props:DropdownProps) => {
  const { labelHeading,options,optionSelectHandler } = props
  const handleChange = (event:any) => {
    optionSelectHandler(event.target.value);
  };
  useEffect(()=>{
    optionSelectHandler(options[0].title);
  },[])
  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown" >
        {labelHeading}
      </label>
      <select
        id="dropdown"
        name="dropdown"
        onChange={handleChange}
        
      >
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