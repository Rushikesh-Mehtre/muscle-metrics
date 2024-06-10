import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown';
import "./WorkoutPlan.scss"
import ListCard from '../../components/ListCard/ListCard';
import { useDispatch, useSelector } from 'react-redux';
import { title } from 'process';
import { addWorkout } from '../../store/features/my-workout-plan/myWorkoutPlanSlice';
import { showAlert } from '../../store/features/alert/alertSlice';
import { ADD_AT_LEAST_ONE_EXERCISE, EXERCISES_ADDED_SUCCESSFULLY } from '../../utils/constants/app.constants';
import Button from '../../components/Button/Button';
import PageHeading from '../../components/PageHeading/PageHeading';
import { RootState } from '../../store/store';

const WorkoutPlan = () => {
  // state variables
  const dispatch = useDispatch();
  const [workoutData, setWorkOutData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [updatedList, setUpdatedList] = useState([]);
  const myWorkouts = useSelector((state: RootState) => state.myWorkoutPlan.workouts);
  const [myWorkOutExercises, setMyWorkOutExercises] = useState([]);

  console.log("myWorkOutExercises", myWorkOutExercises)
  // ui functions

  const fetchWorkoutData = () => {
    const workouts = [
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
    setExerciseData([]);
    setUpdatedList([]);
    let dataToShow = workoutData.filter((item) => item.title === selectedOption);
    setExerciseData(dataToShow);

    let updatedMyWorkoutExercises = myWorkouts?.filter((item) => item.title === selectedOption)[0]?.exercises || [];
    setMyWorkOutExercises(updatedMyWorkoutExercises)


  }
  const addToListHandler = (listItem) => {
    if (updatedList.filter((item) => item.id === listItem.id).length > 0) {
      // item already present
    } else {
      // add item
      setUpdatedList((prevItems) => [...prevItems, listItem]);
    }
  }
  const removeFromListHandler = (listItem) => {
    setUpdatedList((prevItems) => prevItems.filter((item) => item.id !== listItem.id));

  }
  const addToWorkoutPlan = () => {
    // to do api call here. 
    if (updatedList.length === 0) {
      dispatch(showAlert(ADD_AT_LEAST_ONE_EXERCISE))
    }
    dispatch(addWorkout({ title: exerciseData[0].title, exercises: updatedList }));
    setUpdatedList([]);
    dispatch(showAlert(EXERCISES_ADDED_SUCCESSFULLY))
  }

  // use-effect blocks
  useEffect(() => {
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
            cardHeading={item.title}
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
        <Button buttonTitle='Add to workout plan' onClick={addToWorkoutPlan} disabled={updatedList.length === 0} size="medium" />
      }
    </div>
  )
}

export default WorkoutPlan