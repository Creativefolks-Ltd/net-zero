import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { adminLogout } from "../reducers/auth";

const TokenExpiredLogout = (error, thunkAPI) => {
    if (error.response && error.response.status === 401) {
        thunkAPI.dispatch(adminLogout());
    }
    return error;
}

export const getAdminDetails = createAsyncThunk('getAdminDetails', async (user_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/admin/profile?user_id=${user_id}`);
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const updateAdminDetails = createAsyncThunk('updateAdminDetails', async ({ data }, thunkAPI) => {
    try {
        const response = await axios.put(`/api/admin/profile`, data);
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const getUsers = createAsyncThunk(
    "getUsers",
    async (filters, thunkAPI) => {
        const { limit, page, query, order, sort } = filters;

        try {
            const response = await axios.get(
                "/api/admin/manage/users",
                {
                    params: { limit, page, query, order, sort, role: 2, },
                    signal: thunkAPI.signal,
                }
            );

            return response.data;
        } catch (error) {
            if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
                return thunkAPI.rejectWithValue({
                    cancelled: true,
                });
            }

            return TokenExpiredLogout(error, thunkAPI);
        }
    }
);

export const updateUserEmail = createAsyncThunk("users/updateUserEmail", async ({ user_id, fields }, thunkAPI) => {
    try {
        const response = await axios.put(`/api/admin/manage/users/${user_id}/email`, fields,
            { signal: thunkAPI.signal, }
        );

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data || {
                message: "Failed to update email",
            }
        );
    }
}
);

export const updateUserPassword = createAsyncThunk("users/updateUserPassword", async ({ user_id, fields }, thunkAPI) => {
    try {
        const response = await axios.put(`/api/admin/manage/users/${user_id}/password`, fields,
            { signal: thunkAPI.signal, }
        );

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error?.response?.data || {
                message: "Failed to update password",
            }
        );
    }
}
);

export const getAllForms = createAsyncThunk('getAllForms', async (params, thunkAPI) => {
    const { itemsPerPage, pageNumber, query, order, sort } = params
    try {
        const response = await axios.get(`/api/admin/forms?limit=${itemsPerPage}&page=${pageNumber}&query=${query}&order=${order}&sort=${sort}`);
        return response.data.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const createNewUser = createAsyncThunk('createNewUser', async (data, thunkAPI) => {
    try {
        const response = await axios.post("/api/admin/users", data);
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const uploadCSV = createAsyncThunk('uploadCSV', async (file, thunkAPI) => {
    try {
        const response = await axios.post("/api/admin/form/import", { file: file },
            { headers: { "Content-Type": "multipart/form-data" } });
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const getUserList = createAsyncThunk('getUserList', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`/api/admin/users`);
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const adminFetchParticularForm = createAsyncThunk('adminFetchParticularForm', async (form_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/admin/form/${form_id}`);
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const formDelete = createAsyncThunk('formDelete', async (form_id, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/admin/form/${form_id}`);
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const updateFormName = createAsyncThunk('updateFormName', async (data, thunkAPI) => {
    try {
        const form_id = data?.id;
        const form_name = data?.form_name;
        const response = await axios.patch(`/api/admin/form/${form_id}/name`, { form_name: form_name });
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const assignToNewUser = createAsyncThunk('assignToNewUser', async (data, thunkAPI) => {
    try {
        const user_id = data?.user_id;
        const form_id = data?.form_id;
        const response = await axios.put(`/api/admin/form/${form_id}/assignment`, { user_id: user_id });
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});


export const downloadPdf = createAsyncThunk('downloadPdf', async (form_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/admin/form/${form_id}/pdf`, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const downloadCSV = createAsyncThunk('downloadCSV', async (form_id, thunkAPI) => {
    try {
        const response = await axios.get(`/api/admin/form/${form_id}/csv`,);
        return response.data;
    } catch (error) {
        return TokenExpiredLogout(error, thunkAPI);
    }
});

export const adminManagePassword = createAsyncThunk('adminManagePassword', async (data, thunkAPI) => {
    try {
        const response = await axios.put("/api/admin/password", data,);
        return response.data;
    } catch (error) {
        return error;
    }
});