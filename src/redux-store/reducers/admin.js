import { createSlice } from "@reduxjs/toolkit";
import { adminFetchParticularForm, getAdminDetails, getAllForms, getUserList } from "../actions/admin";


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoading: false,
        adminPageShow: false,
        adminDetails: {},
        getAllForms: {},
        singleForm: {},
        assignUserList: [],
        isError: false
    },
    reducers: {
        singleFormReset(state, action) {
            state.singleForm = {}
        },
        adminPageViewFunc(state, action) {
            state.adminPageShow = action.payload
        }
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

            .addCase(adminFetchParticularForm.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(adminFetchParticularForm.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleForm = action.payload?.data;
            }).addCase(adminFetchParticularForm.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
            })

            .addCase(getUserList.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(getUserList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.assignUserList = action.payload?.data;
            }).addCase(getUserList.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
            })

    }
});

export const { singleFormReset, adminPageViewFunc } = adminSlice.actions;
export default adminSlice.reducer;
