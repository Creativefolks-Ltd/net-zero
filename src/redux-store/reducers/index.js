import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth"
import userSlice from "./user"
import adminSlice from "./admin"


const rootReducer = combineReducers({
    auth: authSlice,
    users: userSlice,
    admin: adminSlice,
})

export default rootReducer