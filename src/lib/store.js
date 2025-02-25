import { configureStore } from "@reduxjs/toolkit";
import filterReducer from '../lib/features/filterSlice'
import formReducer from '../lib/features/formSlice'
import headerReducer from '../lib/features/headerSlice'
import departmentreducer from '../lib/features/department'
import skillreducer from '../lib/features/skills'
import qustionreducer from '../lib/features/qustionslice'
import jobreducer from '../lib/features/addJob'
const store = configureStore({
        reducer: {
                filter: filterReducer,
                form: formReducer,
                header: headerReducer,
                departments: departmentreducer,
                skills: skillreducer,
                qustions: qustionreducer,
                jobs: jobreducer
        }
})

export default store