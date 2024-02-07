import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const getAdminDetails = createAsyncThunk('getAdminDetails', async (user_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.get(`/api/get/admin/info?user_id=${user_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const updateAdminDetails = createAsyncThunk('updateAdminDetails', async ({ data, user_id }, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.put(`/api/admin/information/${user_id}`, data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});


export const getAllForms = createAsyncThunk('getAllForms', async (params, thunkAPI) => {
    const { itemsPerPage, pageNumber, query } = params
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.get(`/api/get/all/forms?limit=${itemsPerPage}&page=${pageNumber}&query=${query}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data.data;
    } catch (error) {
        return error;
    }
});

export const createNewUser = createAsyncThunk('createNewUser', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.post("/api/admin/create/user", data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const uploadCSV = createAsyncThunk('uploadCSV', async (file, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.post("/api/import/csv", { file: file }, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const getUserList = createAsyncThunk('getUserList', async (thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.get(`/api/admin/user/list`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const adminFetchParticularForm = createAsyncThunk('adminFetchParticularForm', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.get(`/api/admin/fetch/form?form_id=${form_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const formDelete = createAsyncThunk('formDelete', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.delete(`/api/delete/admin/form/${form_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const updateFormName = createAsyncThunk('updateFormName', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const id = data?.id;
        const form_name = data?.form_name;
        const response = await axios.patch(`/api/update/form/name/${id}`, { form_name: form_name }, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});


export const downloadPdf = createAsyncThunk('downloadPdf', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.get(`/api/download/pdf?form_id=${form_id}`, { responseType: 'blob', headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const downloadCSV = createAsyncThunk('downloadCSV', async (form_id, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.get(`/api/download/form?form_id=${form_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});

export const adminManagePassword = createAsyncThunk('adminManagePassword', async (data, thunkAPI) => {
    try {
        const token = thunkAPI?.getState()?.auth?.adminDetails?.token;
        const response = await axios.post("/api/admin/manage-password", data, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        return error;
    }
});