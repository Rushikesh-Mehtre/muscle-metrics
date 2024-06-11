import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface loginState {
  isLoggedIn?: boolean,
  userId?:string,
  userName?:string,
}

const initialState: loginState = {
  isLoggedIn: false,
  userId:"",
  userName:""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state,action) => {
      console.log("action",action)
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.userName=""
    },

  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer