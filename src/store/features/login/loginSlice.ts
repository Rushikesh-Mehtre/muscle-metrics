import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface loginState {
  isLoggedIn: boolean
}

const initialState: loginState = {
    isLoggedIn: false,
}

export const loginSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoggedIn = true
    },
    logout: (state) => {
        state.isLoggedIn = false
    },

  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer