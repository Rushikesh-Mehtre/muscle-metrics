import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface alertState {
    isAlertVisible: boolean,
    heading: string,
    subHeading: string,
    isCrossButtonPresent: boolean,
    type?: "message" | "success" | "warning",
    duration?: number
}

const initialState: alertState = {
    isAlertVisible: false,
    heading: "Default Heading",
    subHeading: "Default SubHeading",
    isCrossButtonPresent: true,
    type: "message",
    duration: 3000

}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAlertVisible = true
            state.heading = action.payload.heading
            state.subHeading = action.payload.subHeading
            state.duration = action.payload.duration
        },
        hideAlert: (state) => {
            state.isAlertVisible = false
            state.heading = initialState.heading
            state.subHeading = initialState.subHeading
        },

    },
})

// Action creators are generated for each case reducer function
export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer