import React from 'react'
import {PageHeadingProps}from "./PageHeading.d"
import "./PageHeading.scss"
const PageHeading = (props:PageHeadingProps) => {
    const {headingLabel,subheadingLabel}=props;
  return (
    <div className='page-heading-container'>
        <p className='heading-label'>{headingLabel}</p>
        <p className='subheading-label'>{subheadingLabel}</p>
        </div>
  )
}

export default PageHeading