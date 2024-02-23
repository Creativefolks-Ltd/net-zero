import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth"
import userSlice from "./user"
import adminSlice from "./admin"
import formsSlice from "./forms"


const rootReducer = combineReducers({
    auth: authSlice,
    users: userSlice,
    admin: adminSlice,
    forms: formsSlice
})

export default rootReducer