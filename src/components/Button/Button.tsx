import React from 'react'
import {ButtonProps} from "./Button.d"
import "./Button.scss"
const Button = (props:ButtonProps) => {
    const {buttonTitle,onClick,disabled,size} = props;
  return (
    <button className={`button-container ${disabled?'disabled':''} ${size}`} onClick={onClick} disabled={disabled}>{buttonTitle}</button>
  )
}

export default Button