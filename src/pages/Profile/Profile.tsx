import React, { useEffect } from 'react'
import Button from '../../components/Button/Button'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.scss"
import { useNavigate } from 'react-router-dom';
import ListCard from '../../components/ListCard/ListCard';
import PageHeading from '../../components/PageHeading/PageHeading';
import { updateWorkout } from '../../store/features/my-workout-plan/myWorkoutPlanSlice';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { login } from '../../store/features/login/loginSlice';

const Profile = () => {

  // variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myWorkouts = useSelector((state: RootState) => state.myWorkoutPlan.workouts);
  const userName = useSelector((state: RootState) => state.login.userName);
  const userId = useSelector((state: RootState) => state.login.userId);
  console.log("userId",userId)
  // ui functions
  const goToWorkoutPlan = () => {
    navigate('/workout-plan')
  }

  const deleteWorkout = (workOutToDelete:string)=>{
    let updatedMyWorkouts = myWorkouts.filter((item)=>item.title !==workOutToDelete);
    dispatch(updateWorkout(updatedMyWorkouts));
  }




  const getUserData = async ()=>{
    const q = query(collection(db, "users"), where("userId", "==", userId));
    // get user data
    const querySnapshot = await getDocs(q);
    let userName = "";
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      userName = doc.data().userName;
      console.log("userName",userName)
      });
    console.log("userName",userName);
    dispatch(login({userName:userName}))
    // dispatch(login(userName:userName))
  }

  useEffect(()=>{
    getUserData();
  },[])
  return (
    <div className='profile-container'>
    {userName &&   <PageHeading headingLabel={`Welcome ${userName}`} />}
      {/* if no workout added to profile */}
      {
        myWorkouts.length === 0 &&
        <div className='no-my-workouts-container'>
          <p className='no-workout-label'>Oops ! No workouts added to profile !</p>
          <Button buttonTitle='Add workout plan' onClick={goToWorkoutPlan} />
        </div>
      }
      {
        myWorkouts.length > 0 &&
        <div className='my-workout-plan'>
          <PageHeading headingLabel="My workout plan" />
          {myWorkouts.map((item) => <ListCard 
          cardHeading={item.title} 
          cardList={item.exercises} 
          editable={false} 
          deleteWorkout={deleteWorkout}
          canBeDeleted={true}
          />)}
        </div>

      }


    </div>
  )
}

export default Profile