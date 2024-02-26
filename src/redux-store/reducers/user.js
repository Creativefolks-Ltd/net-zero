import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../actions/auth";
import { fetchParticularForm, formlist, getCountry, getUserDetails, homeFormDelete, homeformIds, particularHomeDetails } from "../actions/user";

const userSlice = createSlice({
    name: "fetchUsers",
    initialState: {
        isLoading: false,
        isLoadingHome: false,
        currentHomeId: null,
        data: [],
        formList: [],
        homeFormIdList: [],
        submittedFormCount: null,
        homeDetails: {},
        singleForm: {},
        countries: [],
        isError: false
    }, reducers: {
        setCurrentHomeId(state, action) {
            state.currentHomeId = action.payload
        },
        userFormReset(state, action) {
            state.singleForm = {}
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
            state.formList = action.payload?.data;
            state.isLoading = false;
        }).addCase(formlist.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;

        }).addCase(particularHomeDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(particularHomeDetails.fulfilled, (state, action) => {
            state.homeDetails = action.payload?.data;
            state.isLoading = false;
        }).addCase(particularHomeDetails.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;

        }).addCase(homeformIds.pending, (state, action) => {
            state.isLoadingHome = true;
        }).addCase(homeformIds.fulfilled, (state, action) => {
            state.homeFormIdList = action.payload?.data?.id;
            state.submittedFormCount = action.payload?.data?.count_form;
            state.isLoadingHome = false;
        }).addCase(homeformIds.rejected, (state, action) => {
            state.isError = true;
            state.isLoadingHome = false;

        }).addCase(homeFormDelete.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(homeFormDelete.fulfilled, (state, action) => {
            state.isLoading = false;
        }).addCase(homeFormDelete.rejected, (state, action) => {
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
            state.countries = action.payload?.data;
        }).addCase(getCountry.rejected, (state, action) => {
            state.isError = true;
        })

        .addCase(fetchParticularForm.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchParticularForm.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singleForm = action.payload?.data;
        }).addCase(fetchParticularForm.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
    }
});

export const { setCurrentHomeId, userFormReset } = userSlice.actions;

export default userSlice.reducer;
