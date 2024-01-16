import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/auth";
import { formlist, getCountry, getUserDetails, homeformIds, particularHomeDetails } from "../actions/user";

const userSlice = createSlice({
    name: "fetchUsers",
    initialState: {
        isLoading: false,
        currentHomeId: null,
        data: [],
        formList: [],
        homeFormIdList: [],
        submittedFormCount: null,
        homeDetails: {},
        countries: [],
        isError: false
    }, reducers: {
        setCurrentHomeId(state, action) {
            state.currentHomeId = action.payload
        },
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

        }).addCase(particularHomeDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(particularHomeDetails.fulfilled, (state, action) => {
            state.homeDetails = action.payload.data;
            state.isLoading = false;
        }).addCase(particularHomeDetails.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;

        }).addCase(homeformIds.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(homeformIds.fulfilled, (state, action) => {
            state.homeFormIdList = action.payload?.data?.id;
            state.submittedFormCount = action.payload?.data?.count_form;
            state.isLoading = false;
        }).addCase(homeformIds.rejected, (state, action) => {
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

export const { setCurrentHomeId } = userSlice.actions;

export default userSlice.reducer;
