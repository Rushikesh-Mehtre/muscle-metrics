import React from 'react'
import {ProgressTrackingCardProps} from "./ProgressTracking.d"
const ProgressTrackingCard = (props:ProgressTrackingCardProps) => {
    const {exerciseName} = props;
  return (
    <div className='progress-tracking-card'>
        <div className='card-heading'>{exerciseName}</div>
        
    </div>
  )
}

export default ProgressTrackingCard