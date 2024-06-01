import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const dataSignIn = createSlice({
    name: 'data',
    initialState,
    reducers: {
       setData: (state, action) => {
          state.data = action.payload;
       }
    }
})

export const {setData} = dataSignIn.actions
export default dataSignIn.reducer;