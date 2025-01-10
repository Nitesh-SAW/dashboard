import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../lib/features/filterSlice'
import formReducer from '../lib/features/formSlice'
import headerReducer from '../lib/features/headerSlice'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        form: formReducer,
        header: headerReducer
    }
})

export default store