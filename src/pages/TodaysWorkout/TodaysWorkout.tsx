/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import "./TodaysWorkout.scss"
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import { addDoc, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { app, db } from '../../firebaseConfig';
import { myWorkoutObj } from "./TodaysWorkout.d"
import RepCountWeightInput from '../../components/RepCountWeightInput/RepCountWeightInput';
import { showAlert } from '../../store/features/alert/alertSlice';
import { EXERCISE_DATA_ADDED_SUCCESSFULLY, REMOVE_OR_ADD_OPEN_FIELD_MSG } from '../../utils/constants/app.constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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

const TodaysWorkout = () => {
  const [myWorkouts, setMyWorkouts] = useState([]);
  console.log("myWorkouts", myWorkouts)
  const [mySelectedWorkouts, setMySelectedWorkouts] = useState([])
  // const [dataToShow, setDataToShow] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  console.log("selectedWorkout", selectedWorkout)
  const [selectedExercise, setSelectedExercise] = useState("");
  console.log("selectedExercise", selectedExercise);
  const[selectedWorkoutDocId,setSelectedWorkoutDocId]=useState("");
  console.log("selectedWorkoutDocId",selectedWorkoutDocId)
  const userDocId = useSelector((state: RootState) => state.login.userDocId);
  const dispatch = useDispatch();
  const getMyWorkoutData = async () => {
    const q = query(collection(db, `users/${userDocId}/workouts`));
    // get user data
    const querySnapshot = await getDocs(q);
    dispatch(hideLoader());
    let myWorkOutData: myWorkoutObj[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const workoutDataObj = {id:doc.id,...doc.data()};
      // @ts-ignore
      myWorkOutData.push(workoutDataObj);
    });
    // @ts-ignore
    console.log(myWorkOutData)
          // @ts-ignore
    setMyWorkouts(myWorkOutData);

    // dispatch(login(userName:userName))
  }
  useEffect(() => {
    dispatch(showLoader());
    getMyWorkoutData()
  }, [])
  const navigate = useNavigate();
  const addExerciseHandler = () => {
    navigate("/workout-plan")
  }
  interface Entry {
    setNo: number;
    repCount: number;
    weight: number;
  }
  const [entries, setEntries] = useState<Entry[]>([]);
  console.log("entries",entries)
  const [showCurrentEntryFields, setShowCurrentEntryFields] = useState(true);
  const handleAddEntry = (setNo: number, repCount: number, weight: number) => {
    const newEntry = { setNo, repCount, weight };
    setEntries([...entries, newEntry]);
    // Here you can call your API
  };

  const handleCancel = (entryToDelete: number) => {
    setShowCurrentEntryFields(false);
    // setEntries(entries.slice(0, -1));
  };
  const firestore = getFirestore(app);
  const addExerciseDataToServer = async () => {
    if(showCurrentEntryFields){
      dispatch(showAlert(REMOVE_OR_ADD_OPEN_FIELD_MSG))
      return;
    }
    dispatch(showLoader());
    const result = await addDoc(collection(firestore, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedExercise}`),
      {
          exerciseName :selectedExercise,
          exercisesTrackingArr : entries,
          addedAt :new Date().toLocaleDateString('en-GB')
      }
    );
    console.log("result",result)
    dispatch(hideLoader())
    dispatch(showAlert(EXERCISE_DATA_ADDED_SUCCESSFULLY)) 
   }

  const optionSelectHandler = (selectedOption: string) => {
    setSelectedWorkout(selectedOption);
    console.log("myWorkouts", myWorkouts)

    // setSelectedExercise(workoutsArr[0].exercises[0].title)
  }
  const optionSelectHandler1 = (selectedExercise: string) => {
    setSelectedExercise(selectedExercise)
  }

  useEffect(() => {
    if (selectedWorkout) {
            // @ts-ignore
      const workoutsArr = myWorkouts.filter((item) => item.exerciseName === selectedWorkout);
      console.log("workoutsArr", workoutsArr)
      setMySelectedWorkouts(workoutsArr);
            // @ts-ignore
      setSelectedWorkoutDocId(workoutsArr[0].id)
    }
  }, [myWorkouts])

  return (
    <div className='todays-workout-container'>
      <div className='header'>
        <p>Select Today's workout </p>
        {workOutList.length > 0 && <Dropdown
              // @ts-ignore
          options={workOutList}
          optionSelectHandler={optionSelectHandler} />
          }

        {
          mySelectedWorkouts.length > 0 ?
            <>
              <p>Select exercise </p>
              <Dropdown
                // @ts-ignore
                options={mySelectedWorkouts[0].exercises}
                optionSelectHandler={optionSelectHandler1} />

            </>
            :
            <div className='no-exercises-container'>
              <p>Oops ! No exercise present for this workout</p>
              <button onClick={addExerciseHandler}>Add exercise</button>
            </div>
        }
      </div>
      {selectedWorkout && mySelectedWorkouts && mySelectedWorkouts.length > 0 && <div>
        <table>
          <thead>
            <tr>
              <th>Set No</th>
              <th>Reps</th>
              <th>Weight (in KG)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.setNo}>
                <td>{entry.setNo}</td>
                <td>{entry.repCount}</td>
                <td>{entry.weight}</td>
                <td></td>
              </tr>
            ))}
            {showCurrentEntryFields &&
              <RepCountWeightInput
                onAdd={handleAddEntry}
                onCancel={handleCancel}
                setNo={entries.length + 1}
              />}


          </tbody>
        </table>
        <div className='table-action-btn-container'>
          {
            !showCurrentEntryFields && <button onClick={() => setShowCurrentEntryFields(true)}>Add new Entry</button>

          }
          <button onClick={() => addExerciseDataToServer()}>Done</button>
        </div>
      </div>

      }

    </div>
  )
}

export default TodaysWorkout