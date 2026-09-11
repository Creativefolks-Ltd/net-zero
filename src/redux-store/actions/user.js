import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { generalInfo, logout, setFormCompleted } from "../reducers/auth";

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
        const response = await axios.post("/api/user/general/form", data);

        const form_id = response.data.form_id || response.data.data.form_id;
        await thunkAPI.dispatch(addGeneralInfo(form_id))
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const generalFormUpdate = createAsyncThunk('generalFormUpdate', async (data, thunkAPI) => {
    try {
        const form_id = data.form_id;
        const formValues = data.formValues;
        const response = await axios.put(`/api/user/general/form/${form_id}`, formValues);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const homeFormSubmit = createAsyncThunk('home', async (data, thunkAPI) => {
    try {
        
        const response = await axios.post("/api/user/home/form", data);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    } finally {
        await thunkAPI.dispatch(fetchParticularForm(data?.general_information_id));
    }
});

export const homeFormUpdate = createAsyncThunk('homeFormUpdate', async (data, thunkAPI) => {
    try {
        const form_id = data.form_id;
        const formValues = data.formValues;
        const response = await axios.put(`/api/user/home/form/${form_id}`, formValues);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const travelFormSubmit = createAsyncThunk('travel', async (data, thunkAPI) => {
    try {
        
        const response = await axios.post("/api/user/travel/form", data);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const travelFormUpdate = createAsyncThunk('travelFormUpdate', async (data, thunkAPI) => {
    try {
        const form_id = data.form_id;
        const formValues = data.formValues;
        const response = await axios.put(`/api/user/travel/form/${form_id}`, formValues);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const foodFormSubmit = createAsyncThunk('food', async (data, thunkAPI) => {
    try {
        
        const response = await axios.post("/api/user/food/form", data);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const foodFormUpdate = createAsyncThunk('foodFormUpdate', async (data, thunkAPI) => {
    try {
        const form_id = data.form_id;
        const formValues = data.formValues;
        const response = await axios.put(`/api/user/food/form/${form_id}`, formValues);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const finanicialFormSubmit = createAsyncThunk('finanicial', async (data, thunkAPI) => {
    try {
        
        const response = await axios.post("/api/user/financial/form", data);
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
        
        // const response = await axios.get(`/api/get/user/detail?user_id=${user_id}`);
        const response = await axios.get(`/api/user/profile`);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});
export const updateUserDetails = createAsyncThunk('updateUserDetails', async ({ data, user_id }, thunkAPI) => {
    try {
        
        // const response = await axios.put(`/api/user/information/${user_id}`, data);
        const response = await axios.put(`/api/user/profile`, data);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const formlist = createAsyncThunk('formlist', async (user_id, thunkAPI) => {
    try {
        
        const response = await axios.get(`/api/user/forms`);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const fetchParticularForm = createAsyncThunk('fetchParticularForm', async (form_id, thunkAPI) => {
    try {
        
        const response = await axios.get(`/api/user/form/${form_id}`);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const formDelete = createAsyncThunk('formDelete', async (form_id, thunkAPI) => {
    try {
        
        const response = await axios.delete(`/api/user/form/${form_id}`);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const homeformIds = createAsyncThunk('homeformIds', async (general_id, thunkAPI) => {
    try {
        
        const response = await axios.get(`/api/user/home/forms/count/${general_id}`);
        const completed_form_count = response?.data?.data?.count_form
        thunkAPI.dispatch(setFormCompleted(completed_form_count))
        return response?.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const homeFormDelete = createAsyncThunk('homeFormDelete', async (home_id, thunkAPI) => {
    try {
        
        const response = await axios.delete(`/api/user/home/form/${home_id}`);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const particularHomeDetails = createAsyncThunk('particularHomeDetails', async (general_id, thunkAPI) => {
    try {
        
        const response = await axios.get(`/api/user/home/form/${general_id}`);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const downloadPdf = createAsyncThunk('downloadPdf', async (form_id, thunkAPI) => {
    try {
        
        const response = await axios.get(`/api/user/form/${form_id}/pdf`, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const downloadCSV = createAsyncThunk('downloadCSV', async (form_id, thunkAPI) => {
    try {
        
        const response = await axios.get(`/api/user/form/${form_id}/csv`);
        return response.data;
    } catch (error) {
        TokenExpiredLogout(error, thunkAPI)
    }
});

export const managePassword = createAsyncThunk('managePassword', async (data, thunkAPI) => {
    try {
        
        const response = await axios.put("/api/user/password", data);
        return response.data;
    } catch (error) {
        return error;
    }
});
