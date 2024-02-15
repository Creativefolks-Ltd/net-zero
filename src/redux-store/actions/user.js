import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { generalInfo, logout } from "../reducers/auth";

const TokenExpiredLogout = (error, thunkAPI) => {
    if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(logout());
    }
    return error;
}

export const addGeneralInfo = createAsyncThunk('auth/generalInfoId', async (form_id, { dispatch }) => {
    dispatch(generalInfo(form_id));
    return { success: true };
});

export const generalFormSubmit = createAsyncThunk('general', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState()?.auth?.userInfo?.token
        const response = await axios.post("/api/user/general/form/submit", data, { headers: { Authorization: `Bearer ${token}` } });

        const form_id = response.data.form_id || response.data.data.form_id;
        await thunkAPI.dispatch(addGeneralInfo(form_id))
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const homeFormSubmit = createAsyncThunk('home', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.post("/api/user/home/form/submit", data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    } finally {
        await thunkAPI.dispatch(fetchParticularForm(data?.general_information_id));
    }
});

export const travelFormSubmit = createAsyncThunk('travel', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.post("/api/user/travel/form/submit", data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const foodFormSubmit = createAsyncThunk('food', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.post("/api/user/food/form/submit", data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const finanicialFormSubmit = createAsyncThunk('finanicial', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.post("/api/user/finanicial/form/submit", data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const getCountry = createAsyncThunk('getCountry', async (data, thunkAPI) => {
    try {
        const response = await axios.get("/api/get/country", data);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const getUserDetails = createAsyncThunk('getUserDetails', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.get(`/api/get/user/detail?user_id=${user_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});
export const updateUserDetails = createAsyncThunk('updateUserDetails', async ({ data, user_id }, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.put(`/api/user/information/${user_id}`, data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const formlist = createAsyncThunk('formlist', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.get(`/api/get/user/formlist?user_id=${user_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const fetchParticularForm = createAsyncThunk('fetchParticularForm', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.get(`/api/user/fetch/form?form_id=${form_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const formDelete = createAsyncThunk('formDelete', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.delete(`/api/delete/user/form/${form_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const homeformIds = createAsyncThunk('homeformIds', async (general_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.get(`/api/get/user/home/list?general_information_id=${general_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response?.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const homeFormDelete = createAsyncThunk('homeFormDelete', async (home_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.delete(`/api/delete/user/home/form/${home_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const particularHomeDetails = createAsyncThunk('particularHomeDetails', async (general_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.get(`/api/get/user/home/detail?home_id=${general_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const downloadPdf = createAsyncThunk('downloadPdf', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.get(`/api/user/download/pdf?form_id=${form_id}`, { responseType: 'blob', headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const downloadCSV = createAsyncThunk('downloadCSV', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.get(`/api/user/download/csv?form_id=${form_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const managePassword = createAsyncThunk('managePassword', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.userInfo?.token;
        const response = await axios.post("/api/user/manage-password", data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});
