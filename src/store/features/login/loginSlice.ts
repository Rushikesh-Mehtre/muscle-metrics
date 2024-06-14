import { createSlice } from '@reduxjs/toolkit'

export interface loginState {
  isLoggedIn?: boolean,
  userId?:string,
  userName?:string,
  userDocId?:string
}

const initialState: loginState = {
  isLoggedIn: false,
  userId:"",
  userName:"",
  userDocId:""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoggedIn = true;
      if(action.payload.userId){

        state.userId = action.payload.userId;
        }
        if(action.payload.userName){

          state.userName = action.payload.userName
          }
          if(action.payload.userDocId){

            state.userDocId = action.payload.userDocId
            }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.userName=""
      state.userDocId=""
    },

  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer