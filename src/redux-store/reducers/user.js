import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/auth";
import { getCountry } from "../actions/user";

const userSlice = createSlice({
    name: "fetchUsers",
    initialState: {
        isLoading: false,
        data: [],
        countries: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.isError = true;
        }).addCase(getCountry.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getCountry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.countries = action.payload.data;
        }).addCase(getCountry.rejected, (state, action) => {
            state.isError = true;
        })
    }
});

export default userSlice.reducer;
