import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, userLogin, userSignup } from "../actions/auth";
import { getUserDetails } from "../actions/user";


const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
    generalInfoId: null,
    adminDetails: null,
    formCompleted: 0,
    userEmail: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserEmail(state, action) {
            state.userEmail = action.payload
        },
        generalInfo(state, action) {
            state.generalInfoId = action.payload
        },
        setFormCompleted(state, action) {
            state.formCompleted = action.payload
        },
        loginAction(state, action) {
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
            state.adminDetails = action.payload.data;
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
            state.userInfo = action.payload.data;
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
                state.userInfo = action.payload.data;
                state.success = true;
            }).addCase(userSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Signup failed";
                state.success = false;

                // Get UserData
            }).addCase(getUserDetails.pending, (state, action) => {
                state.loading = true;
            }).addCase(getUserDetails.fulfilled, (state, action) => {
                const updatedFields = action.payload?.data[0] || action.payload?.data;
                state.userInfo = {
                    ...state.userInfo,
                    ...updatedFields,
                };
                state.loading = false;

            }).addCase(getUserDetails.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
            })
    }
});

export const { loginAction, logout, adminLogout, generalInfo, setFormCompleted, setUserEmail } = authSlice.actions;
export default authSlice.reducer;
