import React, { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.scss"
import { useNavigate } from 'react-router-dom';
import ListCard from '../../components/ListCard/ListCard';
import PageHeading from '../../components/PageHeading/PageHeading';
import { updateWorkout } from '../../store/features/my-workout-plan/myWorkoutPlanSlice';
import { db } from '../../firebaseConfig';
import { collection, query, getDocs } from "firebase/firestore";
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import {myWorkoutObj} from "./Profile.d"
const Profile = () => {

  // variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myWorkouts = useSelector((state: RootState) => state.myWorkoutPlan.workouts);
  const userName = useSelector((state: RootState) => state.login.userName);
  const userId = useSelector((state: RootState) => state.login.userId);
  const userDocId = useSelector((state: RootState) => state.login.userDocId);
  const isLoaderVisible = useSelector((state: RootState) => state.loader.isLoaderVisible);
  const [myWorkoutData,setMyWorkoutData]=useState<myWorkoutObj[]>([]);
  console.log("userId", userId)
  // ui functions
  const goToWorkoutPlan = () => {
    navigate('/workout-plan')
  }

  const deleteWorkout = (workOutToDelete: string) => {
    let updatedMyWorkouts = myWorkouts.filter((item) => item.title !== workOutToDelete);
    dispatch(updateWorkout(updatedMyWorkouts));
  }




  const getUserData = async () => {
    const q = query(collection(db, `users/${userDocId}/workouts`));
    // get user data
    const querySnapshot = await getDocs(q);
    dispatch(hideLoader());
    let myWorkOutData :myWorkoutObj[] = [];
    console.log("querySnapshot",querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // @ts-ignore
   const workoutDataObj :myWorkoutObj = doc.data();
      console.log("workoutDataObj", workoutDataObj);
      myWorkOutData.push(workoutDataObj);
      });
    setMyWorkoutData(myWorkOutData);

    // dispatch(login(userName:userName))
  }

  useEffect(() => {
    dispatch(showLoader());
    getUserData();
  }, [])
  return (
    <>
      {
        !isLoaderVisible && <div className='profile-container'>

          <PageHeading headingLabel={`Welcome ${userName}`} />

          {/* if no workout added to profile */}
          {
            myWorkoutData.length === 0 &&
            <div className='no-my-workouts-container'>
              <p className='no-workout-label'>Oops ! No workouts added to profile !</p>
              <Button buttonTitle='Add workout plan' onClick={goToWorkoutPlan} />
            </div>
          }

          {
            myWorkoutData.length > 0 &&
            <div className='my-workout-plan'>
              <PageHeading headingLabel="My workout plan" />
              {myWorkoutData.map((item) => <ListCard
                cardHeading={item.exerciseName}
                cardList={item.exercises}
                editable={false}
                deleteWorkout={deleteWorkout}
                canBeDeleted={true}
              />)}
            </div>
          }


        </div>
      }
    </>

  )
}

export default Profile