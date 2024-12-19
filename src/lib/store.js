import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../lib/features/filterSlice'
import formReducer from '../lib/features/formSlice'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        form: formReducer
    }
})

export default store