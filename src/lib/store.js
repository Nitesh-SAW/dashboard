import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../lib/features/filterSlice'

const store = configureStore({
    reducer: {
        filter: filterReducer
    }
})

export default store