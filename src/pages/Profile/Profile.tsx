/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.scss"
import { useNavigate } from 'react-router-dom';
import ListCard from '../../components/ListCard/ListCard';
import PageHeading from '../../components/PageHeading/PageHeading';
import { db } from '../../firebaseConfig';
import { collection, query, getDocs } from "firebase/firestore";
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import { myWorkoutObj } from "./Profile.d"

import { doc, deleteDoc } from "firebase/firestore";

const Profile = () => {

  // variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.login.userName);
  const userDocId = useSelector((state: RootState) => state.login.userDocId);
  const [myWorkoutData, setMyWorkoutData] = useState<myWorkoutObj[]>([]);

  console.log("myWorkoutData",myWorkoutData)
  // ui functions
  const goToWorkoutPlan = () => {
    navigate('/workout-plan')
  }

  const deleteWorkout = async (exerciseDocId: string) => {
    dispatch(showLoader());
    // find path of workOutToDelete first
    // use this path to delete specific document 

    const results = await deleteDoc(doc(db, `users/${userDocId}/workouts`, exerciseDocId));
    getUserData();
    console.log("results",results)

    // to delete specific workout collection under workouts document under specific user document under user collection

  }




  const getUserData = async () => {
    const q = query(collection(db, `users/${userDocId}/workouts`));
    // get user data
    const querySnapshot = await getDocs(q);
    dispatch(hideLoader());
    let myWorkOutData: myWorkoutObj[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // @ts-ignore
      const workoutDataObj: myWorkoutObj = { exerciseDocId: doc.id, ...doc.data() };
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
      
      <div className='profile-container'>

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
                exerciseDocId={item.exerciseDocId}
                deleteWorkout={deleteWorkout}
                canBeDeleted={true}
              />)}
            </div>
          }


        </div>
      
    </>

  )
}

export default Profile