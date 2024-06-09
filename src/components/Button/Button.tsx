import React from 'react'
import {ButtonProps} from "./Button.d"
import "./Button.scss"
const Button = (props:ButtonProps) => {
    const {buttonTitle,onClick,disabled} = props;
  return (
    <button className={`button-container ${disabled&&'disabled'}`} onClick={onClick} disabled={disabled}>{buttonTitle}</button>
  )
}

export default Button