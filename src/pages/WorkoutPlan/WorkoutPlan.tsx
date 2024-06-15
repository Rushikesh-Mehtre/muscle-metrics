/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import "./WorkoutPlan.scss"
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../store/features/alert/alertSlice';
import {  EXERCISES_ADDED_SUCCESSFULLY, WORKOUT_UPDATED_SUCCESSFULLY } from '../../utils/constants/app.constants';
import PageHeading from '../../components/PageHeading/PageHeading';
import { RootState } from '../../store/store';
import { getFirestore, collection, addDoc, doc, getDoc, query, getDocs, where, updateDoc } from 'firebase/firestore';
import { app, db } from "../../firebaseConfig";
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const firestore = getFirestore(app);

const WorkoutPlan = () => {
  // state variables
  const dispatch = useDispatch();
  const [workoutData, setWorkOutData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const userDocId = useSelector((state: RootState) => state.login.userDocId);
  const [selectedOption, setSelectionOption] = useState("");
  const [selectedWorkoutDocId, setSelectedWorkoutDocId] = useState("");
  console.log("selectedWorkoutDocId", selectedWorkoutDocId)

  // ui functions

  // to add workout data to specific user ;
  const addData = async () => {
    const result = await addDoc(collection(firestore, `users/${userDocId}/workouts`),
      {
        exerciseName: selectedOption,
        exercises: selectedItems
      }
    );
    console.log("result", result);
    dispatch(hideLoader());
    dispatch(showAlert(EXERCISES_ADDED_SUCCESSFULLY));
    fetchMyWorkouts();

  }
  const fetchMyWorkouts = async () => {
    const q = query(collection(db, `users/${userDocId}/workouts`), where('exerciseName', '==', selectedOption));
    // get user data
    const querySnapshot = await getDocs(q);
          // @ts-ignore
    let myWorkOutData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // @ts-ignore
      const workoutDataObj: myWorkoutObj = { exerciseDocId: doc.id, ...doc.data() };
      myWorkOutData.push(workoutDataObj);
    });
    if (myWorkOutData.length > 0) {
      // @ts-ignore
      setSelectedItems(myWorkOutData[0].exercises);
            // @ts-ignore
      setSelectedWorkoutDocId(myWorkOutData[0].exerciseDocId)
    } else {
      setSelectedItems([]);
      setSelectedWorkoutDocId("");
    }
    dispatch(hideLoader());


  }
  useEffect(() => {
    if (selectedOption) {

      fetchMyWorkouts();
    }
  }, [selectedOption])
  const fetchWorkoutData = async () => {
    const ref = doc(firestore, "workouts", "gDEq2pOACmqr7twzXozQ");
    const result = await getDoc(ref);
    const workouts = result.data()?.workouts;
    console.log("workouts", workouts)
    setWorkOutData(workouts);
    dispatch(hideLoader());
  }
        // @ts-ignore
  const optionSelectHandler = (e) => {

    const selectedOption = e.target.value;
    if(!selectedOption){
      setSelectionOption("");
      setExerciseData([]);
      
      return
    }
    dispatch(showLoader());
    setSelectionOption(selectedOption)
    setExerciseData([]);
    // @ts-ignore
    let dataToShow = workoutData.filter((item) => item.title === selectedOption);
    setExerciseData(dataToShow);
  }
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [addedItems, setAddedItems] = useState<string[]>([]);
  console.log("selectedItems", selectedItems)
  // console.log("addedItems", addedItems)

  const handleItemSelection = (item: string) => {
    const selectedItemArr = selectedItems;
          // @ts-ignore
    const finalSelectedArr = selectedItems.map((item) => item.title).includes(item.title) ? selectedItems.filter((item1) => item1.title !== item.title) : [...selectedItemArr, item]
    setSelectedItems(finalSelectedArr);

  };

  const handleAddItems = async () => {
    dispatch(showLoader());
    if (selectedWorkoutDocId) {

      console.log("selectedWorkoutDocId", selectedWorkoutDocId)
      const docRef = doc(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}`);
      await updateDoc(docRef, {
        exercises: selectedItems,
      });
      dispatch(hideLoader());
      dispatch(showAlert(WORKOUT_UPDATED_SUCCESSFULLY))
    } else {
      addData();
    }
  };
  // use-effect blocks
  useEffect(() => {
    dispatch(showLoader())
    fetchWorkoutData();
  }, [])

  return (
    <div className='workout-plan-container'>
      <PageHeading headingLabel="Lets make workout plan" />
      <div className='select-workout-container'>
        <label htmlFor="workout">Select Workout</label>
        <select id="workout" onChange={optionSelectHandler} className="dropdown">
          <option value="">--Select--</option>
          {workoutData.map((item) => (
                  // @ts-ignore
                    // @ts-ignore
            <option key={item.title} value={item.title}> {item.title}
            </option>
          ))}
        </select>
      </div>

      {exerciseData && exerciseData.length > 0 && (
        <div className='select-exercise-container'>
          <p className='header'>Select/Unselect from exercises below to continue</p>
          <div className="item-list">
            {
          // @ts-ignore
            exerciseData[0].exercises.map((item) => (
                    // @ts-ignore
              <div key={item.title} className={`item ${selectedItems.map((item) => item.title).includes(item.title) ? 'selected' : ''}`} onClick={() => handleItemSelection(item)}>
                <input
                  type="checkbox"
                        // @ts-ignore
                  checked={selectedItems.map((item) => item.title).includes(item.title)}
                  onChange={() => handleItemSelection(item)}
                  className="checkbox"
                />
                {item.title}
              </div>
            ))}
          </div>
        </div>

      )}

      <div className='btn-container'>

        <button
          onClick={handleAddItems}
          className="add-button"
          disabled={selectedItems.length === 0}
        >
          Add / Update
        </button>
      </div>
    </div>
  )
}

export default WorkoutPlan