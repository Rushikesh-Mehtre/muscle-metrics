import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/login";
import App from "./App";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Progress from "./pages/Progress/Progress";
import WorkoutPlan from "./pages/WorkoutPlan/WorkoutPlan";
import TodaysWorkout from "./pages/TodaysWorkout/TodaysWorkout";
import Register from "./pages/Register/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'register',
          element:<Register/>
        },
        {
          path:'home',
          element:<Home/>
        },
        {
          path:'about',
          element:<About/>
        },
        {
          path:'profile',
          element:<Profile/>
        },
        {
          path:'progress',
          element:<Progress/>
        },
        {
          path:'workout-plan',
          element:<WorkoutPlan/>
        },
        {
          path:'todays-workout',
          element:<TodaysWorkout/>
        },
        {
          path:'*',
          element:<PageNotFound/>
        },
      ]
    },
  ]);