import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        token: null,
    },
    reducers: {
        signin: (state, action) => {
            state.userId = localStorage.getItem('userId');
            status.token = localStorage.getItem('token');
        },
        signout: (state, action) => {
            state.userId = null;
            state.token = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
        }
    }
});


export const authAction = authSlice.actions;
