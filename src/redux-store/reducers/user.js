import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/auth";
import { formlist, getCountry, getUserDetails } from "../actions/user";

const userSlice = createSlice({
    name: "fetchUsers",
    initialState: {
        isLoading: false,
        data: [],
        formList: [],
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

        }).addCase(formlist.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(formlist.fulfilled, (state, action) => {
            state.formList = action.payload.data;
            state.isLoading = false;
        }).addCase(formlist.rejected, (state, action) => {  
            state.isError = true;
            state.isLoading = false;

        // }).addCase(getUserDetails.pending, (state, action) => {
        //     state.isLoading = true;
        // }).addCase(getUserDetails.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     console.log(state.data);
        //     state.isLoading = false;
        // }).addCase(getUserDetails.rejected, (state, action) => {
        //     state.isError = true;
        //     state.isLoading = false;

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
