import React from 'react'

const ProgressTrackingCard = (props) => {
    const {exerciseName} = props;
  return (
    <div className='progress-tracking-card'>
        <div className='card-heading'>{exerciseName}</div>
        
    </div>
  )
}

export default ProgressTrackingCard