import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import "./TodaysWorkout.scss"
import Accordion from '../../components/Accordian/Accordian';
import { hideLoader, showLoader } from '../../store/features/loading/loadingSlice';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import {myWorkoutObj} from "./TodaysWorkout.d"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
      
const     workouts = [
  {
    workoutId: 1,
    title: "back",
    description: "targets back",
    exercises: [
      {
        title: "lat pulldown",
        id: 1
      },
      {
        title: "deadlift",
        id: 2
      },
      {
        title: "one arm row",
        id: 3
      },
      {
        title: "pull over",
        id: 4
      },
      {
        title: "pull ups",
        id: 5
      }
    ]
  },
  {
    workoutId: 2,
    title: "chest",
    description: "targets chest",
    exercises: [
      {
        title: "Incline bench press",
        id: 1
      },
      {
        title: "flat bench press",
        id: 2
      },
      {
        title: "Decline bench press",
        id: 3
      },
      {
        title: "cable",
        id: 4
      },
      {
        title: "push ups",
        id: 5
      }
    ]
  },
  {
    workoutId: 3,
    title: "biceps",
    description: "targets biceps",
    exercises: [
      {
        title: "precher curl",
        id: 1
      },
      {
        title: "dumbell curl",
        id: 2
      },
      {
        title: "hammer curl",
        id: 3
      },
      {
        title: "cable row curl",
        id: 4
      },
      {
        title: "reverse grip curl",
        id: 5
      }
    ]
  },
  {
    workoutId: 4,
    title: "triceps",
    description: "targets triceps",
    exercises: [
      {
        title: "close grip bench press",
        id: 1
      },
      {
        title: "pully push down",
        id: 2
      },
      {
        title: "overhead cable extension",
        id: 3
      },
      {
        title: "vertical dips",
        id: 4
      }
    ]
  },
  {
    workoutId: 5,
    title: "shoulders",
    description: "targets shoulders",
    exercises: [
      {
        title: "overhead dumbell press",
        id: 1
      },
      {
        title: "front raises",
        id: 2
      },
      {
        title: "lateral raises",
        id: 3
      },
      {
        title: "real delts extension",
        id: 4
      }
    ]
  },
  {
    workoutId: 6,
    title: "legs",
    description: "targets legs",
    exercises: [
      {
        title: "leg press",
        id: 1
      },
      {
        title: "weighted sqauts",
        id: 2
      },
      {
        title: "leg extension",
        id: 3
      },
      {
        title: "leg curls",
        id: 4
      },
      {
        title: "seated calves",
        id: 5
      }
    ]
  },
  {
    workoutId: 6,
    title: "cardio",
    description: "targets overall body and heart health",
    exercises: [
      {
        title: "Treadmill",
        id: 1
      },
      {
        title: "Crossfit",
        id: 2
      }
    ]
  }
]
const TodaysWorkout = () => {
    const [workoutData, setWorkOutData] = useState([]);
    const [myWorkouts,setMyWorkouts]=useState([]);
    console.log("myWorkouts",myWorkouts)
    const [dataToShow, setDataToShow] = useState([]);
    const [selectedWorkout,setSelectedWorkout]=useState("");
    const userDocId = useSelector((state: RootState) => state.login.userDocId);
    const dispatch = useDispatch();
    const fetchWorkoutData = ()=>{
      // @ts-ignore
          setWorkOutData(workouts);
    }
    const getMyWorkoutData = async () => {
      const q = query(collection(db, `users/${userDocId}/workouts`));
      // get user data
      const querySnapshot = await getDocs(q);
      dispatch(hideLoader());
      let myWorkOutData :myWorkoutObj[] = [];
      console.log("querySnapshot",querySnapshot)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
     const workoutDataObj = doc.data();
        console.log("workoutDataObj", workoutDataObj);
        // @ts-ignore
        myWorkOutData.push(workoutDataObj);
        });
        // @ts-ignore
        setMyWorkouts(myWorkOutData);
  
      // dispatch(login(userName:userName))
    }
    useEffect(()=>{
      dispatch(showLoader());
      getMyWorkoutData()
    },[])


    const optionSelectHandler = (selectedOption: string) => {
      setSelectedWorkout(selectedOption);
      console.log("myWorkouts",myWorkouts)
      console.log("selectedOption",selectedOption)
        // to filter out data from myWorkoutPlan store based on selectedOption and show it here
        // @ts-ignore
        let dataToShow = myWorkouts.filter((item) => item.exerciseName === selectedOption);
        console.log("dataToShow",dataToShow)
        // add array to maintain set and reps dynamically. 
        if (dataToShow.length > 0) {
            let { exerciseName, exercises } = dataToShow[0];
                        // @ts-ignore
            let exerciseCount = [];
            exerciseCount.push({ setNo: 1, repCount: 0 })
            // @ts-ignore
            const updatedArray = exercises.map((item, i) => {
              // @ts-ignore
                return { ...item, exerciseCount };
            });

            let finalDataToShow = { title:exerciseName, exercises: updatedArray }
            console.log("finalDataToShow",finalDataToShow)
            // @ts-ignore
            setDataToShow(finalDataToShow);
        } else {
            setDataToShow([]);

        }


    }
    const navigate = useNavigate();
    const addExerciseHandler = () => {
        navigate("/workout-plan")
    }
    useEffect(() => {
        fetchWorkoutData();
    }, [])
    // const accordinaItemClickHandler = (index)=>{
    //     let arrayToUpdate = dataToShow[0].exercises;
    //     let objToAdd = {
    //         currentSet : 1,
    //         currentSetRep : 0
    //     }
    //     if (index >= 0 && index < arrayToUpdate.length) {
    //         arrayToUpdate[index] = { ...arrayToUpdate[index], ...objToAdd };
    //       };
    //     setDataToShow(arrayToUpdate);  
    // }
    const handleCurrentSet = (exerciseIndex: number, setNo: number, repCount: number) => {
        // add another rep to specific exercise
                      // @ts-ignore
        let { title, exercises } = dataToShow;
        let exerciseCount = exercises[exerciseIndex].exerciseCount;
        exerciseCount.push({ setNo:setNo+1, repCount:0 });
                      // @ts-ignore
        const updatedArray = exercises.map((item, i) => {
            if (i === exerciseIndex) {
                return { ...item, exerciseCount };
            }
            return item;
        });
        let finalDataToShow = { title, exercises: updatedArray }
                      // @ts-ignore
        setDataToShow(finalDataToShow);
    };
    
    const repCountHandler = (exerciseIndex: number, setNo: number, repCount: number)=>{
        // update rep count for current exercise.
        let dataToShowCopy = {...dataToShow};
                      // @ts-ignore
        let { title, exercises } = dataToShowCopy;
        let exercisesCopy = [...exercises]
        let exerciseCount = exercisesCopy[exerciseIndex].exerciseCount;
        exerciseCount[setNo-1]={setNo:setNo,repCount:repCount};
                      // @ts-ignore
        const updatedArray = exercises.map((item, i) => {
            if (i === exerciseIndex) {
                return { ...item, exerciseCount };
            }
            return item;
        });
        let finalDataToShow = { title, exercises: updatedArray }
                      // @ts-ignore
        setDataToShow(finalDataToShow);
    }

    useEffect(()=>{
      if(selectedWorkout){
        optionSelectHandler(selectedWorkout);
        }
    },[selectedWorkout,myWorkouts])

    return (
        <div className='todays-workout-container'>
            {workoutData.length > 0  ? <div>
                <Dropdown 
                  options={workoutData} 
                  labelHeading="Select today's workout" 
                  optionSelectHandler={optionSelectHandler} />
            </div> : <p>Loading...</p>}
            { dataToShow && 
            // @ts-ignore
          dataToShow?.exercises?.length > 0 && myWorkouts.length>0 ? 
            <Accordion 
            // @ts-ignore
            items={myWorkouts.length>0 ?[...dataToShow.exercises]: []} 
            handleCurrentSet={handleCurrentSet} 
                        // @ts-ignore
            repCountHandler={repCountHandler} 
            /> :    
            <div className='no-exercises-to-show'>
              <p className='no-exercise-label'>
                Oops ! You have no exercises added for {selectedWorkout} 
              </p>
              <Button buttonTitle='Add Exercises' onClick={addExerciseHandler} disabled={false} />
            </div>}

        </div>
    )
}

export default TodaysWorkout