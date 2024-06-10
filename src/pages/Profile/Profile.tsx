import React from 'react'
import Button from '../../components/Button/Button'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.scss"
import { useNavigate } from 'react-router-dom';
import ListCard from '../../components/ListCard/ListCard';
import PageHeading from '../../components/PageHeading/PageHeading';
import { addWorkout, updateWorkout } from '../../store/features/my-workout-plan/myWorkoutPlanSlice';
const Profile = () => {

  // variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myWorkouts = useSelector((state: RootState) => state.myWorkoutPlan.workouts);
  console.log("myWorkouts", myWorkouts)
  // ui functions
  const goToWorkoutPlan = () => {
    navigate('/workout-plan')
  }

  const deleteWorkout = (workOutToDelete:string)=>{
    console.log("myWorkouts",myWorkouts)
    console.log("workOutToDelete",workOutToDelete)
    let updatedMyWorkouts = myWorkouts.filter((item)=>item.title !==workOutToDelete);
    console.log("updatedMyWorkouts",updatedMyWorkouts)
    dispatch(updateWorkout(updatedMyWorkouts));
  }
  return (
    <div className='profile-container'>
      {/* if no workout added to profile */}
      {
        myWorkouts.length === 0 &&
        <div className='no-my-workouts-container'>
          <p className='no-workout-label'>Oops ! No workouts added to profile !</p>
          <Button buttonTitle='Add workout plan' onClick={goToWorkoutPlan} />
        </div>
      }
      {
        myWorkouts.length > 0 &&
        <div className='my-workout-plan'>
          <PageHeading headingLabel="My workout plan" />
          {myWorkouts.map((item) => <ListCard 
          cardHeading={item.title} 
          cardList={item.exercises} 
          editable={false} 
          deleteWorkout={deleteWorkout}
          canBeDeleted={true}
          />)}
        </div>

      }


    </div>
  )
}

export default Profile