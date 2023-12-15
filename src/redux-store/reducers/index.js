import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth"
import userSlice from "./user"


const rootReducer = combineReducers({
    auth: authSlice,
    users: userSlice
})

export default rootReducer