import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface exerciseObj {
    id : number,
    title:string
}
export interface myWorkoutObj {
    title : string,
    exercises : exerciseObj[]
}
export interface myWorkoutPlanState {
  workouts : myWorkoutObj[]
}

const initialState: myWorkoutPlanState = {
    workouts: [],
}

export const myWorkoutPlanSlice = createSlice({
  name: 'my-workout-plan',
  initialState,
  reducers: {
    addWorkout: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.workouts = [...state.workouts, action.payload]
      },
      removeWorkout: (state,action) => {
          state.workouts = action.payload.workouts
    },
    clearAllWorkouts : (state)=>{
      state.workouts = [];
    },
    updateWorkout:(state,action)=>{
      state.workouts = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { addWorkout, removeWorkout,clearAllWorkouts ,updateWorkout} = myWorkoutPlanSlice.actions

export default myWorkoutPlanSlice.reducer