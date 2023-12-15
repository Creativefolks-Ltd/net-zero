import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";


export const generalFormSubmit = createAsyncThunk('general', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/user/general/form/submit", data);
        return response.data;
    } catch (error) {
        return error;
    }
});   

export const getCountry = createAsyncThunk('getCountry', async (data, thunkAPI) => {
    try {
        const response = await axios.get("/api/get/country", data);
        return response.data;
    } catch (error) {
        return error;
    }
});   
