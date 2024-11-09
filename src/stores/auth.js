import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        token: null,
        role: null
    },
    reducers: {
        signin: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token || null;
            state.role = action.payload.role;
        },
        signout: (state, action) => {
            state.userId = null;
            state.token = null;
            state.role = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
        }
    }
});


export const authAction = authSlice.actions;
