import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { setMessage } from "./message";


export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const res = await axios.get(`/users`);
    return res.data;
});

export const userLogin = createAsyncThunk('userLogin', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/login", data);
        return response.data;
        
    } catch (error) {
        return error;
    }
});




export const userSignup = createAsyncThunk('userSignup', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/register", data);
        return response.data;
    } catch (error) {
        return error;
    }
});   

// export const userSignup = createAsyncThunk(
//     "userSignup",
//     async (data, thunkAPI) => {
//       try {
//         const response = await AuthService.register(data);
//         thunkAPI.dispatch(setMessage(response.data.message));
//         return response.data;
//       } catch (error) {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         thunkAPI.dispatch(setMessage(message));
//         return thunkAPI.rejectWithValue();
//       }
//     }
//   );