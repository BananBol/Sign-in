import { configureStore } from "@reduxjs/toolkit";
import { dataSignIn } from "../slices/dataSlice";

export const store = configureStore({
    reducer: {
        data: dataSignIn.reducer
    }
})