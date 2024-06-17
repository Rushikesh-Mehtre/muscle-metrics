/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.scss"
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../components/PageHeading/PageHeading';
import { db } from '../../firebaseConfig';
import { collection, query, getDocs } from "firebase/firestore";
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import { myWorkoutObj } from "./Profile.d"
import Dropdown from '../../components/Dropdown/Dropdown';

const workOutList = [
  {
    id: "1",
    title: "back"
  },
  {
    id: "2",
    title: "biceps"
  },
  {
    id: "3",
    title: "chest"
  },
  {
    id: "4",
    title: "triceps"
  },
  {
    id: "5",
    title: "shoulders"
  },
  {
    id: "6",
    title: "legs"
  },
]
const Profile = () => {

  // variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.login.userName);
  const userDocId = useSelector((state: RootState) => state.login.userDocId);
  const [myWorkoutData, setMyWorkoutData] = useState<myWorkoutObj[]>([]);
  const [workoutListToShow, setWorkoutListToShow] = useState([]);
  const [workoutSelected,setWorkoutSelected]=useState(false)



  // ui functions
  const goToWorkoutPlan = () => {
    navigate('/workout-plan')
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
  }

  const optionSelectHandler = (selectedWorkout: string) => {
    const workoutListToShow = myWorkoutData.filter((item) => item.exerciseName === selectedWorkout)
                    // @ts-ignore
    setWorkoutListToShow(workoutListToShow);
    setWorkoutSelected(true);
  }

  // use effect blocks

  useEffect(() => {
    dispatch(showLoader());
    getUserData();
  }, []);

 
  return (
    <>

      <div className='profile-container'>

        <PageHeading headingLabel={`Welcome ${userName}`} />
        {workOutList.length > 0 && <Dropdown
          // @ts-ignore
          labelHeading="My workout plan"
          options={workOutList}
          optionSelectHandler={optionSelectHandler}
        />
        }
        {workoutListToShow && workoutListToShow.length > 0 ?
          workoutListToShow.map((workOutItem) => <div>
            <div className='select-exercise-container'>
              <div className='header'>
                
                <span>Exercises for {
                                // @ts-ignore
                workOutItem.exerciseName
                }</span>
              </div>
              <div className="item-list">
                {
                                // @ts-ignore
                workOutItem.exercises.map((item) => (
                  <div key={item.title}
                    className={`item`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
            <p className='label-to-edit'>Want to add / remove exercises ? Go to <span className='workout-plan-link' onClick={goToWorkoutPlan}>Workout plans</span></p>
          </div>
          )
          : (workoutSelected && <div className='no-my-workouts-container'>
            <p className='no-workout-label'>Oops ! No workouts added to profile !</p>
            <Button buttonTitle='Add workout plan' onClick={goToWorkoutPlan} />
          </div>)

        }


      </div>

    </>

  )
}

export default Profile