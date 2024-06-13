import { createSlice } from '@reduxjs/toolkit'

export interface loadingState {
  isLoaderVisible: boolean
}

const initialState: loadingState = {
    isLoaderVisible: false,
}

export const loadingSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoaderVisible = true;
    },
    hideLoader: (state) => {
      state.isLoaderVisible = false;

    },

  },
})

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } = loadingSlice.actions

export default loadingSlice.reducer