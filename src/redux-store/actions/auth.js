import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { setMessage } from "./message";
import { logout } from "../reducers/auth";


export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const res = await axios.get(`/users`);
    return res.data;
});

export const userLogin = createAsyncThunk('userLogin', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/login", data, { headers: { "Accept": "application/json", "Content-Type": "application/json" } });
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

export const forgetPassword = createAsyncThunk('forgetPassword', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/forget/password", data);
        return response.data;
    } catch (error) {
        return error;
    }
});
export const resetPassword = createAsyncThunk('resetPassword', async (data, thunkAPI) => {
    try {
        const response = await axios.put("/api/reset/password", data);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const userLogout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    dispatch(logout());
    return { success: true };
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