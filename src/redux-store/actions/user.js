import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { generalInfo } from "../reducers/auth";

export const addGeneralInfo = createAsyncThunk('auth/generalInfoId', async (form_id, { dispatch }) => {
    dispatch(generalInfo(form_id));
    return { success: true };
});

export const generalFormSubmit = createAsyncThunk('general', async (data, { dispatch }) => {
    try {
        const response = await axios.post("/api/user/general/form/submit", data);

        const form_id = response.data.form_id || response.data.data.form_id;
        await dispatch(addGeneralInfo(form_id))
        return response.data;
    } catch (error) {
        return error;
    }
});

export const homeFormSubmit = createAsyncThunk('home', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/user/home/form/submit", data);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const travelFormSubmit = createAsyncThunk('travel', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/user/travel/form/submit", data);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const foodFormSubmit = createAsyncThunk('food', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/user/food/form/submit", data);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const finanicialFormSubmit = createAsyncThunk('finanicial', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/user/finanicial/form/submit", data);
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

export const getUserDetails = createAsyncThunk('getUserDetails', async (user_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/get/user/detail?user_id=${user_id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});
export const updateUserDetails = createAsyncThunk('updateUserDetails', async ({ data, user_id }, thunkAPI) => {
    try {
        const response = await axios.put(`/api/user/information/${user_id}`, data);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const formlist = createAsyncThunk('formlist', async (user_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/get/user/formlist?user_id=${user_id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const formDelete = createAsyncThunk('formDelete', async (form_id, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/delete/user/form/${form_id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const homeformIds = createAsyncThunk('homeformIds', async (general_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/get/user/home/list?general_information_id=${general_id}`);
        return response?.data;
    } catch (error) {
        return error;
    }
});

export const homeFormDelete = createAsyncThunk('homeFormDelete', async (home_id, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/delete/user/home/form/${home_id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const particularHomeDetails = createAsyncThunk('particularHomeDetails', async (general_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/get/user/home/detail?home_id=${general_id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});