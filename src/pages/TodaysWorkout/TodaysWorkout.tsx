import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import "./TodaysWorkout.scss"
import Accordion from '../../components/Accordian/Accordian';

const TodaysWorkout = () => {
    const [workoutData, setWorkOutData] = useState([]);
    const myWorkouts = useSelector((state: RootState) => state.myWorkoutPlan.workouts);
    const [dataToShow, setDataToShow] = useState([]);
    const [selectedWorkout,setSelectedWorkout]=useState("");
    const fetchWorkoutData = ()=>{
        
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
        
          setWorkOutData(workouts);
    }
    const optionSelectHandler = (selectedOption: string) => {
      setSelectedWorkout(selectedOption)
        // to filter out data from myWorkoutPlan store based on selectedOption and show it here
        let dataToShow = myWorkouts.filter((item) => item.title === selectedOption);
        // add array to maintain set and reps dynamically. 
        if (dataToShow.length > 0) {
            let { title, exercises } = dataToShow[0];
            let exerciseCount = [];
            exerciseCount.push({ setNo: 1, repCount: 0 })
            const updatedArray = exercises.map((item, i) => {
                return { ...item, exerciseCount };
            });

            let finalDataToShow = { title, exercises: updatedArray }
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
        let { title, exercises } = dataToShow;
        let exerciseCount = exercises[exerciseIndex].exerciseCount;
        exerciseCount.push({ setNo:setNo+1, repCount:0 });
        const updatedArray = exercises.map((item, i) => {
            if (i === exerciseIndex) {
                return { ...item, exerciseCount };
            }
            return item;
        });
        let finalDataToShow = { title, exercises: updatedArray }
        setDataToShow(finalDataToShow);
    };
    
    const repCountHandler = (exerciseIndex: number, setNo: number, repCount: number)=>{
        // update rep count for current exercise.
        let dataToShowCopy = {...dataToShow};
        let { title, exercises } = dataToShowCopy;
        let exercisesCopy = [...exercises]
        let exerciseCount = exercisesCopy[exerciseIndex].exerciseCount;
        exerciseCount[setNo-1]={setNo:setNo,repCount:repCount};
        const updatedArray = exercises.map((item, i) => {
            if (i === exerciseIndex) {
                return { ...item, exerciseCount };
            }
            return item;
        });
        let finalDataToShow = { title, exercises: updatedArray }
        setDataToShow(finalDataToShow);
    }

    return (
        <div className='todays-workout-container'>
            {workoutData.length > 0  ? <div>
                <Dropdown options={workoutData} labelHeading="Select today's workout" optionSelectHandler={optionSelectHandler} />
            </div> : <p>Loading...</p>}
            {dataToShow?.exercises?.length > 0 ? <Accordion items={[...dataToShow.exercises]} handleCurrentSet={handleCurrentSet} repCountHandler={repCountHandler} /> :    <div className='no-exercises-to-show'>
                <p className='no-exercise-label'>Oops ! You have no exercises added for {selectedWorkout} </p>
                <Button buttonTitle='Add Exercises' onClick={addExerciseHandler} disabled={false} />
            </div>}

        </div>
    )
}

export default TodaysWorkout