import { createSlice } from "@reduxjs/toolkit";
import { fetchParticularForm, getAdminDetails, getAllForms } from "../actions/admin";


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoading: false,
        adminDetails: {},
        getAllForms: {},
        singleForm: {},
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminDetails.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAdminDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.adminDetails = action.payload;
        }).addCase(getAdminDetails.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
            .addCase(getAllForms.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(getAllForms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getAllForms = action.payload;
            }).addCase(getAllForms.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
            })

            .addCase(fetchParticularForm.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(fetchParticularForm.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleForm = action.payload;
            }).addCase(fetchParticularForm.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
            })

    }
});

export default adminSlice.reducer;
