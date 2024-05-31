import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, userLogin, userSignup } from "../actions/auth";
import { getUserDetails, updateUserDetails } from "../actions/user";
import { updateAdminDetails } from "../actions/admin";


const initialState = {
    loading: false,
    userInfo: null,
    encryptedId: null,
    error: null,
    success: false,
    generalInfoId: null,
    adminDetails: null,
    formCompleted: 0,
    userEmail: null,
    formName: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        generalInfo(state, action) {
            state.generalInfoId = action.payload
        },
        setFormCompleted(state, action) {
            state.formCompleted = action.payload
        },
        setFormName(state, action) {
            state.formName = action.payload
        },
        removeEncryptedId(state, action) {
            state.encryptedId = null
        },
        setEncryptedId(state, action) {
            state.encryptedId = action.payload
        },
        logout(state) {
            state.loading = false;
            state.error = null;
            state.userInfo = null;
            state.success = false;
            state.generalInfoId = null;

        },
        adminLogout(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.adminDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.adminDetails = action.payload?.data;
            state.success = true;
        }).addCase(adminLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Login failed";
            state.success = false;
        })

        // Login
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload?.data;
            state.success = true;
        }).addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Login failed";
            state.success = false;
        })
            // Signup
            .addCase(userSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(userSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.encryptedId = action.payload?.data?.user_id;
                state.success = true;
            }).addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Signup failed";
                state.success = false;

                // Get UserData
            }).addCase(getUserDetails.pending, (state, action) => {
                state.loading = true;
            }).addCase(getUserDetails.fulfilled, (state, action) => {
                const updatedFields = (action.payload?.data && action.payload.data[0]) || action.payload?.data;
                state.userInfo = {
                    ...state.userInfo,
                    ...updatedFields,
                };
                state.loading = false;

            }).addCase(getUserDetails.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
            })
            
            // update user details
            .addCase(updateUserDetails.pending, (state, action) => {
                state.loading = true;
            }).addCase(updateUserDetails.fulfilled, (state, action) => {
                const updatedFields = action.payload?.data[0] || action.payload?.data;
                state.userInfo = {
                    ...state.userInfo,
                    ...updatedFields,
                };
                state.loading = false;

            }).addCase(updateUserDetails.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
            })

            // update admin details
            .addCase(updateAdminDetails.pending, (state, action) => {
                state.loading = true;
            }).addCase(updateAdminDetails.fulfilled, (state, action) => {
                const updatedFields = (action.payload?.data && action.payload.data[0]) || action.payload?.data;
                state.adminDetails = {
                    ...state.adminDetails,
                    ...updatedFields,
                };
                state.loading = false;

            }).addCase(updateAdminDetails.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
            })
    }
});

export const { loginAction, logout, adminLogout, generalInfo, setFormCompleted, setFormName, removeEncryptedId, setEncryptedId } = authSlice.actions;
export default authSlice.reducer;
