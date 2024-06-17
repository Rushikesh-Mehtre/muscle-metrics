import { createSlice } from '@reduxjs/toolkit'

export interface exerciseCountObj {
    setNo : number,
    repCount:number,
    weight:number
}
export interface exerciseObj {
    exerciseName : string,
    exerciseCountArr : exerciseCountObj[]

}
export interface myWorkoutObj {
    workoutName:string,
    exercises:exerciseObj[]
}
export interface myWorkoutPlanState {
  todaysWorkoutData : myWorkoutObj[]
}

const initialState: myWorkoutPlanState = {
    todaysWorkoutData: [],
}

export const TodaysWorkoutSlice = createSlice({
  name: 'todays-workout',
  initialState,
  reducers: {
    addToTodaysWorkout: (state,action) => {
        console.log("action",action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { workoutName, exerciseName, exerciseCountArr } = action.payload;
      const workout = state.todaysWorkoutData.find(
        workout => workout.workoutName === workoutName
      );

      if (workout) {
        const exercise = workout.exercises.find(
          exercise => exercise.exerciseName === exerciseName
        );

        if (exercise) {
          exercise.exerciseCountArr = exerciseCountArr;
        } else {
          workout.exercises.push({
            exerciseName,
            exerciseCountArr: exerciseCountArr,
          });
        }
      } else {
        state.todaysWorkoutData.push({
          workoutName,
          exercises: [
            {
              exerciseName,
              exerciseCountArr:exerciseCountArr,
            },
          ],
        });
      }
      },
    clearTodaysWorkouts : (state)=>{
      state.todaysWorkoutData = [];
    },
    updateTodaysWorkouts:(state,action)=>{
      state.todaysWorkoutData = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { addToTodaysWorkout,clearTodaysWorkouts,updateTodaysWorkouts} = TodaysWorkoutSlice.actions

export default TodaysWorkoutSlice.reducer