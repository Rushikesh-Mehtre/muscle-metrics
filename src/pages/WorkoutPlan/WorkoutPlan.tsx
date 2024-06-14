/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./WorkoutPlan.scss"
import ListCard from '../../components/ListCard/ListCard';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../store/features/alert/alertSlice';
import { ADD_AT_LEAST_ONE_EXERCISE, EXERCISES_ADDED_SUCCESSFULLY } from '../../utils/constants/app.constants';
import Button from '../../components/Button/Button';
import PageHeading from '../../components/PageHeading/PageHeading';
import { RootState } from '../../store/store';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { app } from "../../firebaseConfig";
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const firestore = getFirestore(app);

const WorkoutPlan = () => {
  // state variables
  const dispatch = useDispatch();
  const [workoutData, setWorkOutData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [updatedList, setUpdatedList] = useState([]);
  const myWorkouts = useSelector((state: RootState) => state.myWorkoutPlan.workouts);
  const userDocId = useSelector((state: RootState) => state.login.userDocId);
  const [myWorkOutExercises, setMyWorkOutExercises] = useState([]);
  const [selectedOption,setSelectionOption]=useState("");
  

  // ui functions

  // to add workout data to specific user ;
  const addData = async () => {
    const result = await addDoc(collection(firestore, `users/${userDocId}/workouts`),
      {
          exerciseName :selectedOption,
          exercises : updatedList
      }
    );
    console.log("result",result)

    dispatch(showAlert(EXERCISES_ADDED_SUCCESSFULLY))

  }


  const fetchWorkoutData = async () => {
    const ref = doc(firestore, "workouts","gDEq2pOACmqr7twzXozQ");
    const result = await getDoc(ref);
    const workouts = result.data()?.workouts;
    setWorkOutData(workouts);
    dispatch(hideLoader());
  }
  const optionSelectHandler = (selectedOption: string) => {
    setSelectionOption(selectedOption)
    setExerciseData([]);
    setUpdatedList([]);
            // @ts-ignore
    let dataToShow = workoutData.filter((item) => item.title === selectedOption);
    setExerciseData(dataToShow);

    let updatedMyWorkoutExercises = myWorkouts?.filter((item) => item.title === selectedOption)[0]?.exercises || [];
            // @ts-ignore
    setMyWorkOutExercises(updatedMyWorkoutExercises)


  }
  const addToListHandler = (listItem:any) => {
            // @ts-ignore
    if (updatedList.filter((item) => item.id === listItem.id).length > 0) {
      // item already present
    } else {
      // add item
              // @ts-ignore
      setUpdatedList((prevItems:any) => [...prevItems, listItem]);
    }
  }
  const removeFromListHandler = (listItem:any) => {
                  // @ts-ignore
    setUpdatedList((prevItems) => prevItems.filter((item) => item.id !== listItem.id));

  }
  const addToMyWorkoutPlan = () => {
    // to do api call here. 
    if (updatedList.length === 0) {
      dispatch(showAlert(ADD_AT_LEAST_ONE_EXERCISE))
    }
    // dispatch(addWorkout({ title: exerciseData[0].title, exercises: updatedList }));
    addData();
    setUpdatedList([]);
  }

  // use-effect blocks
  useEffect(() => {
    dispatch(showLoader())
    fetchWorkoutData();
  }, [])

  return (
    <div className='workout-plan-container'>
      <PageHeading headingLabel="Lets make workout plan" />
      {workoutData.length > 0 &&
        <div>
          <Dropdown
            options={workoutData}
            labelHeading="Select body part"
            optionSelectHandler={optionSelectHandler} />
        </div>
      }

      {exerciseData.length > 0 &&
        exerciseData.map((item) => {
          return <ListCard
                  // @ts-ignore
            cardHeading={item.title}
                    // @ts-ignore
            cardList={item.exercises}
            myWorkOutExercises={myWorkOutExercises}
            addToListHandler={addToListHandler}
            updatedList={updatedList}
            removeFromListHandler={removeFromListHandler}
            editable={true}
            canBeDeleted={false}
          />
        })
      }
      {
        exerciseData.length > 0 &&
        <Button 
        buttonTitle='Add to my workout plan' 
        onClick={addToMyWorkoutPlan} 
        disabled={updatedList.length === 0} 
        size="medium" />
      }
    </div>
  )
}

export default WorkoutPlan