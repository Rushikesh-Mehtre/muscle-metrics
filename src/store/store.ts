import { combineReducers, configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/login/loginSlice'
import alertReducer from './features/alert/alertSlice'
import myWorkoutPlanReducer from './features/my-workout-plan/myWorkoutPlanSlice'
import loaderReducer from './features/loading/loadingSlice'
import todayWorkoutReducer from './features/todays-workout/TodaysWorkoutSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  login: loginReducer,
  alert: alertReducer,
  myWorkoutPlan:myWorkoutPlanReducer,
  loader:loaderReducer,
  todaysWorkout:todayWorkoutReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk]
})

export const persistor = persistStore(store)
// export const store = configureStore({
//   reducer: {
//     login : loginReducer
//   },
// })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch