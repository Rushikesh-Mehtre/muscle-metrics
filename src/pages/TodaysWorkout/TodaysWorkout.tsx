/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import "./TodaysWorkout.scss"
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import { addDoc, collection, getDocs, getFirestore, limit, orderBy, query, where } from 'firebase/firestore';
import { app, db } from '../../firebaseConfig';
import { myWorkoutObj } from "./TodaysWorkout.d"
import RepCountWeightInput from '../../components/RepCountWeightInput/RepCountWeightInput';
import { showAlert } from '../../store/features/alert/alertSlice';
import { EXERCISE_DATA_ADDED_SUCCESSFULLY, NO_RECORDS_FOUND, REMOVE_OR_ADD_OPEN_FIELD_MSG } from '../../utils/constants/app.constants';
import WeightRepTrackModalComponent from '../../components/WeightRepTrackModalComponent/WeightRepTrackModalComponent';
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
  const [mySelectedWorkouts, setMySelectedWorkouts] = useState([]);
  console.log("mySelectedWorkouts", mySelectedWorkouts)
  // const [dataToShow, setDataToShow] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  console.log("selectedWorkout", selectedWorkout)
  const [selectedExercise, setSelectedExercise] = useState("");
  console.log("selectedExercise", selectedExercise);
  const [selectedWorkoutDocId, setSelectedWorkoutDocId] = useState("");
  console.log("selectedWorkoutDocId", selectedWorkoutDocId)
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
      const workoutDataObj = { id: doc.id, ...doc.data() };
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
  console.log("entries", entries)
  const [showCurrentEntryFields, setShowCurrentEntryFields] = useState(true);
  const handleAddEntry = (setNo: number, repCount: number, weight: number) => {
    setDataAddedToServer(false);
    const newEntry = { setNo, repCount, weight };
    setEntries([...entries, newEntry]);
    // Here you can call your API
  };

  const handleCancel = () => {
    setShowCurrentEntryFields(false);
    // setEntries(entries.slice(0, -1));
  };
  const firestore = getFirestore(app);
  const addExerciseDataToServer = async () => {
    if (showCurrentEntryFields) {
      dispatch(showAlert(REMOVE_OR_ADD_OPEN_FIELD_MSG))
      return;
    }
    dispatch(showLoader());
    const date = new Date();
    let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const result = await addDoc(collection(firestore, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedExercise}`),
      {
        exerciseName: selectedExercise,
        exercisesTrackingArr: entries,
        createdAt: new Date().toISOString(),
        addedAt:dateMDY
      }
    );
    const result1 = await addDoc(collection(firestore, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedWorkout}`),
    {
      exerciseName: selectedExercise,
      exercisesTrackingArr: entries,
      createdAt: new Date().toISOString(),
      addedAt:dateMDY

    }
  );
    console.log("result", result);
    console.log("result1", result1);
    setDataAddedToServer(true);
    dispatch(hideLoader())
    dispatch(showAlert(EXERCISE_DATA_ADDED_SUCCESSFULLY))
  }

  const optionSelectHandler = (selectedOption: string) => {

    setSelectedWorkout(selectedOption);
    setEntries([]);
    setShowCurrentEntryFields(true);

  }
  const optionSelectHandler1 = (selectedExercise: string) => {
    setSelectedExercise(selectedExercise);
    setEntries([]);
    setShowCurrentEntryFields(true);

  }

  useEffect(() => {
    if (selectedWorkout) {
      // @ts-ignore
      const workoutsArr = myWorkouts.filter((item) => item.exerciseName === selectedWorkout);
      console.log("workoutsArr", workoutsArr)
      setMySelectedWorkouts(workoutsArr);
      // @ts-ignore
      if (workoutsArr.length > 0) {
        // @ts-ignore
        setSelectedWorkoutDocId(workoutsArr[0].id)
      }
    }
  }, [myWorkouts, selectedWorkout]);

  const [dataAddedToServer, setDataAddedToServer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [dataForModal, setDataForModal] = useState([]);
  const [dataType, setDataType] = useState("");
  const modalDataHandler = async (dataType: string) => {
    setDataType(dataType)
    dispatch(showLoader());
    if(dataType==="exercise"){
      const q = query(collection(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedExercise}`)
      , orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot1 = await getDocs(q);
      console.log("querySnapshot1",querySnapshot1.empty)
      // get user data
      // @ts-ignore
      if(!querySnapshot1.empty){
       // record present 
                 // @ts-ignore
       let lastAddedWorkout = [];
       querySnapshot1.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         // @ts-ignore
         const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data(),title:selectedExercise };
         lastAddedWorkout.push(workoutDataObj);
          // @ts-ignore
          console.log("lastAddedWorkout",lastAddedWorkout)
                    // @ts-ignore
         setDataForModal(lastAddedWorkout)
         handleOpenModal();
       });
      }else{
        // no record present
        dispatch(showAlert(NO_RECORDS_FOUND))
      }
    }else if(dataType==="workout"){
      let lastWorkOutAddedAt = "";
      const q = query(collection(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedWorkout}`), orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot1 = await getDocs(q);
      console.log("querySnapshot1",querySnapshot1.empty)
      // get user data
      // @ts-ignore
      if(!querySnapshot1.empty){
       // record present 
                 // @ts-ignore
      
       let lastAddedWorkout = [];
       querySnapshot1.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         // @ts-ignore
         const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data(),title:selectedWorkout  };
                  // @ts-ignore
         lastWorkOutAddedAt = workoutDataObj.addedAt;
         console.log("lastWorkOutAddedAt",lastWorkOutAddedAt)
          });
          const q2 = query(collection(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedWorkout}`), where("addedAt","==",lastWorkOutAddedAt));
          const querySnapshot2 = await getDocs(q2);
                    // @ts-ignore
                    querySnapshot2.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      // @ts-ignore
                      const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data(),title:selectedWorkout  };
                      lastAddedWorkout.push(workoutDataObj);
                               // @ts-ignore
                       });
                                             // @ts-ignore
          console.log("lastAddedWorkout",lastAddedWorkout)
                                                       // @ts-ignore
          setDataForModal(lastAddedWorkout)
          handleOpenModal();
      }else{
        // no record present
        dispatch(showAlert(NO_RECORDS_FOUND))
      }
    }
    dispatch(hideLoader())
 
  }

  return (
    <div className='todays-workout-container'>
      <div className='header'>
        <div className='heading-data'>
          <p className='left'>Select Today's workout</p>
          {selectedWorkout && mySelectedWorkouts.length > 0 && <button onClick={() => modalDataHandler("workout")}>Check your last {selectedWorkout} workout </button>}
        </div>
        <p> </p>
        {workOutList.length > 0 && <Dropdown
          // @ts-ignore
          options={workOutList}
          optionSelectHandler={optionSelectHandler}
          // @ts-ignore
          dataAddedToServer={dataAddedToServer}
          // @ts-ignore
          singleEntryPresent={entries.length > 0}
        />
        }

        {
          mySelectedWorkouts.length > 0 ?
            <>
              <div className='heading-data'>
                <p className='left'>Select exercise </p>
                {selectedExercise && <button onClick={() => modalDataHandler("exercise")}>Check your last {selectedExercise} workout </button>}
              </div>

              <Dropdown
                // @ts-ignore
                options={mySelectedWorkouts[0].exercises}
                optionSelectHandler={optionSelectHandler1}
                // @ts-ignore
                dataAddedToServer={dataAddedToServer}
                // @ts-ignore
                singleEntryPresent={entries.length > 0}
              />

            </>
            :
            <div className='no-exercises-container'>
              <p>Oops ! No exercise present for this workout</p>
              <button onClick={addExerciseHandler}>Add exercise</button>
            </div>
        }
      </div>
      {selectedWorkout && mySelectedWorkouts && selectedExercise && mySelectedWorkouts.length > 0 && <div>
        <table>
          <thead>
            <tr>
              <th>Set No</th>
              <th>Weight (in KG)</th>
              <th>Reps</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.setNo}>
                <td>{entry.setNo}</td>
                <td>{entry.weight}</td>
                <td>{entry.repCount}</td>
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

    { showModal &&  <WeightRepTrackModalComponent
        showModal={showModal}
        handleClose={handleCloseModal}
        // @ts-ignore
        data={dataForModal}
        // @ts-ignore
        title={dataForModal.title}
        dataType={dataType}
        // @ts-ignore
        // date={dataForModal.createdAt?.slice(0, 10)}
      />}

    </div>
  )
}

export default TodaysWorkout