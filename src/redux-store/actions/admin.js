import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const getAdminDetails = createAsyncThunk('getAdminDetails', async (user_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/get/admin/info?user_id=${user_id}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const updateAdminDetails = createAsyncThunk('updateAdminDetails', async ({ data, user_id }, thunkAPI) => {
    try {
        const response = await axios.put(`/api/admin/information/${user_id}`, data);
        return response.data;
    } catch (error) {
        return error;
    }
});


export const getAllForms = createAsyncThunk('getAllForms', async (params, thunkAPI) => {
    const { itemsPerPage, pageNumber, query } = params
    try {
        const response = await axios.get(`/api/get/all/forms?limit=${itemsPerPage}&page=${pageNumber}&query=${query}`);
        return response.data;
    } catch (error) {
        return error;
    }
});

