/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// components
import Dropdown from '../../components/Dropdown/Dropdown';
import RepCountWeightInput from '../../components/RepCountWeightInput/RepCountWeightInput';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import WeightRepTrackModalComponent from '../../components/WeightRepTrackModalComponent/WeightRepTrackModalComponent';

// css
import "./TodaysWorkout.scss"

// redux store
import { RootState } from '../../store/store';
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import { showAlert } from '../../store/features/alert/alertSlice';
import { addToTodaysWorkout } from '../../store/features/todays-workout/TodaysWorkoutSlice';


// types
import { Entry, myWorkoutObj } from "./TodaysWorkout.d"

// firebase
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app, db } from '../../firebaseConfig';

// constants
import { EXERCISE_DATA_ADDED_SUCCESSFULLY, NO_RECORDS_FOUND, REMOVE_OR_ADD_OPEN_FIELD_MSG, workOutList } from '../../utils/constants/app.constants';

// icons
import { FaExternalLinkAlt } from "react-icons/fa";
import SnakeGame from '../../components/SnakeGame/SnakeGame';


const TodaysWorkout = () => {

  // state variables
  const firestore = getFirestore(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDocId = useSelector((state: RootState) => state.login.userDocId);
  // this will be workouts and exercises user selected and saved on server
  const [myWorkouts, setMyWorkouts] = useState([]);

  // after selecting one of the available workouts - workout data to show will be stored in mySelectedWorkouts
  const [mySelectedWorkouts, setMySelectedWorkouts] = useState([]);

  // currently selected workout and currently selected exercise will be stored in  selectedWorkout amd selectedExercise
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");

  // selectedWorkoutDocId - this will be document id on firebase for the selected workout
  const [selectedWorkoutDocId, setSelectedWorkoutDocId] = useState("");

  // after selecting workout isWorkoutSelected is set to true
  const [isWorkoutSelected, setIsWorkoutSelected] = useState(false);
  const [todaysWorkout, setTodaysWorkout] = useState([]);

  // entries will contain array of objects ; each object will have setno,repcount,weight.

  const [entries, setEntries] = useState<Entry[]>([]);

  // showCurrentEntryFields - this will be used to show input field for new set addition
  const [showCurrentEntryFields, setShowCurrentEntryFields] = useState(true);
  const [showModal1, setShowModal1] = useState(false);
  const [dataForModal, setDataForModal] = useState([]);
  const [dataType, setDataType] = useState("");
  const [dataAddedToServer, setDataAddedToServer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectionOption1, setSelectedOption1] = useState("");
  const [isDataAvailableForExercise, setIsDataAvailableForExercise] = useState(false);
  const [toShowSaveBtn, setToShowSaveBtn] = useState(true);
  const [showGames, setShowGames] = useState(false);


  // ui functions

  const getMyWorkoutData = async () => {
    const q = query(collection(db, `users/${userDocId}/workouts`));
    // get user data
    const querySnapshot = await getDocs(q);
    dispatch(hideLoader());
    let myWorkOutData: myWorkoutObj[] = [];
    querySnapshot.forEach((doc) => {
      const workoutDataObj = { id: doc.id, ...doc.data() };
      // @ts-ignore
      myWorkOutData.push(workoutDataObj);
    });

    // @ts-ignore
    setMyWorkouts(myWorkOutData);

    // dispatch(login(userName:userName))
  }
  const checkForTodaysWorkout = async () => {
    dispatch(showLoader());
    const date = new Date();
    let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // check if today's workout is added 
    const q2 = query(collection(db, `users/${userDocId}/todays-workouts`), where("addedAt", "==", dateMDY));
    const querySnapshot2 = await getDocs(q2);
    // @ts-ignore
    const todaysWorkout = [];
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // @ts-ignore
      const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data() };
      todaysWorkout.push(workoutDataObj);
    });
    // @ts-ignore
    setTodaysWorkout(todaysWorkout);
    if (todaysWorkout.length > 0) {
      // @ts-ignore
      setSelectedWorkout(todaysWorkout[0].todaysWorkout);

    }
  }
  const addExerciseHandler = () => {
    navigate("/workout-plan")
  }

  const handleAddEntry = (setNo: number, repCount: number, weight: number) => {
    setToShowSaveBtn(true)
    if (setNo > 2) {
      setShowCurrentEntryFields(false);
    }
    setDataAddedToServer(false);
    const newEntry = { setNo, repCount, weight };
    setEntries([...entries, newEntry]);
    dispatch(addToTodaysWorkout({
      workoutName: selectedWorkout,
      exerciseName: selectedExercise,
      exerciseCountArr: [...entries, newEntry]
    }))
    // Here you can call your API
  };

  const handleCancel = () => {
    setShowCurrentEntryFields(false);
    // setEntries(entries.slice(0, -1));
  };
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
        addedAt: dateMDY
      }
    );
    console.log("result", result);
    const result1 = await addDoc(collection(firestore, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedWorkout}`),
      {
        exerciseName: selectedExercise,
        exercisesTrackingArr: entries,
        createdAt: new Date().toISOString(),
        addedAt: dateMDY

      }
    );
    console.log("result1", result1)
    setToShowSaveBtn(false)
    setDataAddedToServer(true);
    dispatch(hideLoader())
    dispatch(showAlert(EXERCISE_DATA_ADDED_SUCCESSFULLY))
  }
  const optionSelectHandler = async (selectedOption: string) => {
    setDataType("workout");

    dispatch(showLoader());
    const date = new Date();
    let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    // check if today's workout is added 
    const q2 = query(collection(db, `users/${userDocId}/todays-workouts`), where("addedAt", "==", dateMDY));
    const querySnapshot2 = await getDocs(q2);
    // @ts-ignore
    const todaysWorkout = [];
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // @ts-ignore
      const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data() };
      todaysWorkout.push(workoutDataObj);
    });
    if (querySnapshot2.empty) {
      setSelectedOption1(selectedOption)
      setShowModal1(true);
      dispatch(hideLoader())
    } else {
      dispatch(hideLoader())
      dispatch(showAlert({
        heading: "Cannot change workout in between",
        // @ts-ignore
        subHeading: `Please continue with todays ${todaysWorkout[0].todaysWorkout} workout`,
        duration: 1500
      }))
    }
    // 

  }
  const optionSelectHandler1 = (selectedExercise: string) => {
    dispatch(showLoader());
    setToShowSaveBtn(true);
    setDataType("exercise");
    setSelectedExercise(selectedExercise);
    setEntries([]);
    setShowCurrentEntryFields(true);

  }
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // this function will decide what data to show on modal
  const modalDataHandler = async (dataType: string) => {
    setToShowSaveBtn(true)
    setDataType(dataType)
    const date = new Date();
    let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    dispatch(showLoader());
    if (dataType === "exercise") {
      const q = query(collection(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedExercise}`)
        , where('addedAt', '!=', dateMDY));
      const querySnapshot1 = await getDocs(q);
      // get user data
      // @ts-ignore
      if (!querySnapshot1.empty) {
        // record present 
        // @ts-ignore
        let lastAddedWorkout = [];
        querySnapshot1.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // @ts-ignore
          const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data(), title: selectedExercise };
          lastAddedWorkout.push(workoutDataObj);
          // @ts-ignore
          console.log("lastAddedWorkout", lastAddedWorkout)
          // @ts-ignore
          setDataForModal(lastAddedWorkout)
          handleOpenModal();
        });
      } else {
        // no record present
        dispatch(showAlert(NO_RECORDS_FOUND))
      }
    } else if (dataType === "workout") {
      let lastWorkOutAddedAt = "";
      const q = query(collection(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedWorkout}`));
      const querySnapshot1 = await getDocs(q);
      // get user data
      // @ts-ignore
      // if (!querySnapshot1.empty) {
      // record present 
      // @ts-ignore

      let lastAddedWorkout = [];
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // @ts-ignore
        const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data(), title: selectedWorkout };
        // @ts-ignore
        lastWorkOutAddedAt = workoutDataObj.addedAt;
      });
      const q2 = query(collection(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedWorkout}`), where("addedAt", "==", lastWorkOutAddedAt));
      const querySnapshot2 = await getDocs(q2);
      // @ts-ignore
      querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // @ts-ignore
        const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data(), title: selectedWorkout };
        lastAddedWorkout.push(workoutDataObj);
      });
      // @ts-ignore
      console.log("lastAddedWorkout", lastAddedWorkout)
      // @ts-ignore
      const previousExerciseData = lastAddedWorkout.filter((item) => item.addedAt !== dateMDY);
      // @ts-ignore
      if (previousExerciseData.length > 0) {
        // @ts-ignore
        setDataForModal(previousExerciseData)
        handleOpenModal();
      } else {
        dispatch(showAlert(NO_RECORDS_FOUND))
      }
      // } s
    }
    dispatch(hideLoader())

  }
  const handleCloseModal1 = () => {
    setShowModal1(false);
    setShowGames(false);
  };
  const handleContinue = async () => {
    dispatch(showLoader());
    const date = new Date();
    let dateMDY = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    // // Handle continue action here
    setIsWorkoutSelected(true)
    setSelectedWorkout(selectionOption1);
    setSelectedExercise("")
    setEntries([]);
    setShowCurrentEntryFields(true);
    const result = await addDoc(collection(firestore, `users/${userDocId}/todays-workouts`),
      {
        todaysWorkout: selectionOption1,
        addedAt: dateMDY
      }
    );
    console.log("result", result)
    dispatch(hideLoader());
    setShowModal1(false);
  };

  const checkForThisExerciseData = async () => {
    const date = new Date();
    let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const q = query(collection(db, `users/${userDocId}/workouts/${selectedWorkoutDocId}/${selectedExercise}`), where("addedAt", "==", dateMDY));
    const querySnapshot1 = await getDocs(q);
    // get user data
    // @ts-ignore
    // record present 
    // @ts-ignore
    let lastAddedWorkout = [];
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // @ts-ignore
      const workoutDataObj: myWorkoutObj = { recordId: doc.id, ...doc.data(), title: selectedExercise };
      lastAddedWorkout.push(workoutDataObj);
    });
    if (lastAddedWorkout.length > 0) {
      setIsDataAvailableForExercise(true);
      // @ts-ignore
      setEntries(lastAddedWorkout[0].exercisesTrackingArr)
      setShowCurrentEntryFields(false);
      setToShowSaveBtn(false)
    } else {
      setToShowSaveBtn(true)
      setIsDataAvailableForExercise(false)
    }
    dispatch(hideLoader());

  }

  const showGameHandler = () => {
    setShowGames(true);
  }

  const closeGame = ()=>{
    setShowGames(false)
  }

  // use effect blocks
  useEffect(() => {
    dispatch(showLoader());
    getMyWorkoutData();
    checkForTodaysWorkout();
  }, []);

  useEffect(() => {
    if (selectedWorkout) {
      // @ts-ignore
      const workoutsArr = myWorkouts.filter((item) => item.exerciseName === selectedWorkout);
      setMySelectedWorkouts(workoutsArr);
      // @ts-ignore
      if (workoutsArr.length > 0) {
        // @ts-ignore
        setSelectedWorkoutDocId(workoutsArr[0].id)
        // @ts-ignore
        setSelectedExercise(workoutsArr[0].exercises[0].title)
      }
    }
  }, [myWorkouts, selectedWorkout]);

  useEffect(() => {
    // to check if selected workout data is present in redux or on server. if yes show that in table along with add entry and done button. 
    if (selectedWorkoutDocId) {

      checkForThisExerciseData();
    }
  }, [selectedExercise])

  return (
    <div className='todays-workout-container'>
      <div className='header'>
        <div className='heading-data'>
          {todaysWorkout && todaysWorkout.length > 0 ? <p>Your today's workout</p> : <p className='left'>Select today's workout</p>}
          {selectedWorkout && mySelectedWorkouts.length > 0 &&
            <p className='last-performance-label' onClick={() => modalDataHandler("workout")}>
              <span>last performance</span>
              <FaExternalLinkAlt className='link-icon' />
            </p>
          }
        </div>
        {workOutList.length > 0 && <Dropdown
          // @ts-ignore
          options={workOutList}
          optionSelectHandler={optionSelectHandler}
          // @ts-ignore
          dataAddedToServer={dataAddedToServer}
          // @ts-ignore
          singleEntryPresent={entries.length > 0}
          // @ts-ignore
          value={selectedWorkout}

        />
        }

        {
          mySelectedWorkouts.length > 0 ?
            <>
              <div className='heading-data'>
                <p className='left'>Select exercise </p>
                {selectedExercise && <p className='last-performance-label' onClick={() => modalDataHandler("exercise")}>
                  <span>last performance</span>
                  <FaExternalLinkAlt className='link-icon' />
                </p>}
              </div>

              <Dropdown
                // @ts-ignore
                options={mySelectedWorkouts[0].exercises}
                optionSelectHandler={optionSelectHandler1}
                // @ts-ignore
                dataAddedToServer={dataAddedToServer}
                // @ts-ignore
                singleEntryPresent={entries.length > 0}
                dataAvailableForExercise={isDataAvailableForExercise}
                // @ts-ignore
                value={selectedExercise}
              />

            </>
            :
            (isWorkoutSelected && <div className='no-exercises-container'>
              <p>Oops ! No exercise present for this workout</p>

              <Button size="medium" onClick={() => addExerciseHandler()} buttonTitle='Add Exercise' />
            </div>)
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

            {
              entries.map((entry) => (
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
            !showCurrentEntryFields &&

            <Button size="medium" onClick={() => setShowCurrentEntryFields(true)} buttonTitle='Add new Entry' />
          }
          {toShowSaveBtn && <Button size="medium" onClick={() => addExerciseDataToServer()} buttonTitle='Save' />}
        </div>
      </div>
      }
      {showModal && <WeightRepTrackModalComponent
        showModal={showModal}
        handleClose={handleCloseModal}
        // @ts-ignore
        data={dataForModal}
        // @ts-ignore
        title={dataType === "exercise" ? selectedExercise : selectedWorkout}
        dataType={dataType}
        // @ts-ignore
        date={dataForModal[0].addedAt}
      />}
      <Modal isOpen={showModal1} onClose={handleCloseModal1}>
        <div className='workout-confirmation-modal'>
          <p className='heading'>Do you want to continue ?</p>
          <p>After selecting today's workout it cannot be changed until next day</p>
        </div>
        <div className='buttons'>
        <Button buttonTitle='Cancel' onClick={handleCloseModal1} size="small" />
        <Button buttonTitle='Continue' onClick={handleContinue} size="small" />
        </div>
      </Modal>
    {selectedExercise &&   <div className='games-container'>
        <p className='heading'>Taking break between sets ? - You can play game</p>
        <Button buttonTitle='Play game' onClick={showGameHandler} size="small" />
        {showGames && <SnakeGame closeGame={closeGame} />}
      </div>}

    </div>
  )
}

export default TodaysWorkout